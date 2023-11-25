pragma solidity >=0.4.22 <0.9.0;

contract Verification {
    mapping(address => bool) public verStatus;

    // address[16] public adopters;
    // Adopting a pet

// 
constructor() {
  verStatus[msg.sender] = false;
}

// Retrieving the verStatus
function getVerStatus() public view returns (bool) {
  return verStatus[msg.sender];
}

// Setting the verStatus
function setVerStatus(bool newStatus) public {
  verStatus[msg.sender] = newStatus;
}

// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}

}
