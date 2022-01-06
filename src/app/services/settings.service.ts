import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { Ingredient } from '../models/Ingredient'; 
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Observable<Settings[]> = new Observable<Settings[]>(); 
  private path = '/Settings/';
  private projetawiStore: AngularFirestore;
  private settingsCollection: AngularFirestoreCollection<Settings>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.settingsCollection = db.collection(this.path); 
  } 

  getSettings(): Observable<Settings[]> {
    return this.settingsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToSetting(doc))) 
    ); 
  }

  jsonToSetting(json: any) : Settings {   
    return new Settings(
      json.name,
      json.value,
      json.id,
      )
  }

  addUpdateSetting(set: Settings) {
    if (set.id == null) {
      set.id = this.projetawiStore.createId();
   }
    this.settingsCollection.doc(set.id).set(Object.assign({}, set));
   }
} 
