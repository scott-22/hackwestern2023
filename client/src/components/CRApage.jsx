import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function CRApage() {
  const [isCRA, setIsCRA] = useState(false);
  const [targetAddr, setTargetAddr] = useState("");
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
  }, []);

  const onTargetAddrChange = useCallback((event) => {
    let text = event.target.value;
    setTargetAddr(text);
  });

  const onTargetAddrSubmit = useCallback((event) => {
    event.preventDefault();
    if (targetAddr) {
      console.log(targetAddr);
    }
  })

  useEffect(() => {
    verifyIsCRA();
  }, []);

  return isCRA ? (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
            <h1 className="text-blue-800 text-3xl py-10">
              Revenue Agency Homepage
            </h1>
            <p className="text-lg text-blue-900">
              You may see personal data associated with an address if it is unverified.
            </p>
            <div>
              <h3 className="text-2xl py-25">
                Check Personal Info
              </h3>
              <label className="text-lg text-blue-900 py-10">Target Address</label>
              <input
                className="rounded-sm p-2 outline-none text-blue-900 border-none text-lg backdrop-blur-sm bg-white/30"
                value={targetAddr}
                onChange={onTargetAddrChange}
              />
            </div>
            {userData &&
              <div>
                <h3 className="text-2xl py-25">
                  Info for {targetAddr}:
                </h3>
                <p className="text-lg text-blue-900 py-10">
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
