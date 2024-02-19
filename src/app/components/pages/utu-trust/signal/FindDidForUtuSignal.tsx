import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { nextIdCheckAvatarService } from "../../../../services/next-id/nextIdCheckAvatarService";

export default function FindDidForUtuSignal() {
  const { address, isConnected } = useAccount();

  const search = async () => {
    const exact = true;

    // This is a network call
    const avatarStatusResponse =
      await nextIdCheckAvatarService.getAvatarStatus(findHandle, findPlatform, exact);

    const idsItems = avatarStatusResponse.ids;
    // setIdsItems(idsItems);
  }

  const getFindAvatarJSX = () => {
    return (
      <div>
        <div style={{ paddingTop: '20px' }}>
          To Endorse, Give Signal, or Get Signal for a next.id avatar DID you need to first of all
          find the DID.
          <br /><br />
          To find the DID:
          <ul>
            <li>Select the platform you want to search in from the dropdown</li>
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
            onChange={(event) => { setFindPlatform(event.target.value) }}
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
            onChange={(event) => { setFindHandle(event.target.value) }}
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
        <SelectNextIdDID idsItems={idsItems} />
        <br /><br /><hr />
      </div>
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