import { Link } from "react-router-dom";
import appStyle from '../../../../App.module.css';

export default function About() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/'}>
          Home
        </Link>
        &nbsp; &nbsp;&nbsp; &nbsp;
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
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        About
      </div>
      <hr />
      <div style={{ paddingTop: '10px' }}>
        This site was created by crypto enthusiasts who want to bring Trust to the web2 and web3
        space. If you want to contact us or get involved please start by raising a discussion under
        the github discussions of this project:
        <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
          <a href="https://github.com/spotadev/symbiont-trust-management-dapp/discussions">
            https://github.com/spotadev/symbiont-trust-management-dapp/discussions
          </a>
        </div>
        <p>
          From there we can migrate to the communication channel of your choice.
        </p>
      </div>
      <br />
      <hr />
    </div >
  );
}