import { Link } from "react-router-dom";

export default function PreviewSymbiontTrustProfile() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Preview Symbiont Trust Profile
      </div>
    </div>
  );
}