import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';

export default function About() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'}>
          Home
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/next-id-management'}>
          Avatar Management
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/find-next-id-avatar'}>
          UTU Trust
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/symbiont-trust'}>
          Symbiont Trust
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        About
      </div>
      <hr />
      <div style={{ paddingTop: '10px' }}>
        This site was created by crypto enthusiasts who want to bring Trust to the web2 and web3
        space.
        <div style={{ paddingTop: '20px' }}>
          While this software is about management of the Next DID avatar and it's Trust metrics,
          other softwares like social media websites consume the avatar:
          <ul>
            <li>Symbiont - social media website</li>
            <li>Symbiont - Chrome Extension</li>
            <li>Trustify - Work platform optimised for crypto gigs</li>
          </ul>
        </div>
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
        <div style={{ paddingTop: '10px' }}>
          To get in touch create a discussion here:
          <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
            <a href="https://github.com/spotadev/symbiont-trust-management-dapp/discussions">
              https://github.com/spotadev/symbiont-trust-management-dapp/discussions
            </a>
          </div>
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
}