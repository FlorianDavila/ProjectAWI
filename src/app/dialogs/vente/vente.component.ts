import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meal } from 'src/app/models/Meal';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  nbVente : FormControl;
  actualMeal : Meal = this.data.meal;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {meal: Meal}, public ingServ : IngredientService) {}
  
  ngOnInit(): void {
    this.nbVente = new FormControl('', Validators.required);
  }

  submit() : void {
      var nbOfMeal = this.nbVente.value;
      if(nbOfMeal > 0) {
        for(let i=0; i< this.actualMeal.stageList.length; i++) {
          let actualIngredients = this.actualMeal.stageList[i].ingredients;
          for(let j=0; j<actualIngredients.length; j++) {
            let ingredientName = actualIngredients[j].name;
            let quantity = +actualIngredients[j].quantity;
            let counter = 0;
            this.ingServ.getIngredientByName(ingredientName).subscribe( data => {
              let stock;
              let newStock; 
              let ingredient = data[0];
              stock = ingredient.stock;
              newStock = ingredient.stock - quantity*nbOfMeal;
              ingredient.stock = newStock;
              if(counter == 0) {
                this.ingServ.addUpdateIngredient(ingredient);
              }
              counter ++;
            })
          }
        } 
      }  
  }

  checkError() : boolean {
      if(this.nbVente.hasError('required')) {
        return true;
      }
      return false;
  }

}
