
export default function ConfigureSymbiontTrustProfile() {

  return (
    <div>
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '30%' }}>Your Current Interests:</div>
          <div style={{ width: '40%' }}>
            <ul>
              <li>None</li>
            </ul>
          </div>
          <div style={{ width: '30%' }}>
            <button>Change Interests</button>
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
          by clicking the "Save and Preview" button below.
        </p>
        <div style={{ paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '30%' }}>
              <input type="checkbox" /> Interests
            </div>
            <div style={{ width: '70%' }}>
              <a href="">Interests Help</a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <div style={{ width: '30%' }}>
              <input type="checkbox" /> UTU Trust Signal
            </div>
            <div style={{ width: '70%' }}>
              <a href="">UTU Trust Signal Help</a>
            </div>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <button>Save and Preview Symbiont Trust Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}