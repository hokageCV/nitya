import { IonButton, IonContent, IonText } from '@ionic/react';
import type { Task } from '../types';
import './OngoingTask.css'

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
      <h2 className='task-name'>{task.name}</h2>
    </IonText>

    <IonText>
      <p className='task-description'>{task.description}</p>
    </IonText>

    <IonText>
      <p className='task-set'>Set {currentSet} of {task.sets}</p>
    </IonText>

    {task.time ? (
      <IonText>
        <h1 className='frequency-indicator'>{timeLeft}s</h1>
      </IonText>
    ) : (
      <IonText>
        <h1 className='frequency-indicator'>{task.reps} reps</h1>
      </IonText>
    )}

    {!task.time && (
      <IonButton className='add-btn' expand="full" onClick={moveToNextTask}>
        Next
      </IonButton>
    )}
  </IonContent>
);

export default OngoingTask;
