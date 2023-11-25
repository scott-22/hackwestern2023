pragma solidity >=0.4.22 <0.9.0;

contract Verification {
    address public cra;
    
    struct User {
      bool isVerified;
      string userInfo;
    }
    mapping(address => User) public users;
    // address[16] public adopters;

constructor() {
  cra = msg.sender;

  users[msg.sender].isVerified = true;
  users[msg.sender].userInfo = "cra";
}

// Retrieving the verStatus
function getIsVerified() public view returns (bool) {
  return users[msg.sender].isVerified;
}

// Retrieving the enid
function getUserInfo() public view returns (string memory) {
  return users[msg.sender].userInfo;
}

// Setting the verStatus
function verify() public {
  require(
    msg.sender == cra,
    "Only cra has right to verify"
  );
  users[msg.sender].isVerified = true;
}

/* Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
*/

}
