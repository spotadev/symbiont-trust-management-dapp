import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';
import LinkExplanation from "../../shared/LinkExplanation";

export default function Home() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
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
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to={'/about'}>
          About
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Home
      </div>
      <hr />
      <div>
        Next ID is a decentralised ID (DID) called an avatar.
        <br /><br />
        The idea is you can connect both your wallet and some social media handles to it:
        <ul>
          <li>twitter X</li>
          <li>github</li>
        </ul>
        <p>
          You need to verify that you are the owner of the social media handles before you can
          add them to your avatar.
        </p>
        <hr />
        <p>
          Other sites are integrated with these avatar DIDs.
        </p>
        <p>
          On these sites any user that has an enhanced next.id avatar has an avatar icon next
          to their username.
        </p>
        <div>
          Clicking on the icon brings up a Symbiont Trust Profile page which can optionally
          include all of the following information:
          <ul>
            <li>Avatar DID ID</li>
            <li>Wallet Address associated with the DID</li>
            <li>Social Media Handles associated with the DID</li>
            <li>Any names associated with the DID handle</li>
            <li>Any interests associated with the DID handle</li>
            <li>UTU Trust Signal and Endorsements on the DID</li>
            <li>Symbiont Trust Signal and Trait Endorsements on the DID</li>
            <li>web3 Bio on the DID</li>
            <li>Any white list info associated with the DID</li>
            <li>
              Any Unlock Protocol Achievement Awards or any other NFT awards associate
              with the DID avatar
            </li>
          </ul>
          This list is expected to grow.  The list contains any data that is associated
          with the DID avatar which the DID owner would like you to see. Symbiont Trust is used to
          help the DID owner decide on which data they want associated with their DID avatar.
        </div>
        <hr />
        <p>
          While the preferences of what the user wants associated with their DID is in the
          Symbiont Trust database, that data cannot be manipulated with by Symbiont Trust.  These
          important preferences are signed by the owner of the Next ID Avatar.  We therefore have
          cryptographic proof that these preferences are indeed the preferences of the avatar end
          user and have not been messed with by the Symbiont Trust Guardians of that information.
        </p>
        <p>
          In addition, Symbiont Trust follows the Symbiont Trust Protocol which is similar in
          principle to the Lens Protocol.  The user can decide to leave Symbiont Trust and find
          another Symbiont Trust provider which implements the Symbiont Trust Protocol.  The
          Symbiont Trust Protocol has facility to import, export and delete data at the avatar
          owner's request.
        </p>
        <p>
          As such Symbiont Trust can be classified as decentralised software.
        </p>
      </div>
      <LinkExplanation />
    </div>
  );
}