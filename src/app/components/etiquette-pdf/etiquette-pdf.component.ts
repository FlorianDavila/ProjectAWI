import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmVenteComponent } from 'src/app/dialogs/confirm-vente/confirm-vente.component';
import { Ingredient } from 'src/app/models/Ingredient';
import { Meal } from 'src/app/models/Meal';
import { DownloadService } from 'src/app/services/download.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-etiquette-pdf',
  templateUrl: './etiquette-pdf.component.html',
  styleUrls: ['./etiquette-pdf.component.css']
})
export class EtiquettePdfComponent implements OnInit {

  meal: Meal;
  actualIngredient :Ingredient;
  ingredients : Ingredient[] = [];
  ingredientToUpdate : Ingredient;
  nbOfMeal : number;

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  nbOfEtiq : FormControl;
  check : FormControl;

  constructor(private downloadService: DownloadService, private route: ActivatedRoute, public ingServ : IngredientService,
    public dialog : MatDialog, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nbOfEtiq = new FormControl('', Validators.required);
    this.check = new FormControl('');
    this.route.queryParams.subscribe(params => {  
      var json = JSON.parse(params['meal']); 
      this.meal = new Meal( 
        json.id,
        json.name,
        json.manager,
        json.category,
        json.nbGuests,
        json.stageList ? json.stageList : [],
        json.matS,
        json.matD,
        null,
        null,
        null,
        null
      ); 
    });
  }

  ngAfterViewInit() {
    for(var i=0; i < this.meal.stageList.length; i++){
      let actualIngredients = this.meal.stageList[i].ingredients;
      for(let j=0; j<actualIngredients.length; j++) { 
        let ingredientName = actualIngredients[j].name;
        this.ingServ.getIngredientByName(ingredientName).subscribe( data => {
          this.actualIngredient = data[0];
          if(this.ingredients.find(e => e.id === this.actualIngredient.id)) {}
          else{
            this.ingredients.push(this.actualIngredient);
          }
        })
      }
    }   
  }

  checkError() : boolean {
    if(this.nbOfEtiq.hasError('required')) {
      return true;
    }
    return false;
  }

  public downloadAsPDF() { 
    if(isNaN(+this.nbOfEtiq.value)) {
      alert("Vous devez entrer un nombre d'étiquettes valide");
      this.nbOfEtiq.reset();
    }
    else{
      if(this.check.value == true){
        this.nbOfMeal = +this.nbOfEtiq.value;
        const dialogRef = this.dialog.open(ConfirmVenteComponent, {
        data :{
          meal : this.meal,
          number : +this.nbOfEtiq.value,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        var userResponse = result ? JSON.parse(result) : false;
        if (userResponse) {
          for(let i=0; i< this.meal.stageList.length; i++) {
            let actualIngredients = this.meal.stageList[i].ingredients;
            for(let j=0; j<actualIngredients.length; j++) {
              let ingredientName = actualIngredients[j].name;
              let quantity = +actualIngredients[j].quantity;
              let counter = 0;
              this.ingServ.getIngredientByName(ingredientName).subscribe( data => {
                let stock;
                let newStock; 
                this.ingredientToUpdate = data[0];
                stock = this.ingredientToUpdate.stock;
                newStock = this.ingredientToUpdate.stock - quantity*this.nbOfMeal;
                this.ingredientToUpdate.stock = newStock;
                if(counter == 0) {
                  this.ingServ.addUpdateIngredient(this.ingredientToUpdate);
                }
                counter ++;
              })
            }
          }  
          this.nbOfEtiq.reset();
          this.check.reset();
          this.openSnackBar("Vente déclarée avec succès", "Fermer");  
        }
      });  
      }
      this.downloadService.downloadFile(
        this.pdfTable.nativeElement,
        `${(this.meal.name).replace(" ","-").toLowerCase()}-etiquette.pdf`
      )   
    } 
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'top',
      });
  }

} 
