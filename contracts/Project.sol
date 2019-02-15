pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/// @title ETHdenver Project: Supply Chain App
/// @dev Contract Project will inherit the contracts Ownable and Pausable from the OpenZeppelin libarary
/// @dev Pausable is a circuit breaker which blocks all contract functions expect withdrawl by the owner 
contract Project is Ownable, Pausable {

    event balanceUpdated(uint _newBalance);

    constructor() public {
    }

    /// @dev Fallback function
    function () external payable {
    } 

    /// @dev The owner can add ETH to the contract when the contract is not paused
    function addBalance() public payable 
        onlyOwner
        whenNotPaused {
        emit balanceUpdated(address(this).balance);   
    }

    /// @dev The owner can withdraw ETH from the contract when the contract is not paused
    /// @param amount Value to be withdrawn in wei
    function withdrawBalance (uint amount) public 
        onlyOwner
        whenNotPaused {
        msg.sender.transfer(amount);
        emit balanceUpdated(address(this).balance);  
    }






}
