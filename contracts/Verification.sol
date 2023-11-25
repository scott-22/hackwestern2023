pragma solidity >=0.4.22 <0.9.0;

contract Verification {
    address public cra;
    
    struct User {
      bool isVerified;
      string userInfo;
    }
    mapping(address => User) public users;

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
    require(
      msg.sender == cra,
      //getIsVerified(target) == false,
      "Only cra has right to getUserInfo"
    );
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

}
