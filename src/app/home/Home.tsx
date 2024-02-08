import { Link } from "react-router-dom";
import Web3ModalButtons from "./children/Web3ModalButtons";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function Home() {

  const { address, isConnected } = useAccount();
  const [walletEthereumVerified, setWalletEthereumVerified] = useState<boolean>(false);

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