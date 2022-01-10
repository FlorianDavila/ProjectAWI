import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Meal } from '../models/Meal'; 

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Observable<Meal[]> = new Observable<Meal[]>(); 
  private path = '/Meals/';
  private projetawiStore: AngularFirestore;
  private mealsCollection: AngularFirestoreCollection<Meal>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.mealsCollection = db.collection(this.path); 
    this.meals = this.getMeals();
  } 

  getMeals(): Observable<Meal[]> {
    return this.mealsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToMeal(doc))) 
    );  
  }

  addUpdateMeal(meal: Meal) {
    if (meal.id == null) { 
      meal.id = this.projetawiStore.createId() 
    }
    this.mealsCollection.doc(meal.id).set(Object.assign({}, meal));
  }

  deleteMeal(meal: Meal) {
    this.projetawiStore.doc<Meal>(this.path+meal.id).delete();
  }

  getMealByName(name : String) : Observable<Meal[]>{
    var ing = this.db.collection(this.path, ref => ref.where("name", "==", name));
    return ing
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToMeal(doc))) 
    );
  }

  jsonToMeal(json: any) : Meal { 
    return new Meal( 
      json.id,
      json.name,
      json.manager,
      json.category,
      json.nbGuests,
      json.stageList ? json.stageList : [],
      json.matS,
      json.matD,
      json.coefVenteHT,
      json.coefVenteTTC,
      json.coutHFluide,
      json.coutHMoyen
    )  
  }
}
