import { Link } from "react-router-dom";

export default function Integration() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/home'} style={{ paddingLeft: '15px' }}>
          Home
        </Link>
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
        Integration
      </div>
      <hr />
      <div>
        <p>
          This software manages Decentralised ID which has a Symbiont Trust Profile associated
          with it. You can integrate the Symbiont Trust Profile into your softwares.
        </p>
        <p>
          This means that you can show a Symbiont Trust Profile icon next to any user which has
          one. If users click on the profile icon they will see all the profile information the
          user wanted to share with the world.
        </p>
      </div>
    </div >
  );
}