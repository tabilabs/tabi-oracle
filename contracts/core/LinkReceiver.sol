// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

abstract contract LinkReceiver {
  /**
   * @notice Called when LINK is sent to the contract via `onReceiver`
   * @dev The data payload's first 2 words will be overwritten by the `sender` and `amount`
   * values to ensure correctness. Calls oracleRequest.
   * @param sender Address of the sender
   * @param amount Amount of LINK sent (specified in wei)
   * @param data Payload of the transaction
   */
  function onReceiver(
    address sender,
    uint256 amount,
    bytes memory data
  ) public permittedFunctionsForLINK(data) {
    assembly {
      // solhint-disable-next-line avoid-low-level-calls
      mstore(add(data, 36), sender) // ensure correct sender is passed
      // solhint-disable-next-line avoid-low-level-calls
      mstore(add(data, 68), amount) // ensure correct amount is passed
    }
    // solhint-disable-next-line avoid-low-level-calls
    (bool success, ) = address(this).delegatecall(data); // calls oracleRequest
    require(success, "Unable to create request");
  }

  /**
   * @notice Validate the function called on token transfer
   */
  function _validateTokenTransferAction(bytes4 funcSelector, bytes memory data) internal virtual;

  /**
   * @dev Reverts if the given data does not begin with the `oracleRequest` function selector
   * @param data The data payload of the request
   */
  modifier permittedFunctionsForLINK(bytes memory data) {
    bytes4 funcSelector;
    assembly {
      // solhint-disable-next-line avoid-low-level-calls
      funcSelector := mload(add(data, 32))
    }
    _validateTokenTransferAction(funcSelector, data);
    _;
  }
}
