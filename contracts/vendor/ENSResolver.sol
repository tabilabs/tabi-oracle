pragma solidity ^0.7.6;

interface ENSResolver {
  function addr(bytes32 node) external view returns (address);
}
