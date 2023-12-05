# BlockXism

## Inspiration
Blockchain has created new opportunities for financial empowerment and decentralized finance (DeFi), but it also introduces several new considerations. Despite its potential for equitability, malicious actors can currently take advantage of it to launder money and fund criminal activities. There has been a recent wave of effort to introduce regulations for crypto, but the ease of money laundering proves to be a serious challenge for regulatory bodies like the Canadian Revenue Agency. Recognizing these dangers, we aimed to tackle this issue through BlockXism!

## What it does
BlockXism is an attempt at placing more transparency in the blockchain ecosystem, through a simple verification system. It consists of (1) a self-authenticating service, (2) a ledger of verified users, and (3) rules for how verified and unverified users interact. Users can "verify" themselves by giving proof of identity to our self-authenticating service, which stores their encrypted identity on-chain. A ledger of verified users keeps track of which addresses have been verified, without giving away personal information. Finally, users will lose verification status if they make transactions with an unverified address, preventing suspicious funds from ever entering the verified economy. Importantly, verified users will remain anonymous as long as they are in good standing. Otherwise, such as if they transact with an unverified user, a regulatory body (like the CRA) will gain permission to view their identity (as determined by a smart contract).

Through this system, we create a verified market, where suspicious funds cannot enter the verified economy while flagging suspicious activity. With the addition of a legislation piece (e.g. requiring banks and stores to be verified and only transact with verified users), BlockXism creates a safer and more regulated crypto ecosystem, while maintaining benefits like blockchain’s decentralization, absence of a middleman, and anonymity.

## How we built it
BlockXism is built on a smart contract written in Solidity, which manages the ledger. For our self-authenticating service, we incorporated Circle wallets, which we plan to integrate into a self-sovereign identification system. We simulated the chain locally using Ganache and Metamask. On the application side, we used a combination of React, Tailwind, and ethers.js for the frontend and Express and MongoDB for our backend.

## Challenges we ran into
A challenge we faced was overcoming the constraints when connecting the different tools with one another, meaning we often ran into issues with our fetch requests. For instance, we realized you can only call MetaMask from the frontend, so we had to find an alternative for the backend. Additionally, there were multiple issues with versioning in our local test chain, leading to inconsistent behaviour and some very strange bugs.

## Accomplishments that we're proud of
Since most of our team had limited exposure to blockchain prior to this hackathon, we are proud to have quickly learned about the technologies used in a crypto ecosystem. We are also proud to have built a fully working full-stack web3 MVP with many of the features we originally planned to incorporate.

## What we learned
Firstly, from researching cryptocurrency transactions and fraud prevention on the blockchain, we learned about the advantages and challenges at the intersection of blockchain and finance. We also learned how to simulate how users interact with one another blockchain, such as through peer-to-peer verification and making secure transactions using Circle wallets. Furthermore, we learned how to write smart contracts and implement them with a web application.

## What's next for BlockXism
We plan to use IPFS instead of using MongoDB to better maintain decentralization. For our self-sovereign identity service, we want to incorporate an API to recognize valid proof of ID, and potentially move the logic into another smart contract. Finally, we plan on having a chain scraper to automatically recognize unverified transactions and edit the ledger accordingly.
