import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect, useRef } from "react";
import appStyle from '../../../../App.module.css';

import {
  IdsItem,
  Platform,
  Proof,
  nextIdCheckAvatarService
} from "../../../services/next-id/nextIdCheckAvatarService";

import {
  avatarStatusResponseHelper
} from "../../../helpers/avatar-status-response/avatarStatusResponseHelper";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import {
  nextIdManagement_updateGithubProofVerified,
  nextIdManagement_updateIdsItem,
  nextIdManagement_updatePlatformsNeedToConnectTo,
  nextIdManagement_updateValidProofs,
  nextIdManagement_updateWalletEthereumVerified,
  nextIdManagement_updateXProofVerified
} from "../../../store/slices/nextIdManagementSlice";
import ShowNextId from "../../shared/ShowNextId";
import GuiPlatform from "./children/GuiPlatform";

import ProofPayloadResponse, {
  nextIdProofService
} from "../../../services/next-id/nextIdProofService";

import { nextIdVerifyService } from "../../../services/next-id/nextIdVerifyService";
import LinkExplanation from "../../shared/LinkExplanation";


export default function NextIdManagement() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  const { address, isConnected } = useAccount();

  // refs below ------------------------------------------------------------------------------------
  // Added to stop useEffect making network call twice
  const prevAddressRef = useRef<`0x${string}` | undefined>();

  // readonly values from redux below --------------------------------------------------------------
  const idsItem = useSelector((state: RootState) => state.nextIdManagement.idsItem);
  const validProofs = useSelector((state: RootState) => state.nextIdManagement.validProofs);

  const walletEthereumVerified =
    useSelector((state: RootState) => state.nextIdManagement.walletEthereumVerified);

  const xProofVerified =
    useSelector((state: RootState) => state.nextIdManagement.xProofVerified);

  const githubProofVerified =
    useSelector((state: RootState) => state.nextIdManagement.githubProofVerified);

  const platformsNeedToConnectTo =
    useSelector((state: RootState) => state.nextIdManagement.platformsNeedToConnectTo);

  const getIdsItemWithSameEthereumAddressAsWallet = (idsItems: IdsItem[], address: string) => {
    const lowerCaseAddress = address.toLowerCase();

    for (let idsItem of idsItems) {
      for (let proof of idsItem.proofs) {
        console.log('proof', proof);
        if (proof.platform === 'ethereum' && proof.identity === lowerCaseAddress) {
          return idsItem;
        }
      }
    }
    return null;
  }

  // methods below ---------------------------------------------------------------------------------
  const savePlatformVerifiedStates = (validProofs: Proof[]) => {
    for (let proof of validProofs) {
      switch (proof.platform) {
        case 'twitter':
          dispatch(nextIdManagement_updateXProofVerified(true));
          break;
        case 'github':
          dispatch(nextIdManagement_updateGithubProofVerified(true));
          break;
        case 'ethereum':
          dispatch(nextIdManagement_updateWalletEthereumVerified(true));
          break;
      }
    }
  }

  const reset = () => {
    dispatch(nextIdManagement_updateIdsItem(null));
    dispatch(nextIdManagement_updateValidProofs([]));
    savePlatformVerifiedStates([]);
  }

  const getAvatarStatusResponse = async (address: string) => {
    const platform = 'ethereum';
    const exact = true;

    // This is a network call
    const avatarStatusResponse =
      await nextIdCheckAvatarService.getAvatarStatus(address, platform, exact);

    console.log('avatarStatusResponse', avatarStatusResponse);

    const idsItems: IdsItem[] = avatarStatusResponse.ids;

    if (idsItems.length == 0) {
      reset();
      return;
    }

    const idsItem = getIdsItemWithSameEthereumAddressAsWallet(idsItems, address);

    if (idsItem == null) {
      throw new Error('Unexpected Error: could not find IdsItem with wallet address proof:' +
        address);
    }

    const validProofs = avatarStatusResponseHelper.getValidProofs(idsItem);

    console.log('validProofs', validProofs);

    const _hasValidEthereumProof =
      avatarStatusResponseHelper.hasValidEthereumProof(validProofs, address);

    console.log('_hasValidEthereumProof', _hasValidEthereumProof);

    if (_hasValidEthereumProof) {
      dispatch(nextIdManagement_updateIdsItem(idsItem));
      dispatch(nextIdManagement_updateValidProofs(validProofs));
      savePlatformVerifiedStates(validProofs);
    }
    else {
      reset();
      return;
    }

    const supportedPlatforms = ['twitter', 'github'];

    const platformsNeedToConnectTo: Platform[] =
      avatarStatusResponseHelper.getPlatformsNeedToConnectTo(
        idsItem, supportedPlatforms);

    console.log('platformsNeedToConnectTo', platformsNeedToConnectTo);
    dispatch(nextIdManagement_updatePlatformsNeedToConnectTo(platformsNeedToConnectTo));
  }

  const createAvatarWithEthereumAddress = async () => {
    const platform = 'ethereum';
    const handle = address;

    if (!handle) {
      return new Error('Wallet is not connected');
    }

    const response: { proofPayloadResponse: ProofPayloadResponse, publicKey: string } =
      await nextIdProofService.getNextIdProofPayload(platform, handle);

    const proofPayloadResponse = response.proofPayloadResponse;
    const publicKey = response.publicKey;

    const verifiedProof =
      await nextIdVerifyService.verifyEthereumProof(proofPayloadResponse, publicKey, address);

    console.log('verifiedProof', verifiedProof);

    if (verifiedProof) {
      getAvatarStatusResponse(address);
    }

    dispatch(nextIdManagement_updateWalletEthereumVerified(verifiedProof));
  }



  // useEffect methods below ----------------------------------------------------------------------=
  useEffect(() => {
    console.log('address', address);
    if (prevAddressRef.current !== address) {
      if (address) {
        getAvatarStatusResponse(address);
      } else {
        reset();
      }
    }
    prevAddressRef.current = address;
  }, [address]);

  // JSX methods below -----------------------------------------------------------------------------
  const getIsConnectedAndNotWalletEthereumVerifiedJSX = () => {
    return (
      <>
        <div>
          You do not yet have a next.ID associated with your wallet address.
          Click the button below to do so.
          <p>
            <button onClick={createAvatarWithEthereumAddress}>
              Create next.ID avatar and add your wallet address to it
            </button>
          </p>
        </div>
      </>
    );
  }

  const getIsConnectedAndWalletEthereumVerifiedJSX = () => {
    return (
      <>
        <ShowNextId title='Your next.id DID' idsItem={idsItem} validProofs={validProofs} />
        <br /><hr /><br />
        <div>
          <span style={{ fontWeight: 'bold' }}>Link Platform:</span>
        </div>
        {platformsNeedToConnectTo.map((platform, index) => (
          <div key={platform.name} style={{ paddingTop: '20px' }}>
            <GuiPlatform platform={platform} />
          </div>
        ))}
        {
          platformsNeedToConnectTo.length == 0 ?
            <div style={{ paddingTop: '20px' }}>All available platforms already linked</div > :
            ''
        }
      </>
    );
  }

  const getAvatarJSX = () => {
    if (isConnected && walletEthereumVerified) {
      return getIsConnectedAndWalletEthereumVerifiedJSX();
    }
    else if (isConnected && !walletEthereumVerified) {
      return getIsConnectedAndNotWalletEthereumVerifiedJSX();
    }
    else {
      return (
        <div>
          Please Connect your wallet to proceed.
        </div>
      );
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'}>
          <span className={appStyle.link}>
            Home
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/find-next-id-avatar'}>
          <span className={appStyle.link}>
            UTU Trust
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/symbiont-trust'}>
          <span className={appStyle.link}>
            Symbiont Trust
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/about'}>
          <span style={{ color: 'gold' }}>
            About
          </span>
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Avatar Management
      </div>
      <hr />
      {getAvatarJSX()}
      <br />
      <LinkExplanation />
    </div >
  );
}