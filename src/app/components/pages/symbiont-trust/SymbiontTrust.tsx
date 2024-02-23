import { Link } from "react-router-dom";

export default function SymbiontTrust() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'} style={{ paddingLeft: '15px' }}>
          Home
        </Link>
        <Link to={'/next-id-management'} style={{ paddingLeft: '15px' }}>
          Avatar Management
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
        Symbiont Trust
      </div>
      <hr />
      <div style={{ paddingTop: '20px' }}>
        With Symbiont Trust you can do the following
        <ul>
          <li style={{ marginBottom: '10px' }}>
            <Link to={'/symbiont-trust/configure-symbiont-trust-profile'}>
              Configure a Symbiont Trust Profile
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to={'/symbiont-trust/preview-symbiont-trust-profile'}>
              Preview your Symbiont Trust Profile
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to={'/symbiont-trust/signal'}>
              Find a DID / Manage Friends / Give and See Signal
            </Link>
          </li>
        </ul>
        <p>
          Symbiont Trust is about finding friends that share a similar interest.  Once you get
          to know them you can endorse them as being knowledgable in the area of interest.
        </p>
        <p>
          The idea with your Symbiont Trust Profile is that it is associated with your
          DID and can be consumed by other Apps.
        </p>
        <p>
          For example, within an App that consumes the Symbiont Trust API, there will appear a
          Symbiont Trust icon next to your username. If other users click on that icon they will
          see your Symbiont Trust profile page.
        </p>
        <p>
          This is a form of personhood which mitigates the risk of malicious actors or bots
          publishing fake information to meet nefarious goals.
        </p>
      </div>
      <hr />
      <br /><br />
    </div >
  )
}