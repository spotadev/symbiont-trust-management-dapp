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


export default function Home() {

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

  const getAvatarStatusResponse = async (address: string) => {
    const platform = 'ethereum';
    const exact = true;

    // This is a network call
    const avatarStatusResponse =
      await nextIdCheckAvatarService.getAvatarStatus(address, platform, exact);

    console.log('avatarStatusResponse', avatarStatusResponse);
    // setAvatarStatusResponse(avatarStatusResponse);

    const idsItems: IdsItem[] = avatarStatusResponse.ids;

    if (idsItems.length == 0) {
      // setPlatformVerifiedStates([]);

      // setProofs([]);
      // setIdsItem(null);
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
      dispatch(homeUpdateIdsItem(null));
      dispatch(homeUpdateValidProofs([]));
      savePlatformVerifiedStates([]);
      return;
    }

    const supportedPlatforms = ['twitter', 'github'];

    const platformsNeedToConnectTo: Platform[] =
      avatarStatusResponseHelper.getPlatformsNeedToConnectTo(
        idsItem, supportedPlatforms);

    console.log('platformsNeedToConnectTo', platformsNeedToConnectTo);
    dispatch(homeUpdatePlatformsNeedToConnectTo(platformsNeedToConnectTo));
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
      ''
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
        <Link to={'/find-next-id-avatar'}>
          <span style={{ color: 'gold' }}>
            "UTU Endorse / Give UTU Signal / Get UTU Signal"
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
        Next.id avatar DID Management
      </div>
      {getAvatarJSX()}
    </div>
  );
}