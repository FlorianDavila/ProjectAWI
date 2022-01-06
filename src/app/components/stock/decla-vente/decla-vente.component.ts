import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import {MealService} from 'src/app/services/meal.service'
import { Meal } from 'src/app/models/Meal';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { async } from '@firebase/util';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmVenteComponent } from 'src/app/dialogs/confirm-vente/confirm-vente.component';

@Component({
  selector: 'app-decla-vente',
  templateUrl: './decla-vente.component.html',
  styleUrls: ['./decla-vente.component.css']
})
export class DeclaVenteComponent implements OnInit {

  mealControl : FormControl;
  numberControl : FormControl;
  meals: Observable<Meal[]> = new Observable<Meal[]>();
  mealSelected :Meal;
  nbOfMeal : number;
  ingredient : Ingredient;

  constructor(public mealService : MealService, public _snackBar: MatSnackBar, public ingServ : IngredientService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.mealControl = new FormControl('', Validators.required);
    this.numberControl = new FormControl('', Validators.required);
    this.meals = this.mealService.getMeals();
  }

  sendVente() {
    if(isNaN(+this.numberControl.value)) {
      alert("Vous devez entrer un nombre de quantité vendue valide");
      this.numberControl.reset();
    }
    else{
      this.mealSelected = this.mealControl.value;
      this.nbOfMeal = +this.numberControl.value;
      const dialogRef = this.dialog.open(ConfirmVenteComponent, {
        data :{
          meal : this.mealSelected,
          number : this.nbOfMeal,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        var userResponse = result ? JSON.parse(result) : false;
        if (userResponse) {
          for(let i=0; i< this.mealSelected.stageList.length; i++) {
            let actualIngredients = this.mealSelected.stageList[i].ingredients;
            for(let j=0; j<actualIngredients.length; j++) {
              let ingredientName = actualIngredients[j].name;
              let quantity = +actualIngredients[j].quantity;
              let counter = 0;
              this.ingServ.getIngredientByName(ingredientName).subscribe( data => {
                let stock;
                let newStock; 
                this.ingredient = data[0];
                stock = this.ingredient.stock;
                newStock = this.ingredient.stock - quantity*this.nbOfMeal;
                this.ingredient.stock = newStock;
                if(counter == 0) {
                  this.ingServ.addUpdateIngredient(this.ingredient);
                }
                counter ++;
              })
            }
          }  
          this.mealControl.reset();
          this.numberControl.reset();
          this.openSnackBar("Votre vente a bien été effectuée", "Fermer");  
        }
      }); 
    }
  }

  checkError() : boolean {
    if(this.numberControl.hasError('required') || this.mealControl.hasError('required')) {
      return true;
    }
    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'top',
      });
  }

}