import { ethers } from "hardhat";

async function main() {

    // Require explicit operator/node parameters: this script mutates the sender
    // allowlist of a live Operator, so it must never rely on stale defaults.
    const ChainNodeAddress = process.env.CHAIN_NODE_ADDRESS

    const OperatorAddress = process.env.OPERATOR_ADDRESS

    if (!OperatorAddress || !ethers.isAddress(OperatorAddress)) {
        throw new Error("Set OPERATOR_ADDRESS in the environment before updating authorized senders.")
    }
    if (!ChainNodeAddress || !ethers.isAddress(ChainNodeAddress)) {
        throw new Error("Set CHAIN_NODE_ADDRESS in the environment before updating authorized senders.")
    }

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
