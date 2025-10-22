import {
  hashOrder,
  TypedDataDomain,
  OrderKind,
  OrderBalance,
  TradingSdk,
  normalizeOrder,
} from "@cowprotocol/cow-sdk";
import { ContractsOrder } from "@cowprotocol/sdk-contracts-ts";
import { createPublicClient, Chain, http } from "viem";
import { ViemAdapter } from "@cowprotocol/sdk-viem-adapter";
import { base } from "viem/chains";

const appCode = "Mezzanine";

const adapter = new ViemAdapter({
  provider: createPublicClient({
    chain: base as Chain,
    transport: http(""),
  }),
});

const sdk = new TradingSdk(
  {
    chainId: 8453,
    appCode,
  },
  {},
  adapter,
);

// Define an order
const order: ContractsOrder = {
  sellToken: "0x4200000000000000000000000000000000000006", // dai
  buyToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // cow
  sellAmount: "10000000000000", // 10m dai
  buyAmount: "38741",
  validTo: 1761703450,
  appData: "0x0000000000000000000000000000000000000000000000000000000000000000", // keccak256("cow")
  feeAmount: "0",
  kind: OrderKind.SELL,
  partiallyFillable: true,
  sellTokenBalance: OrderBalance.ERC20,
  buyTokenBalance: OrderBalance.ERC20,
};

const normalizedOrder = normalizeOrder(order);

// console.log(`Normalized Order: ${JSON.stringify(normalizedOrder, null, 2)}`);

const domain: TypedDataDomain = {
  name: "Gnosis Protocol",
  version: "v2",
  chainId: 8453,
  verifyingContract: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41", // CoW Protocol settlement }
};

// hash the order to generate the order digest
const digest = hashOrder(domain, order);

// output the digest
console.log(`Order digest (cow-sdk): ${digest}`);
