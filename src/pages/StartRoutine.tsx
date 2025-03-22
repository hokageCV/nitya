import { useEffect, useState, useCallback } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from "@ionic/react";
import { useRoutineStore } from "../store/useRoutines";
import { useParams } from "react-router-dom";
import type { Routine } from '../types';

interface RouteParams {
  id: string;
}

const useRoutineState = (routine?: Routine | null) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [routineCompleted, setRoutineCompleted] = useState(false);

  const currentTask = routine?.tasks[currentTaskIndex];

  // Initialize task state
  useEffect(() => {
    if (!currentTask) return;
    if (currentTask.time) {
      setTimeLeft(currentTask.time);
      setIsRunning(true);
    } else {
      setTimeLeft(null);
      setIsRunning(false);
    }
  }, [currentTask]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft === null || timeLeft <= 0) return;

    const timer = setTimeout(() => setTimeLeft((prev) => (prev ? prev - 1 : 0)), 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  const moveToNextTask = useCallback(() => {
    if (!routine) return;
    if (currentTaskIndex < routine.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      setRoutineCompleted(true);
    }
  }, [routine, currentTaskIndex]);

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      moveToNextTask();
    }
  }, [timeLeft, isRunning, moveToNextTask]);

  return { currentTask, timeLeft, routineCompleted, moveToNextTask };
};

const RoutineCompletedView = ({ routineName }: { routineName: string }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{routineName}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonText>
        <h2>Routine Completed! 🎉</h2>
      </IonText>
      <IonButton expand="full" routerLink="/">
        Go to Home
      </IonButton>
    </IonContent>
  </IonPage>
);

const TaskView = ({
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

const StartRoutine: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const routine = useRoutineStore((state) => state.routines.find((r) => r.id === id));

  if (!routine) return <IonText>Routine not found.</IonText>;

  const { currentTask, timeLeft, routineCompleted, moveToNextTask } = useRoutineState(routine);

  if (routineCompleted) return <RoutineCompletedView routineName={routine.name} />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{routine.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {currentTask && <TaskView task={currentTask} timeLeft={timeLeft} moveToNextTask={moveToNextTask} />}
    </IonPage>
  );
};

export default StartRoutine;
