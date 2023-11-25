import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function Login() {
  const [loggedin, setLoggedin] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  return (
    <form>
      <label for="name">Name:</label>
      <input type="text"></input>
      <input type="button"></input>
    </form>
  );
}

export default Login;