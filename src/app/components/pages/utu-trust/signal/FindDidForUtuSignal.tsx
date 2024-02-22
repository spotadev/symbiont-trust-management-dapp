import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { nextIdCheckAvatarService } from "../../../../services/next-id/nextIdCheckAvatarService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { utu_updateFindHandle, utu_updateFindIdsItems, utu_updateFindPlatform } from "../../../../store/slices/utuSlice";
import appStyle from '../../../../../App.module.css';
import SelectNextIdDID from "./children/SelectNextIdDID";


export default function FindDidForUtuSignal() {

  // hooks below -----------------------------------------------------------------------------------
  const { address, isConnected } = useAccount();

  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  // readonly values from redux below --------------------------------------------------------------
  const findIdsItems = useSelector((state: RootState) => state.utu.findIdsItems);
  const findHandle = useSelector((state: RootState) => state.utu.findHandle);
  const findPlatform = useSelector((state: RootState) => state.utu.findPlatform);

  const search = async () => {
    console.log('findHandle', findHandle);
    console.log('findPlatform', findPlatform);

    if (!findHandle || !findPlatform) {
      throw Error(
        'Unexpected error: Expecting findHandle and findPlatform to be populated');
    }

    const exact = true;

    // This is a network call
    const avatarStatusResponse =
      await nextIdCheckAvatarService.getAvatarStatus(findHandle, findPlatform, exact);

    const idsItems = avatarStatusResponse.ids;
    dispatch(utu_updateFindIdsItems(idsItems));
  }

  const reset = () => {

  }

  const getFindAvatarJSX = () => {
    return (
      <div style={{ paddingTop: '20px' }}>
        UTU Trust is an integrated partner to Symbiont Trust and is about seeing signal (feedback)
        from people in your networks. The idea is you value signal from people in your network
        more than strangers.
        <p>
          In order to participate in the UTU Trust Network you need to:
        </p>
        <ul>
          <li>
            Connect your social media networks to UTU Trust at:
            <br /><br />
            <a href="https://app.utu.io/connect">https://app.utu.io/connect</a>
            <br /><br />
            You earn UTU tokens when you connect a network like Telegram. You can then use these
            tokens to endorse an asset such as a DID.
            <br /><br />&nbsp;
          </li>
          <li>
            Buy a montly membership to view signal. You will be prompted for Membership when
            you try to view signal.
          </li>
        </ul>
        <div>
          To Endorse, Give Signal, or Get Signal for a next.id avatar DID you need to first of all
          find the DID:
          <ul>
            <li>Select the platform you want to search for from the dropdown</li>
            <li>Type the handle in the box</li>
          </ul>
          Note if the person does not have a next.id avatar DID you will not find them.
        </div>
        <div style={{ paddingTop: '20px' }}>
          You can search for signal for your own ethereum wallet address if you want:
          <p>
            {address}
          </p>
        </div>
        <br /><hr />
        <div style={{ paddingTop: '20px' }}>
          Select Platform:
          &nbsp;&nbsp;
          <select id="selectPlatform"
            value={findPlatform}
            onChange={(event) => { dispatch(utu_updateFindPlatform(event.target.value)) }}
            className={appStyle.input}
          >
            <option value="">Select...</option>
            <option value="ethereum">Ethereum Wallet Address</option>
            <option value="github">Github Handle</option>
            <option value="nextid">Next.id DID</option>
            <option value="twitter">X Handle</option>
          </select>
        </div>
        <div style={{ paddingTop: '20px' }}>
          Handle:
          &nbsp;&nbsp;
          <input
            type="text"
            id="yourTextBox"
            value={findHandle}
            onChange={(event) => { dispatch(utu_updateFindHandle(event.target.value)) }}
            className={appStyle.input}
            style={{ width: '400px' }}
          />
          &nbsp;&nbsp;
          <button onClick={search}
            disabled={!(findPlatform.length > 0 && findHandle.length > 0)}>Search</button>
          &nbsp;&nbsp;
          <button onClick={reset}
            disabled={!(findPlatform.length > 0 || findHandle.length > 0)}>Reset</button>
        </div>
        <br /><hr /><br />
        <SelectNextIdDID idsItems={findIdsItems} />
        <br /><br /><hr />
      </div >
    )
  }

  const getJSX = () => {
    if (!isConnected) {
      return (
        <div>
          Please Connect your wallet to proceed.
        </div>
      );
    }
    else {
      return getFindAvatarJSX();
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'} style={{ paddingLeft: '15px' }}>
          Home
        </Link>
        <Link to={'/next-id-management'} style={{ paddingLeft: '15px' }}>
          Avatar Management
        </Link>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Symbiont Trust
        </Link>
        <Link to={'/docs'}>
          Docs
        </Link>
        <Link to={'/about'}>
          About
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>
        UTU Trust
      </div>
      {getJSX()}
    </div>
  );
}