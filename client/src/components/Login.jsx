import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";


function Login() {
  const [loggedin, setLoggedin] = useState(false);
  const [address, setAddress] = useState("");
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");

  const getContract = useCallback(async () => {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
    }

    console.log("Getting contract");

    const contractAddress = (await (await fetch(`http://127.0.0.1:3001/contract/contract-address`)).json()).address;
    const abi = await (await fetch(`http://127.0.0.1:3001/contract/abi`)).json();

    await window.ethereum.send('eth_requestAccounts');
    const currentAddress = (await provider.listAccounts())[0].address;

    const contract = new ethers.Contract(contractAddress, abi, signer);
    return { contract: contract, address: currentAddress };
  });

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

    return currentAddress;
}, []);

  const makeAccount = async (e) => {
    e.preventDefault()

    if (name === "" || identity === "" ) {
      window.alert("You need to provide a valid name and identification!")
    } else {
      const { contract, address } = await getContract()
      console.log("creating user")
      const res1 = await fetch("http://localhost:3001/users/adduser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address: address, identity: identity, name: name})
      });
      console.log("verifying user")

      const res2 = await fetch("http://localhost:3001/contract/verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address: address})
      });
      console.log("setting data")
      // await contract.testData(name + ": " + identity);
      // const res3 = await fetch("http://localhost:3001/contract/set-data", {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({address: address, info: name + ": " + identity})
      // });

      console.log("all done")

      if (res1.ok && res2.ok) {
        window.location.reload(false)
      }
    }
  }

  const changeName = (event) => {
    const inputname = event.target.value;
    setName(inputname);
  }


  const changeIdentity = (event) => {
    const inputIdentity = event.target.value;
    setIdentity(inputIdentity)
  }



  useEffect(() => {
    getAddress().then(data => (setAddress(data)))
  }, [])
  

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
        <form className="text-left flex flex-wrap" onSubmit={makeAccount}>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={changeName}
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
              onChange={changeIdentity}
            />
          </div>

          <button
            type="submit"
            className="block mx-auto bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          
          
        </form>
      </div>
    </div>
  );
}

export default Login;