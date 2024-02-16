# README

## Current Status

16th Feb 2024: this project is a rewrite of:

* utu-endorse-nextid-old

Functionality is NOT yet operational.

Keeping checking this README for project status.

## What is this project about?

Next ID is a decentralised ID (DID) called an avatar.

The idea is you can connect both your wallet and some social media handles to it:

* twitter X
* github

You need to verify that you are the owner of the social media handles before you can add them to your avatar.

Other sites are integrated with these avatar DIDs.

On these sites any user that has an enhanced next.id avatar has an avatar icon next to their username.

Clicking on the icon brings up a Symbiont Trust Profile page which can optionally include all of the following information:

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

This list is expected to grow. The list contains any data that is associated with the DID avatar which the DID owner would like you to see. Symbiont Trust is used to help the DID owner decide on which data they want associated with their DID avatar.

While the preferences of what the user wants associated with their DID is in the Symbiont Trust database, that data cannot be manipulated with by Symbiont Trust. These important preferences are signed by the owner of the Next ID Avatar. We therefore have cryptographic proof that these preferences are indeed the preferences of the avatar end user and have not been messed with by the Symbiont Trust Guardians of that information.

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