import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { Observable } from 'rxjs';
import { Meal } from 'src/app/models/Meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  
  searchGroup: FormGroup; 
  displayedColumns: string[] = ['name','category', 'manager','nbGuests'];
  dataSource: MatTableDataSource<Meal>; 
  length: number;

  constructor(private formBuilder: FormBuilder, public mealService: MealService) {
    this.searchGroup = this.formBuilder.group({
      searchName: '',
    });
  }

  ngOnInit() {
    this.mealService.getMeals().subscribe(data => { 
      this.dataSource = new MatTableDataSource(data);
      this.length = data.length;
    })
  }

  onSubmitForm() {
    const formValue = this.searchGroup.value;
    const userSearch = formValue['searchName'];
    console.log(userSearch);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} 