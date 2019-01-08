import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()

export class TrainingService {

  exerciseChange = new Subject<Exercise>();
  exercisesChange = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercise() {

    this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map((docArray: any) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
        });
      })
      ).subscribe((exercises: Exercise[]) => {
        this.availableExercise = exercises;
        this.exercisesChange.next([...this.availableExercise]);
      });

    // return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChange.next({...this.runningExercise});
  }

  completeExercise() {
    this.addExerciseToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addExerciseToDatabase({...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercise() {
    this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    });
  }

  private addExerciseToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

}
