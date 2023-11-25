import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function Login() {
  const API_URL = "http://localhost:3001/login";

  const [loggedin, setLoggedin] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  /*
  getAddress = async () => {
    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let current_address = (await provider.listAccounts())[0];
    console.log(current_address);

    return current_address;
  } */

  const getAddress = useCallback(async () => {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
    }

    await window.ethereum.send('eth_requestAccounts');
    const currentAddress = (await provider.listAccounts())[0].address;
    console.log(currentAddress);
    return currentAddress;
  }, []);

  /*
  async function logMovies() {
    const response = await fetch("http://localhost:3001/login");
    const userdata = await response.json();
    
    console.log(userdata);
  }

  function submitButton(e) {
    logMovies();
    e.preventDefault();
  } */

  const handleChangeSignin = async (event) => {
    const inputname = event.target.value;
    setName(inputname);
    console.log(inputname);
  }

  const handleSubmitSignin = async (event) => {
    event.preventDefault();

    const address = await this.getAddress();
    try {
      const response = await fetch(API_URL);
    
      const userinput = await response.json;
      console.log(userinput);
      setName(userinput);
      setAddress(address);
      setLoggedin(true);
    } catch (err) {
      console.log(err.stack)
    }    
  }

  return (
    <form className = 'signIn' onSubmit= {this.handleSubmitSignin}>
      <label>Name:</label>
      <input type="text" onChange={this.handleChangeSignin}></input>
      <input type="submit" value="Sign In"/>
    </form>
  );
}

export default Login;