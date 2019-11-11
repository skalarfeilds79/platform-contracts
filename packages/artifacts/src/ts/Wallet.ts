export const Wallet = {
  "contractName": "Wallet",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "creator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "proxyType",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "implementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "delegates",
      "outputs": [
        {
          "internalType": "contract Delegates",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "creationTime",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "modules",
      "outputs": [
        {
          "internalType": "contract Modules",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Received",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Executed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnerChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "modules",
          "type": "address"
        }
      ],
      "name": "ModulesChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegates",
          "type": "address"
        }
      ],
      "name": "DelegatesChanged",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "contract Modules",
          "name": "_modules",
          "type": "address"
        }
      ],
      "name": "changeModules",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "contract Delegates",
          "name": "_delegates",
          "type": "address"
        }
      ],
      "name": "changeDelegates",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "contract Delegates",
          "name": "_delegates",
          "type": "address"
        },
        {
          "internalType": "contract Modules",
          "name": "_modules",
          "type": "address"
        }
      ],
      "name": "init",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "executeValue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "execute",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_function",
          "type": "bytes4"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "register",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.11+commit.c082d0b4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[],\"name\":\"creator\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"executeValue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"contract Delegates\",\"name\":\"_delegates\",\"type\":\"address\"},{\"internalType\":\"contract Modules\",\"name\":\"_modules\",\"type\":\"address\"}],\"name\":\"init\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"execute\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"proxyType\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"implementation\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"delegates\",\"outputs\":[{\"internalType\":\"contract Delegates\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"_function\",\"type\":\"bytes4\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"register\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"changeOwner\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract Modules\",\"name\":\"_modules\",\"type\":\"address\"}],\"name\":\"changeModules\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract Delegates\",\"name\":\"_delegates\",\"type\":\"address\"}],\"name\":\"changeDelegates\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"creationTime\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"modules\",\"outputs\":[{\"internalType\":\"contract Modules\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Received\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Executed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnerChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"modules\",\"type\":\"address\"}],\"name\":\"ModulesChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"delegates\",\"type\":\"address\"}],\"name\":\"DelegatesChanged\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Wallet.sol\":\"Wallet\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol\":{\"keccak256\":\"0x8b57646f6fad9431d2d6dd24359e5bbe8f198360c967f47c3082d977a4283e90\",\"urls\":[\"bzz-raw://63fe6dd765615945bca7cd8b71b30df9e5798b5306dafab83f0b631e66b5b190\",\"dweb:/ipfs/QmSPVkS6AFZ5Dnn5bQdom7vNR9knhdvxxvVTxcZqvAnEf1\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Wallet.sol\":{\"keccak256\":\"0x8b747be9a3103e4e1863ce31c53e707325d132f4b7568e318235b8d9ab06afbb\",\"urls\":[\"bzz-raw://1ba1765dfc8b658420b155f8e1f6fb480ca4e80ec240f47bbde076be4bb7c3cb\",\"dweb:/ipfs/QmPra13QaZJwUEH9ENRZnimvd792Xy5CxMCpuzEz8bVhpy\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/delegates/Delegates.sol\":{\"keccak256\":\"0xc26d545bafc869f085f9153fc70594e5e8c34dea45288eff0403bb589cbc67e0\",\"urls\":[\"bzz-raw://08ff7568b730c1f8b9d3b530e67767180b02717612d85ed2e55c6439056e4961\",\"dweb:/ipfs/Qmd5QriPSDxPvvX2hJfGjeaDPcxykRuUpiHnJTtJxQbz3D\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/interfaces/ERCProxy.sol\":{\"keccak256\":\"0x0cdb0f511fe2ec57d46c79ab23632d3087554800e00a96c0c679b8d62825dda0\",\"urls\":[\"bzz-raw://f4c7b4befe25636f5b03ee3068f11753381d7fd1983edc4c080bc4134f3f41b9\",\"dweb:/ipfs/QmTWkndVjA8NdrxeWnheHWfKgMhJYWXnEmCzv9FDVXgH2S\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/modules/Module.sol\":{\"keccak256\":\"0x4bf61400859a03bbaf969d3c61a572af4ee67c75968027e13bc4d6dadaf126ac\",\"urls\":[\"bzz-raw://74c560c90e3f25428535e83c52c2e4efa17c98ced3d3dd24fb2de8b6fef9dbd1\",\"dweb:/ipfs/QmXMrPymSzuHpMiopZe6Mk8LH1jCwtuCKdHEvLwe4UdsaW\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/modules/Modules.sol\":{\"keccak256\":\"0x04632041e79c0070e10f27f24ea7974514e4eb0603469b49a96006f9573d5dce\",\"urls\":[\"bzz-raw://c09abae08f52e86f536598d7b4fd2361d21d86f3c8070a4772c733332cfff7ac\",\"dweb:/ipfs/QmQUPhjY3B7morytHDy4Z5vu5gbgKF2Rmwp839QRHfyeUT\"]}},\"version\":1}",
  "bytecode": "0x608060405234801561001057600080fd5b50610e29806100206000396000f3fe6080604052600436106100dd5760003560e01c80638da5cb5b1161007f578063cc07de2711610059578063cc07de27146104b9578063d0e3918a146104ec578063d8270dce1461051f578063f7e80e9814610551576100dd565b80638da5cb5b1461042e578063a6c354b014610443578063a6f9dae114610486576100dd565b80631cff79cd116100bb5780631cff79cd1461031a5780634555d5c9146103dd5780635c60da1b146104045780636138b19e14610419576100dd565b806302d05d3f146101dd5780630a085aed1461020e578063184b9559146102d5575b600354604051632532a96160e01b81523060048201818152600080356001600160e01b031916602485018190523460648601819052336084870181905260a0604488019081523660a4890181905294986001600160a01b031697632532a961979694958a9590949392909160c401868680828437600081840152601f19601f820116905080830192505050975050505050505050602060405180830381600087803b15801561018b57600080fd5b505af115801561019f573d6000803e3d6000fd5b505050506040513d60208110156101b557600080fd5b505190503660008037600080366000845afa3d6000803e8080156101d8573d6000f35b3d6000fd5b3480156101e957600080fd5b506101f2610566565b604080516001600160a01b039092168252519081900360200190f35b34801561021a57600080fd5b506102d36004803603606081101561023157600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561025c57600080fd5b82018360208201111561026e57600080fd5b8035906020019184600183028401116401000000008311171561029057600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505091359250610575915050565b005b3480156102e157600080fd5b506102d3600480360360608110156102f857600080fd5b506001600160a01b03813581169160208101358216916040909101351661085e565b34801561032657600080fd5b506102d36004803603604081101561033d57600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561036857600080fd5b82018360208201111561037a57600080fd5b8035906020019184600183028401116401000000008311171561039c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610a1d945050505050565b3480156103e957600080fd5b506103f2610a2d565b60408051918252519081900360200190f35b34801561041057600080fd5b506101f2610a32565b34801561042557600080fd5b506101f2610a41565b34801561043a57600080fd5b506101f2610a50565b34801561044f57600080fd5b506102d36004803603604081101561046657600080fd5b5080356001600160e01b03191690602001356001600160a01b0316610a5f565b34801561049257600080fd5b506102d3600480360360208110156104a957600080fd5b50356001600160a01b0316610aca565b3480156104c557600080fd5b506102d3600480360360208110156104dc57600080fd5b50356001600160a01b0316610bbe565b3480156104f857600080fd5b506102d36004803603602081101561050f57600080fd5b50356001600160a01b0316610cb2565b34801561052b57600080fd5b50610534610da6565b6040805167ffffffffffffffff9092168252519081900360200190f35b34801561055d57600080fd5b506101f2610dbd565b6004546001600160a01b031681565b600254604051639cf378e760e01b8152306004820181815233602484018190526001600160a01b0388811660448601526084850187905260a060648601908152885160a487015288519190961695639cf378e79592938a938a938a939160c40190602086019080838360005b838110156105f95781810151838201526020016105e1565b50505050905090810190601f1680156106265780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561064957600080fd5b505af115801561065d573d6000803e3d6000fd5b505050506040513d602081101561067357600080fd5b50516106b05760405162461bcd60e51b8152600401808060200182810382526028815260200180610dcd6028913960400191505060405180910390fd5b6000836001600160a01b031682846040518082805190602001908083835b602083106106ed5780518252601f1990920191602091820191016106ce565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461074f576040519150601f19603f3d011682016040523d82523d6000602084013e610754565b606091505b50509050806107a3576040805162461bcd60e51b8152602060048201526016602482015275195e1958dd5d1a5bdb881d5b9cdd58d8d95cdcd99d5b60521b604482015290519081900360640190fd5b836001600160a01b0316336001600160a01b03167fba8de7fee5c88ca4a3e8479a8da37e4104ac928b1b31bea9f8797339846c238c85856040518080602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561081d578181015183820152602001610805565b50505050905090810190601f16801561084a5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a350505050565b6001546001600160a01b0316156108b1576040805162461bcd60e51b815260206004820152601260248201527163616e206f6e6c7920696e6974206f6e636560701b604482015290519081900360640190fd5b6001600160a01b038316610903576040805162461bcd60e51b81526020600482015260146024820152731bdddb995c8818d85b9b9bdd081899481b9d5b1b60621b604482015290519081900360640190fd5b6001600160a01b038116610956576040805162461bcd60e51b81526020600482015260156024820152741b5bd91d5b195cc818d85b9bdd081899481b9d5b1b605a1b604482015290519081900360640190fd5b6001600160a01b0382166109b1576040805162461bcd60e51b815260206004820152601860248201527f64656c6567617465732063616e6e6f74206265206e756c6c0000000000000000604482015290519081900360640190fd5b600180546001600160a01b03199081166001600160a01b0395861617909155600380548216938516939093179092556002805483169190931617909155600480543392169190911767ffffffffffffffff60a01b1916600160a01b4267ffffffffffffffff1602179055565b610a2982826000610575565b5050565b600181565b6000546001600160a01b031681565b6003546001600160a01b031681565b6001546001600160a01b031681565b600354604080513060248201526001600160e01b0319851660448201526001600160a01b038481166064808401919091528351808403909101815260849092019092526020810180516001600160e01b03166371a131dd60e01b179052610a29929190911690610a1d565b333014610b1e576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610b74576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0383169081179091556040517fa2ea9883a321a3e97b8266c2b078bfeec6d50c711ed71f874a90d500ae2eaf3690600090a250565b333014610c12576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610c68576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0383169081179091556040517f902acf93930005941918badfe8d177951ddae01c9d3da68d08c5a8a4753ea77790600090a250565b333014610d06576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610d5c576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600380546001600160a01b0319166001600160a01b0383169081179091556040517f902acf93930005941918badfe8d177951ddae01c9d3da68d08c5a8a4753ea77790600090a250565b600454600160a01b900467ffffffffffffffff1681565b6002546001600160a01b03168156fe73656e646572206e6f7420617574686f726973656420666f722074686973206f7065726174696f6ea265627a7a723158207812a344554e2508bb5d9724fc29770583005139343b267f557d651e48bac24f64736f6c634300050b0032",
  "deployedBytecode": "0x6080604052600436106100dd5760003560e01c80638da5cb5b1161007f578063cc07de2711610059578063cc07de27146104b9578063d0e3918a146104ec578063d8270dce1461051f578063f7e80e9814610551576100dd565b80638da5cb5b1461042e578063a6c354b014610443578063a6f9dae114610486576100dd565b80631cff79cd116100bb5780631cff79cd1461031a5780634555d5c9146103dd5780635c60da1b146104045780636138b19e14610419576100dd565b806302d05d3f146101dd5780630a085aed1461020e578063184b9559146102d5575b600354604051632532a96160e01b81523060048201818152600080356001600160e01b031916602485018190523460648601819052336084870181905260a0604488019081523660a4890181905294986001600160a01b031697632532a961979694958a9590949392909160c401868680828437600081840152601f19601f820116905080830192505050975050505050505050602060405180830381600087803b15801561018b57600080fd5b505af115801561019f573d6000803e3d6000fd5b505050506040513d60208110156101b557600080fd5b505190503660008037600080366000845afa3d6000803e8080156101d8573d6000f35b3d6000fd5b3480156101e957600080fd5b506101f2610566565b604080516001600160a01b039092168252519081900360200190f35b34801561021a57600080fd5b506102d36004803603606081101561023157600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561025c57600080fd5b82018360208201111561026e57600080fd5b8035906020019184600183028401116401000000008311171561029057600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505091359250610575915050565b005b3480156102e157600080fd5b506102d3600480360360608110156102f857600080fd5b506001600160a01b03813581169160208101358216916040909101351661085e565b34801561032657600080fd5b506102d36004803603604081101561033d57600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561036857600080fd5b82018360208201111561037a57600080fd5b8035906020019184600183028401116401000000008311171561039c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610a1d945050505050565b3480156103e957600080fd5b506103f2610a2d565b60408051918252519081900360200190f35b34801561041057600080fd5b506101f2610a32565b34801561042557600080fd5b506101f2610a41565b34801561043a57600080fd5b506101f2610a50565b34801561044f57600080fd5b506102d36004803603604081101561046657600080fd5b5080356001600160e01b03191690602001356001600160a01b0316610a5f565b34801561049257600080fd5b506102d3600480360360208110156104a957600080fd5b50356001600160a01b0316610aca565b3480156104c557600080fd5b506102d3600480360360208110156104dc57600080fd5b50356001600160a01b0316610bbe565b3480156104f857600080fd5b506102d36004803603602081101561050f57600080fd5b50356001600160a01b0316610cb2565b34801561052b57600080fd5b50610534610da6565b6040805167ffffffffffffffff9092168252519081900360200190f35b34801561055d57600080fd5b506101f2610dbd565b6004546001600160a01b031681565b600254604051639cf378e760e01b8152306004820181815233602484018190526001600160a01b0388811660448601526084850187905260a060648601908152885160a487015288519190961695639cf378e79592938a938a938a939160c40190602086019080838360005b838110156105f95781810151838201526020016105e1565b50505050905090810190601f1680156106265780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561064957600080fd5b505af115801561065d573d6000803e3d6000fd5b505050506040513d602081101561067357600080fd5b50516106b05760405162461bcd60e51b8152600401808060200182810382526028815260200180610dcd6028913960400191505060405180910390fd5b6000836001600160a01b031682846040518082805190602001908083835b602083106106ed5780518252601f1990920191602091820191016106ce565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461074f576040519150601f19603f3d011682016040523d82523d6000602084013e610754565b606091505b50509050806107a3576040805162461bcd60e51b8152602060048201526016602482015275195e1958dd5d1a5bdb881d5b9cdd58d8d95cdcd99d5b60521b604482015290519081900360640190fd5b836001600160a01b0316336001600160a01b03167fba8de7fee5c88ca4a3e8479a8da37e4104ac928b1b31bea9f8797339846c238c85856040518080602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561081d578181015183820152602001610805565b50505050905090810190601f16801561084a5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a350505050565b6001546001600160a01b0316156108b1576040805162461bcd60e51b815260206004820152601260248201527163616e206f6e6c7920696e6974206f6e636560701b604482015290519081900360640190fd5b6001600160a01b038316610903576040805162461bcd60e51b81526020600482015260146024820152731bdddb995c8818d85b9b9bdd081899481b9d5b1b60621b604482015290519081900360640190fd5b6001600160a01b038116610956576040805162461bcd60e51b81526020600482015260156024820152741b5bd91d5b195cc818d85b9bdd081899481b9d5b1b605a1b604482015290519081900360640190fd5b6001600160a01b0382166109b1576040805162461bcd60e51b815260206004820152601860248201527f64656c6567617465732063616e6e6f74206265206e756c6c0000000000000000604482015290519081900360640190fd5b600180546001600160a01b03199081166001600160a01b0395861617909155600380548216938516939093179092556002805483169190931617909155600480543392169190911767ffffffffffffffff60a01b1916600160a01b4267ffffffffffffffff1602179055565b610a2982826000610575565b5050565b600181565b6000546001600160a01b031681565b6003546001600160a01b031681565b6001546001600160a01b031681565b600354604080513060248201526001600160e01b0319851660448201526001600160a01b038481166064808401919091528351808403909101815260849092019092526020810180516001600160e01b03166371a131dd60e01b179052610a29929190911690610a1d565b333014610b1e576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610b74576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0383169081179091556040517fa2ea9883a321a3e97b8266c2b078bfeec6d50c711ed71f874a90d500ae2eaf3690600090a250565b333014610c12576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610c68576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0383169081179091556040517f902acf93930005941918badfe8d177951ddae01c9d3da68d08c5a8a4753ea77790600090a250565b333014610d06576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742062652063616c6c6564206279207468697320636f6e747261637400604482015290519081900360640190fd5b6001600160a01b038116610d5c576040805162461bcd60e51b81526020600482015260186024820152771059191c995cdcc81b5d5cdd081b9bdd081899481b9d5b1b60421b604482015290519081900360640190fd5b600380546001600160a01b0319166001600160a01b0383169081179091556040517f902acf93930005941918badfe8d177951ddae01c9d3da68d08c5a8a4753ea77790600090a250565b600454600160a01b900467ffffffffffffffff1681565b6002546001600160a01b03168156fe73656e646572206e6f7420617574686f726973656420666f722074686973206f7065726174696f6ea265627a7a723158207812a344554e2508bb5d9724fc29770583005139343b267f557d651e48bac24f64736f6c634300050b0032",
  "sourceMap": "120:3810:52:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;120:3810:52;;;;;;;",
  "deployedSourceMap": "120:3810:52:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3385:9;;:139;;-1:-1:-1;;;3385:139:52;;3420:4;3385:139;;;;;;-1:-1:-1;3438:7:52;;-1:-1:-1;;;;;;3438:7:52;3385:139;;;;;;3481:9;3385:139;;;;;;3504:10;3385:139;;;;;;;;;;;;;3459:8;3385:139;;;;;;-1:-1:-1;;;;;;;3385:9:52;;:21;;3420:4;3438:7;;-1:-1:-1;;3459:8:52;;3481:9;3504:10;3385:139;;;;-1:-1:-1;3459:8:52;;-1:-1:-1;3385:139:52;1:33:-1;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;3385:139:52;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3385:139:52;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3385:139:52;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3385:139:52;;-1:-1:-1;3641:14:52;3638:1;;3622:34;3731:1;3728;3712:14;3709:1;3699:8;3694:3;3683:50;3767:16;3764:1;3761;3746:38;3804:6;3823:36;;;;3892:16;3889:1;3881:28;3823:36;3841:16;3838:1;3831:27;242:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;242:22:52;;;:::i;:::-;;;;-1:-1:-1;;;;;242:22:52;;;;;;;;;;;;;;2301:603;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2301:603:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;2301:603:52;;;;;;;;;;;;;;;21:11:-1;5:28;;2:2;;;46:1;43;36:12;2:2;2301:603:52;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;2301:603:52;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;2301:603:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;2301:603:52;;-1:-1:-1;;2301:603:52;;;-1:-1:-1;2301:603:52;;-1:-1:-1;;2301:603:52:i;:::-;;1601:694;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1601:694:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1601:694:52;;;;;;;;;;;;;;;;;;;:::i;2910:101::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2910:101:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;2910:101:52;;;;;;;;;;;;;;;21:11:-1;5:28;;2:2;;;46:1;43;36:12;2:2;2910:101:52;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;2910:101:52;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;2910:101:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;2910:101:52;;-1:-1:-1;2910:101:52;;-1:-1:-1;;;;;2910:101:52:i;134:34:51:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;134:34:51;;;:::i;:::-;;;;;;;;;;;;;;;;99:29;;8:9:-1;5:2;;;30:1;27;20:12;5:2;99:29:51;;;:::i;210:26:52:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;210:26:52;;;:::i;156:20::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;156:20:52;;;:::i;3017:304::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3017:304:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3017:304:52;;-1:-1:-1;;;;;;3017:304:52;;;;;-1:-1:-1;;;;;3017:304:52;;:::i;842:221::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;842:221:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;842:221:52;-1:-1:-1;;;;;842:221:52;;:::i;1069:253::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1069:253:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1069:253:52;-1:-1:-1;;;;;1069:253:52;;:::i;1328:267::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1328:267:52;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1328:267:52;-1:-1:-1;;;;;1328:267:52;;:::i;270:26::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;270:26:52;;;:::i;:::-;;;;;;;;;;;;;;;;;;;182:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;182:22:52;;;:::i;242:::-;;;-1:-1:-1;;;;;242:22:52;;:::o;2301:603::-;2449:7;;:158;;-1:-1:-1;;;2449:158:52;;2485:4;2449:158;;;;;;2514:10;2449:158;;;;;;-1:-1:-1;;;;;2449:158:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;:7;;;;;:18;;2514:10;;2543:3;;2564:5;;2587:6;;2449:158;;;;;;;;;;;:7;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2449:158:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2449:158:52;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2449:158:52;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2449:158:52;2428:245;;;;-1:-1:-1;;;2428:245:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2743:12;2761:3;-1:-1:-1;;;;;2761:8:52;2776:6;2784:5;2761:29;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;2761:29:52;;;;;;;;;;;;;;;;;;;;;;;;;14:1:-1;21;16:31;;;;75:4;69:11;64:16;;144:4;140:9;133:4;115:16;111:27;107:43;104:1;100:51;94:4;87:65;169:16;166:1;159:27;225:16;222:1;215:4;212:1;208:12;193:49;7:242;;16:31;36:4;31:9;;7:242;;2742:48:52;;;2808:7;2800:42;;;;;-1:-1:-1;;;2800:42:52;;;;;;;;;;;;-1:-1:-1;;;2800:42:52;;;;;;;;;;;;;;;2878:3;-1:-1:-1;;;;;2857:40:52;2866:10;-1:-1:-1;;;;;2857:40:52;;2883:5;2890:6;2857:40;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2857:40:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2301:603;;;;:::o;1601:694::-;1751:5;;-1:-1:-1;;;;;1751:5:52;:19;1730:84;;;;;-1:-1:-1;;;1730:84:52;;;;;;;;;;;;-1:-1:-1;;;1730:84:52;;;;;;;;;;;;;;;-1:-1:-1;;;;;1846:20:52;;1825:87;;;;;-1:-1:-1;;;1825:87:52;;;;;;;;;;;;-1:-1:-1;;;1825:87:52;;;;;;;;;;;;;;;-1:-1:-1;;;;;1944:31:52;;1923:99;;;;;-1:-1:-1;;;1923:99:52;;;;;;;;;;;;-1:-1:-1;;;1923:99:52;;;;;;;;;;;;;;;-1:-1:-1;;;;;2054:33:52;;2033:104;;;;;-1:-1:-1;;;2033:104:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;2148:5;:14;;-1:-1:-1;;;;;;2148:14:52;;;-1:-1:-1;;;;;2148:14:52;;;;;;;2172:9;:22;;;;;;;;;;;;;;2204:7;:18;;;;;;;;;;;;2232:7;:20;;2242:10;2232:20;;;;;;-1:-1:-1;;;;2262:26:52;-1:-1:-1;;;2284:3:52;2262:26;;;;;;1601:694::o;2910:101::-;2977:27;2990:3;2995:5;3002:1;2977:12;:27::i;:::-;2910:101;;:::o;134:34:51:-;167:1;134:34;:::o;99:29::-;;;-1:-1:-1;;;;;99:29:51;;:::o;210:26:52:-;;;-1:-1:-1;;;;;210:26:52;;:::o;156:20::-;;;-1:-1:-1;;;;;156:20:52;;:::o;3017:304::-;3112:9;;3136:168;;;3237:4;3136:168;;;;-1:-1:-1;;;;;;3136:168:52;;;;;;-1:-1:-1;;;;;3136:168:52;;;;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;3136:168:52;;;;;;;;25:18:-1;;61:17;;-1:-1;;;;;182:15;-1:-1;;;179:29;160:49;;3083:231:52;;3112:9;;;;;3083:7;:231::i;842:221::-;734:10;756:4;734:27;713:105;;;;;-1:-1:-1;;;713:105:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;926:20:52;;905:91;;;;;-1:-1:-1;;;905:91:52;;;;;;;;;;;;-1:-1:-1;;;905:91:52;;;;;;;;;;;;;;;1007:5;:14;;-1:-1:-1;;;;;;1007:14:52;-1:-1:-1;;;;;1007:14:52;;;;;;;;1036:20;;;;-1:-1:-1;;1036:20:52;842:221;:::o;1069:253::-;734:10;756:4;734:27;713:105;;;;;-1:-1:-1;;;713:105:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1157:31:52;;1136:102;;;;;-1:-1:-1;;;1136:102:52;;;;;;;;;;;;-1:-1:-1;;;1136:102:52;;;;;;;;;;;;;;;1249:7;:18;;-1:-1:-1;;;;;;1249:18:52;-1:-1:-1;;;;;1249:18:52;;;;;;;;1282:33;;;;-1:-1:-1;;1282:33:52;1069:253;:::o;1328:267::-;734:10;756:4;734:27;713:105;;;;;-1:-1:-1;;;713:105:52;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1422:33:52;;1401:104;;;;;-1:-1:-1;;;1401:104:52;;;;;;;;;;;;-1:-1:-1;;;1401:104:52;;;;;;;;;;;;;;;1516:9;:22;;-1:-1:-1;;;;;;1516:22:52;-1:-1:-1;;;;;1516:22:52;;;;;;;;1553:35;;;;-1:-1:-1;;1553:35:52;1328:267;:::o;270:26::-;;;-1:-1:-1;;;270:26:52;;;;;:::o;182:22::-;;;-1:-1:-1;;;;;182:22:52;;:::o",
  "source": "pragma solidity ^0.5.8;\n\nimport \"./delegates/Delegates.sol\";\nimport \"./modules/Modules.sol\";\nimport \"./ProxyData.sol\";\n\ncontract Wallet is ProxyData {\n\n    address public owner;\n    Modules public modules;\n    Delegates public delegates;\n    address public creator;\n    uint64 public creationTime;\n\n    event Received(\n        address indexed sender,\n        bytes data,\n        uint value\n    );\n\n    event Executed(\n        address indexed sender,\n        address indexed to,\n        bytes data,\n        uint value\n    );\n\n    event OwnerChanged(address indexed owner);\n\n    event ModulesChanged(address indexed modules);\n\n    event DelegatesChanged(address indexed delegates);\n\n    modifier onlySelf {\n        require(\n            msg.sender == address(this),\n            \"must be called by this contract\"\n        );\n        _;\n    }\n\n    function changeOwner(address _owner) public onlySelf {\n        require(\n            _owner != address(0),\n            \"Address must not be null\"\n        );\n\n        owner = _owner;\n        emit OwnerChanged(_owner);\n    }\n\n    function changeModules(Modules _modules) public onlySelf {\n        require(\n            address(_modules) != address(0),\n            \"Address must not be null\"\n        );\n\n        modules = _modules;\n        emit ModulesChanged(address(_modules));\n    }\n\n    function changeDelegates(Delegates _delegates) public onlySelf {\n        require(\n            address(_delegates) != address(0),\n            \"Address must not be null\"\n        );\n\n        delegates = _delegates;\n        emit ModulesChanged(address(_delegates));\n    }\n\n    function init(\n        address _owner,\n        Delegates _delegates,\n        Modules _modules\n    )\n        public\n    {\n        require(\n            owner == address(0),\n            \"can only init once\"\n        );\n\n        require(\n            _owner != address(0),\n            \"owner cannot be null\"\n        );\n\n        require(\n            address(_modules) != address(0),\n            \"modules canot be null\"\n        );\n\n        require(\n            address(_delegates) != address(0),\n            \"delegates cannot be null\"\n        );\n\n        owner = _owner;\n        delegates = _delegates;\n        modules = _modules;\n        creator = msg.sender;\n        creationTime = uint64(now);\n    }\n\n    function executeValue(\n        address _to,\n        bytes memory _data,\n        uint _value\n    )\n        public\n    {\n        require(\n            modules.canExecute(\n                this,\n                Module(msg.sender),\n                _to,\n                _data,\n                _value\n            ),\n            \"sender not authorised for this operation\"\n        );\n        // solium-disable-next-line security/no-call-value\n        (bool success, ) = _to.call.value(_value)(_data);\n        require(success, \"execution unsuccessful\");\n        emit Executed(msg.sender, _to, _data, _value);\n    }\n\n    function execute(address _to, bytes memory _data) public {\n        executeValue(_to, _data, 0);\n    }\n\n    function register(bytes4 _function, address _to) public {\n        execute(\n            address(delegates),\n            abi.encodeWithSignature(\n                \"register(address,bytes4,address)\",\n                address(this),\n                _function,\n                _to\n            )\n        );\n    }\n\n    function () external payable {\n        address delegate = delegates.getDelegate(\n            this,\n            msg.sig,\n            msg.data,\n            msg.value,\n            msg.sender\n        );\n\n        // solium-disable-next-line security/no-inline-assembly\n        assembly {\n            calldatacopy(0, 0, calldatasize())\n            let result := staticcall(gas, delegate, 0, calldatasize(), 0, 0)\n            returndatacopy(0, 0, returndatasize())\n            switch result\n            case 0 {revert(0, returndatasize())}\n            default {return (0, returndatasize())}\n        }\n\n    }\n\n}",
  "sourcePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Wallet.sol",
  "ast": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Wallet.sol",
    "exportedSymbols": {
      "Wallet": [
        11514
      ]
    },
    "id": 11515,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 11193,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".8"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/delegates/Delegates.sol",
        "file": "./delegates/Delegates.sol",
        "id": 11194,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 12110,
        "src": "25:35:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/modules/Modules.sol",
        "file": "./modules/Modules.sol",
        "id": 11195,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 15055,
        "src": "61:31:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol",
        "file": "./ProxyData.sol",
        "id": 11196,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 11192,
        "src": "93:25:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11197,
              "name": "ProxyData",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 11191,
              "src": "139:9:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ProxyData_$11191",
                "typeString": "contract ProxyData"
              }
            },
            "id": 11198,
            "nodeType": "InheritanceSpecifier",
            "src": "139:9:52"
          }
        ],
        "contractDependencies": [
          11191,
          12185
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 11514,
        "linearizedBaseContracts": [
          11514,
          11191,
          12185
        ],
        "name": "Wallet",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 11200,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "156:20:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 11199,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "156:7:52",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11202,
            "name": "modules",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "182:22:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Modules_$15054",
              "typeString": "contract Modules"
            },
            "typeName": {
              "contractScope": null,
              "id": 11201,
              "name": "Modules",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 15054,
              "src": "182:7:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Modules_$15054",
                "typeString": "contract Modules"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11204,
            "name": "delegates",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "210:26:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Delegates_$12109",
              "typeString": "contract Delegates"
            },
            "typeName": {
              "contractScope": null,
              "id": 11203,
              "name": "Delegates",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 12109,
              "src": "210:9:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Delegates_$12109",
                "typeString": "contract Delegates"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11206,
            "name": "creator",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "242:22:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 11205,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "242:7:52",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11208,
            "name": "creationTime",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "270:26:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint64",
              "typeString": "uint64"
            },
            "typeName": {
              "id": 11207,
              "name": "uint64",
              "nodeType": "ElementaryTypeName",
              "src": "270:6:52",
              "typeDescriptions": {
                "typeIdentifier": "t_uint64",
                "typeString": "uint64"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11216,
            "name": "Received",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11210,
                  "indexed": true,
                  "name": "sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "327:22:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11209,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "327:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11212,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "359:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11211,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "359:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11214,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "379:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11213,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "379:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:78:52"
            },
            "src": "303:93:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11226,
            "name": "Executed",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11225,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11218,
                  "indexed": true,
                  "name": "sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "426:22:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11217,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "426:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11220,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "458:18:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11219,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "458:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11222,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "486:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11221,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "486:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11224,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "506:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11223,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "506:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "416:106:52"
            },
            "src": "402:121:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11230,
            "name": "OwnerChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11228,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11230,
                  "src": "548:21:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11227,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "548:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "547:23:52"
            },
            "src": "529:42:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11234,
            "name": "ModulesChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11232,
                  "indexed": true,
                  "name": "modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11234,
                  "src": "598:23:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11231,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "598:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "597:25:52"
            },
            "src": "577:46:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11238,
            "name": "DelegatesChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11237,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11236,
                  "indexed": true,
                  "name": "delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11238,
                  "src": "652:25:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11235,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "652:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "651:27:52"
            },
            "src": "629:50:52"
          },
          {
            "body": {
              "id": 11251,
              "nodeType": "Block",
              "src": "703:133:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 11246,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11241,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19404,
                            "src": "734:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 11242,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "734:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11244,
                              "name": "this",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 19572,
                              "src": "756:4:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Wallet_$11514",
                                "typeString": "contract Wallet"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Wallet_$11514",
                                "typeString": "contract Wallet"
                              }
                            ],
                            "id": 11243,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "748:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11245,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "748:13:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "734:27:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6d7573742062652063616c6c6564206279207468697320636f6e7472616374",
                        "id": 11247,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "775:33:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_de64155b09c40da513d3b23a821946a5c2404b7f9a4f685ff9f5309147ec45cc",
                          "typeString": "literal_string \"must be called by this contract\""
                        },
                        "value": "must be called by this contract"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_de64155b09c40da513d3b23a821946a5c2404b7f9a4f685ff9f5309147ec45cc",
                          "typeString": "literal_string \"must be called by this contract\""
                        }
                      ],
                      "id": 11240,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "713:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11248,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "713:105:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11249,
                  "nodeType": "ExpressionStatement",
                  "src": "713:105:52"
                },
                {
                  "id": 11250,
                  "nodeType": "PlaceholderStatement",
                  "src": "828:1:52"
                }
              ]
            },
            "documentation": null,
            "id": 11252,
            "name": "onlySelf",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 11239,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "703:0:52"
            },
            "src": "685:151:52",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 11276,
              "nodeType": "Block",
              "src": "895:168:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11264,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11260,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11254,
                          "src": "926:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11262,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "944:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11261,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "936:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11263,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "936:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "926:20:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11265,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "960:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11259,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "905:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11266,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "905:91:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11267,
                  "nodeType": "ExpressionStatement",
                  "src": "905:91:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11270,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11268,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11200,
                      "src": "1007:5:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11269,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11254,
                      "src": "1015:6:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1007:14:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11271,
                  "nodeType": "ExpressionStatement",
                  "src": "1007:14:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11273,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11254,
                        "src": "1049:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11272,
                      "name": "OwnerChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11230,
                      "src": "1036:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11274,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1036:20:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11275,
                  "nodeType": "EmitStatement",
                  "src": "1031:25:52"
                }
              ]
            },
            "documentation": null,
            "id": 11277,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11257,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11256,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "886:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "886:8:52"
              }
            ],
            "name": "changeOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11255,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11254,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11277,
                  "src": "863:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11253,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "863:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "862:16:52"
            },
            "returnParameters": {
              "id": 11258,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "895:0:52"
            },
            "scope": 11514,
            "src": "842:221:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11305,
              "nodeType": "Block",
              "src": "1126:196:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11291,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11286,
                              "name": "_modules",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11279,
                              "src": "1165:8:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            ],
                            "id": 11285,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1157:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11287,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1157:17:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11289,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1186:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11288,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1178:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1178:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1157:31:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11292,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1202:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11284,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1136:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11293,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1136:102:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11294,
                  "nodeType": "ExpressionStatement",
                  "src": "1136:102:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11297,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11295,
                      "name": "modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11202,
                      "src": "1249:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11296,
                      "name": "_modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11279,
                      "src": "1259:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "src": "1249:18:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "id": 11298,
                  "nodeType": "ExpressionStatement",
                  "src": "1249:18:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11301,
                            "name": "_modules",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11279,
                            "src": "1305:8:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          ],
                          "id": 11300,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1297:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11302,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1297:17:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11299,
                      "name": "ModulesChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11234,
                      "src": "1282:14:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1282:33:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11304,
                  "nodeType": "EmitStatement",
                  "src": "1277:38:52"
                }
              ]
            },
            "documentation": null,
            "id": 11306,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11282,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11281,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "1117:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1117:8:52"
              }
            ],
            "name": "changeModules",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11280,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11279,
                  "name": "_modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11306,
                  "src": "1092:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Modules_$15054",
                    "typeString": "contract Modules"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11278,
                    "name": "Modules",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 15054,
                    "src": "1092:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1091:18:52"
            },
            "returnParameters": {
              "id": 11283,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1126:0:52"
            },
            "scope": 11514,
            "src": "1069:253:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11334,
              "nodeType": "Block",
              "src": "1391:204:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11320,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11315,
                              "name": "_delegates",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11308,
                              "src": "1430:10:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            ],
                            "id": 11314,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1422:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1422:19:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11318,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1453:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11317,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1445:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11319,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1445:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1422:33:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11321,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1469:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11313,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1401:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11322,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1401:104:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11323,
                  "nodeType": "ExpressionStatement",
                  "src": "1401:104:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11326,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11324,
                      "name": "delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11204,
                      "src": "1516:9:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11325,
                      "name": "_delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11308,
                      "src": "1528:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "src": "1516:22:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "id": 11327,
                  "nodeType": "ExpressionStatement",
                  "src": "1516:22:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11330,
                            "name": "_delegates",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11308,
                            "src": "1576:10:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          ],
                          "id": 11329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1568:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1568:19:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11328,
                      "name": "ModulesChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11234,
                      "src": "1553:14:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1553:35:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11333,
                  "nodeType": "EmitStatement",
                  "src": "1548:40:52"
                }
              ]
            },
            "documentation": null,
            "id": 11335,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11311,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11310,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "1382:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1382:8:52"
              }
            ],
            "name": "changeDelegates",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11309,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11308,
                  "name": "_delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11335,
                  "src": "1353:20:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Delegates_$12109",
                    "typeString": "contract Delegates"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11307,
                    "name": "Delegates",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 12109,
                    "src": "1353:9:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1352:22:52"
            },
            "returnParameters": {
              "id": 11312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1391:0:52"
            },
            "scope": 11514,
            "src": "1328:267:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11407,
              "nodeType": "Block",
              "src": "1720:575:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11349,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11345,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11200,
                          "src": "1751:5:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11347,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1768:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11346,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1760:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11348,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1760:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1751:19:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "63616e206f6e6c7920696e6974206f6e6365",
                        "id": 11350,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1784:20:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_8314bb00638e54d877439f0802995690a98b24589f6dc3915b079febda181983",
                          "typeString": "literal_string \"can only init once\""
                        },
                        "value": "can only init once"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_8314bb00638e54d877439f0802995690a98b24589f6dc3915b079febda181983",
                          "typeString": "literal_string \"can only init once\""
                        }
                      ],
                      "id": 11344,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1730:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11351,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1730:84:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11352,
                  "nodeType": "ExpressionStatement",
                  "src": "1730:84:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11354,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11337,
                          "src": "1846:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11356,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1864:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11355,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1856:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11357,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1856:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1846:20:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6f776e65722063616e6e6f74206265206e756c6c",
                        "id": 11359,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1880:22:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_32c14e1e1071af95036b30423c5cf6a2fade0c8e5e4e6f4550385e9724a0abb9",
                          "typeString": "literal_string \"owner cannot be null\""
                        },
                        "value": "owner cannot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_32c14e1e1071af95036b30423c5cf6a2fade0c8e5e4e6f4550385e9724a0abb9",
                          "typeString": "literal_string \"owner cannot be null\""
                        }
                      ],
                      "id": 11353,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1825:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11360,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1825:87:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11361,
                  "nodeType": "ExpressionStatement",
                  "src": "1825:87:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11369,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11364,
                              "name": "_modules",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11341,
                              "src": "1952:8:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            ],
                            "id": 11363,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1944:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11365,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1944:17:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11367,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1973:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11366,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1965:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11368,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1965:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1944:31:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6d6f64756c65732063616e6f74206265206e756c6c",
                        "id": 11370,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1989:23:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_e6115559c551c94d8dee065aa473faf632d1b67bc4e2849912bab9b5734cdd99",
                          "typeString": "literal_string \"modules canot be null\""
                        },
                        "value": "modules canot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_e6115559c551c94d8dee065aa473faf632d1b67bc4e2849912bab9b5734cdd99",
                          "typeString": "literal_string \"modules canot be null\""
                        }
                      ],
                      "id": 11362,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1923:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11371,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1923:99:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11372,
                  "nodeType": "ExpressionStatement",
                  "src": "1923:99:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11380,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11375,
                              "name": "_delegates",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11339,
                              "src": "2062:10:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            ],
                            "id": 11374,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2054:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11376,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2054:19:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11378,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2085:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11377,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2077:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11379,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2077:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2054:33:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "64656c6567617465732063616e6e6f74206265206e756c6c",
                        "id": 11381,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2101:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_556759b0007d2c75c27baa67ca952bc76805e68c68cab341d35ee6c29b7dd316",
                          "typeString": "literal_string \"delegates cannot be null\""
                        },
                        "value": "delegates cannot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_556759b0007d2c75c27baa67ca952bc76805e68c68cab341d35ee6c29b7dd316",
                          "typeString": "literal_string \"delegates cannot be null\""
                        }
                      ],
                      "id": 11373,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2033:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11382,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2033:104:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11383,
                  "nodeType": "ExpressionStatement",
                  "src": "2033:104:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11384,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11200,
                      "src": "2148:5:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11385,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11337,
                      "src": "2156:6:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2148:14:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11387,
                  "nodeType": "ExpressionStatement",
                  "src": "2148:14:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11390,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11388,
                      "name": "delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11204,
                      "src": "2172:9:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11389,
                      "name": "_delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11339,
                      "src": "2184:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "src": "2172:22:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "id": 11391,
                  "nodeType": "ExpressionStatement",
                  "src": "2172:22:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11394,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11392,
                      "name": "modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11202,
                      "src": "2204:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11393,
                      "name": "_modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11341,
                      "src": "2214:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "src": "2204:18:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "id": 11395,
                  "nodeType": "ExpressionStatement",
                  "src": "2204:18:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11396,
                      "name": "creator",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11206,
                      "src": "2232:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 11397,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19404,
                        "src": "2242:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 11398,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2242:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "2232:20:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11400,
                  "nodeType": "ExpressionStatement",
                  "src": "2232:20:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11401,
                      "name": "creationTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11208,
                      "src": "2262:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 11403,
                          "name": "now",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19406,
                          "src": "2284:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 11402,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "2277:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_uint64_$",
                          "typeString": "type(uint64)"
                        },
                        "typeName": "uint64"
                      },
                      "id": 11404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2277:11:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "src": "2262:26:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "id": 11406,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:26:52"
                }
              ]
            },
            "documentation": null,
            "id": 11408,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "init",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11337,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1624:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11336,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1624:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11339,
                  "name": "_delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1648:20:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Delegates_$12109",
                    "typeString": "contract Delegates"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11338,
                    "name": "Delegates",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 12109,
                    "src": "1648:9:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11341,
                  "name": "_modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1678:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Modules_$15054",
                    "typeString": "contract Modules"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11340,
                    "name": "Modules",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 15054,
                    "src": "1678:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1614:86:52"
            },
            "returnParameters": {
              "id": 11343,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1720:0:52"
            },
            "scope": 11514,
            "src": "1601:694:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11455,
              "nodeType": "Block",
              "src": "2418:486:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11420,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19572,
                            "src": "2485:4:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Wallet_$11514",
                              "typeString": "contract Wallet"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 11422,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 19404,
                                  "src": "2514:3:52",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 11423,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "sender",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "2514:10:52",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              ],
                              "id": 11421,
                              "name": "Module",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 15011,
                              "src": "2507:6:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_Module_$15011_$",
                                "typeString": "type(contract Module)"
                              }
                            },
                            "id": 11424,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2507:18:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Module_$15011",
                              "typeString": "contract Module"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11425,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11410,
                            "src": "2543:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11426,
                            "name": "_data",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11412,
                            "src": "2564:5:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11427,
                            "name": "_value",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11414,
                            "src": "2587:6:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Wallet_$11514",
                              "typeString": "contract Wallet"
                            },
                            {
                              "typeIdentifier": "t_contract$_Module_$15011",
                              "typeString": "contract Module"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 11418,
                            "name": "modules",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11202,
                            "src": "2449:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          },
                          "id": 11419,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "canExecute",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 15030,
                          "src": "2449:18:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_external_nonpayable$_t_contract$_Wallet_$11514_$_t_contract$_Module_$15011_$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bool_$",
                            "typeString": "function (contract Wallet,contract Module,address,bytes memory,uint256) external returns (bool)"
                          }
                        },
                        "id": 11428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2449:158:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "73656e646572206e6f7420617574686f726973656420666f722074686973206f7065726174696f6e",
                        "id": 11429,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2621:42:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c3fa3eca7ea90c73cb6dfeb879a24650a1afb02dbecce09a402b609e76107d02",
                          "typeString": "literal_string \"sender not authorised for this operation\""
                        },
                        "value": "sender not authorised for this operation"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c3fa3eca7ea90c73cb6dfeb879a24650a1afb02dbecce09a402b609e76107d02",
                          "typeString": "literal_string \"sender not authorised for this operation\""
                        }
                      ],
                      "id": 11417,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2428:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11430,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2428:245:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11431,
                  "nodeType": "ExpressionStatement",
                  "src": "2428:245:52"
                },
                {
                  "assignments": [
                    11433,
                    null
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 11433,
                      "name": "success",
                      "nodeType": "VariableDeclaration",
                      "scope": 11455,
                      "src": "2743:12:52",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "typeName": {
                        "id": 11432,
                        "name": "bool",
                        "nodeType": "ElementaryTypeName",
                        "src": "2743:4:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    },
                    null
                  ],
                  "id": 11441,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11439,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11412,
                        "src": "2784:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 11437,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11414,
                          "src": "2776:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11434,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11410,
                            "src": "2761:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "id": 11435,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "call",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2761:8:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) payable returns (bool,bytes memory)"
                          }
                        },
                        "id": 11436,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2761:14:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_setvalue_pure$_t_uint256_$returns$_t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value_$",
                          "typeString": "function (uint256) pure returns (function (bytes memory) payable returns (bool,bytes memory))"
                        }
                      },
                      "id": 11438,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2761:22:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value",
                        "typeString": "function (bytes memory) payable returns (bool,bytes memory)"
                      }
                    },
                    "id": 11440,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2761:29:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_bool_$_t_bytes_memory_ptr_$",
                      "typeString": "tuple(bool,bytes memory)"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2742:48:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11443,
                        "name": "success",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11433,
                        "src": "2808:7:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "657865637574696f6e20756e7375636365737366756c",
                        "id": 11444,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2817:24:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_85f0a38670a5506ad4ef1fae0af252bdfdf456002709a2cd9310d43deea8748d",
                          "typeString": "literal_string \"execution unsuccessful\""
                        },
                        "value": "execution unsuccessful"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_85f0a38670a5506ad4ef1fae0af252bdfdf456002709a2cd9310d43deea8748d",
                          "typeString": "literal_string \"execution unsuccessful\""
                        }
                      ],
                      "id": 11442,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2800:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11445,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2800:42:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11446,
                  "nodeType": "ExpressionStatement",
                  "src": "2800:42:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11448,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "2866:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11449,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2866:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11450,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11410,
                        "src": "2878:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11451,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11412,
                        "src": "2883:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11452,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11414,
                        "src": "2890:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 11447,
                      "name": "Executed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11226,
                      "src": "2857:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,bytes memory,uint256)"
                      }
                    },
                    "id": 11453,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2857:40:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11454,
                  "nodeType": "EmitStatement",
                  "src": "2852:45:52"
                }
              ]
            },
            "documentation": null,
            "id": 11456,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "executeValue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11415,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11410,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2332:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11412,
                  "name": "_data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2353:18:52",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11411,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2353:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11414,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2381:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11413,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2381:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2322:76:52"
            },
            "returnParameters": {
              "id": 11416,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2418:0:52"
            },
            "scope": 11514,
            "src": "2301:603:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11469,
              "nodeType": "Block",
              "src": "2967:44:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11464,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11458,
                        "src": "2990:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11465,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11460,
                        "src": "2995:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "3002:1:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        }
                      ],
                      "id": 11463,
                      "name": "executeValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11456,
                      "src": "2977:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,bytes memory,uint256)"
                      }
                    },
                    "id": 11467,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2977:27:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11468,
                  "nodeType": "ExpressionStatement",
                  "src": "2977:27:52"
                }
              ]
            },
            "documentation": null,
            "id": 11470,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "execute",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11458,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11470,
                  "src": "2927:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11457,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2927:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11460,
                  "name": "_data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11470,
                  "src": "2940:18:52",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11459,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2940:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2926:33:52"
            },
            "returnParameters": {
              "id": 11462,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:52"
            },
            "scope": 11514,
            "src": "2910:101:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11492,
              "nodeType": "Block",
              "src": "3073:248:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11479,
                            "name": "delegates",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11204,
                            "src": "3112:9:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          ],
                          "id": 11478,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "3104:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11480,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3104:18:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "726567697374657228616464726573732c6279746573342c6164647265737329",
                            "id": 11483,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "string",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3177:34:52",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_stringliteral_71a131ddaeac67d6297d1361a81b87952a2c72ac89b7fce1d74af95b050a78a9",
                              "typeString": "literal_string \"register(address,bytes4,address)\""
                            },
                            "value": "register(address,bytes4,address)"
                          },
                          {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 11485,
                                "name": "this",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19572,
                                "src": "3237:4:52",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_Wallet_$11514",
                                  "typeString": "contract Wallet"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_Wallet_$11514",
                                  "typeString": "contract Wallet"
                                }
                              ],
                              "id": 11484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "nodeType": "ElementaryTypeNameExpression",
                              "src": "3229:7:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_address_$",
                                "typeString": "type(address)"
                              },
                              "typeName": "address"
                            },
                            "id": 11486,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "3229:13:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11487,
                            "name": "_function",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11472,
                            "src": "3260:9:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes4",
                              "typeString": "bytes4"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11488,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11474,
                            "src": "3287:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_stringliteral_71a131ddaeac67d6297d1361a81b87952a2c72ac89b7fce1d74af95b050a78a9",
                              "typeString": "literal_string \"register(address,bytes4,address)\""
                            },
                            {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            },
                            {
                              "typeIdentifier": "t_bytes4",
                              "typeString": "bytes4"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 11481,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19391,
                            "src": "3136:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 11482,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodeWithSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3136:23:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodewithsignature_pure$_t_string_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (string memory) pure returns (bytes memory)"
                          }
                        },
                        "id": 11489,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3136:168:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 11477,
                      "name": "execute",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11470,
                      "src": "3083:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (address,bytes memory)"
                      }
                    },
                    "id": 11490,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3083:231:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11491,
                  "nodeType": "ExpressionStatement",
                  "src": "3083:231:52"
                }
              ]
            },
            "documentation": null,
            "id": 11493,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "register",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11475,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11472,
                  "name": "_function",
                  "nodeType": "VariableDeclaration",
                  "scope": 11493,
                  "src": "3035:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 11471,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "3035:6:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11474,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11493,
                  "src": "3053:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11473,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3053:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3034:31:52"
            },
            "returnParameters": {
              "id": 11476,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3073:0:52"
            },
            "scope": 11514,
            "src": "3017:304:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11512,
              "nodeType": "Block",
              "src": "3356:571:52",
              "statements": [
                {
                  "assignments": [
                    11497
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 11497,
                      "name": "delegate",
                      "nodeType": "VariableDeclaration",
                      "scope": 11512,
                      "src": "3366:16:52",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 11496,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "3366:7:52",
                        "stateMutability": "nonpayable",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 11510,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11500,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19572,
                        "src": "3420:4:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Wallet_$11514",
                          "typeString": "contract Wallet"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11501,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3438:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11502,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sig",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3438:7:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11503,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3459:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11504,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "data",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3459:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11505,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3481:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11506,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3481:9:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11507,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3504:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11508,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3504:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_contract$_Wallet_$11514",
                          "typeString": "contract Wallet"
                        },
                        {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        },
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 11498,
                        "name": "delegates",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11204,
                        "src": "3385:9:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Delegates_$12109",
                          "typeString": "contract Delegates"
                        }
                      },
                      "id": 11499,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getDelegate",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 12105,
                      "src": "3385:21:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_contract$_Wallet_$11514_$_t_bytes4_$_t_bytes_memory_ptr_$_t_uint256_$_t_address_$returns$_t_address_$",
                        "typeString": "function (contract Wallet,bytes4,bytes memory,uint256,address) external returns (address)"
                      }
                    },
                    "id": 11509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3385:139:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3366:158:52"
                },
                {
                  "externalReferences": [
                    {
                      "delegate": {
                        "declaration": 11497,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3699:8:52",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 11511,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    calldatacopy(0, 0, calldatasize())\n    let result := staticcall(gas(), delegate, 0, calldatasize(), 0, 0)\n    returndatacopy(0, 0, returndatasize())\n    switch result\n    case 0 { revert(0, returndatasize()) }\n    default { return(0, returndatasize()) }\n}",
                  "src": "3599:321:52"
                }
              ]
            },
            "documentation": null,
            "id": 11513,
            "implemented": true,
            "kind": "fallback",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11494,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3336:2:52"
            },
            "returnParameters": {
              "id": 11495,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3356:0:52"
            },
            "scope": 11514,
            "src": "3327:600:52",
            "stateMutability": "payable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 11515,
        "src": "120:3810:52"
      }
    ],
    "src": "0:3930:52"
  },
  "legacyAST": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Wallet.sol",
    "exportedSymbols": {
      "Wallet": [
        11514
      ]
    },
    "id": 11515,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 11193,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".8"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/delegates/Delegates.sol",
        "file": "./delegates/Delegates.sol",
        "id": 11194,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 12110,
        "src": "25:35:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/modules/Modules.sol",
        "file": "./modules/Modules.sol",
        "id": 11195,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 15055,
        "src": "61:31:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol",
        "file": "./ProxyData.sol",
        "id": 11196,
        "nodeType": "ImportDirective",
        "scope": 11515,
        "sourceUnit": 11192,
        "src": "93:25:52",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11197,
              "name": "ProxyData",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 11191,
              "src": "139:9:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ProxyData_$11191",
                "typeString": "contract ProxyData"
              }
            },
            "id": 11198,
            "nodeType": "InheritanceSpecifier",
            "src": "139:9:52"
          }
        ],
        "contractDependencies": [
          11191,
          12185
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 11514,
        "linearizedBaseContracts": [
          11514,
          11191,
          12185
        ],
        "name": "Wallet",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 11200,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "156:20:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 11199,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "156:7:52",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11202,
            "name": "modules",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "182:22:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Modules_$15054",
              "typeString": "contract Modules"
            },
            "typeName": {
              "contractScope": null,
              "id": 11201,
              "name": "Modules",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 15054,
              "src": "182:7:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Modules_$15054",
                "typeString": "contract Modules"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11204,
            "name": "delegates",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "210:26:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Delegates_$12109",
              "typeString": "contract Delegates"
            },
            "typeName": {
              "contractScope": null,
              "id": 11203,
              "name": "Delegates",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 12109,
              "src": "210:9:52",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Delegates_$12109",
                "typeString": "contract Delegates"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11206,
            "name": "creator",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "242:22:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 11205,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "242:7:52",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 11208,
            "name": "creationTime",
            "nodeType": "VariableDeclaration",
            "scope": 11514,
            "src": "270:26:52",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint64",
              "typeString": "uint64"
            },
            "typeName": {
              "id": 11207,
              "name": "uint64",
              "nodeType": "ElementaryTypeName",
              "src": "270:6:52",
              "typeDescriptions": {
                "typeIdentifier": "t_uint64",
                "typeString": "uint64"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11216,
            "name": "Received",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11215,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11210,
                  "indexed": true,
                  "name": "sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "327:22:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11209,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "327:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11212,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "359:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11211,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "359:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11214,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11216,
                  "src": "379:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11213,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "379:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:78:52"
            },
            "src": "303:93:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11226,
            "name": "Executed",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11225,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11218,
                  "indexed": true,
                  "name": "sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "426:22:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11217,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "426:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11220,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "458:18:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11219,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "458:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11222,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "486:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11221,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "486:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11224,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11226,
                  "src": "506:10:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11223,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "506:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "416:106:52"
            },
            "src": "402:121:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11230,
            "name": "OwnerChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11229,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11228,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11230,
                  "src": "548:21:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11227,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "548:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "547:23:52"
            },
            "src": "529:42:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11234,
            "name": "ModulesChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11232,
                  "indexed": true,
                  "name": "modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11234,
                  "src": "598:23:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11231,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "598:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "597:25:52"
            },
            "src": "577:46:52"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 11238,
            "name": "DelegatesChanged",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11237,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11236,
                  "indexed": true,
                  "name": "delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11238,
                  "src": "652:25:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11235,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "652:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "651:27:52"
            },
            "src": "629:50:52"
          },
          {
            "body": {
              "id": 11251,
              "nodeType": "Block",
              "src": "703:133:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 11246,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11241,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19404,
                            "src": "734:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 11242,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "734:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11244,
                              "name": "this",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 19572,
                              "src": "756:4:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Wallet_$11514",
                                "typeString": "contract Wallet"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Wallet_$11514",
                                "typeString": "contract Wallet"
                              }
                            ],
                            "id": 11243,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "748:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11245,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "748:13:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "734:27:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6d7573742062652063616c6c6564206279207468697320636f6e7472616374",
                        "id": 11247,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "775:33:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_de64155b09c40da513d3b23a821946a5c2404b7f9a4f685ff9f5309147ec45cc",
                          "typeString": "literal_string \"must be called by this contract\""
                        },
                        "value": "must be called by this contract"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_de64155b09c40da513d3b23a821946a5c2404b7f9a4f685ff9f5309147ec45cc",
                          "typeString": "literal_string \"must be called by this contract\""
                        }
                      ],
                      "id": 11240,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "713:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11248,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "713:105:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11249,
                  "nodeType": "ExpressionStatement",
                  "src": "713:105:52"
                },
                {
                  "id": 11250,
                  "nodeType": "PlaceholderStatement",
                  "src": "828:1:52"
                }
              ]
            },
            "documentation": null,
            "id": 11252,
            "name": "onlySelf",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 11239,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "703:0:52"
            },
            "src": "685:151:52",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 11276,
              "nodeType": "Block",
              "src": "895:168:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11264,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11260,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11254,
                          "src": "926:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11262,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "944:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11261,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "936:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11263,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "936:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "926:20:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11265,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "960:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11259,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "905:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11266,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "905:91:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11267,
                  "nodeType": "ExpressionStatement",
                  "src": "905:91:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11270,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11268,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11200,
                      "src": "1007:5:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11269,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11254,
                      "src": "1015:6:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1007:14:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11271,
                  "nodeType": "ExpressionStatement",
                  "src": "1007:14:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11273,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11254,
                        "src": "1049:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11272,
                      "name": "OwnerChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11230,
                      "src": "1036:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11274,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1036:20:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11275,
                  "nodeType": "EmitStatement",
                  "src": "1031:25:52"
                }
              ]
            },
            "documentation": null,
            "id": 11277,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11257,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11256,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "886:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "886:8:52"
              }
            ],
            "name": "changeOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11255,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11254,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11277,
                  "src": "863:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11253,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "863:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "862:16:52"
            },
            "returnParameters": {
              "id": 11258,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "895:0:52"
            },
            "scope": 11514,
            "src": "842:221:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11305,
              "nodeType": "Block",
              "src": "1126:196:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11291,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11286,
                              "name": "_modules",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11279,
                              "src": "1165:8:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            ],
                            "id": 11285,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1157:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11287,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1157:17:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11289,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1186:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11288,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1178:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1178:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1157:31:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11292,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1202:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11284,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1136:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11293,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1136:102:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11294,
                  "nodeType": "ExpressionStatement",
                  "src": "1136:102:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11297,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11295,
                      "name": "modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11202,
                      "src": "1249:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11296,
                      "name": "_modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11279,
                      "src": "1259:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "src": "1249:18:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "id": 11298,
                  "nodeType": "ExpressionStatement",
                  "src": "1249:18:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11301,
                            "name": "_modules",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11279,
                            "src": "1305:8:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          ],
                          "id": 11300,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1297:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11302,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1297:17:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11299,
                      "name": "ModulesChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11234,
                      "src": "1282:14:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1282:33:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11304,
                  "nodeType": "EmitStatement",
                  "src": "1277:38:52"
                }
              ]
            },
            "documentation": null,
            "id": 11306,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11282,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11281,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "1117:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1117:8:52"
              }
            ],
            "name": "changeModules",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11280,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11279,
                  "name": "_modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11306,
                  "src": "1092:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Modules_$15054",
                    "typeString": "contract Modules"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11278,
                    "name": "Modules",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 15054,
                    "src": "1092:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1091:18:52"
            },
            "returnParameters": {
              "id": 11283,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1126:0:52"
            },
            "scope": 11514,
            "src": "1069:253:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11334,
              "nodeType": "Block",
              "src": "1391:204:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11320,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11315,
                              "name": "_delegates",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11308,
                              "src": "1430:10:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            ],
                            "id": 11314,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1422:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1422:19:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11318,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1453:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11317,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1445:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11319,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1445:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1422:33:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "41646472657373206d757374206e6f74206265206e756c6c",
                        "id": 11321,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1469:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        },
                        "value": "Address must not be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_efa97faf3b0368129c44f4cf69c12860276770594503b530a5dea986d12f7144",
                          "typeString": "literal_string \"Address must not be null\""
                        }
                      ],
                      "id": 11313,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1401:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11322,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1401:104:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11323,
                  "nodeType": "ExpressionStatement",
                  "src": "1401:104:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11326,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11324,
                      "name": "delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11204,
                      "src": "1516:9:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11325,
                      "name": "_delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11308,
                      "src": "1528:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "src": "1516:22:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "id": 11327,
                  "nodeType": "ExpressionStatement",
                  "src": "1516:22:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11330,
                            "name": "_delegates",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11308,
                            "src": "1576:10:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          ],
                          "id": 11329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1568:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1568:19:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 11328,
                      "name": "ModulesChanged",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11234,
                      "src": "1553:14:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 11332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1553:35:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11333,
                  "nodeType": "EmitStatement",
                  "src": "1548:40:52"
                }
              ]
            },
            "documentation": null,
            "id": 11335,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 11311,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 11310,
                  "name": "onlySelf",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 11252,
                  "src": "1382:8:52",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1382:8:52"
              }
            ],
            "name": "changeDelegates",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11309,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11308,
                  "name": "_delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11335,
                  "src": "1353:20:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Delegates_$12109",
                    "typeString": "contract Delegates"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11307,
                    "name": "Delegates",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 12109,
                    "src": "1353:9:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1352:22:52"
            },
            "returnParameters": {
              "id": 11312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1391:0:52"
            },
            "scope": 11514,
            "src": "1328:267:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11407,
              "nodeType": "Block",
              "src": "1720:575:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11349,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11345,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11200,
                          "src": "1751:5:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11347,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1768:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11346,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1760:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11348,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1760:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1751:19:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "63616e206f6e6c7920696e6974206f6e6365",
                        "id": 11350,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1784:20:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_8314bb00638e54d877439f0802995690a98b24589f6dc3915b079febda181983",
                          "typeString": "literal_string \"can only init once\""
                        },
                        "value": "can only init once"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_8314bb00638e54d877439f0802995690a98b24589f6dc3915b079febda181983",
                          "typeString": "literal_string \"can only init once\""
                        }
                      ],
                      "id": 11344,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1730:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11351,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1730:84:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11352,
                  "nodeType": "ExpressionStatement",
                  "src": "1730:84:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11354,
                          "name": "_owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11337,
                          "src": "1846:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11356,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1864:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11355,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1856:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11357,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1856:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1846:20:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6f776e65722063616e6e6f74206265206e756c6c",
                        "id": 11359,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1880:22:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_32c14e1e1071af95036b30423c5cf6a2fade0c8e5e4e6f4550385e9724a0abb9",
                          "typeString": "literal_string \"owner cannot be null\""
                        },
                        "value": "owner cannot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_32c14e1e1071af95036b30423c5cf6a2fade0c8e5e4e6f4550385e9724a0abb9",
                          "typeString": "literal_string \"owner cannot be null\""
                        }
                      ],
                      "id": 11353,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1825:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11360,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1825:87:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11361,
                  "nodeType": "ExpressionStatement",
                  "src": "1825:87:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11369,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11364,
                              "name": "_modules",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11341,
                              "src": "1952:8:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Modules_$15054",
                                "typeString": "contract Modules"
                              }
                            ],
                            "id": 11363,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1944:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11365,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1944:17:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11367,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1973:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11366,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1965:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11368,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1965:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1944:31:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6d6f64756c65732063616e6f74206265206e756c6c",
                        "id": 11370,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1989:23:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_e6115559c551c94d8dee065aa473faf632d1b67bc4e2849912bab9b5734cdd99",
                          "typeString": "literal_string \"modules canot be null\""
                        },
                        "value": "modules canot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_e6115559c551c94d8dee065aa473faf632d1b67bc4e2849912bab9b5734cdd99",
                          "typeString": "literal_string \"modules canot be null\""
                        }
                      ],
                      "id": 11362,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "1923:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11371,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1923:99:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11372,
                  "nodeType": "ExpressionStatement",
                  "src": "1923:99:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 11380,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 11375,
                              "name": "_delegates",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 11339,
                              "src": "2062:10:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_contract$_Delegates_$12109",
                                "typeString": "contract Delegates"
                              }
                            ],
                            "id": 11374,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2054:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11376,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2054:19:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 11378,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2085:1:52",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 11377,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2077:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11379,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2077:10:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2054:33:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "64656c6567617465732063616e6e6f74206265206e756c6c",
                        "id": 11381,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2101:26:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_556759b0007d2c75c27baa67ca952bc76805e68c68cab341d35ee6c29b7dd316",
                          "typeString": "literal_string \"delegates cannot be null\""
                        },
                        "value": "delegates cannot be null"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_556759b0007d2c75c27baa67ca952bc76805e68c68cab341d35ee6c29b7dd316",
                          "typeString": "literal_string \"delegates cannot be null\""
                        }
                      ],
                      "id": 11373,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2033:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11382,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2033:104:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11383,
                  "nodeType": "ExpressionStatement",
                  "src": "2033:104:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11384,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11200,
                      "src": "2148:5:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11385,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11337,
                      "src": "2156:6:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2148:14:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11387,
                  "nodeType": "ExpressionStatement",
                  "src": "2148:14:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11390,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11388,
                      "name": "delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11204,
                      "src": "2172:9:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11389,
                      "name": "_delegates",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11339,
                      "src": "2184:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Delegates_$12109",
                        "typeString": "contract Delegates"
                      }
                    },
                    "src": "2172:22:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "id": 11391,
                  "nodeType": "ExpressionStatement",
                  "src": "2172:22:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11394,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11392,
                      "name": "modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11202,
                      "src": "2204:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11393,
                      "name": "_modules",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11341,
                      "src": "2214:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Modules_$15054",
                        "typeString": "contract Modules"
                      }
                    },
                    "src": "2204:18:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "id": 11395,
                  "nodeType": "ExpressionStatement",
                  "src": "2204:18:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11396,
                      "name": "creator",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11206,
                      "src": "2232:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 11397,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19404,
                        "src": "2242:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 11398,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2242:10:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "2232:20:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11400,
                  "nodeType": "ExpressionStatement",
                  "src": "2232:20:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11401,
                      "name": "creationTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11208,
                      "src": "2262:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 11403,
                          "name": "now",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19406,
                          "src": "2284:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 11402,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "2277:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_uint64_$",
                          "typeString": "type(uint64)"
                        },
                        "typeName": "uint64"
                      },
                      "id": 11404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2277:11:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint64",
                        "typeString": "uint64"
                      }
                    },
                    "src": "2262:26:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint64",
                      "typeString": "uint64"
                    }
                  },
                  "id": 11406,
                  "nodeType": "ExpressionStatement",
                  "src": "2262:26:52"
                }
              ]
            },
            "documentation": null,
            "id": 11408,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "init",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11337,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1624:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11336,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1624:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11339,
                  "name": "_delegates",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1648:20:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Delegates_$12109",
                    "typeString": "contract Delegates"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11338,
                    "name": "Delegates",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 12109,
                    "src": "1648:9:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Delegates_$12109",
                      "typeString": "contract Delegates"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11341,
                  "name": "_modules",
                  "nodeType": "VariableDeclaration",
                  "scope": 11408,
                  "src": "1678:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Modules_$15054",
                    "typeString": "contract Modules"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 11340,
                    "name": "Modules",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 15054,
                    "src": "1678:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Modules_$15054",
                      "typeString": "contract Modules"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1614:86:52"
            },
            "returnParameters": {
              "id": 11343,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1720:0:52"
            },
            "scope": 11514,
            "src": "1601:694:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11455,
              "nodeType": "Block",
              "src": "2418:486:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11420,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19572,
                            "src": "2485:4:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Wallet_$11514",
                              "typeString": "contract Wallet"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 11422,
                                  "name": "msg",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 19404,
                                  "src": "2514:3:52",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_message",
                                    "typeString": "msg"
                                  }
                                },
                                "id": 11423,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "sender",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "2514:10:52",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                }
                              ],
                              "id": 11421,
                              "name": "Module",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 15011,
                              "src": "2507:6:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_Module_$15011_$",
                                "typeString": "type(contract Module)"
                              }
                            },
                            "id": 11424,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2507:18:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Module_$15011",
                              "typeString": "contract Module"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11425,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11410,
                            "src": "2543:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11426,
                            "name": "_data",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11412,
                            "src": "2564:5:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11427,
                            "name": "_value",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11414,
                            "src": "2587:6:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Wallet_$11514",
                              "typeString": "contract Wallet"
                            },
                            {
                              "typeIdentifier": "t_contract$_Module_$15011",
                              "typeString": "contract Module"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 11418,
                            "name": "modules",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11202,
                            "src": "2449:7:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Modules_$15054",
                              "typeString": "contract Modules"
                            }
                          },
                          "id": 11419,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "canExecute",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 15030,
                          "src": "2449:18:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_external_nonpayable$_t_contract$_Wallet_$11514_$_t_contract$_Module_$15011_$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bool_$",
                            "typeString": "function (contract Wallet,contract Module,address,bytes memory,uint256) external returns (bool)"
                          }
                        },
                        "id": 11428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2449:158:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "73656e646572206e6f7420617574686f726973656420666f722074686973206f7065726174696f6e",
                        "id": 11429,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2621:42:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c3fa3eca7ea90c73cb6dfeb879a24650a1afb02dbecce09a402b609e76107d02",
                          "typeString": "literal_string \"sender not authorised for this operation\""
                        },
                        "value": "sender not authorised for this operation"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c3fa3eca7ea90c73cb6dfeb879a24650a1afb02dbecce09a402b609e76107d02",
                          "typeString": "literal_string \"sender not authorised for this operation\""
                        }
                      ],
                      "id": 11417,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2428:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11430,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2428:245:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11431,
                  "nodeType": "ExpressionStatement",
                  "src": "2428:245:52"
                },
                {
                  "assignments": [
                    11433,
                    null
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 11433,
                      "name": "success",
                      "nodeType": "VariableDeclaration",
                      "scope": 11455,
                      "src": "2743:12:52",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "typeName": {
                        "id": 11432,
                        "name": "bool",
                        "nodeType": "ElementaryTypeName",
                        "src": "2743:4:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    },
                    null
                  ],
                  "id": 11441,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11439,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11412,
                        "src": "2784:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 11437,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11414,
                          "src": "2776:6:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11434,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11410,
                            "src": "2761:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "id": 11435,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "call",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2761:8:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) payable returns (bool,bytes memory)"
                          }
                        },
                        "id": 11436,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2761:14:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_setvalue_pure$_t_uint256_$returns$_t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value_$",
                          "typeString": "function (uint256) pure returns (function (bytes memory) payable returns (bool,bytes memory))"
                        }
                      },
                      "id": 11438,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2761:22:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value",
                        "typeString": "function (bytes memory) payable returns (bool,bytes memory)"
                      }
                    },
                    "id": 11440,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2761:29:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_bool_$_t_bytes_memory_ptr_$",
                      "typeString": "tuple(bool,bytes memory)"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2742:48:52"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11443,
                        "name": "success",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11433,
                        "src": "2808:7:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "657865637574696f6e20756e7375636365737366756c",
                        "id": 11444,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2817:24:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_85f0a38670a5506ad4ef1fae0af252bdfdf456002709a2cd9310d43deea8748d",
                          "typeString": "literal_string \"execution unsuccessful\""
                        },
                        "value": "execution unsuccessful"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_85f0a38670a5506ad4ef1fae0af252bdfdf456002709a2cd9310d43deea8748d",
                          "typeString": "literal_string \"execution unsuccessful\""
                        }
                      ],
                      "id": 11442,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "2800:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11445,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2800:42:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11446,
                  "nodeType": "ExpressionStatement",
                  "src": "2800:42:52"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11448,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "2866:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11449,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2866:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11450,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11410,
                        "src": "2878:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11451,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11412,
                        "src": "2883:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11452,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11414,
                        "src": "2890:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 11447,
                      "name": "Executed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11226,
                      "src": "2857:8:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,bytes memory,uint256)"
                      }
                    },
                    "id": 11453,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2857:40:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11454,
                  "nodeType": "EmitStatement",
                  "src": "2852:45:52"
                }
              ]
            },
            "documentation": null,
            "id": 11456,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "executeValue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11415,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11410,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2332:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2332:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11412,
                  "name": "_data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2353:18:52",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11411,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2353:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11414,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11456,
                  "src": "2381:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11413,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2381:4:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2322:76:52"
            },
            "returnParameters": {
              "id": 11416,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2418:0:52"
            },
            "scope": 11514,
            "src": "2301:603:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11469,
              "nodeType": "Block",
              "src": "2967:44:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11464,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11458,
                        "src": "2990:3:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 11465,
                        "name": "_data",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11460,
                        "src": "2995:5:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "3002:1:52",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        }
                      ],
                      "id": 11463,
                      "name": "executeValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11456,
                      "src": "2977:12:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,bytes memory,uint256)"
                      }
                    },
                    "id": 11467,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2977:27:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11468,
                  "nodeType": "ExpressionStatement",
                  "src": "2977:27:52"
                }
              ]
            },
            "documentation": null,
            "id": 11470,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "execute",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11458,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11470,
                  "src": "2927:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11457,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2927:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11460,
                  "name": "_data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11470,
                  "src": "2940:18:52",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11459,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2940:5:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2926:33:52"
            },
            "returnParameters": {
              "id": 11462,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2967:0:52"
            },
            "scope": 11514,
            "src": "2910:101:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11492,
              "nodeType": "Block",
              "src": "3073:248:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 11479,
                            "name": "delegates",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11204,
                            "src": "3112:9:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Delegates_$12109",
                              "typeString": "contract Delegates"
                            }
                          ],
                          "id": 11478,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "3104:7:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 11480,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3104:18:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "726567697374657228616464726573732c6279746573342c6164647265737329",
                            "id": 11483,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "string",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3177:34:52",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_stringliteral_71a131ddaeac67d6297d1361a81b87952a2c72ac89b7fce1d74af95b050a78a9",
                              "typeString": "literal_string \"register(address,bytes4,address)\""
                            },
                            "value": "register(address,bytes4,address)"
                          },
                          {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 11485,
                                "name": "this",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19572,
                                "src": "3237:4:52",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_Wallet_$11514",
                                  "typeString": "contract Wallet"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_Wallet_$11514",
                                  "typeString": "contract Wallet"
                                }
                              ],
                              "id": 11484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "nodeType": "ElementaryTypeNameExpression",
                              "src": "3229:7:52",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_address_$",
                                "typeString": "type(address)"
                              },
                              "typeName": "address"
                            },
                            "id": 11486,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "3229:13:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11487,
                            "name": "_function",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11472,
                            "src": "3260:9:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes4",
                              "typeString": "bytes4"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 11488,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11474,
                            "src": "3287:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_stringliteral_71a131ddaeac67d6297d1361a81b87952a2c72ac89b7fce1d74af95b050a78a9",
                              "typeString": "literal_string \"register(address,bytes4,address)\""
                            },
                            {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            },
                            {
                              "typeIdentifier": "t_bytes4",
                              "typeString": "bytes4"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 11481,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19391,
                            "src": "3136:3:52",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 11482,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodeWithSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3136:23:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodewithsignature_pure$_t_string_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (string memory) pure returns (bytes memory)"
                          }
                        },
                        "id": 11489,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3136:168:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 11477,
                      "name": "execute",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11470,
                      "src": "3083:7:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (address,bytes memory)"
                      }
                    },
                    "id": 11490,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3083:231:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11491,
                  "nodeType": "ExpressionStatement",
                  "src": "3083:231:52"
                }
              ]
            },
            "documentation": null,
            "id": 11493,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "register",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11475,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11472,
                  "name": "_function",
                  "nodeType": "VariableDeclaration",
                  "scope": 11493,
                  "src": "3035:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes4",
                    "typeString": "bytes4"
                  },
                  "typeName": {
                    "id": 11471,
                    "name": "bytes4",
                    "nodeType": "ElementaryTypeName",
                    "src": "3035:6:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 11474,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 11493,
                  "src": "3053:11:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11473,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3053:7:52",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3034:31:52"
            },
            "returnParameters": {
              "id": 11476,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3073:0:52"
            },
            "scope": 11514,
            "src": "3017:304:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11512,
              "nodeType": "Block",
              "src": "3356:571:52",
              "statements": [
                {
                  "assignments": [
                    11497
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 11497,
                      "name": "delegate",
                      "nodeType": "VariableDeclaration",
                      "scope": 11512,
                      "src": "3366:16:52",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 11496,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "3366:7:52",
                        "stateMutability": "nonpayable",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 11510,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 11500,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19572,
                        "src": "3420:4:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Wallet_$11514",
                          "typeString": "contract Wallet"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11501,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3438:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11502,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sig",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3438:7:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11503,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3459:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11504,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "data",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3459:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11505,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3481:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11506,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3481:9:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11507,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "3504:3:52",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11508,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3504:10:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_contract$_Wallet_$11514",
                          "typeString": "contract Wallet"
                        },
                        {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        },
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 11498,
                        "name": "delegates",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 11204,
                        "src": "3385:9:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Delegates_$12109",
                          "typeString": "contract Delegates"
                        }
                      },
                      "id": 11499,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getDelegate",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 12105,
                      "src": "3385:21:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_contract$_Wallet_$11514_$_t_bytes4_$_t_bytes_memory_ptr_$_t_uint256_$_t_address_$returns$_t_address_$",
                        "typeString": "function (contract Wallet,bytes4,bytes memory,uint256,address) external returns (address)"
                      }
                    },
                    "id": 11509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3385:139:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3366:158:52"
                },
                {
                  "externalReferences": [
                    {
                      "delegate": {
                        "declaration": 11497,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3699:8:52",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 11511,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    calldatacopy(0, 0, calldatasize())\n    let result := staticcall(gas(), delegate, 0, calldatasize(), 0, 0)\n    returndatacopy(0, 0, returndatasize())\n    switch result\n    case 0 { revert(0, returndatasize()) }\n    default { return(0, returndatasize()) }\n}",
                  "src": "3599:321:52"
                }
              ]
            },
            "documentation": null,
            "id": 11513,
            "implemented": true,
            "kind": "fallback",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11494,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3336:2:52"
            },
            "returnParameters": {
              "id": 11495,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3356:0:52"
            },
            "scope": 11514,
            "src": "3327:600:52",
            "stateMutability": "payable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 11515,
        "src": "120:3810:52"
      }
    ],
    "src": "0:3930:52"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.11+commit.c082d0b4.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.0.16",
  "updatedAt": "2019-11-11T00:47:34.700Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}