import { Link } from "react-router-dom";

export default function ConfigureSymbiontTrustProfile() {

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to={'/symbiont-trust'} style={{ paddingLeft: '15px' }}>
          Back
        </Link>
      </div>
      <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
        Symbiont Trust - Configure Symbiont Trust Profile
      </div>
      <hr />
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '25%' }}>Your Current Interests:</div>
          <div style={{ width: '60%' }}>
            <ul>
              <li>None</li>
            </ul>
          </div>
          <div style={{ width: '15%' }}>
            <button>Change</button>
          </div>
        </div>
      </div>
      <hr />
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '25%' }}>Name / Nicknames:</div>
          <div style={{ width: '60%' }}>
            <ul>
              <li>None</li>
            </ul>
          </div>
          <div style={{ width: '15%' }}>
            <button>Change</button>
          </div>
        </div>
      </div>
      <hr />
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '25%' }}>Achievement Unlock / NFTs</div>
          <div style={{ width: '60%' }}>
            <ul>
              <li>None</li>
            </ul>
          </div>
          <div style={{ width: '15%' }}>
            <button>Change</button>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div style={{ color: 'green', fontWeight: 'bold', paddingTop: '20px' }}>
          Select What to Show in your Trust Profile
        </div>
        <p>
          Your Symbiont Trust Profile is consumed by other apps. Here you configure what will be
          seen in your Symbiont Trust Profile.  You can also preview your "Symbiont Trust Profile"
          by clicking the "Save and Preview" button below.  Note that the Preview is similar to
          what users will see in applications that consume the Symbiont Trust API.
        </p>
        <div style={{ paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              Interests
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              Names / Nicknames
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              UTU Trust Signal / Endorsements
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              Symbiont Trust Signal / Trait Endorsements
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              web3 Bio
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              Any white list Info associated with the DID
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '5%' }}>
              <input type="checkbox" />
            </div>
            <div style={{ width: '50%' }}>
              Achievement Unlock / NFTs
            </div>
            <div style={{ width: '45%' }}>
              <a href="">Help</a>
            </div>
          </div>

          <div style={{ paddingTop: '30px' }}>
            <button>Save and Preview Symbiont Trust Profile</button>
          </div>
        </div>
        <br />
        <hr />
        <br /><br />&nbsp;
      </div >
    </div >
  );
}