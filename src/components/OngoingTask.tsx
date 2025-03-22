import { IonButton, IonContent, IonText } from '@ionic/react';

const OngoingTask = ({
  task,
  timeLeft,
  moveToNextTask,
}: {
  task: { name: string; time?: number; reps?: number };
  timeLeft: number | null;
  moveToNextTask: () => void;
}) => (
  <IonContent className="ion-padding">
    <IonText>
      <h2>{task.name}</h2>
    </IonText>

    {task.time ? (
      <IonText>
        <h1>{timeLeft}s</h1>
      </IonText>
    ) : (
      <IonText>
        <h1>{task.reps} reps</h1>
      </IonText>
    )}

    {!task.time && (
      <IonButton expand="full" onClick={moveToNextTask}>
        Next
      </IonButton>
    )}
  </IonContent>
);

export default OngoingTask;
