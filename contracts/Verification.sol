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

  // Retrieving the target's verification status
  function getIsVerified(address target) public view returns (bool) {
    return users[target].isVerified;
  }

  // Retrieving the target's userInfo
  function getUserInfo(address target) public view returns (string memory) {
    return users[target].userInfo;
  }

  // Unverify target
  function verify(address target) public {
    require(
      msg.sender == cra,
      "Only cra has right to verify"
    );
    users[target].isVerified = true;
  }

  // Unverify target
  function unverify(address target) public {
    require(
      msg.sender == cra,
      "Only cra has right to unverify"
    );
    users[target].isVerified = false;
  }

/* Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
*/

}