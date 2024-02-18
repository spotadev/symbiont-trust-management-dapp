import { Link } from "react-router-dom";
import appStyle from '../../../App.module.css';


export default function LinkExplanation() {

  return (
    <>
      <div>
        <hr />
        <p>
          Go to
          <Link to={'/find-next-id-avatar'}>
            &nbsp;
            UTU Trust
            &nbsp;
          </Link>
          to find an Avatar DID and give / get UTU Trust signal on it.
        </p>
      </div>
      <div>
        <hr />
        <p>
          Go to
          <Link to={'/find-next-id-avatar'}>
            &nbsp;
            Symbiont Trust
            &nbsp;
          </Link>
          to:
        </p>
        <div>
          <ul>
            <li>build your Symbiont Trust Profile</li>
            <li>to find an Avatar DID and give / get Symbiont Trust signal on it.</li>
          </ul>
          Note that web2 websites and web3 dapps can display your Symbiont Trust Profile.
          Think of it like an enhanced version of twitter's tick except you get to configure
          what is shown.
        </div>
        <hr style={{ marginTop: '10px' }} />
      </div>
    </>
  );
}