import { Component, Inject } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Ingredient } from './models/Ingredient'; 
import { IngredientService } from './services/ingredient.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {

  public ingArray: Ingredient[] = [];
  public cat1 : string = "Viandes et Volailles";
  public cat2 : string = "Poissons et Crustaces";
  public cat3 : string = "Cremerie";
  public cat4 : string = "Fruits et Legumes";
  public cat5 : string = "Epicerie";


  constructor(public ingredientService: IngredientService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  //TO ADD ALL THE INGREDIENTS TO THE DATABASE FROM THE CSV
  addIngToDB() : void {
    this.http.get('assets/Mercuriale.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 6; index < 13; index++) {
              let row = csvToRowArray[index].split(",");
              this.ingArray.push(new Ingredient(row[1], false, this.cat1, row[3], row[2],20));
            }
            for (let index = 18; index < 23; index++) {
              let row = csvToRowArray[index].split(",");
              this.ingArray.push(new Ingredient(row[1], false, this.cat2, row[3], row[2],20));
            }
            for (let index = 28; index < 41; index++) {
              let row = csvToRowArray[index].split(",");
              this.ingArray.push(new Ingredient(row[1], false, this.cat3, row[3], row[2],20));
            }
            for (let index = 47; index < 71; index++) {
              let row = csvToRowArray[index].split(",");
              this.ingArray.push(new Ingredient(row[1], false, this.cat4, row[3], row[2],20));
            }
            for (let index = 76; index < 226; index++) {
              let row = csvToRowArray[index].split(",");
              this.ingArray.push(new Ingredient(row[1], false, this.cat5, row[3], row[2],20));
            }
           //post ingredients to the database
           for(let ing of this.ingArray) {
              this.ingredientService.addUpdateIngredient(ing);
            }
        },
        error => {
            console.log(error);
        }
    );
  }
}
