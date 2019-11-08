export const OpenMinter = {
  "contractName": "OpenMinter",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "cards",
      "outputs": [
        {
          "internalType": "contract ICards",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ICards",
          "name": "_cards",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint16[]",
          "name": "_protos",
          "type": "uint16[]"
        },
        {
          "internalType": "uint8[]",
          "name": "_qualities",
          "type": "uint8[]"
        }
      ],
      "name": "mintCards",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.11+commit.c082d0b4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[],\"name\":\"cards\",\"outputs\":[{\"internalType\":\"contract ICards\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint16[]\",\"name\":\"_protos\",\"type\":\"uint16[]\"},{\"internalType\":\"uint8[]\",\"name\":\"_qualities\",\"type\":\"uint8[]\"}],\"name\":\"mintCards\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ICards\",\"name\":\"_cards\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/factories/OpenMinter.sol\":\"OpenMinter\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/ICards.sol\":{\"keccak256\":\"0xbdd44252d7d12895ab7f183069c333eb9ab0aac96603605ecb3a1dac565180f7\",\"urls\":[\"bzz-raw://7fdd39274a8d3166776bc336eb56873bf7920fe352b07c3c372595936097f5d5\",\"dweb:/ipfs/QmQmdgMK1KtyjhN18DTxTuRV4Q1zjchrBRL9unB8qtZNu3\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/factories/OpenMinter.sol\":{\"keccak256\":\"0xe8748fcdd47124094d808f7d664847cbda93ff72b0c444dd90a42964be2024eb\",\"urls\":[\"bzz-raw://5e007f4c798c2974953835fade7fa1d6708597ee4b097ba046f4e1696ee43a4e\",\"dweb:/ipfs/QmZo26arqjGnpFuDfLT72U5CciUSQn7vESb2Ynt7DfVe4E\"]},\"@openzeppelin/contracts/introspection/IERC165.sol\":{\"keccak256\":\"0xe0ed10f53955c35eecb02724538650a155aa940be3f0a54cd3bde6c6b0c6e48c\",\"urls\":[\"bzz-raw://7dcfda88e3225987245908c3296f3559752647036804325ebfaa9fd1545161c3\",\"dweb:/ipfs/QmXxx5rHfLL57zdgyyyG9MMv4XGN7bpVSc2MuDcaCgto6u\"]},\"@openzeppelin/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0x680c11bc8173eef7d5db843baaf64ce499476de2c172f6aea631dbee54bcd2e6\",\"urls\":[\"bzz-raw://0f314963ab26fb65c6f364d57900f0f1aa8f6aeb4396e327e5e5c646815f060e\",\"dweb:/ipfs/Qmf6eSUtRUF4YDxGyhQq7TVDYzuHcYEvk9Us3RVy5iZQVH\"]}},\"version\":1}",
  "bytecode": "0x608060405234801561001057600080fd5b506040516103513803806103518339818101604052602081101561003357600080fd5b5051600080546001600160a01b039092166001600160a01b03199092169190911790556102ec806100656000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806358a4903f1461003b578063c8be6b9b1461005f575b600080fd5b610043610198565b604080516001600160a01b039092168252519081900360200190f35b6101966004803603606081101561007557600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156100a057600080fd5b8201836020820111156100b257600080fd5b803590602001918460208302840111640100000000831117156100d457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929594936020810193503591505064010000000081111561012457600080fd5b82018360208201111561013657600080fd5b8035906020019184602083028401116401000000008311171561015857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506101a7945050505050565b005b6000546001600160a01b031681565b6000805460405163c8be6b9b60e01b81526001600160a01b0386811660048301908152606060248401908152875160648501528751929094169463c8be6b9b94899489948994936044830192608401916020808901929102908190849084905b8381101561021f578181015183820152602001610207565b50505050905001838103825284818151815260200191508051906020019060200280838360005b8381101561025e578181015183820152602001610246565b5050505090500195505050505050602060405180830381600087803b15801561028657600080fd5b505af115801561029a573d6000803e3d6000fd5b505050506040513d60208110156102b057600080fd5b505050505056fea265627a7a7231582028e3c806e49e641d652e0fe4dce16c6fe821df36f4cdb35ebb6dbc8ebd7467be64736f6c634300050b0032",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100365760003560e01c806358a4903f1461003b578063c8be6b9b1461005f575b600080fd5b610043610198565b604080516001600160a01b039092168252519081900360200190f35b6101966004803603606081101561007557600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156100a057600080fd5b8201836020820111156100b257600080fd5b803590602001918460208302840111640100000000831117156100d457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929594936020810193503591505064010000000081111561012457600080fd5b82018360208201111561013657600080fd5b8035906020019184602083028401116401000000008311171561015857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506101a7945050505050565b005b6000546001600160a01b031681565b6000805460405163c8be6b9b60e01b81526001600160a01b0386811660048301908152606060248401908152875160648501528751929094169463c8be6b9b94899489948994936044830192608401916020808901929102908190849084905b8381101561021f578181015183820152602001610207565b50505050905001838103825284818151815260200191508051906020019060200280838360005b8381101561025e578181015183820152602001610246565b5050505090500195505050505050602060405180830381600087803b15801561028657600080fd5b505af115801561029a573d6000803e3d6000fd5b505050506040513d60208110156102b057600080fd5b505050505056fea265627a7a7231582028e3c806e49e641d652e0fe4dce16c6fe821df36f4cdb35ebb6dbc8ebd7467be64736f6c634300050b0032",
  "sourceMap": "50:274:6:-;;;103:65;8:9:-1;5:2;;;30:1;27;20:12;5:2;103:65:6;;;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;103:65:6;147:5;:14;;-1:-1:-1;;;;;147:14:6;;;-1:-1:-1;;;;;;147:14:6;;;;;;;;;50:274;;;;;;",
  "deployedSourceMap": "50:274:6:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;50:274:6;;;;;;;;;;;;;;;;;;;;;;;;77:19;;;:::i;:::-;;;;-1:-1:-1;;;;;77:19:6;;;;;;;;;;;;;;174:147;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;174:147:6;;;;;;;;;;;;;;;21:11:-1;5:28;;2:2;;;46:1;43;36:12;2:2;174:147:6;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;174:147:6;;;;;;101:9:-1;95:2;81:12;77:21;67:8;63:36;60:51;39:11;25:12;22:29;11:108;8:2;;;132:1;129;122:12;8:2;174:147:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;174:147:6;;;;;;;;-1:-1:-1;174:147:6;;-1:-1:-1;;21:11;5:28;;2:2;;;46:1;43;36:12;2:2;174:147:6;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;174:147:6;;;;;;101:9:-1;95:2;81:12;77:21;67:8;63:36;60:51;39:11;25:12;22:29;11:108;8:2;;;132:1;129;122:12;8:2;174:147:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;174:147:6;;-1:-1:-1;174:147:6;;-1:-1:-1;;;;;174:147:6:i;:::-;;77:19;;;-1:-1:-1;;;;;77:19:6;;:::o;174:147::-;274:5;;;:40;;-1:-1:-1;;;274:40:6;;-1:-1:-1;;;;;274:40:6;;;;;;;;;;;;;;;;;;;;;;;;:5;;;;;:15;;290:2;;294:7;;303:10;;274:40;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;274:40:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;274:40:6;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;274:40:6;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;274:40:6;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;174:147:6:o",
  "source": "pragma solidity 0.5.11;\n\nimport \"../ICards.sol\";\n\ncontract OpenMinter {\n\n    ICards public cards;\n\n    constructor(ICards _cards) public {\n        cards = _cards;\n    }\n\n    function mintCards(address to, uint16[] memory _protos, uint8[] memory _qualities) public {\n        cards.mintCards(to, _protos, _qualities);\n    }\n\n}",
  "sourcePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/factories/OpenMinter.sol",
  "ast": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/factories/OpenMinter.sol",
    "exportedSymbols": {
      "OpenMinter": [
        1683
      ]
    },
    "id": 1684,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1649,
        "literals": [
          "solidity",
          "0.5",
          ".11"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:6"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/ICards.sol",
        "file": "../ICards.sol",
        "id": 1650,
        "nodeType": "ImportDirective",
        "scope": 1684,
        "sourceUnit": 1360,
        "src": "25:23:6",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 1683,
        "linearizedBaseContracts": [
          1683
        ],
        "name": "OpenMinter",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 1652,
            "name": "cards",
            "nodeType": "VariableDeclaration",
            "scope": 1683,
            "src": "77:19:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_ICards_$1359",
              "typeString": "contract ICards"
            },
            "typeName": {
              "contractScope": null,
              "id": 1651,
              "name": "ICards",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1359,
              "src": "77:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICards_$1359",
                "typeString": "contract ICards"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1661,
              "nodeType": "Block",
              "src": "137:31:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1659,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1657,
                      "name": "cards",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1652,
                      "src": "147:5:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ICards_$1359",
                        "typeString": "contract ICards"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1658,
                      "name": "_cards",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1654,
                      "src": "155:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ICards_$1359",
                        "typeString": "contract ICards"
                      }
                    },
                    "src": "147:14:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ICards_$1359",
                      "typeString": "contract ICards"
                    }
                  },
                  "id": 1660,
                  "nodeType": "ExpressionStatement",
                  "src": "147:14:6"
                }
              ]
            },
            "documentation": null,
            "id": 1662,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1655,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1654,
                  "name": "_cards",
                  "nodeType": "VariableDeclaration",
                  "scope": 1662,
                  "src": "115:13:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_ICards_$1359",
                    "typeString": "contract ICards"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1653,
                    "name": "ICards",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1359,
                    "src": "115:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ICards_$1359",
                      "typeString": "contract ICards"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:15:6"
            },
            "returnParameters": {
              "id": 1656,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "137:0:6"
            },
            "scope": 1683,
            "src": "103:65:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1681,
              "nodeType": "Block",
              "src": "264:57:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1676,
                        "name": "to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1664,
                        "src": "290:2:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1677,
                        "name": "_protos",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1667,
                        "src": "294:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                          "typeString": "uint16[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1678,
                        "name": "_qualities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1670,
                        "src": "303:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                          "typeString": "uint8[] memory"
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
                          "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                          "typeString": "uint16[] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                          "typeString": "uint8[] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1673,
                        "name": "cards",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1652,
                        "src": "274:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ICards_$1359",
                          "typeString": "contract ICards"
                        }
                      },
                      "id": 1675,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "mintCards",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1337,
                      "src": "274:15:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_array$_t_uint16_$dyn_memory_ptr_$_t_array$_t_uint8_$dyn_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (address,uint16[] memory,uint8[] memory) external returns (uint256)"
                      }
                    },
                    "id": 1679,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "274:40:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1680,
                  "nodeType": "ExpressionStatement",
                  "src": "274:40:6"
                }
              ]
            },
            "documentation": null,
            "id": 1682,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "mintCards",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1671,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1664,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "193:10:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1663,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "193:7:6",
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
                  "id": 1667,
                  "name": "_protos",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "205:23:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                    "typeString": "uint16[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1665,
                      "name": "uint16",
                      "nodeType": "ElementaryTypeName",
                      "src": "205:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 1666,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "205:8:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint16_$dyn_storage_ptr",
                      "typeString": "uint16[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1670,
                  "name": "_qualities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "230:25:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                    "typeString": "uint8[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1668,
                      "name": "uint8",
                      "nodeType": "ElementaryTypeName",
                      "src": "230:5:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 1669,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "230:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint8_$dyn_storage_ptr",
                      "typeString": "uint8[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "192:64:6"
            },
            "returnParameters": {
              "id": 1672,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "264:0:6"
            },
            "scope": 1683,
            "src": "174:147:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1684,
        "src": "50:274:6"
      }
    ],
    "src": "0:324:6"
  },
  "legacyAST": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/factories/OpenMinter.sol",
    "exportedSymbols": {
      "OpenMinter": [
        1683
      ]
    },
    "id": 1684,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1649,
        "literals": [
          "solidity",
          "0.5",
          ".11"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:6"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/cards/ICards.sol",
        "file": "../ICards.sol",
        "id": 1650,
        "nodeType": "ImportDirective",
        "scope": 1684,
        "sourceUnit": 1360,
        "src": "25:23:6",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 1683,
        "linearizedBaseContracts": [
          1683
        ],
        "name": "OpenMinter",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 1652,
            "name": "cards",
            "nodeType": "VariableDeclaration",
            "scope": 1683,
            "src": "77:19:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_ICards_$1359",
              "typeString": "contract ICards"
            },
            "typeName": {
              "contractScope": null,
              "id": 1651,
              "name": "ICards",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1359,
              "src": "77:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICards_$1359",
                "typeString": "contract ICards"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1661,
              "nodeType": "Block",
              "src": "137:31:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1659,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1657,
                      "name": "cards",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1652,
                      "src": "147:5:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ICards_$1359",
                        "typeString": "contract ICards"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1658,
                      "name": "_cards",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1654,
                      "src": "155:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ICards_$1359",
                        "typeString": "contract ICards"
                      }
                    },
                    "src": "147:14:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ICards_$1359",
                      "typeString": "contract ICards"
                    }
                  },
                  "id": 1660,
                  "nodeType": "ExpressionStatement",
                  "src": "147:14:6"
                }
              ]
            },
            "documentation": null,
            "id": 1662,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1655,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1654,
                  "name": "_cards",
                  "nodeType": "VariableDeclaration",
                  "scope": 1662,
                  "src": "115:13:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_ICards_$1359",
                    "typeString": "contract ICards"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1653,
                    "name": "ICards",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1359,
                    "src": "115:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ICards_$1359",
                      "typeString": "contract ICards"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "114:15:6"
            },
            "returnParameters": {
              "id": 1656,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "137:0:6"
            },
            "scope": 1683,
            "src": "103:65:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1681,
              "nodeType": "Block",
              "src": "264:57:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1676,
                        "name": "to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1664,
                        "src": "290:2:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1677,
                        "name": "_protos",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1667,
                        "src": "294:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                          "typeString": "uint16[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1678,
                        "name": "_qualities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1670,
                        "src": "303:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                          "typeString": "uint8[] memory"
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
                          "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                          "typeString": "uint16[] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                          "typeString": "uint8[] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1673,
                        "name": "cards",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1652,
                        "src": "274:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ICards_$1359",
                          "typeString": "contract ICards"
                        }
                      },
                      "id": 1675,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "mintCards",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1337,
                      "src": "274:15:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_array$_t_uint16_$dyn_memory_ptr_$_t_array$_t_uint8_$dyn_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (address,uint16[] memory,uint8[] memory) external returns (uint256)"
                      }
                    },
                    "id": 1679,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "274:40:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1680,
                  "nodeType": "ExpressionStatement",
                  "src": "274:40:6"
                }
              ]
            },
            "documentation": null,
            "id": 1682,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "mintCards",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1671,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1664,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "193:10:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1663,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "193:7:6",
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
                  "id": 1667,
                  "name": "_protos",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "205:23:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint16_$dyn_memory_ptr",
                    "typeString": "uint16[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1665,
                      "name": "uint16",
                      "nodeType": "ElementaryTypeName",
                      "src": "205:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 1666,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "205:8:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint16_$dyn_storage_ptr",
                      "typeString": "uint16[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1670,
                  "name": "_qualities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1682,
                  "src": "230:25:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint8_$dyn_memory_ptr",
                    "typeString": "uint8[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1668,
                      "name": "uint8",
                      "nodeType": "ElementaryTypeName",
                      "src": "230:5:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 1669,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "230:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint8_$dyn_storage_ptr",
                      "typeString": "uint8[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "192:64:6"
            },
            "returnParameters": {
              "id": 1672,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "264:0:6"
            },
            "scope": 1683,
            "src": "174:147:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1684,
        "src": "50:274:6"
      }
    ],
    "src": "0:324:6"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.11+commit.c082d0b4.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.0.16",
  "updatedAt": "2019-11-08T05:02:33.392Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}