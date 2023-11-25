import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function CRApage() {
  const [isCRA, setIsCRA] = useState(false);
  const [targetAddr, setTargetAddr] = useState("");
  const [displayTargetAddr, setDisplayTargetAddr] = useState("");
  const [userData, setUserData] = useState("");

  const verifyIsCRA = useCallback(async () => {
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
    console.log(currentAddress)
    const craAddress = (await (await fetch(`http://127.0.0.1:3001/contract/minter-address`)).json()).address;
    console.log(craAddress)
    if (currentAddress === craAddress)
      setIsCRA(true);
  });

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

  const getContractUserInfo = useCallback(async (target) => {
    const { contract, address } = await getContract();
    try {
      const res = await contract.getUserInfo(target);
      if (res) {
        console.log(res);
        setUserData(res);
      } else {
        console.log("res empty");
        setUserData("No data found. User has never verified.");
      }
    } catch (err) {
      setUserData("User is still verified (in good standing). Unauthorized to read data.");
    }
    
    setDisplayTargetAddr(target);
  });

  const onTargetAddrChange = useCallback((event) => {
    let text = event.target.value;
    setTargetAddr(text);
  });

  const onTargetAddrSubmit = useCallback((event) => {
    event.preventDefault();
    if (targetAddr) {
      console.log(targetAddr);
      getContractUserInfo(targetAddr);
    }
  });

  useEffect(() => {
    verifyIsCRA();
  }, []);

  return isCRA ? (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center items-center mx-auto">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
            <h1 className="text-blue-800 text-4xl py-10">
              Revenue Agency Homepage
            </h1>
            <p className="text-lg text-blue-900">
              You may see personal data associated with an address if it is unverified.
            </p>
            <div className="mt-12 w-full">
              <h3 className="text-2xl mb-3">
                Check Personal Info
              </h3>
              <label className="text-lg text-blue-900 py-10">Target Address: </label>
              <input
                className="rounded-lg p-2 text-blue-900 text-lg backdrop-blur-sm bg-blue-200/30 w-4/5"
                value={targetAddr}
                onChange={onTargetAddrChange}
              />
              <button
                type="submit"
                onClick={onTargetAddrSubmit}
                className="text-blue-900 mt-2 ml-5 border-[1px] p-1 border-[#2a427e] hover:bg-[#2a427e] hover:text-white rounded-sm cursor-pointer"
              >
                Submit
              </button>
            </div>
            {userData &&
              <div className="mt-12 w-full">
                <h3 className="text-2xl mb-3">
                  Info for <span className="text-lg">{displayTargetAddr}</span>:
                </h3>
                <p className="text-lg text-blue-900">
                  {userData}
                </p>
              </div>
            }
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
            <h1 className="text-blue-700 text-3xl py-10">
              Error
            </h1>
            <p className="text-lg text-blue-900">
              You are not authorized to view this page.
            </p>
        </div>
      </div>
    </div>
  );
}

export default CRApage;
