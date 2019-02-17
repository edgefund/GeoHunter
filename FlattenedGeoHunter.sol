
// File: openzeppelin-solidity/contracts/ownership/Ownable.sol

pragma solidity ^0.5.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * @notice Renouncing to ownership will leave the contract without an owner.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// File: openzeppelin-solidity/contracts/access/Roles.sol

pragma solidity ^0.5.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev give an account access to this role
     */
    function add(Role storage role, address account) internal {
        require(account != address(0));
        require(!has(role, account));

        role.bearer[account] = true;
    }

    /**
     * @dev remove an account's access to this role
     */
    function remove(Role storage role, address account) internal {
        require(account != address(0));
        require(has(role, account));

        role.bearer[account] = false;
    }

    /**
     * @dev check if an account has this role
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0));
        return role.bearer[account];
    }
}

// File: openzeppelin-solidity/contracts/access/roles/PauserRole.sol

pragma solidity ^0.5.0;


contract PauserRole {
    using Roles for Roles.Role;

    event PauserAdded(address indexed account);
    event PauserRemoved(address indexed account);

    Roles.Role private _pausers;

    constructor () internal {
        _addPauser(msg.sender);
    }

    modifier onlyPauser() {
        require(isPauser(msg.sender));
        _;
    }

    function isPauser(address account) public view returns (bool) {
        return _pausers.has(account);
    }

    function addPauser(address account) public onlyPauser {
        _addPauser(account);
    }

    function renouncePauser() public {
        _removePauser(msg.sender);
    }

    function _addPauser(address account) internal {
        _pausers.add(account);
        emit PauserAdded(account);
    }

    function _removePauser(address account) internal {
        _pausers.remove(account);
        emit PauserRemoved(account);
    }
}

// File: openzeppelin-solidity/contracts/lifecycle/Pausable.sol

pragma solidity ^0.5.0;


/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is PauserRole {
    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    constructor () internal {
        _paused = false;
    }

    /**
     * @return true if the contract is paused, false otherwise.
     */
    function paused() public view returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!_paused);
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(_paused);
        _;
    }

    /**
     * @dev called by the owner to pause, triggers stopped state
     */
    function pause() public onlyPauser whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @dev called by the owner to unpause, returns to normal state
     */
    function unpause() public onlyPauser whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}

// File: contracts/GeoHunter.sol

pragma solidity ^0.5.0;



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
        tagList[1].ipfsHash = "1mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; // Replace with actual IPFS hash
        tagList[1].lat = "";
        tagList[1].long = "";

        //  Hardcoded details for Tag index 2 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["26199909d0b5fd"] = 2; // Replace with actual UID
        tagList[2].Uid = "26199909d0b5fd"; // Replace with actual UID
        tagList[2].ipfsHash = "2mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; // Replace with actual IPFS hash
        tagList[2].lat = "";
        tagList[2].long = "";

        //  Hardcoded details for Tag index 3 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["36199909d0b5fd"] = 3; // Replace with actual UID
        tagList[3].Uid = "36199909d0b5fd"; // Replace with actual UID
        tagList[3].ipfsHash = "3mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; // Replace with actual IPFS hash
        tagList[3].lat = "";
        tagList[3].long = "";

        //  Hardcoded details for Tag index 4 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["46199909d0b5fd"] = 4; // Replace with actual UID
        tagList[4].Uid = "46199909d0b5fd"; // Replace with actual UID
        tagList[4].ipfsHash = "4mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; // Replace with actual IPFS hash
        tagList[4].lat = "";
        tagList[4].long = "";

        //  Hardcoded details for Tag index 5 (tag UID, IPFS hash, and location latitude and longitude)
        tagIndex["56199909d0b5fd"] = 5; // Replace with actual UID
        tagList[5].Uid = "56199909d0b5fd"; // Replace with actual UID
        tagList[5].ipfsHash = "5mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"; // Replace with actual IPFS hash
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
        bool _success)
        {
        require(userIndex[_userDid] > 0, "User not registered");
        _nextTagIndex = userList[userIndex[_userDid]].progress + 1;
        _nextTagUid = tagList[_nextTagIndex].Uid;
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
