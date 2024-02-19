import { Link } from "react-router-dom";
import LinkExplanation from "../../shared/LinkExplanation";

export default function DocsMain() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'} style={{ paddingLeft: '15px' }}>
          Home
        </Link>
        <Link to={'/next-id-management'} style={{ paddingLeft: '15px' }}>
          Avatar Management
        </Link>
        <Link to={'/find-next-id-avatar'} style={{ paddingLeft: '15px' }}>
          UTU Trust
        </Link>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Symbiont Trust
        </Link>
        <Link to={'/about'} style={{ paddingLeft: '15px' }}>
          About
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Docs
      </div>
      <hr />
      <div>
        <p>
          <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
            About the next.id DID used by Symbiont Trust
          </div>
        </p>
        <p>
          Symbiont Trust uses a DID provided by next.id. We call this DID an avatar.
          The DID is associated with a user's wallet address.  A Trust profile is also
          associated with the DID and the wallet address owner can configure what Trust
          Metrics are associated with their DID.
        </p>
        <p>
          The next.id DID provides functionality to associate social media handles with your
          DID.  It is done in such a way that there is cryptographic proof that the DID owner
          is the owner of the social media handles and is not just pretending they own them.
          This provides a form of vetted personhood identity.
        </p>
      </div>
      <br />
      <hr />
      <div>
        <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
          Other sites consume the DID
        </div>
        <p>
          Other sites consume these avatar DIDs:
        </p>
        <ul>
          <li>Trustify - Work platform optimised for crypto gigs</li>
          <li>Symbiont - social media website</li>
          <li>Symbiont - Chrome Extension</li>
        </ul>
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
          NOTE: It is the owner of the DID who decides what information is shown in their
          Symbiont Trust profile.
        </div>
        <br />
        <hr />
        <div>
          <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
            The DID owner decides what is shown in their Symbiont Trust Profile
          </div>
          <p>
            The preferences of what the user wants associated with their DID is stored in the
            Symbiont Trust database.
          </p>
          <p>
            These important preferences are signed by the owner of the DID Avatar and the
            signatures also stored in the Symbiont Trust database along with the preferences.
            This provides the necessary audit trail that the preferences are indeed the
            DID owner's preferences.
          </p>
        </div>
        <br />
        <hr />
        <div>
          <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
            The Symbiont Trust sotware is Decentralised
          </div>
          <p>
            Symbiont Trust follows the Symbiont Trust Protocol which is similar in concept to
            the Lens Protocol.  The user can decide to leave Symbiont Trust and find another
            Symbiont Trust Protocol provider who implements the Symbiont Trust Protocol.  The
            Symbiont Trust Protocol has facility to import, export and delete data at the avatar
            owner's request.
          </p>
          <p>
            As such Symbiont Trust can be classified as decentralised software.
          </p>
        </div>
        <br />
        <hr />
        <div>
          <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
            Technologies Symbiont Trust integrated with
          </div>
          <ul>
            <li>
              <a href="https://docs.next.id/" target="_new">next.id</a>
            </li>
            <li>
              <a href="https://utu.io" target="_new">Utu Trust</a>
            </li>
            <li>
              <a href="https://web3modal.com/" target="_new">Web3Modal</a>
            </li>
            <li>
              <a href="https://api.web3.bio/">web3 bio API</a>
            </li>
            <li>
              Crypto Wallets
            </li>
          </ul>
        </div>
        <hr />
        <div style={{ paddingLeft: '20px' }}>
          <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
            Asking more questions
          </div>
          <div style={{ paddingTop: '20px' }}>
            You can raise a discussion thread here:
            <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
              <a href="https://github.com/spotadev/symbiont-trust-management-dapp/discussions">
                https://github.com/spotadev/symbiont-trust-management-dapp/discussions
              </a>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />&nbsp;
      </div>
    </div>
  );
}