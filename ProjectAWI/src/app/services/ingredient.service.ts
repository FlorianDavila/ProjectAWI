import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { Ingredient } from '../models/Ingredient';
import { IngredientCategoryService } from './ingredient-category.service';
import { IngredientCategory } from '../models/IngredientCategory';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  // public festivals: Observable<Festival[]> = new Observable<Festival[]>();
  
  private ic: IngredientCategory = new IngredientCategory("az");
  private path = '/Ingredients/';
  private projetawiStore: AngularFirestore;
  private ingredientsCollection: AngularFirestoreCollection<Ingredient>;
  private ingredientCategoryService: IngredientCategoryService;

  constructor(private db: AngularFirestore, ingredientCategoryService: IngredientCategoryService) {
    this.projetawiStore = db;
    this.ingredientsCollection = db.collection(this.path);
    this.ingredientCategoryService = ingredientCategoryService;
  } 
 
  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    ); 
  }

  jsonToIngredient(json: any) : Ingredient { 
    this.ingredientCategoryService.getIngredientCategory(json.ingredient_category).subscribe(data => this.ic = data); //path to ingredient category
    console.log(this.ic.name)
    return new Ingredient(
      json.id,
      json.name,
      json.isAllergern,
      this.ic,
      json.price,
      json.unit
    )
  }
}
