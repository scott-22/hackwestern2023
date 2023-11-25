import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center items-center mx-auto">
        <div className="flex mf:flex-col flex-col items-center justify-between md:p-16 py-12 px-4">
          <Link
            to="/user"
            className='text-center w-full my-5 py-5 px-10 text-2xl text-blue-900 rounded border-[1px] border-[#2a427e] hover:bg-[#2a427e] hover:text-white cursor-pointer'>
              User
          </Link>
          <Link
            to="/cra"
            className='text-center w-full my-5 py-5 px-10 text-2xl text-blue-900 rounded border-[1px] border-[#2a427e] hover:bg-[#2a427e] hover:text-white cursor-pointer'>
              CRA
          </Link>
          <Link
            to="/Overview"
            className='text-center w-full my-5 py-5 px-10 text-2xl text-blue-900 rounded border-[1px] border-[#2a427e] hover:bg-[#2a427e] hover:text-white cursor-pointer'>
              Overview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;