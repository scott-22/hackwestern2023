import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function Login() {
  const [loggedin, setLoggedin] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  async function logMovies() {
    const response = await fetch("http://localhost:3001/login");
    const userdata = await response.json();
    console.log(userdata);
  }

  return (
    <form>
      <label>Name:</label>
      <input type="text"></input>
      <input type="submit" onClick={logMovies}></input>
    </form>
  );
}

export default Login;