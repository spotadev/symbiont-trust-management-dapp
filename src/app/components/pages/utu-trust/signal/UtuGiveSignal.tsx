import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { RootState } from "../../../../store/store";
import { Link } from "react-router-dom";
import { idHelper } from "../../../../helpers/id-helper/IdHelper";

import { ethers } from "ethers";

export default function UtuGiveSignal() {

  const { address, isConnected } = useAccount();

  // readonly values from redux below --------------------------------------------------------------
  const selectedIdsItem = useSelector((state: RootState) => state.utu.selectedIdsItem);

  if (!selectedIdsItem?.avatar) {
    return ('');
  }

  const transactionId = 'blah';

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/utu-trust/find-did-for-utu-signal'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <x-utu-feedback-form
        target-uuid={idHelper.getId(selectedIdsItem?.avatar)}
        source-uuid={address?.toLowerCase()}
        transaction-id={transactionId}
      />
    </div>
  );
}