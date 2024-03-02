pragma solidity ^0.7.6;

interface LinkReceiverInterface {
  function onReceiver(address _sender, uint _value, bytes memory _data) external;
}
