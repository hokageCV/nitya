import { IonButton, IonContent, IonText } from '@ionic/react';
import type { Task } from '../types';

const OngoingTask = ({
  task,
  timeLeft,
  moveToNextTask,
  currentSet
}: {
  task: Task;
  timeLeft: number | null;
  moveToNextTask: () => void;
  currentSet: number
}) => (
  <IonContent className="ion-padding">
    <IonText>
      <h2>{task.name}</h2>
    </IonText>
    <IonText>
      <p>Set {currentSet} of {task.sets}</p>
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
