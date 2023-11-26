import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const url = 'https://api-sandbox.circle.com/v1/wallets';
const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));


export default function Transaction() {
  return (
    <div>
      Transactions page
    </div>
  )
}