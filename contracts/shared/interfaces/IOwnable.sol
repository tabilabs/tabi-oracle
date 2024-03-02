// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface IOwnable {
  function owner() external returns (address);

  function transferOwnership(address recipient) external;

  function acceptOwnership() external;
}
