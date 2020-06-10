pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "../admin/Pausable.sol";
import "../admin/Freezable.sol";
import "../token/IBatchTransfer.sol";
import "../token/IListTransfer.sol";
import "./IEscrowCallbackReceiver.sol";

contract Escrow is Pausable, Freezable {

    struct Vault {
        address player;
        address admin;
        address asset;
        uint256 balance;
        uint256 lowTokenID;
        uint256 highTokenID;
        uint256[] tokenIDs;
    }

    // Emitted when a new escrow vault is created
    event Escrowed(uint256 indexed id, Vault vault);
    // Emitted when the assets in an escrow vault are released
    event Released(uint256 indexed id, address to);
    // Emitted when the assets in an escrow vault are destroyed
    event Destroyed(uint256 indexed id);

    using SafeMath for uint256;

    bytes4 internal magic = bytes4(keccak256("Immutable Escrow Callback"));
    // Mutex on escrow vault creation
    bool public escrowMutexLocked;
    // Mutex on asset release
    bool public releaseMutexLocked;
    // Whether batch transfers are enabled for this asset
    mapping(address => bool) public batchTransferEnabled;
    // Whether list transfers are enabled for this asset
    mapping(address => bool) public listTransferEnabled;
    // All Escrow vaults stored in this contract
    Vault[] public vaults;
    // Approved escrowers
    mapping(address => bool) public escrowers;
    // The max number of NFTs which can be held in a vault
    uint256 public nftCapacity;
    // Prohibited callback functions
    mapping(bytes4 => bool) public prohibited;

    constructor(uint256 _nftCapacity) public {
        nftCapacity = _nftCapacity;
    }

    /**
     * @dev Set the NFT capacity of each escrow vault
     *
     * @param _capacity the new NFT capacity
     */
    function setNFTCapacity(uint256 _capacity) public onlyOwner {
        nftCapacity = _capacity;
    }

    /**
     * @dev Create an escrow account where assets will be pushed into escrow by another contract
     *
     * @param _vault the details of the new escrow vault
     */
    function escrow(Vault memory _vault) public whenUnpaused whenUnfrozen returns (uint256) {

        require(
            !escrowMutexLocked,
            "IM:Escrow: mutex must be unlocked"
        );

        require(
            _vault.asset != address(0),
            "IM:Escrow: must be a non-null asset"
        );

        require(
            _vault.admin != address(0),
            "IM:Escrow: must have an admin"
        );

        escrowMutexLocked = true;
        uint256 preBalance = 0;

        if (_vault.balance > 0) {
            preBalance = IERC20(_vault.asset).balanceOf(address(this));
            require(
                _vault.tokenIDs.length == 0,
                "IMEscrow: must not supply balance and list"
            );

            require(
                _vault.lowTokenID == 0 && _vault.highTokenID == 0,
                "IMEscrow: must not supply balance and range"
            );

        } else if (_vault.tokenIDs.length > 0) {
            require(
                !_areAnyInListEscrowed(_vault),
                "IM:Escrow: list must not be already escrowed"
            );

            require(
                _vault.tokenIDs.length <= nftCapacity,
                "IM:Escrow: exceeds NFT capacity"
            );

            require(
                _vault.lowTokenID == 0 && _vault.highTokenID == 0,
                "IMEscrow: must not supply list and range"
            );

        } else if (_vault.highTokenID.sub(_vault.lowTokenID) > 0) {
            require(
                !_areAnyInBatchEscrowed(_vault),
                "IM:Escrow: batch must not be already escrowed"
            );

            require(
                _vault.highTokenID.sub(_vault.lowTokenID) <= nftCapacity,
                "IM:Escrow: exceeds NFT capacity"
            );
        } else {
            require(
                false,
                "IM:Escrow: invalid vault"
            );
        }

        // solium-disable-next-line security/no-low-level-calls
        bytes4 result = IEscrowCallbackReceiver(msg.sender).onEscrowCallback();
        require(result == magic, "IM:Escrow: callback result must match");
        escrowMutexLocked = false;

        if (_vault.balance > 0) {
            require(
                IERC20(_vault.asset).balanceOf(address(this)).sub(preBalance) == _vault.balance,
                "IM:Escrow: must have transferred the tokens"
            );
        } else if (_vault.tokenIDs.length > 0) {
            require(
                _areAllInListEscrowed(_vault),
                "IM:Escrow: list must now be owned by escrow contract"
            );

        } else if (_vault.highTokenID.sub(_vault.lowTokenID) > 0) {
            require(
                _areAllInBatchEscrowed(_vault),
                "IM:Escrow: batch must not be owned by escrow contract"
            );
        }

        return _escrow(_vault);
    }

    /**
     * @dev Destroy the assets in an escrow account
     *
     * @param _id the id of the escrow vault
     */
    function destroy(uint256 _id) external whenUnfrozen {
        Vault memory vault = vaults[_id];

        require(
            vault.admin == msg.sender,
            "IM:Escrow: must be the admin"
        );

        delete vaults[_id];
        emit Destroyed(_id);
    }

    /**
     * @dev Release assets from an escrow account
     *
     * @param _id the id of the escrow vault
     * @param _to the address to which assets should be released
     */
    function release(uint256 _id, address _to) external whenUnfrozen {
        Vault memory vault = vaults[_id];

        require(
            vault.admin == msg.sender,
            "IM:Escrow: must be the admin"
        );

        require(
            !releaseMutexLocked,
            "IM:Escrow: release mutex must be unlocked"
        );

        releaseMutexLocked = true;
        emit Released(_id, _to);
        delete vaults[_id];

        if (vault.balance > 0) {
            require(
                IERC20(vault.asset).transfer(_to, vault.balance),
                "IMEscrow: must transfer successfully"
            );
        } else if (vault.tokenIDs.length > 0) {
            _transferList(vault, address(this), _to);
        } else {
            _transferBatch(vault, address(this), _to);
        }

        releaseMutexLocked = false;
    }

    /**
     * @dev Set whether a particular contract has batch transfers available
     *
     * @param _asset the address of the asset contract
     * @param _enabled whether this asset can use batch transfers
     */
    function setBatchTransferEnabled(address _asset, bool _enabled) external onlyOwner {
        batchTransferEnabled[_asset] = _enabled;
    }

    /**
     * @dev Set whether a particular contract has list transfers available
     *
     * @param _asset the address of the asset contract
     * @param _enabled whether this asset can use list transfers
     */
    function setListTransferEnabled(address _asset, bool _enabled) external onlyOwner {
        listTransferEnabled[_asset] = _enabled;
    }

    function _escrow(Vault memory _vault) internal returns (uint256) {
        uint256 id = vaults.push(_vault) - 1;
        emit Escrowed(id, _vault);
        return id;
    }

    function _transferList(Vault memory _vault, address _from, address _to) internal {
        if (listTransferEnabled[_vault.asset]) {
            IListTransfer(_vault.asset).transferAllFrom(_from, _to, _vault.tokenIDs);
        } else {
            for (uint i = 0; i < _vault.tokenIDs.length; i++) {
                IERC721(_vault.asset).transferFrom(_from, _to, _vault.tokenIDs[i]);
            }
        }
    }

    function _transferBatch(Vault memory _vault, address _from, address _to) internal {
        if (batchTransferEnabled[_vault.asset]) {
            IBatchTransfer(_vault.asset).transferBatch(_from, _to, _vault.lowTokenID, _vault.highTokenID);
        } else {
            for (uint i = _vault.lowTokenID; i < _vault.highTokenID; i++) {
                IERC721(_vault.asset).transferFrom(_from, _to, i);
            }
        }
    }

    function _areAnyInListEscrowed(Vault memory _vault) internal returns (bool) {
        for (uint i = 0; i < _vault.tokenIDs.length; i++) {
            if (_existsAndEscrowed(address(_vault.asset), _vault.tokenIDs[i])) {
                return true;
            }
        }
        return false;
    }

    function _areAllInListEscrowed(Vault memory _vault) internal view returns (bool) {
        for (uint i = 0; i < _vault.tokenIDs.length; i++) {
            if (IERC721(_vault.asset).ownerOf(_vault.tokenIDs[i]) != address(this)) {
                return false;
            }
        }
        return true;
    }

    function _areAnyInBatchEscrowed(Vault memory _vault) internal returns (bool) {
        for (uint i = _vault.lowTokenID; i < _vault.highTokenID; i++) {
            if (_existsAndEscrowed(_vault.asset, i)) {
                return true;
            }
        }
        return false;
    }

    function _areAllInBatchEscrowed(Vault memory _vault) internal view returns (bool) {
        for (uint i = _vault.lowTokenID; i < _vault.highTokenID; i++) {
            if (IERC721(_vault.asset).ownerOf(i) != address(this)) {
                return false;
            }
        }
        return true;
    }

    function _existsAndEscrowed(address _asset, uint256 _tokenID) internal returns (bool) {
        bytes memory data = abi.encodeWithSignature("ownerOf(uint256)", _tokenID);
        // solium-disable-next-line security/no-low-level-calls
        (bool success, bytes memory response) = _asset.call(data);
        if (success) {
            address owner;
            // solium-disable-next-line security/no-inline-assembly
            assembly { owner := mload(add(response, 20)) }
            if (owner == address(this)) {
                return true;
            }
        }
        return false;
    }

}