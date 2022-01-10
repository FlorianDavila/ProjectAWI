import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { NewIngredientComponent } from 'src/app/dialogs/new-ingredient/new-ingredient.component';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  category1 : String;
  category2 : String;
  category3 : String;
  category4 : String;
  category5 : String;
  displayedColumns: string[]
  ingredients : Observable<Ingredient[]>;
  isClicked : boolean;

  name : FormControl;
  stock : FormControl;
  unit : FormControl;
  price : FormControl;
  cat : FormControl;
  allergen : FormControl;
  allCat : FormControl;
  newIngredient : Ingredient;


  constructor(public ingreServ : IngredientService, public _snackBar : MatSnackBar, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.category1 = 'Viandes et Volailles';
    this.category2 = 'Fruits et Legumes';
    this.category3 = 'Cremerie';
    this.category4 = 'Epicerie';
    this.category5 = 'Poissons et Crustaces';
    this.displayedColumns = ['position'];
    this.ingredients = this.ingreServ.getIngredients();
    this.isClicked = false;

    this.name = new FormControl({value : ''}, Validators.required);
    this.stock = new FormControl({value : ''}, Validators.required);
    this.unit = new FormControl({value : ''},Validators.required);
    this.price = new FormControl({value : ''}, Validators.required);
    this.cat = new FormControl({value : ''}, Validators.required);
    this.allergen = new FormControl({value : ''}, Validators.required);
    this.allCat = new FormControl({value : ''}, Validators.required);
  }

  addIng() {
    this.isClicked = true;
    this.resetForms();
  }

  resetForms() {
    this.name.reset();
    this.stock.reset();
    this.unit.reset();
    this.price.reset();
    this.cat.reset();
    this.allergen.reset();
    this.allCat.reset();
  }

  validateIng() {
    const dialogRef = this.dialog.open(NewIngredientComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
        if(this.allergen.value == 'Oui') {
          if(this.allCat.errors == null) {
            this.newIngredient = new Ingredient(this.name.value, true, this.cat.value, this.price.value + " €", this.unit.value, this.stock.value, this.allCat.value);
          }
        }
        else{
          this.newIngredient = new Ingredient(this.name.value, false, this.cat.value, this.price.value + " €", this.unit.value, this.stock.value);
        }
        this.ingreServ.addUpdateIngredient(this.newIngredient);
        this.cancel();
        this.openSnackBar("Ingrédient correctement ajouté", "Fermer");
      }
    });
  }

  cancel() {
    this.isClicked = false;
    this.name.reset();
    this.stock.reset();
    this.unit.reset();
    this.price.reset();
    this.cat.reset();
    this.allergen.reset();
    this.allCat.reset();
  }

  checkIsClicked() {
    if(this.isClicked == false) {
      return false;
    }
    else{
      return true;
    }
  }

  checkAllergen() {
    if(this.allergen.value != "Oui") {
      return false;
    }
    else{
      return true;
    }
  }

  checkIsFill() {
    if(this.name.errors == null && this.stock.errors == null && this.unit.errors == null && this.price.errors == null && this.cat.errors == null && this.allergen.errors == null){
      if(this.allergen.value == "Oui"){
        if(this.allCat.errors == null) {
          return false
        }
        else{
          return true;
        }
      }
      else{
        return false;
      }
    }
    else{
      return true;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition : 'top'
    });
  }

}
