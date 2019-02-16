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
    event tagNowRegistered(uint32 _tagIndex, string _tagDid, uint256 _ipfsHash);
    event userNowRegistered();
    event tagNowScanned(string userDid, string username, string tagDid, string timestamp);

    struct Tag {
        bool registered;
        string Did;
        uint256 ipfsHash; // Could be a hash of a picture of the tag location 
    }
    mapping (string => uint32) private tagIndex; // 0 returned means tag DID is unregistered
    mapping (uint32 => Tag) private tagList; // Since index 0 means tag DID is unregistered, index 1 to 5 will be the five game tags

    struct User {
        bool registered;
        string userDid;
        string username;
        uint8 progress;
        string startTime;
        string endTime;
    }
    mapping (string => uint32) private userIndex; // 0 returned means user DID is unregistered
    mapping (uint32 => User) private userList; // Since index 0 means user DID is registered, 1st user is index 1

    struct Scan {
        string userDid;
        string username;
        string tagDid;
        string timestamp;
    }
    mapping (uint32 => Scan) private scanList;
    // Scan[] private scans;

    /// @dev Constructor
    constructor() public {
        totalTags = 0;
        totalUsers = 0;
        totalScans = 0;
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

    /// @dev Register NFC tags with a particular index number and IPFS hash 
    /// @param _tagIndex Desired Tag Index - will overwrite previous tag registered to that index if existing 
    /// @param _tagDid NFC Tag DID code 
    /// @param _ipfsHash IPFS hash associated with the NFC tag (could be a hash of a picture of the tag location)
    function registerTag(uint32 _tagIndex, string memory _tagDid, uint256 _ipfsHash) public {
        onlyOwner;
        require(_tagIndex > 0, "Tag index cannot be 0");
        if (tagIndex[_tagDid] == 0) {
            tagIndex[_tagDid] = _tagIndex;
            tagList[_tagIndex].registered == true;
            totalTags++;
        }
        tagList[_tagIndex].Did = _tagDid;
        tagList[_tagIndex].ipfsHash = _ipfsHash;
        emit tagNowRegistered(_tagIndex, _tagDid, _ipfsHash);
    }

    function registerUser(string memory _userDid, string memory _username) public returns (bool) {
        require(userIndex[_userDid] == 0, "User already registered");
        totalUsers++;
        userIndex[_userDid] = totalUsers;
        
        userList[userIndex[_userDid]].registered = true;
        userList[userIndex[_userDid]].userDid = _userDid;
        userList[userIndex[_userDid]].username = _username;
        userList[userIndex[_userDid]].progress = 0;
        userList[userIndex[_userDid]].startTime = "";
        userList[userIndex[_userDid]].endTime = "";

        return true;
    }


    /// @dev Record the scanning of NFC tags 
    /// @param _userDid User's uPort DID code
    /// @param _username User's uPort username
    /// @param _tagDid NFC Tag DID code 
    /// @param _timestamp Time of scanning event 
    function scanTag(string memory _userDid, string memory _username, string memory _tagDid, string memory _timestamp) public {
        if (userIndex[_userDid] == 0) {
            registerUser(_userDid, _username);
        }
        
        string memory firstTagIndexDidInstance = tagList[1].Did;
        if ((userList[userIndex[_userDid]].registered == false) && 
            (keccak256(abi.encode(_tagDid)) == keccak256(abi.encode(firstTagIndexDidInstance)))) {
            userList[userIndex[_userDid]].registered == true;
            totalUsers++;
        }

        string memory nextTagIndexDidInstance = tagList[userList[userIndex[_userDid]].progress + 1].Did;
        if (keccak256(abi.encode(_tagDid)) == keccak256(abi.encode(nextTagIndexDidInstance))) {
            userList[userIndex[_userDid]].progress++;
        }

        totalScans++;
        emit tagNowScanned(_userDid, _username, _tagDid, _timestamp);
    }


}
