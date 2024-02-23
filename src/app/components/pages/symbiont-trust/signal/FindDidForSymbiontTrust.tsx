import { Link } from "react-router-dom";
import appStyle from '../../../../../App.module.css';


export default function FindDidForSymbiontTrust() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Find a DID / Manage Friends / Give and See Signal
      </div>
      <hr />
      <div style={{ textAlign: 'right' }}>
        <span style={{ color: 'darkgreen', fontWeight: 'bold' }}>Manage Friends:</span>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Current Ones
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          In Requests
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Out Requests
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Still to Endorse
        </Link>
        <Link to={'/friend-requests'} style={{ paddingLeft: '15px' }}>
          Suggested to you
        </Link>
      </div>
      <p>
        You can also search for friends by social media platform and handle or you can
        search for new friends by interest.
      </p>
      <p>
        Note the interests you can search by are the ones you configured under:
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Symbiont Trust
        </Link>
      </p>
      <p>
        Search by: &nbsp;
        <input type="radio" id="option1" name="option" value="Option 1"
          checked={true}
          onChange={() => { }} />
        <label htmlFor="option1">Platform</label>
        &nbsp;&nbsp;
        <input type="radio" id="option1" name="option" value="Option 1"
          checked={true}
          onChange={() => { }} />
        <label htmlFor="option1">Interests</label>
      </p>
      <div style={{ paddingTop: '20px' }}>
        <select id="selectPlatform"
          value=''
          onChange={(event) => { }}
          className={appStyle.input}
        >
          <option value="">Select Platform</option>
          <option value="ethereum">Ethereum Wallet Address</option>
          <option value="github">Github Handle</option>
          <option value="nextid">Next.id DID</option>
          <option value="twitter">X Handle</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <span>Handle:</span>
        &nbsp;&nbsp;
        <input
          type="text"
          id="yourTextBox"
          value=''
          onChange={(event) => { }}
          className={appStyle.input}
          style={{ width: '400px' }}
        />
      </div>
      <div style={{ paddingTop: '20px' }}>
        <div style={{ paddingTop: '20px' }}>
          <select id="selectPlatform"
            value=''
            onChange={(event) => { }}
            className={appStyle.input}
          >
            <option value="">Select Interests</option>
            <option value="ethereum">Reggae Production</option>
            <option value="github">Anti War Activist</option>
            <option value="nextid">Kite Surfing</option>
          </select>
        </div>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <button onClick={() => { }}>Search</button>
        &nbsp;&nbsp;
        <button onClick={() => { }}>Reset</button>
      </div>
    </div >
  );
}