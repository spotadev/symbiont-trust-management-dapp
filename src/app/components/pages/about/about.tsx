import { Link } from "react-router-dom";

export default function About() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'}>
          <span style={{ color: 'gold' }}>
            Home
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/next-id-management'}>
          <span style={{ color: 'gold' }}>
            Avatar Management
          </span>
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/find-next-id-avatar'}>
          <span style={{ color: 'gold' }}>
            UTU Trust
          </span>
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>
        About
      </div>
      <div>
        This site was created by crypto enthusiasts who want to bring Trust to the web2 and web3
        space.
        <p>
          For details about what this software does see the home page:
          &nbsp;&nbsp;
          <Link to={'/'}>
            <span style={{ color: 'gold' }}>
              Home
            </span>
          </Link>
        </p>
        <p>
          While this software is about management of the Next DID avatar, other softwares like
          social media websites consume the avatar:
          <ul>
            <li>Symbiont - social media website</li>
            <li>Symbiont Chrome Extension</li>
          </ul>
        </p>
        <p>
          Symbiont is about having comment threads hanging of a url. In the case of the chrome
          extension version, this means you can create a comment thread leading of any page
          on the internet.  The comment thread is super imposed on top of the host website.
        </p>
        <p>
          The idea with these other softwares is that they will show an icon next to users that
          have the Next DID avatar.  The avatar acts in the same way a twitter tick works
          on the X platform.  It brings confidence that the person behind the social media handle
          is who they claim to be.
        </p>
        <p>
          Infact clicking on the icon shows you all the social medial handles associated with
          the DID.
        </p>
        <p>
          This software could have been integrated into each of the platforms that integrate Next
          DID Avatars but instead the decision was made to make a standalone software for managing
          you Next DID Avatar.
        </p>
        <p>
          In due course an example project will be created showing how to integrate a Next DID
          avatar into your software.
        </p>
        <p>
          In the mean time you can contact JD for further information:
        </p>
        <p style={{ color: 'pink' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          johnZcharlesZdickerson@gmail.com
        </p>
        <p>
          Replace Z with dot.
        </p>
      </div>
    </div>
  );
}