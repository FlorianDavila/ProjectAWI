import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meal } from 'src/app/models/Meal';
import { Stage } from 'src/app/models/Stage';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-change-couv',
  templateUrl: './change-couv.component.html',
  styleUrls: ['./change-couv.component.css']
})
export class ChangeCouvComponent implements OnInit {

  nbCouv : FormControl;
  actualMeal : Meal = this.data.meal;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {meal: Meal}, public mealService : MealService) {}
  
  ngOnInit(): void {
    this.nbCouv = new FormControl('', Validators.required);
  }

  submit() : void {
    if(this.nbCouv.value > 0) {
      this.actualMeal.stageList.forEach(element => {
        element.ingredients.forEach((ing: any) => {
          ing.quantity = ing.quantity * this.nbCouv.value / this.actualMeal.nbGuests;
        });
      });
      this.actualMeal.nbGuests = this.nbCouv.value
      this.mealService.addUpdateMeal(this.actualMeal)  
    }
  }

  checkError() : boolean {
      if(this.nbCouv.hasError('required')) {
        return true;
      }
      return false;
  }
}
