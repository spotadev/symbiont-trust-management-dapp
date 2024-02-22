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
          <li>
            <Link to={'/symbiont-trust/configure-symbiont-trust-profile'}>
              Configure Symbiont Trust Profile
            </Link>
          </li>
          <li>
            <Link to={'/symbiont-trust/preview-symbiont-trust-profile'}>
              Preview Symbiont Trust Profile
            </Link>
          </li>
          <li>
            <Link to={'/give-symbiont-trust-signal'}>
              Search for another DID and give Symbiont Trust Signal / Endorsements on that
            </Link>
          </li>
        </ul>
        <p>
          The idea with your Symbiont Trust Profile is that it is associated with your
          DID and can be consumed by other Apps.
        </p>
        <p>
          For example, with an App which consumes the Symbiont Trust API, there will appear a
          Symbiont Trust icon next to your username. If other users click on that icon they will
          see your Symbiont Trust profile page.
        </p>
      </div>
      <hr />
      <br /><br />
    </div >
  )
}