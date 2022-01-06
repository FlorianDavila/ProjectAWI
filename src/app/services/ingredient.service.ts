import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { Ingredient } from '../models/Ingredient'; 

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredients : Observable<Ingredient[]>;
  private path = '/Ingredients/';
  private projetawiStore: AngularFirestore;
  private ingredientsCollection: AngularFirestoreCollection<Ingredient>; 
  private ingredientCatColl : AngularFirestoreCollection<Ingredient>; 
  private ingCol: AngularFirestoreCollection<Ingredient>; 

  constructor(public db: AngularFirestore) {
    this.projetawiStore = db;
    this.ingredientsCollection = db.collection(this.path, ref => ref.orderBy("name", "asc"));
    this.ingCol = db.collection(this.path); 
    this.getIngredients();
  }
 
  getIngredients() : Observable<Ingredient[]> {
    //pas ouf d'avoir une variable ingredient dans ce service jpense
    this.ingredients = this.ingredientsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    ); 

    return this.ingredientsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    ); 
  }

  jsonToIngredient(json: any) : Ingredient {   
    return new Ingredient(
      json.name,
      json.isAllergen,
      json.category,
      json.price,
      json.unit, 
      json.stock,
      json.allergenCategory, 
      json.id
    )
  }

  getIngredientByCategory(cat : String) : Observable<Ingredient[]>{
    this.ingredientCatColl = this.db.collection(this.path, ref => ref.where("category", "==", cat));
    return this.ingredientCatColl
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    );
  }

  getIngredientByName(name : String) : Observable<Ingredient[]>{
    this.ingredientCatColl = this.db.collection(this.path, ref => ref.where("name", "==", name));
    return this.ingredientCatColl
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    );
  }

  addUpdateIngredient(ing: Ingredient) {
    if (ing.id == null) {
      ing.id = this.projetawiStore.createId();
    }
    this.ingCol.doc(ing.id).set(Object.assign({}, ing));
   }
}
