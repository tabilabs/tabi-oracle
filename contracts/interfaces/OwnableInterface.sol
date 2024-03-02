// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface OwnableInterface {
  function owner() external returns (address);

  function transferOwnership(address recipient) external;

  function acceptOwnership() external;
}
