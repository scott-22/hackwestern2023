import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function Overviewpage() {
  const [addressData, setAddressData] = useState(null);

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
  }, []);

  const getVerificationStatuses = useCallback(async () => {
    const { contract, address } = await getContract();
    const addresses = await (await fetch(`http://127.0.0.1:3001/contract/all-addresses`)).json();
    
    let data = [];
    for (const addr of addresses) {
      const res = await contract.getIsVerified(addr);
      data.push({ address: addr, status: res });
    }

    setAddressData(data);
  }, []);

  useEffect(() => {
    getVerificationStatuses();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center items-center mx-auto">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
            <h1 className="text-blue-700 text-4xl py-10">
              Simulation Overview
            </h1>
            <p className="text-lg text-blue-900">
              See verification statuses for the local testing blockchain.
            </p>

            {addressData &&
              <ul>
                {addressData.map((user) => 
                  <li key={user.address} className="my-3">
                    <p>{user.address}</p>
                    <p className={`font-bold ${ user.status ? 'text-green-600' : 'text-red-600'}`}>
                      {user.status ? "Verified" : "Unverified"}
                    </p>
                  </li>
                )}
              </ul>
            }
        </div>
      </div>
    </div>
  )
}

export default Overviewpage;