export const Proxy = {
  "contractName": "Proxy",
  "abi": [
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_impl",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "name": "from",
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
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.11+commit.c082d0b4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[],\"name\":\"proxyType\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"implementation\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_impl\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Received\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Proxy.sol\":\"Proxy\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Proxy.sol\":{\"keccak256\":\"0xa00f8de5f8e7b6e3976abd0a04a5894bc89eda0d7c4bfdf0ebaed778029579bf\",\"urls\":[\"bzz-raw://1b99b9476f87ad4c244b6b446ea1aba7a7e912d4a7e9a48870e1ac83bb069f36\",\"dweb:/ipfs/QmcWKoKQRJAyUkgGfj1Cf8tMpjHd7aVmkGh4fX5XT6goJ3\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol\":{\"keccak256\":\"0x8b57646f6fad9431d2d6dd24359e5bbe8f198360c967f47c3082d977a4283e90\",\"urls\":[\"bzz-raw://63fe6dd765615945bca7cd8b71b30df9e5798b5306dafab83f0b631e66b5b190\",\"dweb:/ipfs/QmSPVkS6AFZ5Dnn5bQdom7vNR9knhdvxxvVTxcZqvAnEf1\"]},\"/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/interfaces/ERCProxy.sol\":{\"keccak256\":\"0x0cdb0f511fe2ec57d46c79ab23632d3087554800e00a96c0c679b8d62825dda0\",\"urls\":[\"bzz-raw://f4c7b4befe25636f5b03ee3068f11753381d7fd1983edc4c080bc4134f3f41b9\",\"dweb:/ipfs/QmTWkndVjA8NdrxeWnheHWfKgMhJYWXnEmCzv9FDVXgH2S\"]}},\"version\":1}",
  "bytecode": "0x608060405234801561001057600080fd5b506040516102573803806102578339818101604052602081101561003357600080fd5b50516001600160a01b0381166100aa57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f6e756c6c20696d706c656d656e746174696f6e00000000000000000000000000604482015290519081900360640190fd5b600080546001600160a01b039092166001600160a01b031990921691909117905561017d806100da6000396000f3fe6080604052600436106100295760003560e01c80634555d5c9146100dc5780635c60da1b14610103575b361580156100375750600034115b156100b357336001600160a01b03167e3bcb3482865776c0c54d101f8e1eb8bff85baac844cfa3a93ebd5b365329016000363460405180806020018381526020018281038252858582818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a26100da565b6000543660008037600080366000845af43d6000803e8080156100d5573d6000f35b3d6000fd5b005b3480156100e857600080fd5b506100f1610134565b60408051918252519081900360200190f35b34801561010f57600080fd5b50610118610139565b604080516001600160a01b039092168252519081900360200190f35b600181565b6000546001600160a01b03168156fea265627a7a72315820d659dd9e6cb62cfc64898619cdfc1890ad4532ad4fa75624de23f44040fdb01c64736f6c634300050b0032",
  "deployedBytecode": "0x6080604052600436106100295760003560e01c80634555d5c9146100dc5780635c60da1b14610103575b361580156100375750600034115b156100b357336001600160a01b03167e3bcb3482865776c0c54d101f8e1eb8bff85baac844cfa3a93ebd5b365329016000363460405180806020018381526020018281038252858582818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a26100da565b6000543660008037600080366000845af43d6000803e8080156100d5573d6000f35b3d6000fd5b005b3480156100e857600080fd5b506100f1610134565b60408051918252519081900360200190f35b34801561010f57600080fd5b50610118610139565b604080516001600160a01b039092168252519081900360200190f35b600181565b6000546001600160a01b03168156fea265627a7a72315820d659dd9e6cb62cfc64898619cdfc1890ad4532ad4fa75624de23f44040fdb01c64736f6c634300050b0032",
  "sourceMap": "52:1000:50:-;;;265:134;8:9:-1;5:2;;;30:1;27;20:12;5:2;265:134:50;;;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;265:134:50;-1:-1:-1;;;;;317:19:50;;309:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;370:14;:22;;-1:-1:-1;;;;;370:22:50;;;-1:-1:-1;;;;;;370:22:50;;;;;;;;;52:1000;;;;;;",
  "deployedSourceMap": "52:1000:50:-;;;;;;;;;;;;;;;;;;;;;;;447:8;:20;:37;;;;;483:1;471:9;:13;447:37;443:600;;;514:10;-1:-1:-1;;;;;505:41:50;;526:8;;536:9;505:41;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;;74:27;505:41:50;;137:4:-1;117:14;;;-1:-1;;113:30;157:16;;;505:41:50;;;;-1:-1:-1;505:41:50;;-1:-1:-1;;;;;505:41:50;443:600;;;692:1;686:8;730:14;727:1;724;711:34;824:1;821;805:14;802:1;794:6;789:3;776:50;864:16;861:1;858;843:38;905:6;928:36;;;;1001:16;998:1;990:28;928:36;946:16;943:1;936:27;654:379;52:1000;134:34:51;;8:9:-1;5:2;;;30:1;27;20:12;5:2;134:34:51;;;:::i;:::-;;;;;;;;;;;;;;;;99:29;;8:9:-1;5:2;;;30:1;27;20:12;5:2;99:29:51;;;:::i;:::-;;;;-1:-1:-1;;;;;99:29:51;;;;;;;;;;;;;;134:34;167:1;134:34;:::o;99:29::-;;;-1:-1:-1;;;;;99:29:51;;:::o",
  "source": "pragma solidity ^0.5.8;\n\nimport \"./ProxyData.sol\";\n\ncontract Proxy is ProxyData {\n\n    // proxy contract as described here: https://blog.gnosis.pm/solidity-delegateproxy-contracts-e09957d0f201\n\n    event Received(address indexed from, bytes data, uint value);\n\n    constructor(address _impl) public {\n        require(_impl != address(0), \"null implementation\");\n        implementation = _impl;\n    }\n\n    function() external payable {\n        if (msg.data.length == 0 && msg.value > 0) {\n            emit Received(msg.sender, msg.data, msg.value);\n        } else {\n            // solium-disable-next-line security/no-inline-assembly\n            assembly {\n                let target := sload(0)\n                calldatacopy(0, 0, calldatasize())\n                let result := delegatecall(gas, target, 0, calldatasize(), 0, 0)\n                returndatacopy(0, 0, returndatasize())\n                switch result\n                case 0 {revert(0, returndatasize())}\n                default {return (0, returndatasize())}\n            }\n        }\n    }\n\n}",
  "sourcePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Proxy.sol",
  "ast": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Proxy.sol",
    "exportedSymbols": {
      "Proxy": [
        11180
      ]
    },
    "id": 11181,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 11122,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".8"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:50"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol",
        "file": "./ProxyData.sol",
        "id": 11123,
        "nodeType": "ImportDirective",
        "scope": 11181,
        "sourceUnit": 11192,
        "src": "25:25:50",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11124,
              "name": "ProxyData",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 11191,
              "src": "70:9:50",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ProxyData_$11191",
                "typeString": "contract ProxyData"
              }
            },
            "id": 11125,
            "nodeType": "InheritanceSpecifier",
            "src": "70:9:50"
          }
        ],
        "contractDependencies": [
          11191,
          12185
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 11180,
        "linearizedBaseContracts": [
          11180,
          11191,
          12185
        ],
        "name": "Proxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 11133,
            "name": "Received",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11127,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "213:20:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11126,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "213:7:50",
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
                  "id": 11129,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "235:10:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11128,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "235:5:50",
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
                  "id": 11131,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "247:10:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11130,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "247:4:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "212:46:50"
            },
            "src": "198:61:50"
          },
          {
            "body": {
              "id": 11151,
              "nodeType": "Block",
              "src": "299:100:50",
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
                        "id": 11143,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11139,
                          "name": "_impl",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11135,
                          "src": "317:5:50",
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
                              "id": 11141,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "334:1:50",
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
                            "id": 11140,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "326:7:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11142,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "326:10:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "317:19:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6e756c6c20696d706c656d656e746174696f6e",
                        "id": 11144,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "338:21:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_25d305738c322d212df07f4177bd88a2f53f2dbb57fb2213884d0ce89a0d1591",
                          "typeString": "literal_string \"null implementation\""
                        },
                        "value": "null implementation"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_25d305738c322d212df07f4177bd88a2f53f2dbb57fb2213884d0ce89a0d1591",
                          "typeString": "literal_string \"null implementation\""
                        }
                      ],
                      "id": 11138,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "309:7:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11145,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "309:51:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11146,
                  "nodeType": "ExpressionStatement",
                  "src": "309:51:50"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11149,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11147,
                      "name": "implementation",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11187,
                      "src": "370:14:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11148,
                      "name": "_impl",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11135,
                      "src": "387:5:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "370:22:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11150,
                  "nodeType": "ExpressionStatement",
                  "src": "370:22:50"
                }
              ]
            },
            "documentation": null,
            "id": 11152,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11136,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11135,
                  "name": "_impl",
                  "nodeType": "VariableDeclaration",
                  "scope": 11152,
                  "src": "277:13:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11134,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "277:7:50",
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
              "src": "276:15:50"
            },
            "returnParameters": {
              "id": 11137,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "299:0:50"
            },
            "scope": 11180,
            "src": "265:134:50",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11178,
              "nodeType": "Block",
              "src": "433:616:50",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "id": 11164,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 11159,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11155,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19404,
                            "src": "447:3:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 11156,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "data",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "447:8:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_calldata_ptr",
                            "typeString": "bytes calldata"
                          }
                        },
                        "id": 11157,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "447:15:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "==",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11158,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "466:1:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "447:20:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "&&",
                    "rightExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 11163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11160,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "471:3:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11161,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "471:9:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11162,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "483:1:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "471:13:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "src": "447:37:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 11176,
                    "nodeType": "Block",
                    "src": "563:480:50",
                    "statements": [
                      {
                        "externalReferences": [],
                        "id": 11175,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let target := sload(0)\n    calldatacopy(0, 0, calldatasize())\n    let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)\n    returndatacopy(0, 0, returndatasize())\n    switch result\n    case 0 { revert(0, returndatasize()) }\n    default { return(0, returndatasize()) }\n}",
                        "src": "645:388:50"
                      }
                    ]
                  },
                  "id": 11177,
                  "nodeType": "IfStatement",
                  "src": "443:600:50",
                  "trueBody": {
                    "id": 11174,
                    "nodeType": "Block",
                    "src": "486:71:50",
                    "statements": [
                      {
                        "eventCall": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11166,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "514:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11167,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "514:10:50",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11168,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "526:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11169,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "data",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "526:8:50",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_calldata_ptr",
                                "typeString": "bytes calldata"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11170,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "536:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11171,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "value",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "536:9:50",
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
                                "typeIdentifier": "t_bytes_calldata_ptr",
                                "typeString": "bytes calldata"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 11165,
                            "name": "Received",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11133,
                            "src": "505:8:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                              "typeString": "function (address,bytes memory,uint256)"
                            }
                          },
                          "id": 11172,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "505:41:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 11173,
                        "nodeType": "EmitStatement",
                        "src": "500:46:50"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": null,
            "id": 11179,
            "implemented": true,
            "kind": "fallback",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11153,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "413:2:50"
            },
            "returnParameters": {
              "id": 11154,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "433:0:50"
            },
            "scope": 11180,
            "src": "405:644:50",
            "stateMutability": "payable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 11181,
        "src": "52:1000:50"
      }
    ],
    "src": "0:1052:50"
  },
  "legacyAST": {
    "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/Proxy.sol",
    "exportedSymbols": {
      "Proxy": [
        11180
      ]
    },
    "id": 11181,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 11122,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".8"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:50"
      },
      {
        "absolutePath": "/Users/kerman/immutable/gods-unchained-contracts/packages/contracts/contracts/wallet/ProxyData.sol",
        "file": "./ProxyData.sol",
        "id": 11123,
        "nodeType": "ImportDirective",
        "scope": 11181,
        "sourceUnit": 11192,
        "src": "25:25:50",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11124,
              "name": "ProxyData",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 11191,
              "src": "70:9:50",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ProxyData_$11191",
                "typeString": "contract ProxyData"
              }
            },
            "id": 11125,
            "nodeType": "InheritanceSpecifier",
            "src": "70:9:50"
          }
        ],
        "contractDependencies": [
          11191,
          12185
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 11180,
        "linearizedBaseContracts": [
          11180,
          11191,
          12185
        ],
        "name": "Proxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 11133,
            "name": "Received",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 11132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11127,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "213:20:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11126,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "213:7:50",
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
                  "id": 11129,
                  "indexed": false,
                  "name": "data",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "235:10:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 11128,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "235:5:50",
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
                  "id": 11131,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 11133,
                  "src": "247:10:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 11130,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "247:4:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "212:46:50"
            },
            "src": "198:61:50"
          },
          {
            "body": {
              "id": 11151,
              "nodeType": "Block",
              "src": "299:100:50",
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
                        "id": 11143,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 11139,
                          "name": "_impl",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 11135,
                          "src": "317:5:50",
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
                              "id": 11141,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "334:1:50",
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
                            "id": 11140,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "326:7:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 11142,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "326:10:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "317:19:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "6e756c6c20696d706c656d656e746174696f6e",
                        "id": 11144,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "338:21:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_25d305738c322d212df07f4177bd88a2f53f2dbb57fb2213884d0ce89a0d1591",
                          "typeString": "literal_string \"null implementation\""
                        },
                        "value": "null implementation"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_25d305738c322d212df07f4177bd88a2f53f2dbb57fb2213884d0ce89a0d1591",
                          "typeString": "literal_string \"null implementation\""
                        }
                      ],
                      "id": 11138,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        19407,
                        19408
                      ],
                      "referencedDeclaration": 19408,
                      "src": "309:7:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 11145,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "309:51:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 11146,
                  "nodeType": "ExpressionStatement",
                  "src": "309:51:50"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 11149,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 11147,
                      "name": "implementation",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11187,
                      "src": "370:14:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 11148,
                      "name": "_impl",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 11135,
                      "src": "387:5:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "370:22:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 11150,
                  "nodeType": "ExpressionStatement",
                  "src": "370:22:50"
                }
              ]
            },
            "documentation": null,
            "id": 11152,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11136,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 11135,
                  "name": "_impl",
                  "nodeType": "VariableDeclaration",
                  "scope": 11152,
                  "src": "277:13:50",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 11134,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "277:7:50",
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
              "src": "276:15:50"
            },
            "returnParameters": {
              "id": 11137,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "299:0:50"
            },
            "scope": 11180,
            "src": "265:134:50",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 11178,
              "nodeType": "Block",
              "src": "433:616:50",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "id": 11164,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 11159,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 11155,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19404,
                            "src": "447:3:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 11156,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "data",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "447:8:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_calldata_ptr",
                            "typeString": "bytes calldata"
                          }
                        },
                        "id": 11157,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "447:15:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": "==",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11158,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "466:1:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "447:20:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "&&",
                    "rightExpression": {
                      "argumentTypes": null,
                      "commonType": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "id": 11163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 11160,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 19404,
                          "src": "471:3:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 11161,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "471:9:50",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "BinaryOperation",
                      "operator": ">",
                      "rightExpression": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 11162,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "483:1:50",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "471:13:50",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "src": "447:37:50",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": {
                    "id": 11176,
                    "nodeType": "Block",
                    "src": "563:480:50",
                    "statements": [
                      {
                        "externalReferences": [],
                        "id": 11175,
                        "nodeType": "InlineAssembly",
                        "operations": "{\n    let target := sload(0)\n    calldatacopy(0, 0, calldatasize())\n    let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)\n    returndatacopy(0, 0, returndatasize())\n    switch result\n    case 0 { revert(0, returndatasize()) }\n    default { return(0, returndatasize()) }\n}",
                        "src": "645:388:50"
                      }
                    ]
                  },
                  "id": 11177,
                  "nodeType": "IfStatement",
                  "src": "443:600:50",
                  "trueBody": {
                    "id": 11174,
                    "nodeType": "Block",
                    "src": "486:71:50",
                    "statements": [
                      {
                        "eventCall": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11166,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "514:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11167,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "514:10:50",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11168,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "526:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11169,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "data",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "526:8:50",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_calldata_ptr",
                                "typeString": "bytes calldata"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 11170,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19404,
                                "src": "536:3:50",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 11171,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "value",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "536:9:50",
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
                                "typeIdentifier": "t_bytes_calldata_ptr",
                                "typeString": "bytes calldata"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 11165,
                            "name": "Received",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 11133,
                            "src": "505:8:50",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_bytes_memory_ptr_$_t_uint256_$returns$__$",
                              "typeString": "function (address,bytes memory,uint256)"
                            }
                          },
                          "id": 11172,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "505:41:50",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 11173,
                        "nodeType": "EmitStatement",
                        "src": "500:46:50"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": null,
            "id": 11179,
            "implemented": true,
            "kind": "fallback",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 11153,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "413:2:50"
            },
            "returnParameters": {
              "id": 11154,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "433:0:50"
            },
            "scope": 11180,
            "src": "405:644:50",
            "stateMutability": "payable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 11181,
        "src": "52:1000:50"
      }
    ],
    "src": "0:1052:50"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.11+commit.c082d0b4.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.0.16",
  "updatedAt": "2019-11-11T00:47:34.698Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}