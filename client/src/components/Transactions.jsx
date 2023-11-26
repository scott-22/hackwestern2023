import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function Transaction() {
  const [address, setAddress] = useState("");
  const [targetAddr, setTargetAddr] = useState("");
  const [value, setValue] = useState(0);

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

  const setCurrentAddress = useCallback(async () => {
    const address = await getAddress();
    setAddress(address);
  });

  const initiateTransaction = useCallback(async (address, target, value) => {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
    }

    const contract = await getContract();
    
    // Initiate send
    await signer.sendTransaction({
      to: target,
      value: value
    });

    // Evaluate verification status
    const isAddressVerified = await contract.getIsVerified(address);
    const isTargetVerified = await contract.getIsVerified(target);
    if (!(isAddressVerified && isTargetVerified)) {
      if (isAddressVerified) {
        await fetch(`http://127.0.0.1:3001/contract/unverify`, {
          method: "POST",
          body: JSON.stringify({address: address})
        });
      }
      if (isTargetVerified) {
        await fetch(`http://127.0.0.1:3001/contract/unverify`, {
          method: "POST",
          body: JSON.stringify({address: target})
        });
      }
    }
  });

  const onTargetAddrChange = useCallback((event) => {
    let text = event.target.value;
    setTargetAddr(text);
  });

  const onValueChange = useCallback((event) => {
    let eth = parseInt(event.target.value);
    setValue(eth);
  });

  const onEtherFormSubmit = useCallback((event) => {
    event.preventDefault();
    if (targetAddr && value) {
      console.log(targetAddr);
      console.log(value);
      initiateTransaction(address, targetAddr, value);
    }
  });

  useEffect(() => {
    setCurrentAddress();
  }, []);

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
            <h1 className="text-blue-700 text-3xl py-10">
              Welcome back, <span className="text-lg">{address}</span>
            </h1>
            <p className="text-lg text-blue-900">
              Make transactions below. Be careful - don't lose your verification status!
            </p>
            <div className="mt-12 w-full">
              <h3 className="text-2xl mb-3">
                Send Ether
              </h3>
              <div>
                <label className="text-lg text-blue-900 py-10">Target Address: </label>
                <input
                  className="rounded-lg p-2 text-blue-900 text-lg backdrop-blur-sm bg-blue-200/30 w-4/5"
                  value={targetAddr}
                  onChange={onTargetAddrChange}
                />
              </div>
              <div>
                <label className="text-lg text-blue-900 py-10">Value: </label>
                <input
                  className="rounded-lg p-2 text-blue-900 text-lg backdrop-blur-sm bg-blue-200/30 w-4/5"
                  value={value}
                  onChange={onValueChange}
                />
              </div>
              <button
                type="submit"
                onClick={onEtherFormSubmit}
                className="text-blue-900 mt-2 ml-5 border-[1px] p-1 border-[#2a427e] hover:bg-[#2a427e] hover:text-white rounded-sm cursor-pointer"
              >
                Submit
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction;