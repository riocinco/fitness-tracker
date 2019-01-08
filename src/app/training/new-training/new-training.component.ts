import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercise: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService
                                    .exercisesChange
                                    .subscribe(exercises => this.availableExercise = exercises);

    this.trainingService.fetchAvailableExercise();

      // this.availableExercise = this.trainingService.getAvailableExercise();
      // this.db.collection('availableExercises').valueChanges().subscribe(result => {
      //   console.log(result);
      // });

      // this.availableExercise = this.db.collection('availableExercises').valueChanges();

  }

  ngOnDestroy(): void {
    this.exerciseSubscription .unsubscribe();
  }

  onStartTraining(form: NgForm) {
    // this.startTraining.emit();
    this.trainingService.startExercise(form.value.workout);
  }
}
