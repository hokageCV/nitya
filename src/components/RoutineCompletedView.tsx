import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const RoutineCompletedView = ({ routineName }: { routineName: string }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar className='toolbar'>
        <IonTitle>{routineName}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <IonText>
        <h2>Routine Completed! 🎉</h2>
      </IonText>
       {/* routerDirection='root' to reset navigation stack */}
      <IonButton className='save-btn' expand='full' routerLink='/' routerDirection='root'>
        Go to Home
      </IonButton>
    </IonContent>
  </IonPage>
)

export default RoutineCompletedView
