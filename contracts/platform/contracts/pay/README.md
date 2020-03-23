
# Pay

The goal of the Immutable Pay smart contracts is to make processing on-chain sales faster, simpler and more flexible. Specifically, it aims to allow individual vendors to integrate with a simple API which lets them:

- receive any currency to pay for assets
- choose the currency in which their assets will be priced
- retrieve structured receipts for successful purchases

## One Function Integration



```
IPay processor;
bytes32 sku = bytes32(0);
uint qty = 1;
uint price = 100;


IPay.Charge memory charge = IPay.Charge({
    currency: IPay.Currency.ETH,
    amount: qty * price,
    token: address(0)
});

IPay.Order memory order = IPay.Order({
    currency: IPay.Currency.ETH,
    token: address(0),
    maxToken: 0,
    signedReceipt: null
});

processor.process(sku, qty, charge, receipt);
```

## Events





