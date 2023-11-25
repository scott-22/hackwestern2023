pragma solidity >=0.4.22 <0.9.0;

contract Verification {
    address public cra;
    
    struct User {
      bool verStatus;
      string userInfo;
    }
    mapping(address => User) public users;
    // address[16] public adopters;

constructor() {
  cra = msg.sender;

  users[msg.sender].verStatus = true;
  users[msg.sender].userInfo = "cra";
}

// Retrieving the verStatus
function getVerStatus() public view returns (bool) {
  return users[msg.sender].verStatus;
}

// Retrieving the enid
function getEnid() public view returns (string memory) {
  return users[msg.sender].userInfo;
}

// Setting the verStatus
function verify() public {
  require(
    msg.sender == cra,
    "Only cra has right to verify"
  );
  users[msg.sender].verStatus = true;
}

/* Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
*/

}
