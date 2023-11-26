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

  const handleChangeSignup = async (event) => {
    const inputname = event.target.value;
    setName(inputname);
    console.log(inputname);
  }

  const handleSubmitSignup = async (event) => {
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
    /*<form className = 'signUp' onSubmit= {handleSubmitSignUp}>
      <label>Name:</label>
      <input type="text" onChange={handleChangeSignup}></input>
      <input type="submit" value="Sign Up"/>
    </form>*/

    <div
      className="bg-gray-100 font-sans h-screen flex items-center"
      style={{ margin: '0 auto' }}
    >
      <div
        className="bg-white p-8 rounded shadow-md w-96"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <form className="text-left flex flex-wrap" onSubmit={handleSubmitSignup}>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChangeSignup}
            />
          </div>

          <div className="mb-8 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Proof of identity:
            </label>
            <input
              type="text"
              id="verification"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="block mx-auto bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          
          <button
            type="button"
            className="block mx-auto bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;