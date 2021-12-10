import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Stage } from '../models/Stage';
import { MealService } from './meal.service';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  stages: Observable<Stage[]> = new Observable<Stage[]>(); 
  private path = '/Stage';
  private projetawiStore: AngularFirestore;
  private stagesCollection: AngularFirestoreCollection<Stage>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.stagesCollection = db.collection(this.path); 
    this.getStages();
  } 

  getStages() {
    this.stages = this.stagesCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToStage(doc))) 
    ); 
    console.log(this.stages);
  }

  jsonToStage(json: any) : Stage {   
    return new Stage( 
      json.id,
      json.name,
      json.ingredientDict,
      json.description,
      json.duration,
      json.meal
    )
  }
}