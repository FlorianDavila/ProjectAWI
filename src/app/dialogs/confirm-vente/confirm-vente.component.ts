import { Component, Input, OnInit, Inject } from '@angular/core';
import { Meal } from 'src/app/models/Meal';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-vente',
  templateUrl: './confirm-vente.component.html',
  styleUrls: ['./confirm-vente.component.css']
})
export class ConfirmVenteComponent implements OnInit {

  realMeal : Meal;
  realNumber :number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {meal: Meal, number : number}) {}

  ngOnInit(): void {
  }

}
