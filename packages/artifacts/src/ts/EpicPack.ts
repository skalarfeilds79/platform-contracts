export const EpicPack = [
  {
    "constant": true,
    "inputs": [],
    "name": "referral",
    "outputs": [
      {
        "internalType": "contract IReferral",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bool",
        "name": "_paused",
        "type": "bool"
      }
    ],
    "name": "setPaused",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pay",
    "outputs": [
      {
        "internalType": "contract IPurchaseProcessor",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "enum IPurchaseProcessor.Currency",
            "name": "currency",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "escrowFor",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPurchaseProcessor.PaymentParams",
        "name": "_payment",
        "type": "tuple"
      },
      {
        "internalType": "address payable",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "purchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commitmentID",
        "type": "uint256"
      }
    ],
    "name": "ticketsEscrowHook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "raffle",
    "outputs": [
      {
        "internalType": "contract IRaffle",
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
    "name": "sku",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "commitments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "commitBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "packQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ticketQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "escrowFor",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
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
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "openChests",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
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
    "constant": true,
    "inputs": [],
    "name": "beacon",
    "outputs": [
      {
        "internalType": "contract IBeacon",
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
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "chest",
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
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
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
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "price",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commitmentID",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commitmentID",
        "type": "uint256"
      }
    ],
    "name": "cardsEscrowHook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "commitmentCount",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "enum IPurchaseProcessor.Currency",
            "name": "currency",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "escrowFor",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPurchaseProcessor.PaymentParams",
        "name": "_payment",
        "type": "tuple"
      },
      {
        "internalType": "address payable",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "purchaseFor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "escrow",
    "outputs": [
      {
        "internalType": "contract ICreditCardEscrow",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_chest",
        "type": "address"
      }
    ],
    "name": "setChest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currency",
    "outputs": [
      {
        "internalType": "enum IPurchaseProcessor.Currency",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IRaffle",
        "name": "_raffle",
        "type": "address"
      },
      {
        "internalType": "contract IBeacon",
        "name": "_beacon",
        "type": "address"
      },
      {
        "internalType": "contract ICards",
        "name": "_cards",
        "type": "address"
      },
      {
        "internalType": "contract IReferral",
        "name": "_referral",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_sku",
        "type": "bytes32"
      },
      {
        "internalType": "contract ICreditCardEscrow",
        "name": "_escrow",
        "type": "address"
      },
      {
        "internalType": "contract IPurchaseProcessor",
        "name": "_pay",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "commitmentID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lowTokenID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "highTokenID",
        "type": "uint256"
      }
    ],
    "name": "CardsMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "commitmentID",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "paymentID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "commitBlock",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "packQuantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "ticketQuantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "escrowFor",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          }
        ],
        "indexed": false,
        "internalType": "struct Pack.Commitment",
        "name": "commitment",
        "type": "tuple"
      }
    ],
    "name": "CommitmentRecorded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "commitmentID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16[]",
        "name": "ticketCounts",
        "type": "uint16[]"
      }
    ],
    "name": "TicketsMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lowTokenID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "highTokenID",
        "type": "uint256"
      }
    ],
    "name": "PaymentERC721RangeMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "tokenIDs",
        "type": "uint256[]"
      }
    ],
    "name": "PaymentERC721ListMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "paymentID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "name": "PaymentERC20Minted",
    "type": "event"
  }
]