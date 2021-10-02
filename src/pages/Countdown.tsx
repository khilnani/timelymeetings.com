import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Countdown.css';

const Countdown: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <div className="content">
            <p className="meetingTime"><span id="meetingTime">???</span></p>
            <div id="clockdiv">
              <div>
                <span className="hours"></span>
                <div className="clocktext">Hours</div>
              </div>
              <div>
                <span className="minutes"></span>
                <div className="clocktext">Minutes</div>
              </div>
              <div>
                <span className="seconds"></span>
                <div className="clocktext">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Countdown;
