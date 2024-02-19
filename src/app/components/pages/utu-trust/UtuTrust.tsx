import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

export default function UtuTrust() {
  const { address, isConnected } = useAccount();


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
        <Link to={'/docs'} style={{ paddingLeft: '15px' }}>
          Docs
        </Link>
        <Link to={'/about'} style={{ paddingLeft: '15px' }}>
          About
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        UTU Trust
      </div>
      <hr />
      <div style={{ paddingTop: '20px' }}>
        With UTU Trust you can search for a DID and then see or give signal on the DID:
        <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
          <Link to={'/find-did-for-utu-signal'}>
            Search for DIDs
          </Link>
        </div>
        <p>
          Note that the idea with UTU Trust is that you trust people in your networks more than
          random people.  UTU Trust gives you signal from people in your immediate network as a
          priority. It also gives signal in your extended network which includes the connections
          of your connections.
        </p>
        <p>
          So in order for UTU signal to work the idea is you connect your social media networks to
          UTU at the following URL:
        </p>
        <div style={{ paddingLeft: '20px' }}>
          <a href="https://app.utu.io/connect" target="_new">https://app.utu.io/connect</a>
        </div>
      </div>
      <br />
      <hr />
      <div>
        <p>
          Note that if you have activated UTU Trust in your Symbiont Trust Profile, others
          viewing your Symbiont Trust Profile will see UTU signal people have left.
        </p>
        <div>
          To see how your current Symbiont Trust Profile is configured go to:
          <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
            <Link to={'/symbiont-trust'}>
              Symbiont Trust
            </Link>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br /><br />&nbsp;
    </div>
  );
}