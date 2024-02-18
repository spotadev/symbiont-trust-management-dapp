import { Link } from "react-router-dom";
import appStyle from '../../../App.module.css';


export default function LinkExplanation() {

  return (
    <>
      <hr />
      <div>
        <p>
          Go to
          <Link to={'/docs'}>
            &nbsp;
            Docs
            &nbsp;
          </Link>
          to see a more detailed explanation of what Symbiont Trust is about
        </p>
      </div>
      <hr />
      <div>
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
          <p>
            Note that web2 websites and web3 dapps can display your Symbiont Trust Profile.
            Think of it like an enhanced version of twitter's tick except you get to configure
            what is shown.
          </p>
        </div>
      </div>
      <hr />
      <div>
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
      <hr />
    </>
  );
}