# README

## Current Status

Sunday 18th Feb 2024: 

Functionality is NOT complete and is Work in Progress.

Keeping checking back for an update in this README.

## What is this project about?

This dapp is about managing your own DID which has a trust profile associated with it.

We use next.id' DID and it is called an avatar.

next.id brings us functionality where you can connect both your wallet and some social media handles to the DID avatar:

* connected wallet address
* twitter X
* github

In the process of adding a handle to your DID avatar, you will need to verify that you are the owner of the social media handle.

Once you are done connecting your handles to your DID avatar and have associated any other optional information with the DID other sites will now be able to consume your DID.

On these DID consuming sites, any user that has an enhanced next.id avatar can be shown with an avatar icon next to their username.

When other users click on the avatar icon a call is made to the Symbiont Trust API. A Symbiont Trust Profile page is returned which may include some or all of the following information:

* Avatar DID ID
* Wallet Address associated with the DID
* Social Media Handles associated with the DID
* Any names associated with the DID handle
* Any interests associated with the DID handle
* UTU Trust Signal and Endorsements on the DID
* Symbiont Trust Signal and Trait Endorsements on the DID
* web3 Bio on the DID
* Any white list info associated with the DID
* Any Unlock Protocol Achievement Awards or any other NFT awards associate with the DID avatar

What is on this list depends on the configuaration settings the user configured on this dapp software.

This list is expected to grow. The list contains any data that is associated with the DID avatar which the DID owner would like you to see. 

While the preferences of what the user wants associated with their DID is in the Symbiont Trust database, that data cannot be manipulated by Symbiont Trust. These important preferences are signed by the owner of the Next ID Avatar. We therefore have cryptographic proof that these preferences are indeed the preferences of the avatar end user and have not been messed with by the Symbiont Trust Guardians of that information.

In addition, Symbiont Trust follows the Symbiont Trust Protocol which is similar in principle to the Lens Protocol. The user can decide to leave Symbiont Trust and find another Symbiont Trust provider which implements the Symbiont Trust Protocol. The Symbiont Trust Protocol has facility to import, export and delete data at the avatar owner's request.

As such Symbiont Trust can be classified as decentralised software.

## Install and Run

```
npm install
npm run dev
```

It will automaticaly open a browser. 

The console says which port it is running on if you want to open in another browser:

e.g http://localhost:5173/


## Technologies integrated with

* [next.id](https://docs.next.id/)
* [Utu Trust](https://utu.io)
* [Web3Modal](https://web3modal.com/)
* [web3 bio API](https://api.web3.bio/)
* Crypto Wallets

## Monestisation / Profit Sharing

This project uses the JavaSpeak license which states that in the event of monetisation, monies
shall be distributed in proportion to effort as measured by metrics such as git contributions.

## Contact Us

If you want to contact us or get involved please start by raising a discussion under the github discussions of this project:

* [https://github.com/spotadev/symbiont-trust-management-dapp/discussions](https://github.com/spotadev/symbiont-trust-management-dapp/discussions)

From there we can migrate to the communication channel of your choice.