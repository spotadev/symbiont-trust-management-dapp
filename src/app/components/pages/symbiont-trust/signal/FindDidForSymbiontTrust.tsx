import { Link } from "react-router-dom";


export default function FindDidForSymbiontTrust() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Search For DIDs
      </div>
      <hr />
      <div style={{ textAlign: 'right' }}>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Friends
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Friend Requests
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Friends still to Endorse
        </Link>
      </div>
      <div style={{ paddingTop: '20px' }}>

      </div>
    </div >
  );
}