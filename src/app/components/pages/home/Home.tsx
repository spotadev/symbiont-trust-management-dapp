import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';

export default function Home() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/next-id-management'}>
          <span className={appStyle.link}>
            Avatar Management
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/find-next-id-avatar'}>
          <span className={appStyle.link}>
            UTU Trust
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/about'}>
          <span className={appStyle.link}>
            About
          </span>
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>
        Home
      </div>
      <div>
        Next ID is a decentralised ID (DID) called an avatar.
        <p>
          The idea is you can connect both your wallet and some social media handles to it:
          <ul>
            <li>twitter X</li>
            <li>github</li>
          </ul>
        </p>
        <p>
          You need to verify that you are the owner of the social media handles before you can
          add them to your avatar.
        </p>
        <p>
          What this means is that once you have created your DID avatar and connected it to a
          social media site that supports it, that other users will see an icon next to your
          comment which shows that you have a DID.  Users can then click on the icon to see your
          avatar profile.  Your avatar profile will show the social media handles associated with
          your avatar.
        </p>
        <p>
          This is a form of vetting that you are a real person.
        </p>
        <p>
          Apart from allowing you to manage your Next avatar DID this software is also integrated
          with the UTU Trust network and allows you to search for a DID and add an endorsement
          or Comment about the DID.
        </p>
        <p>
          UTU Trust is about seeing signal or endorsements done by people in your immediate social
          media networks and the extended network of your connections.
        </p>
        <p>
          The idea is that you trust endorsements and signal from people in your trusted networks
          more than from a stranger.
        </p>
        <p>
          It is the combination of Next avatar DIDs and UTU Trust that reduce the distortions
          introduced by malicious actors.
        </p>
        <p>
          See further details in:
          &nbsp;&nbsp;
          <Link to={'/about'}>
            <span className={appStyle.link}>
              About
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}