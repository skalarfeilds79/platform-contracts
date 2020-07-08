pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

// solium-disable security/no-block-members

import "../Escrow.sol";
import "../IEscrowCallbackReceiver.sol";
import "../../admin/Pausable.sol";
import "../../admin/Freezable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract CreditCardEscrow is Pausable, Freezable, IEscrowCallbackReceiver {

    using SafeMath for uint256;

    // Emitted when assets are escrowed
    event Escrowed(
        uint indexed id,
        uint indexed paymentID,
        address indexed owner,
        uint256 endTimestamp
    );

    // Emitted when the release of the assets in a custodial escrow account is successfully requested
    event ReleaseRequested(
        uint indexed id,
        uint256 releaseTimestamp,
        address releaseTo
    );

    // Emitted when the release of the assets in a custodial escrow account is cancelled
    event ReleaseCancelled(uint indexed id);

    // Emitted when the assets in any escrow account are released
    event Released(uint indexed id);

    // Emitted when the destruction of the assets in an escrow account is successfully requested
    event DestructionRequested(uint indexed id, uint256 destructionTimestamp);

    // Emitted when the destruction of the assets in an escrow account is cancelled
    event DestructionCancelled(uint indexed id);

    // Emitted when the assets in an escrow account are destroyed
    event Destroyed(uint indexed id);

    struct Lock {
        // the timestamp after which these assets can be taked from escrow
        uint256 endTimestamp;
        // the address which will own these assets after the escrow period
        address owner;
        // the timestamp after which these assets can be destroyed
        uint256 destructionTimestamp;
        // the timestamp after which these assets will be released
        uint256 releaseTimestamp;
        // the user to whom these assets will be released
        address releaseTo;
    }

    struct Callback {
        address to;
        bytes data;
    }

    Callback internal callback;
    // Escrow protocol contract
    Escrow public escrowProtocol;
    // Mapping from escrow IDs to details
    mapping(uint256 => Lock) public locks;
    // The address which can destroy assets
    address public destroyer;
    // Number of blocks an escrow account must be marked for destruction before it is destroyed
    uint256 public destructionDelay;
    // The address which can withdraw custodial assets
    address public custodian;
    // Number of blocks a custodial escrow asset must be marked for release
    uint256 public releaseDelay;

    constructor(
        Escrow _escrowProtocol,
        address _destroyer,
        uint256 _destructionDelay,
        address _custodian,
        uint256 _releaseDelay
    ) public {
        escrowProtocol = _escrowProtocol;
        destroyer = _destroyer;
        destructionDelay = _destructionDelay;
        custodian = _custodian;
        releaseDelay = _releaseDelay;
    }

    modifier onlyDestroyer {
        require(
            msg.sender == destroyer,
            "IM:CreditCardEscrow: must be the destroyer"
        );
        _;
    }

    modifier onlyCustodian {
        require(
            msg.sender == custodian,
            "IM:CreditCardEscrow: must be the custodian"
        );
        _;
    }

    /**
     * @dev Set the standard destruction delay for new escrow accounts
     *
     * @param _delay Number of blocks an escrow account must be marked for destruction before it is destroyed
     */
    function setDestructionDelay(uint256 _delay) external onlyOwner {
        destructionDelay = _delay;
    }

    /**
     * @dev Set the destroyer account
     *
     * @param _destroyer Address of the destroyer account
     */
    function setDestroyer(address _destroyer) external onlyOwner {
        require(
            _destroyer != destroyer,
            "IM:CreditCardEscrow: must change existing destroyer"
        );

        destroyer = _destroyer;
    }

    /**
     * @dev Set the standard release delay for custodial accounts
     *
     * @param _delay Number of blocks a custodial escrow account must be marked for release
     */
    function setReleaseDelay(uint256 _delay) external onlyOwner {
        releaseDelay = _delay;
    }

    /**
     * @dev Set the custodian account
     *
     * @param _custodian Address of the custodian account
     */
    function setCustodian(address _custodian) public onlyOwner {
        require(
            _custodian != custodian,
            "IM:CreditCardEscrow: must change existing custodian"
        );

        custodian = _custodian;
    }

    /**
     * @dev Release all assets from an escrow account
     *
     * @param _id The ID of the escrow account to be released
     */
    function release(uint _id) external whenUnfrozen {

        Lock memory lock = locks[_id];
        // do first to avoid any re-entrancy risk
        delete locks[_id];
        emit Released(_id);

        require(
            lock.endTimestamp != 0,
            "IM:CreditCardEscrow: must have escrow period set"
        );

        require(
            lock.destructionTimestamp == 0,
            "IM:CreditCardEscrow: must not be marked for destruction"
        );

        require(
            block.timestamp >= lock.endTimestamp,
            "IM:CreditCardEscrow: escrow period must have expired"
        );

        if (lock.owner != address(0)) {
            escrowProtocol.release(_id, lock.owner);
        } else {
            require(
                lock.releaseTo != address(0),
                "IM:CreditCardEscrow: cannot burn assets"
            );

            require(
                block.timestamp >= lock.releaseTimestamp,
                "IM:CreditCardEscrow: release period must have expired"
            );

            escrowProtocol.release(_id, lock.releaseTo);
        }
    }

    /**
     * @dev Request that a custodial escrow account's assets be marked for release
     *
     * @param _id The ID of the escrow account to be marked
     * @param _to The new owner of tese assets
     */
    function requestRelease(uint _id, address _to) external onlyCustodian {

        Lock storage lock = locks[_id];

        require(
            lock.owner == address(0),
            "IM:CreditCardEscrow: escrow account is not custodial, call release directly"
        );

        require(
            lock.endTimestamp != 0, "IM:CreditCardEscrow: must be in escrow"
        );

        require(
            lock.destructionTimestamp == 0,
            "IM:CreditCardEscrow: must not be marked for destruction"
        );

        require(
            lock.releaseTimestamp == 0,
            "IM:CreditCardEscrow: must not be marked for release"
        );

        require(
            block.timestamp.add(releaseDelay) >= lock.endTimestamp,
            "IM:CreditCardEscrow: release period must end after escrow period"
        );

        require(
            _to != address(0),
            "IM:CreditCardEscrow: must release to a real user"
        );

        uint256 releaseTimestamp = block.timestamp.add(releaseDelay);

        lock.releaseTimestamp = releaseTimestamp;
        lock.releaseTo = _to;

        emit ReleaseRequested(_id, releaseTimestamp, _to);
    }

    /**
     * @dev Cancel a release request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelRelease(uint _id) external onlyCustodian whenUnfrozen {

        Lock storage lock = locks[_id];

        require(
            lock.owner == address(0),
            "IM:CreditCardEscrow: escrow account is not custodial, call release directly"
        );

        require(
            lock.releaseTimestamp != 0,
            "IM:CreditCardEscrow: must be marked for release"
        );

        require(
            lock.releaseTimestamp > block.timestamp,
            "IM:CreditCardEscrow: release period must not have expired"
        );

        lock.releaseTimestamp = 0;
        lock.releaseTo = address(0);

        emit ReleaseCancelled(_id);
    }

    /**
     * @dev Request that an escrow account's assets be marked for destruction
     *
     * @param _id The ID of the escrow account to be marked
     */
    function requestDestruction(uint _id) external onlyDestroyer {

        Lock storage lock = locks[_id];

        require(
            lock.endTimestamp != 0,
            "IM:CreditCardEscrow: must be in escrow"
        );

        require(
            lock.destructionTimestamp == 0,
            "IM:CreditCardEscrow: must not be marked for destruction"
        );

        require(
            lock.endTimestamp > block.timestamp,
            "IM:CreditCardEscrow: escrow period must not have expired"
        );

        uint256 destructionTimestamp = block.timestamp.add(destructionDelay);
        lock.destructionTimestamp = destructionTimestamp;

        emit DestructionRequested(_id, destructionTimestamp);
    }

    /**
     * @dev Revoke a destruction request
     *
     * @param _id The ID of the escrow account to be unmarked
     */
    function cancelDestruction(uint _id) external onlyDestroyer {

        Lock storage lock = locks[_id];

        require(
            lock.destructionTimestamp != 0,
            "IM:CreditCardEscrow: must be marked for destruction"
        );

        require(
            lock.destructionTimestamp > block.timestamp,
            "IM:CreditCardEscrow: destruction period must not have expired"
        );

        lock.destructionTimestamp = 0;

        emit DestructionCancelled(_id);
    }

    /**
     * @dev Destroy all assets in an escrow account
     *
     * @param _id The ID of the escrow account to be destroyed
     */
    function destroy(uint _id) public onlyDestroyer {

        Lock memory lock = locks[_id];

        require(
            lock.destructionTimestamp != 0,
            "IM:CreditCardEscrow: must be marked for destruction"
        );

        require(
            block.timestamp >= lock.destructionTimestamp,
            "IM:CreditCardEscrow: destruction period must have expired"
        );

        delete locks[_id];
        emit Destroyed(_id);

        escrowProtocol.destroy(_id);
    }

    /**
     * @dev Escrow some amount of ERC20 tokens
     *
     * @param _vault the details of the escrow vault
     * @param _callbackData the data to pass to the callback transaction
     * @param _paymentID The ID of the payment
     * @param _duration the duration of the escrow
     */
    function escrow(
        Escrow.Vault memory _vault,
        bytes memory _callbackData,
        uint256 _paymentID,
        uint256 _duration
    ) public whenUnpaused whenUnfrozen returns (uint) {

        require(
            _duration > 0,
            "IM:CreditCardEscrow: must be locked for a number of blocks"
        );

        require(
            _vault.admin == address(this),
            "IM:CreditCardEscrow: admin must be this contract"
        );

        callback = Callback({
            to: msg.sender,
            data: _callbackData
        });

        // escrow the assets with this contract as the releaser
        // trusted contract, no re-entrancy risk
        uint escrowID = escrowProtocol.escrow(_vault);

        _lock(escrowID, _paymentID, _duration, _vault.player);

        return escrowID;
    }

    function onEscrowCallback() external returns (bytes4) {
        require(msg.sender == address(escrowProtocol), "IM:CreditCardEscrow: must be escrow");
        require(callback.to != address(0), "IM:CreditCardEscrow: must have callback address set");
        // solium-disable-next-line security/no-low-level-calls
        (bool success, ) = callback.to.call(callback.data);
        require(success, "IM:CreditCardEscrow: callback must be successful");
        return bytes4(keccak256("Immutable Escrow Callback"));
    }

    function getProtocol() external view returns (address) {
        return address(escrowProtocol);
    }

    function _lock(
        uint _escrowID,
        uint _paymentID,
        uint256 _duration,
        address _owner
    )
        internal
    {
        uint256 endTimestamp = block.timestamp.add(_duration);

        locks[_escrowID] = Lock({
            owner: _owner,
            endTimestamp: endTimestamp,
            destructionTimestamp: 0,
            releaseTimestamp: 0,
            releaseTo: address(0)
        });

        emit Escrowed(_escrowID, _paymentID, _owner, endTimestamp);
    }
}