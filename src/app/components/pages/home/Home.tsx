import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';
import LinkExplanation from "./children/LinkExplanation";

export default function Home() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/next-id-management'} style={{ paddingLeft: '15px' }}>
          Avatar Management
        </Link>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Symbiont Trust
        </Link>
        <Link to={'/utu-trust'} style={{ paddingLeft: '15px' }}>
          UTU Trust
        </Link>
        <Link to={'/docs'} style={{ paddingLeft: '15px' }}>
          Docs
        </Link>
        <Link to={'/about'} style={{ paddingLeft: '15px' }}>
          About
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Home
      </div>
      <hr />
      <div>
        <p>
          This software creates a Decentralised ID which has a Symbiont Trust Profile associated
          with it. The DID is associated with a wallet address. The owner of the wallet address can
          configure what information is included in their profile.
        </p>
        <p>
          This DID can then be consumed by other applications.  These other applications can
          display an icon next to someone who has this DID. This allows the users of the sotware
          to see Trust metrics on the user.
        </p>
      </div>
      <LinkExplanation />
    </div>
  );
}