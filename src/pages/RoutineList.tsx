import { useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonLabel } from "@ionic/react";
import { useRoutineStore } from "../store/useRoutines";
import { useHistory } from "react-router-dom";

const RoutineList: React.FC = () => {
  const { routines, loadRoutines, deleteRoutine } = useRoutineStore();
  const history = useHistory();

  useEffect(() => {
    loadRoutines();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Routines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {routines.length === 0 ? (
          <p>No routines found. Create one!</p>
        ) : (
          <IonList>
            {routines.map((routine) => (
              <IonItem key={routine.id}>
                <IonLabel>{routine.name}</IonLabel>
                <IonButton color="primary" onClick={() => history.push(`/start-routine/${routine.id}`)}>
                  Start
                </IonButton>
                <IonButton color="tertiary" onClick={() => history.push(`/edit-routine/${routine.id}`)}>
                  Edit
                </IonButton>
                <IonButton color="danger" onClick={() => deleteRoutine(routine.id)}>
                  Delete
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonButton expand="full" routerLink="/add-routine">
          Add New Routine
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RoutineList;
