import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/Ingredient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.css']
})
export class InputIngredientComponent implements OnInit {

  @Input() public ingredient : Ingredient;

  public stockControl : FormControl;
  public val : boolean;
  public modif : boolean;
  public stock : number;
  public prefN : boolean;
  public prefP : boolean;
  constructor(public _snackBar: MatSnackBar, public ingServ : IngredientService) { }

  ngOnInit(): void {
    this.val = true;
    this.modif = false;
    this.stock = this.ingredient.stock;
    this.stockControl = new FormControl({value : this.ingredient.stock, disabled: true}, Validators.required);
    this.prefN = false;
    this.prefP = false;
  }

  public modifyP() : void {
    this.prefP = true;
    this.modif = true;
    this.val = false;
    this.stockControl.enable();
    this.stockControl.reset();
  }

  public modifyN() : void {
    this.prefN = true;
    this.modif = true;
    this.val = false;
    this.stockControl.enable();
    this.stockControl.reset();
  }

  public validate() : void {
    this.modif = false;
    this.val = true;
    this.stockControl.disable();
    var inputValue = this.stockControl.value;
    if(this.prefN == true) {
      if (inputValue == "") {
        alert("Vous devez renseigner une valeur");
        this.prefN = false;
      }
      else {
        var newValue : number = +inputValue;
        if(isNaN(newValue)){
          alert("Vous devez renseigner un nombre");
          this.prefN = false;
          this.stockControl.setValue(this.ingredient.stock);
        }
        else{
          this.ingredient.stock -= newValue;
          this.prefN = false;
          this.stockControl.setValue(this.ingredient.stock);
          this.ingServ.addUpdateIngredient(this.ingredient);
          this.openSnackBar("Stock correctement modifié", "Fermer");
        }
      }
    }
    if(this.prefP == true){
      if (inputValue == "") {
        alert("Vous devez renseigner une valeur");
        this.prefP = false;
      }
      else {
        var newValue : number = +inputValue;
        if(isNaN(newValue)){
          alert("Vous devez renseigner un nombre");
          this.prefP = false;
          this.stockControl.setValue(this.ingredient.stock);
        }
        else{
          this.ingredient.stock += newValue;
          this.prefP = false;
          this.stockControl.setValue(this.ingredient.stock);
          this.ingServ.addUpdateIngredient(this.ingredient);
          this.openSnackBar("Stock correctement modifié", "Fermer");
        }
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition : 'top'
    });
  }

}
