import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/Meal';
import { DownloadService } from 'src/app/services/download.service';
import { MealService } from 'src/app/services/meal.service';
import { FichePDFComponent } from '../fiche/fiche-pdf/fiche-pdf.component';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] 
})
export class SearchBarComponent implements OnInit {
  
  searchGroup: FormGroup; 
  displayedColumns: string[] = ['name','category', 'manager','nbGuests', 'plus'];
  dataSource: MatTableDataSource<Meal>; 
  length: number;  

  constructor(private formBuilder: FormBuilder, public mealService: MealService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, public downloadService: DownloadService) {
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  onEtiquetteClicked(meal: Meal) { 
    console.log(meal.name);
  }

  onFicheClicked(meal: Meal) { 
    // var comp = new FichePDFComponent(this.downloadService)
    // this.downloadService.downloadFile(
    //   comp.pdfTable,
    //   `${(meal.name).replace(" ","-").toLowerCase()}-fiche-technique.pdf`
    // ) 
  }

  helperPassData(meal: Meal) : string {
    return JSON.stringify(meal);
  }
} 