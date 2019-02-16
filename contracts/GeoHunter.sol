pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/// @title ETHdenver Project: Supply Chain App
/// @dev Contract Project will inherit the contracts Ownable and Pausable from the OpenZeppelin libarary
/// @dev Pausable is a circuit breaker which blocks all contract functions expect withdrawl by the owner 
contract GeoHunter is Ownable, Pausable {

    // Global variables
    uint32 public totalTags;
    uint32 public totalUsers;
    uint32 public totalScans;
    
    // Events
    event balanceNowUpdated(uint _newBalance);
    event tagNowRegistered(address _owner);
    event tagNowScanned(address _scanner, string _long, string _lat, string _timestamp, uint256 _itemId);

    struct Tag {
        string Did;
        uint256 ipfsHash; // Can be a hash of a picture of the tag location 
    }
    mapping (uint32 => Tag) private tagsList; // 0 to 4 will be the five game tags
    // Tag[] private tags;

    struct Scan {
        string userDid;
        string username;
        string tagDid;
        string timestamp;
    }
    Scan[] private scans;

    mapping (string => bool) private userRegistered;
    mapping (string => bool) private tagRegistered;



    constructor() public {
    }

    /// @dev Fallback function
    function () external payable {
    } 

    /// @dev The owner can add ETH to the contract when the contract is not paused
    function addBalance() public payable 
        onlyOwner
        whenNotPaused {
        emit balanceNowUpdated(address(this).balance);   
    }

    /// @dev The owner can withdraw ETH from the contract when the contract is not paused
    /// @param amount Value to be withdrawn in wei
    function withdrawBalance (uint amount) public 
        onlyOwner
        whenNotPaused {
        msg.sender.transfer(amount);
        emit balanceNowUpdated(address(this).balance);  
    }

    function registerTag(uint32 _tagIndex, string memory _tagDid, uint256 _ipfsHash) public {
        onlyOwner;
        if (tagRegistered[_tagDid] == false) {
            tagRegistered[_tagDid] == true;
            totalTags++;
        }
        
        tagsList[_tagIndex].Did = _tagDid;
        tagsList[_tagIndex].ipfsHash = _ipfsHash;


    }

    // function scanTag() public {
    //     if 
    // }





}
