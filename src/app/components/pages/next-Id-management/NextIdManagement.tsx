import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect } from "react";

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
  homeUpdateGithubProofVerified,
  homeUpdateIdsItem,
  homeUpdatePlatformsNeedToConnectTo,
  homeUpdateValidProofs,
  homeUpdateXProofVerified
} from "../../../store/slices/homeSlice";
import ShowNextId from "../../shared/ShowNextId";
import GuiPlatform from "./children/GuiPlatform";

import ProofPayloadResponse, {
  nextIdProofService
} from "../../../services/next-id/nextIdProofService";

import { nextIdVerifyService } from "../../../services/next-id/nextIdVerifyService";


export default function NextIdManagement() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  const { address, isConnected } = useAccount();

  // readonly values from redux below --------------------------------------------------------------
  const idsItem = useSelector((state: RootState) => state.home.idsItem);
  const validProofs = useSelector((state: RootState) => state.home.validProofs);
  const walletEthereumVerified = useSelector((state: RootState) => state.home.walletEthereumVerified);
  const xProofVerified = useSelector((state: RootState) => state.home.xProofVerified);
  const githubProofVerified = useSelector((state: RootState) => state.home.githubProofVerified);
  const platformsNeedToConnectTo = useSelector((state: RootState) => state.home.platformsNeedToConnectTo);

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
          homeUpdateXProofVerified(true);
          break;
        case 'github':
          homeUpdateGithubProofVerified(true);
          break;
      }
    }
  }

  const reset = () => {
    dispatch(homeUpdateIdsItem(null));
    dispatch(homeUpdateValidProofs([]));
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

    const _hasValidEthereumProof =
      avatarStatusResponseHelper.hasValidEthereumProof(validProofs, address);

    if (_hasValidEthereumProof) {
      dispatch(homeUpdateIdsItem(idsItem));
      dispatch(homeUpdateValidProofs(validProofs));
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
    dispatch(homeUpdatePlatformsNeedToConnectTo(platformsNeedToConnectTo));
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

    dispatch(homeUpdateGithubProofVerified(verifiedProof));
  }

  // useEffect methods below ----------------------------------------------------------------------=
  useEffect(() => {
    if (address) {
      getAvatarStatusResponse(address);
    }
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
      return '';
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/home'}>
          <span style={{ color: 'gold' }}>
            Home
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/find-next-id-avatar'}>
          <span style={{ color: 'gold' }}>
            UTU Trust
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/about'}>
          <span style={{ color: 'gold' }}>
            About
          </span>
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>
        Avatar Management
      </div>
      {getAvatarJSX()}
    </div>
  );
}