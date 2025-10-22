import { hashSafeMessage } from "@safe-global/protocol-kit";
import { EIP712TypedData } from "@safe-global/types-kit";

const orderMessage: EIP712TypedData = {
  domain: {
    name: "Gnosis Protocol",
    version: "v2",
    chainId: 8453, // base
    verifyingContract: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41", // CoW Protocol settlement contract
  },
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Order: [
      { name: "sellToken", type: "address" },
      { name: "buyToken", type: "address" },
      { name: "receiver", type: "address" },
      { name: "sellAmount", type: "uint256" },
      { name: "buyAmount", type: "uint256" },
      { name: "validTo", type: "uint32" },
      { name: "appData", type: "bytes32" },
      { name: "feeAmount", type: "uint256" },
      { name: "kind", type: "string" },
      { name: "partiallyFillable", type: "bool" },
      { name: "sellTokenBalance", type: "string" },
      { name: "buyTokenBalance", type: "string" },
    ],
  },
  primaryType: "Order",
  message: {
    receiver: "0x0000000000000000000000000000000000000000",
    sellToken: "0x4200000000000000000000000000000000000006",
    buyToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    sellAmount: "10000000000000", // 10m dai
    buyAmount: "38741",
    validTo: 1761703450,
    appData:
      "0x0000000000000000000000000000000000000000000000000000000000000000", // keccak256("cow")
    feeAmount: "0",
    kind: "sell",
    partiallyFillable: true,
    sellTokenBalance: "erc20",
    buyTokenBalance: "erc20",
  },
};

const orderMessageHash = hashSafeMessage(orderMessage);

console.log("Order digest (safe protocol kit)", orderMessageHash);
