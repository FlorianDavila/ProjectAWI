import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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


  constructor(public ingreServ : IngredientService) { }

  ngOnInit(): void {
    this.category1 = 'Viandes et Volailles';
    this.category2 = 'Fruits et Legumes';
    this.category3 = 'Cremerie';
    this.category4 = 'Epicerie';
    this.category5 = 'Poissons et Crustaces';
    this.displayedColumns = ['position'];
    this.ingredients = this.ingreServ.getIngredients();
  }

}
