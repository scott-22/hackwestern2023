// import React, { useState, useEffect, useCallback } from "react";
// import { ethers } from "ethers";

// function CRApage() {
//   const [isCRA, setIsCRA] = useState(false);

//   const verifyIsCRA = useCallback(async () => {
//     const currentAddress = (await provider.listAccounts())[0];
//     const craAddress = (await (await fetch(`http://127.0.0.1:3001/contract/minter-address`)).json()).address;
//     if (currentAddress === craAddress)
//       setIsCRA(true);
//   }, []);

//   useEffect(() => {
//     verifyIsCRA();
//   }, []);

//   return isCRA ? (
//     "hi"
//   ) : (
// "hi"
//   );
// }

// export default CRApage;