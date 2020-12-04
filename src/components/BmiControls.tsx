import React from "react";
import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const BmiControls: React.FC<{ onCalc: () => void; onReset: () => void; }> = (props) => {
    return (
        <IonRow>
          <IonCol className="ion-text-right">
            <IonButton onClick={props.onCalc}>
              <IonIcon slot="start" icon={calculatorOutline} /> Calculate
            </IonButton>
          </IonCol>

          <IonCol>
            <IonButton onClick={props.onReset}>
              <IonIcon slot="start" icon={refreshOutline} /> Reset
            </IonButton>
          </IonCol>
        </IonRow>
    )
}

export default BmiControls;