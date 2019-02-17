pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/// @title ETHdenver 2019 Project: GeoHunter
/// @dev Contract Project will inherit the contracts Ownable and Pausable from the OpenZeppelin library
/// @dev Pausable is a circuit breaker which blocks all contract functions expect withdrawal by the owner
contract GeoHunter is Ownable, Pausable {

    // Global variables
    uint32 public totalTags;
    uint32 public totalUsers;
    uint32 public totalScans;

    // Events
    event balanceNowUpdated(uint256 _newBalance);
    event tagNowRegistered(uint32 _tagIndex, string _tagUid, string _ipfsHash, string _lat, string _long);
    event userNowRegistered(string _userDid, string _username);
    event userNowReset(string _userDid);
    event tagNowScanned(string userDid, string username, string tagUid, uint timestamp);

    // Structs & Mappings
    struct Tag {
        string Uid;
        string ipfsHash; // Could be a hash of a picture of the tag location
        string lat;
        string long;
    }
    mapping (string => uint32) private tagIndex; // 0 returned means tag UID is unregistered
    mapping (uint32 => Tag) public tagList; // Since index 0 means tag UID is unregistered, index 1 to 5 will be the five game tags

    struct User {
        string userDid;
        string username;
        uint8 progress;
        uint startTime;
        uint endTime;
    }
    mapping (string => uint32) private userIndex; // 0 returned means user DID is unregistered
    mapping (uint32 => User) public userList; // Since index 0 means user DID is unregistered, 1st user is index 1

    struct Scan {
        string userDid;
        string username;
        string tagUid;
        uint timestamp;
    }
    mapping (uint32 => Scan) public scanList;

    /// @dev Constructor
    /// @dev Initialize totals, and hardcode game with the details of 5 tags
    constructor() public {
        totalTags = 5; // Five tags are hardcoded into the constructor
        totalUsers = 3; // Three test users are hardcoded into the constructor
        totalScans = 0;

        //  Hardcoded details for a test user, index 1, who is registered but hasn't started yet
        userIndex["did:example:1123456789abcdefghi"] = 1;
        userList[1].userDid = "did:example:1123456789abcdefghi";
        userList[1].username = "Test User 1";
        userList[1].progress = 0;
        userList[1].startTime = 0;
        userList[1].endTime = 0;

        //  Hardcoded details for a test user, index 2, who is registered and almost finished the challenge
        userIndex["did:example:2123456789abcdefghi"] = 2;
        userList[2].userDid = "did:example:2123456789abcdefghi";
        userList[2].username = "Test User 2";
        userList[2].progress = 4;
        userList[2].startTime = 1550370000;
        userList[2].endTime = 0;

        //  Hardcoded details for a test user, index 3, who is registered and has completed the challenge
        userIndex["did:example:3123456789abcdefghi"] = 3;
        userList[3].userDid = "did:example:3123456789abcdefghi";
        userList[3].username = "Test User 3";
        userList[3].progress = 5;
        userList[3].startTime = 1550370000;
        userList[3].endTime = 1550371000;

        //  Hardcoded details for Tag index 1 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["16199909d0b5fd"] = 1; // Replace with actual UID
        tagList[1].Uid = "16199909d0b5fd"; // Replace with actual UID
        tagList[1].ipfsHash = "QmSHRv1r1Fb1TcefEebCxcLBUHmzQygoeWcZcXdUV7p5wX"; // Replace with actual IPFS hash
        tagList[1].lat = "";
        tagList[1].long = "";

        //  Hardcoded details for Tag index 2 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["26199909d0b5fd"] = 2; // Replace with actual UID
        tagList[2].Uid = "26199909d0b5fd"; // Replace with actual UID
        tagList[2].ipfsHash = "QmUmm1eWhQQzekyUqeYztzvCTSeDWYp1SvFRK2pvSjuubn"; // Replace with actual IPFS hash
        tagList[2].lat = "";
        tagList[2].long = "";

        //  Hardcoded details for Tag index 3 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["36199909d0b5fd"] = 3; // Replace with actual UID
        tagList[3].Uid = "36199909d0b5fd"; // Replace with actual UID
        tagList[3].ipfsHash = "QmZQx3e4mfD2gd1VyjivqjZnuhGLMTqWcRYw1DxqqBQejz"; // Replace with actual IPFS hash
        tagList[3].lat = "";
        tagList[3].long = "";

        //  Hardcoded details for Tag index 4 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["46199909d0b5fd"] = 4; // Replace with actual UID
        tagList[4].Uid = "46199909d0b5fd"; // Replace with actual UID
        tagList[4].ipfsHash = "QmNfQTDGcioQAqrvkJoXuw3qFuJtFuSpFEu3dnRM11YKNE"; // Replace with actual IPFS hash
        tagList[4].lat = "";
        tagList[4].long = "";

        //  Hardcoded details for Tag index 5 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["56199909d0b5fd"] = 5; // Replace with actual UID
        tagList[5].Uid = "56199909d0b5fd"; // Replace with actual UID
        tagList[5].ipfsHash = "QmVL6TXZoU6ggen8zsTeyCeP5y7VofngrG1Mogr12dv4jA"; // Replace with actual IPFS hash
        tagList[5].lat = "";
        tagList[5].long = "";
    }

    /// @dev Fallback function
    function () external payable {
    }

    /// @dev The owner can add ETH to the contract when the contract is not paused
    function addBalance()
        public
        payable
        onlyOwner
        whenNotPaused {
        emit balanceNowUpdated(address(this).balance);
    }

    /// @dev The owner can withdraw ETH from the contract when the contract is not paused
    /// @param amount Value to be withdrawn in wei
    function withdrawBalance (uint256 amount)
        public
        onlyOwner
        whenNotPaused {
        msg.sender.transfer(amount);
        emit balanceNowUpdated(address(this).balance);
    }

    /// @dev Register tags with a particular index number and IPFS hash
    /// @param _tagIndex Desired Tag Index - will overwrite previous tag registered to that index if existing
    ///     An index of 0 will create a new tag and increment the total tag count
    /// @param _tagUid Tag UID code
    /// @param _ipfsHash IPFS hash associated with the tag (could be a hash of a picture of the tag location)
    /// @param _lat Location (latitude) of tag
    /// @param _long Location (longitude) of tag
    function registerTag(
        uint32 _tagIndex,
        string memory _tagUid,
        string memory _ipfsHash,
        string memory _lat,
        string memory _long)
        public
        onlyOwner
        returns (bool)
        {
        require(_tagIndex <= totalTags, "Tag index cannot be greater than the current number of tags");
        uint32 newTagIndex;
        if (_tagIndex == 0) {
            totalTags++;
            newTagIndex = totalTags;
            tagIndex[_tagUid] = newTagIndex;
        }
        else {
            newTagIndex = _tagIndex;
        }

        tagList[newTagIndex].Uid = _tagUid;
        tagList[newTagIndex].ipfsHash = _ipfsHash;
        tagList[newTagIndex].lat = _lat;
        tagList[newTagIndex].long = _long;

        emit tagNowRegistered(_tagIndex, _tagUid, _ipfsHash, _lat, _long);
        return true;
    }

    /// @dev Register users with a unique index number and associated username
    /// @param _userDid User's uPort DID code
    /// @param _username User's uPort username
    function registerUser(
        string memory _userDid,
        string memory _username)
        public
        returns (bool)
        {
        require(userIndex[_userDid] == 0, "User already registered");
        totalUsers++;
        userIndex[_userDid] = totalUsers;

        userList[userIndex[_userDid]].userDid = _userDid;
        userList[userIndex[_userDid]].username = _username;
        userList[userIndex[_userDid]].progress = 0;
        userList[userIndex[_userDid]].startTime = 0;
        userList[userIndex[_userDid]].endTime = 0;

        emit userNowRegistered(_userDid, _username);
        return true;
    }

    /// @dev Resets a user
    /// @param _userDid User's uPort DID code
    function resetUser(string memory _userDid)
        public
        returns (bool)
        {
        require(userIndex[_userDid] > 0, "User not registered");

        userList[userIndex[_userDid]].progress = 0;
        userList[userIndex[_userDid]].startTime = 0;
        userList[userIndex[_userDid]].endTime = 0;

        emit userNowReset(_userDid);
        return true;
    }

    /// @dev Record the scanning of tags
    /// @param _userDid User's uPort DID code
    /// @param _username User's uPort username
    /// @param _tagUid Tag UID code
    function scanTag(
        string memory _userDid,
        string memory _username,
        string memory _tagUid)
        public
        returns (bool)
        {
        if (userIndex[_userDid] == 0) {
            require(registerUser(_userDid, _username), "User already registered"); // Register user if not already registered
        }

        string memory nextTagUid = tagList[userList[userIndex[_userDid]].progress + 1].Uid;
        if (keccak256(abi.encode(_tagUid)) == keccak256(abi.encode(nextTagUid))) {
            userList[userIndex[_userDid]].progress++; // Progress user if they have scanned the next tag
            if (userList[userIndex[_userDid]].progress == 1) {
                userList[userIndex[_userDid]].startTime == block.timestamp; // If tag is index 1 then record user's start time
            }
            if (userList[userIndex[_userDid]].progress == 5) {
                userList[userIndex[_userDid]].endTime == block.timestamp; // If tag is index 5 then record user's end time
            }
        }

        totalScans++;

        scanList[totalScans].userDid = _userDid;
        scanList[totalScans].username = _username;
        scanList[totalScans].tagUid = _tagUid;
        scanList[totalScans].timestamp = block.timestamp;

        emit tagNowScanned(_userDid, _username, _tagUid, block.timestamp);
        return true;
    }

    /// @dev Get the index and Uid for the next tag the user requires
    /// @param _userDid User's uPort DID code
    /// @param _nextTagIndex The index number for the next tag the user requires (1 to 5; 6 means user is done)
    /// @param _nextTagUid Tag UID code for the next tag the user requires
    function nextTagRequired(string memory _userDid)
        public
        view
        returns (
        uint32 _nextTagIndex,
        string memory _nextTagUid,
        string memory _nextTagIpfsHash,
        bool _success)
        {
        if(userIndex[_userDid] == 0) {
            _nextTagIndex = 1;
        }
        else {
            _nextTagIndex = userList[userIndex[_userDid]].progress + 1;
        }
        _nextTagUid = tagList[_nextTagIndex].Uid;
        _nextTagIpfsHash = tagList[_nextTagIndex].ipfsHash;

        _success = true;
    }

    /// @dev Returns the current total number of tags registered
    /// @param _totalTags Current total number of tags registered
    function getTotalTags()
        public
        view
        returns (uint32 _totalTags)
        {
        _totalTags = totalTags;
    }

    /// @dev Returns the current total number of users registered
    /// @param _totalUsers Current total number of users registered
    function getTotalUsers()
        public
        view
        returns (uint32 _totalUsers)
        {
        _totalUsers = totalUsers;
    }

    /// @dev Returns the current total number of scans
    /// @param _totalScans Current total number of scans
    function getTotalScans()
        public
        view
        returns (uint32 _totalScans)
        {
        _totalScans = totalScans;
    }

    /// @dev Returns the requested user data by index
    function getUser(uint32 _userIndex)
        public
        view
        returns (
        string memory _userDid,
        string memory _username,
        uint8 _progress,
        uint _startTime,
        uint _endTime)
        {
        _userDid = userList[_userIndex].userDid;
        _username = userList[_userIndex].username;
        _progress = userList[_userIndex].progress;
        _startTime = userList[_userIndex].startTime;
        _endTime = userList[_userIndex].endTime;
    }

    /// @dev Returns the requested tag data by index
    function getTag(uint32 _tagIndex)
        public
        view
        returns (
        string memory _Uid,
        string memory _ipfsHash,
        string memory _lat,
        string memory _long)
        {
        _Uid = tagList[_tagIndex].Uid;
        _ipfsHash = tagList[_tagIndex].ipfsHash;
        _lat = tagList[_tagIndex].lat;
        _long = tagList[_tagIndex].long;
    }

    /// @dev Returns the requested scan data by index
    function getScan(uint32 _scanIndex)
        public
        view
        returns (
        string memory _userDid,
        string memory _username,
        string memory _tagUid,
        uint _timestamp)
        {
        _userDid = scanList[_scanIndex].userDid;
        _username = scanList[_scanIndex].username;
        _tagUid = scanList[_scanIndex].tagUid;
        _timestamp = scanList[_scanIndex].timestamp;
    }

}
