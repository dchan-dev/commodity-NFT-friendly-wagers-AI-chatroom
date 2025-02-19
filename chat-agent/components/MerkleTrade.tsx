import { MerkleClient, MerkleClientConfig } from "@merkletrade/ts-sdk";
import { Aptos } from "@aptos-labs/ts-sdk";

// initialize clients

const merkle = new MerkleClient(await MerkleClientConfig.testnet());
const aptos = new Aptos(merkle.config.aptosConfig);

// initialize account (refer to Aptos docs)

const account = ...

// Place a market order

const order = await merkle.payloads.placeMarketOrder({
  pair: "BTC_USD",
  userAddress: account.accountAddress,
  sizeDelta: 300_000_000n, // 300 USDC
  collateralDelta: 5_000_000n, // 5 USDC
  isLong: true,
  isIncrease: true,
});

// submit transaction

const committedTransaction = await aptos.transaction.build
  .simple({ sender: account.accountAddress, data: payload })
  .then((transaction) =>
    aptos.signAndSubmitTransaction({ signer: account, transaction }),
  )
  .then(({ hash }) => aptos.waitForTransaction({ transactionHash: hash }));

console.log(committedTransaction);
console.log("Successfully placed order!");