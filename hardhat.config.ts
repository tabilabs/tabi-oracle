import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
      url: 'https://rpc.testnet.tabichain.com',
      chainId: 9789,
      accounts: ['PRIVATE_KEY'],
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
