# README

## Current Status

16th Feb 2024: this project is a rewrite of:

* utu-endorse-nextid-old

Functionality is NOT yet operational.

Keeping checking this README for project status.

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