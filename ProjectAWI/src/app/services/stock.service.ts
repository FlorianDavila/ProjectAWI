import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';
import { IngredientCategory } from '../models/IngredientCategory';
import { Stock } from '../models/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stock: Observable<Stock> = new Observable<Stock>(); 
  private path = '/Stock/';
  private projetawiStore: AngularFirestore;
  private stockCollection: AngularFirestoreCollection<Stock>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.stockCollection = db.collection(this.path); 
  } 

  getStock(): Observable<Stock> {
    return this.stockCollection
    .valueChanges({ idField: "id" }).pipe(
    map(doc => this.jsonToStock(doc))
    ); 
  }

  jsonToStock(json: any) : Stock {   
    var dict = {["a"]:5, ["b"]:8};
    Object.entries(dict).forEach(
      ([key, value]) => Stock.getInstance().ingredientDict[key] = value
    );
    return Stock.getInstance();
  }
}