export const S1Sale = [
  {
    "constant": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "contract IS1Vendor",
            "name": "vendor",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "enum PurchaseProcessor.Currency",
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
            "internalType": "struct PurchaseProcessor.PaymentParams",
            "name": "payment",
            "type": "tuple"
          }
        ],
        "internalType": "struct S1Sale.ProductPurchaseRequest[]",
        "name": "_requests",
        "type": "tuple[]"
      },
      {
        "internalType": "address payable",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "purchase",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
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
        "components": [
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "contract IS1Vendor",
            "name": "vendor",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "enum PurchaseProcessor.Currency",
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
            "internalType": "struct PurchaseProcessor.PaymentParams",
            "name": "payment",
            "type": "tuple"
          }
        ],
        "internalType": "struct S1Sale.ProductPurchaseRequest[]",
        "name": "_requests",
        "type": "tuple[]"
      },
      {
        "internalType": "address payable",
        "name": "_referrer",
        "type": "address"
      }
    ],
    "name": "purchaseFor",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]