import { Link } from "react-router-dom";
import Web3ModalButtons from "./children/Web3ModalButtons";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { IdsItem, Platform, nextIdCheckAvatarService } from "../../services/next-id/nextIdCheckAvatarService";
import { avatarStatusResponseHelper } from "../../helpers/avatar-status-response/avatarStatusResponseHelper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { homeUpdateProofs } from "../../store/slices/homeSlice";


export default function Home() {

  const { address, isConnected } = useAccount();
  // const [walletEthereumVerified, setWalletEthereumVerified] = useState<boolean>(false);
  const proofs = useSelector(
    (state: RootState) => {
      state.home.proofs
    }
  );

  const dispatch = useDispatch();


  const getIsConnectedAndNotWalletEthereumVerifiedJSX = () => {
    return (
      ''
    );
  }

  const getIsConnectedAndWalletEthereumVerifiedJSX = () => {
    return (
      ''
    );
  }

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
      // setPlatformVerifiedStates(idsItem.proofs);

      dispatch(homeUpdateProofs(validProofs));
      // setProofs(validProofs);
      // setIdsItem(idsItem);
      // setWalletEthereumVerified(true);
    }
    else {
      // setWalletEthereumVerified(false);
      return;
    }

    const supportedPlatforms = ['twitter', 'github'];

    const platformsNeedToConnectTo: Platform[] =
      avatarStatusResponseHelper.getPlatformsNeedToConnectTo(
        idsItem, supportedPlatforms);

    console.log('platformsNeedToConnectTo', platformsNeedToConnectTo);
    // setPlatforms(platformsNeedToConnectTo);
  }

  useEffect(() => {
    if (address) {
      getAvatarStatusResponse(address);
    }
  }, [address, walletEthereumVerified]);

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