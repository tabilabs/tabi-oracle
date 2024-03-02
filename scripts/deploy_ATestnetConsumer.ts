import { ethers } from "hardhat";

async function main() {
  const ATestnetConsumer = await ethers.deployContract("ATestnetConsumer");

  await ATestnetConsumer.waitForDeployment();

  console.log("ATestnetConsumer:", ATestnetConsumer.target);

  const Operator = "0x590311669252DCF34bfbF3981747D13Cf09ec19A"
  const job = "5b507ee5e7af477ebf31d4efaa5ba85b"

  const result = await (await ATestnetConsumer.requestEthereumPrice(Operator, job)).wait()

  // @ts-ignore
  const ChainlinkRequested = ATestnetConsumer.interface.parseLog(result.logs[0])

  console.log("ChainlinkRequested:", ChainlinkRequested, result?.hash)


  // @ts-ignore
  await ATestnetConsumer.once("RequestEthereumPriceFulfilled", (_requestId, _price) => {
    console.log("_requestId:", _requestId, " price:", _price)
  })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
