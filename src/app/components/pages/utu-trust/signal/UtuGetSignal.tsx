import { useAccount } from "wagmi";
import { idHelper } from "../../../../helpers/id-helper/IdHelper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Link } from "react-router-dom";

export default function UtuGetSignal() {
  const { address, isConnected } = useAccount();


  // readonly values from redux below --------------------------------------------------------------
  const selectedIdsItem = useSelector((state: RootState) => state.utu.selectedIdsItem);

  if (!selectedIdsItem?.avatar) {
    return ('');
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/utu-trust/find-did-for-utu-signal'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <x-utu-feedback-details
        target-uuid={idHelper.getId(selectedIdsItem?.avatar)}
        source-uuid={address?.toLowerCase()}
        target-type='Address'
        target-human-readable={selectedIdsItem?.avatar}
      />
    </div>
  );
}