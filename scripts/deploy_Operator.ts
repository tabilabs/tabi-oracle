import { ethers } from "hardhat";

async function main() {
  const [ owner] = await ethers.getSigners();

  console.log("owner:", owner.address);

  const Operator = await ethers.deployContract("Operator", [owner.address]);

  await Operator.waitForDeployment();

  console.log("Operator:", Operator.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
