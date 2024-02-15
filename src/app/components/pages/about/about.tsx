import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';

export default function About() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'}>
          <span className={appStyle.link}>
            Home
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
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
        <Link to={'/symbiont-trust'}>
          <span className={appStyle.link}>
            Symbiont Trust
          </span>
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        About
      </div>
      <hr />
      <div>
        This site was created by crypto enthusiasts who want to bring Trust to the web2 and web3
        space.
        <p>
          While this software is about management of the Next DID avatar and it's Trust metrics,
          other softwares like social media websites consume the avatar:
          <ul>
            <li>Symbiont - social media website</li>
            <li>Symbiont - Chrome Extension</li>
            <li>Trustify - Work platform optimised for crypto gigs</li>
          </ul>
        </p>
        <p>
          The idea with these other softwares is that they will show an icon next to users that
          have the Next DID avatar.  The avatar acts in the same way a twitter tick works
          on the X platform.  It brings confidence that the person behind the social media handle
          is who they claim to be.
        </p>
        <p>
          Infact clicking on the avatar icon shows you a Trust Page showing Trust information on
          the avatar.
        </p>
      </div>
      <hr />
    </div>
  );
}