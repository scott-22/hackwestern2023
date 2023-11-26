import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Login from "./Login"
import Transaction from "./Transactions"

function Userpage() {
    const API_URL = "http://localhost:3001/users/getuser/";
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const checkLogin = async () => {
    
        try {
            const address = await getAddress();
            const response = await fetch(API_URL + address);
            
            setIsLoggedIn(response.ok)
        } catch (err) {
            console.log(err.stack)
        }   
    }

    useEffect(() => {
        checkLogin();
    }, [])

    return isLoggedIn ? (
        <Transaction />
    ) : (
        <Login />
    )

}


export default Userpage;