pragma solidity >=0.4.22 <0.9.0;

contract Verification {
    address public cra;
    
    struct User {
      bool verStatus;
      string enid;
    }
    mapping(address => User) public users;
    // address[16] public adopters;

constructor() {
  cra = msg.sender;

  users[msg.sender].verStatus = true;
  users[msg.sender].enid = "cra";
}

// Retrieving the verStatus
function getVerStatus() public view returns (bool) {
  return users[msg.sender].verStatus;
}

// Retrieving the enid
function getEnid() public view returns (string) {
  return users[msg.sender].enid;
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
