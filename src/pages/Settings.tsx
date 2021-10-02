import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <div className="content">
            <p>
              <label className="label">Meeting duration:</label>
              <select className="select" name="meetingDuration" id="meetingDuration">
                <option value="15">15 mins</option>
                <option value="30" selected>30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
                <option value="150">2.5 hours</option>
                <option value="180">3 hours</option>
              </select>
            </p>
            <p>
              <label className="label">End 5 minutes early?</label>
              <input className="checkbox" type="checkbox" id="meetingSpeedy" name="meetingSpeedy" checked
                />
            </p>
            <p>
              <label className="label">Meeting start time: </label>
              <select className="select" name="meetingSlot" id="meetingSlot" >
                <option value="-1" selected>Loading ...</option>
              </select>
            </p>
            <p><span className="tinyText"><a href="https://github.com/khilnani/timelymeetings.com" target="_blank">Github</a> | <a href="https://khilnani.org" target="_blank">Nik Khilnani</a></span></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
