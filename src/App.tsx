import React, { useRef, useState } from 'react';
import { IonApp, IonAlert, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/react';

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

/* BMI Controls  */
import BmiControls from "./components/BmiControls";
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

const App: React.FC = () => {
  const [ caluculatedBMI, setCaluculatedBMI ] = useState<number>();
  const [ error, setError ] = useState<string>();
  const [ calcUnits, setCalcUnits ] = useState<'mkg' | 'ftlbs'>('mkg');


  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);


  const calculatorBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0) {
      setError('Please enter a valid  (non-negetive) input value');
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const weight = +enteredWeight / weightConversionFactor;

    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;
    const height = +enteredHeight / heightConversionFactor

    const bmi = +weight / (+height * +height)
    setCaluculatedBMI(bmi);

  };
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Ok', handler: clearError }]} />
  <IonApp>
    
    <IonHeader className="ionic-text-center">
      <IonToolbar color="primary">
        <IonTitle className="ionic-text-center">BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <IonGrid>

        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
            <IonItem>

              <IonLabel position="floating">Your Height  ({calcUnits === 'mkg' ? 'meters' : 'feet'})</IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>

            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-left">
            <IonItem>

              <IonLabel position="floating">Your Height ({ calcUnits === 'mkg' ? 'kg' : 'lbs' }) </IonLabel>
              <IonInput type="number" ref={weightInputRef}></IonInput>

            </IonItem>
          </IonCol>
        </IonRow>

        <BmiControls onCalc={calculatorBMI} onReset={resetInputs} />

        {
          caluculatedBMI ? (
              <BmiResult result={caluculatedBMI} />
          ) : null
        }

      </IonGrid>
    </IonContent>

  </IonApp>
  </React.Fragment>
  );
};

export default App;
