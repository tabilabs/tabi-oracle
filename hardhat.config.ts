import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// The deployer key must be provided via the environment; a hardhat account entry
// that is empty causes an immediate, clear failure instead of a missing signer
// deep inside a script.
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY ?? "";

const COMPILER_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1000000,
  },
  metadata: {
    bytecodeHash: 'none',
  },
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    tabi: {
      url: process.env.TABI_RPC_URL ?? 'https://rpc.testnet.tabichain.com',
      chainId: 9789,
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : [],
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: COMPILER_SETTINGS,
      },
    ],
  },
};

export default config;
