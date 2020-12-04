import React, { useRef, useState } from 'react';
import { IonApp, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { calculatorOutline, refreshOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [ caluculatedBMI, setCaluculatedBMI ] = useState<number>();


  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);


  const calculatorBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight) {
      return;
    }

    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight)
    setCaluculatedBMI(bmi);

  };
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  return (
  <IonApp>
    
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Caluculator</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <IonGrid>

        <IonRow>
          <IonCol>
            <IonItem>

              <IonLabel position="floating">Your Height</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>

            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-left">
            <IonItem>

              <IonLabel position="floating">Your Height</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>

            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-right">
            <IonButton onClick={calculatorBMI}>
              <IonIcon slot="start" icon={calculatorOutline} /> Calculate
            </IonButton>
          </IonCol>

          <IonCol>
            <IonButton onClick={resetInputs}>
              <IonIcon slot="start" icon={refreshOutline} /> Reset
            </IonButton>
          </IonCol>
        </IonRow>

        {
          caluculatedBMI ? (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2> {caluculatedBMI} </h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
          ) : null
        }

      </IonGrid>
    </IonContent>

  </IonApp>
  );
};

export default App;
