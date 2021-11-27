import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Meal } from '../models/Meal';
import { MealCategoryService } from './meal-category.service';
import { StageService } from './stage.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Observable<Meal[]> = new Observable<Meal[]>(); 
  private path = '/Meal/';
  private projetawiStore: AngularFirestore;
  private mealsCollection: AngularFirestoreCollection<Meal>;
  private stageService: StageService;
  private mealCategoriesService: MealCategoryService;

  constructor(private db: AngularFirestore, stageService: StageService, mealCategoriesService: MealCategoryService) {
    this.projetawiStore = db;
    this.mealsCollection = db.collection(this.path);
    this.stageService = stageService;
    this.mealCategoriesService = mealCategoriesService;
  } 

  getMeals(): Observable<Meal[]> {
    return this.mealsCollection
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
      json.nbGuets,
      json.stageList
    )
  }
}
