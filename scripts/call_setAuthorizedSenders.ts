import { ethers } from "hardhat";

async function main() {

    const ChainNodeAddress = "0x1955a15c0eB68441baAb3DcD651E3814c67D4871"

    const OperatorAddress = "0x590311669252DCF34bfbF3981747D13Cf09ec19A"

    const Operator = await ethers.getContractAt("Operator", OperatorAddress)

    await (await Operator.setAuthorizedSenders([ ChainNodeAddress ])).wait()

    console.log("isAuthorizedSender:", await Operator.isAuthorizedSender(ChainNodeAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
