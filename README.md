## Message Hash Computations via SDKs (Instructions)
1. Install dependencies.
```bash
pnpm install
```

2. To compute order digest via `@cowprotocol/cow-sdk` do:
```bash
npx ts-node cow.ts
```

The result should be:
```
Order digest (cow-sdk): 0xf0271511cbd32089efbe9f28f54c86aa2daa77ceb57ad329ebb1d0e1ef5ca410
```

3. To compute order digest via `@safe-global/protocol-kit` do:
```
npx ts-node safe.ts
```

The result should be:
```
Order digest (safe protocol kit) 0xf0271511cbd32089efbe9f28f54c86aa2daa77ceb57ad329ebb1d0e1ef5ca410
```

### Message Hash Computation via Safe Transaction Service (Instructions)
1. Use the `POST /tx-service/base/api/v1/safes/{address}/messages/` route at https://api.safe.global/tx-service/base with the following request body
```json
{
  "message": {
    "types": {
      "Order": [
        {
          "name": "sellToken",
          "type": "address"
        },
        {
          "name": "buyToken",
          "type": "address"
        },
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "sellAmount",
          "type": "uint256"
        },
        {
          "name": "buyAmount",
          "type": "uint256"
        },
        {
          "name": "validTo",
          "type": "uint32"
        },
        {
          "name": "appData",
          "type": "bytes32"
        },
        {
          "name": "feeAmount",
          "type": "uint256"
        },
        {
          "name": "kind",
          "type": "string"
        },
        {
          "name": "partiallyFillable",
          "type": "bool"
        },
        {
          "name": "sellTokenBalance",
          "type": "string"
        },
        {
          "name": "buyTokenBalance",
          "type": "string"
        }
      ],
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ]
    },
    "domain": {
      "name": "Gnosis Protocol",
      "chainId": 8453,
      "version": "v2",
      "verifyingContract": "0x9008D19f58AAbD9eD0D60971565AA8510560ab41"
    },
    "message": {
      "receiver": "0x0000000000000000000000000000000000000000",
      "sellToken": "0x4200000000000000000000000000000000000006",
      "buyToken": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "sellAmount": "10000000000000", 
      "buyAmount": "38741",
      "validTo": 1761703450,
      "appData": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "feeAmount": "0",
      "kind": "sell",
      "partiallyFillable": true,
      "sellTokenBalance": "erc20",
      "buyTokenBalance": "erc20"
    },
    "primaryType": "Order"
  },
  "signature": "0x0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101",
  "safeAppId": 0
   
}
```

The computed message hash is: `0x96616f5cbd00a7796a79ea0efac8251fc80d0a567a337510905a279bf543f806` which is inconsistent with the message hashes computed by the SDKs. 
