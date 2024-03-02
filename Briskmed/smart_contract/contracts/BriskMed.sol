// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** 
 * @title BriskMed
 * @dev Implements Hospital registration, reviews and rating
 */
contract BriskMed is AccessControl, Ownable {

    bytes32 public constant HOSPITAL_ROLE = keccak256("HOSPITAL");

    event ProfileCreated(
        address indexed hospital,
        string name,
        string image,
        string desc,
        string location
    );

    modifier isHospital () {
        require(hasRole(HOSPITAL_ROLE, msg.sender), "Caller is not a Hospital");
        _;
    }


    struct profile {
       string name;
       address addr;
       uint256 avgRating;
       uint256 totalRating;
       string image;
       string location;
       string long;
       string lat;
       uint256 bed;
       string desc;
       string license;
       uint256 rateIndex;
    } 

    struct rating {
        string name;
        address userAddr;
        string review;
        uint256 rate;
    }

    /* User Types Arrays */
    address [] public allHospital;

    /* User profile mapping */
    mapping(address => profile) public HospitalProfile;
    
    mapping(address => rating []) public HospitalRating;

    constructor() {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createProfile(string memory _name, string memory _desc, string memory _location, string memory _lat, string memory _long, string memory _image, string memory _license) public {
         if(HospitalProfile[msg.sender].addr == address(0)){
            allHospital.push(msg.sender);
        }
        
        HospitalProfile[msg.sender].addr = msg.sender;
        HospitalProfile[msg.sender].name = _name;
        HospitalProfile[msg.sender].desc = _desc;
        HospitalProfile[msg.sender].image = _image;
        HospitalProfile[msg.sender].license = _license;
        HospitalProfile[msg.sender].location = _location;
        HospitalProfile[msg.sender].long = _long;
        HospitalProfile[msg.sender].lat = _lat;

        grantRole(HOSPITAL_ROLE, msg.sender);

        emit ProfileCreated(msg.sender, _name, _image, _desc, _location);
 
    }

    function postReview (address _hospital, string memory _name, string memory _review, uint256 _rate ) public {
        HospitalProfile[_hospital].rateIndex ++;    

        rating memory NewRating;
        NewRating.name = _name;
        NewRating.userAddr = msg.sender;
        NewRating.review = _review;
        NewRating.rate = _rate;

        HospitalProfile[_hospital].totalRating += _rate;

        HospitalProfile[_hospital].avgRating = HospitalProfile[_hospital].totalRating / HospitalProfile[_hospital].rateIndex;

        HospitalRating[_hospital].push(NewRating);
        
    }

    function updateStatus(uint256 _bed) public isHospital {
        HospitalProfile[msg.sender].bed = _bed;
    }
    
    
    /** Getter Functions */
    function getProfile(address _addr) public view returns (profile memory) {
        return HospitalProfile[_addr];
    }

    function getAllHospital() public view returns (address [] memory) {
        return allHospital;
    }

    function getReviews(address _addr) public view returns (rating [] memory) {
        return HospitalRating[_addr];
    }
   
}