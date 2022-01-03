import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { Ingredient } from '../models/Ingredient'; 

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredients: Observable<Ingredient[]>; 
  private path = '/Ingredients';
  private projetawiStore: AngularFirestore;
  private ingredientsCollection: AngularFirestoreCollection<Ingredient>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.ingredientsCollection = db.collection(this.path, ref => ref.orderBy("name", "asc"));
    this.getIngredients();
  } 
 
  getIngredients() {
    this.ingredients = this.ingredientsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    ); 
  }

  jsonToIngredient(json: any) : Ingredient {   
    return new Ingredient(
      json.id,
      json.name,
      json.isAllergern,
      json.category,
      json.price,
      json.unit
    )
  }
}
