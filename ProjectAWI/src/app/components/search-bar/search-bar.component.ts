import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';  
import { Meal } from 'src/app/models/Meal';
import { DownloadService } from 'src/app/services/download.service';
import { MealService } from 'src/app/services/meal.service'; 

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, public mealService: MealService, public downloadService: DownloadService) {
    this.searchGroup = this.formBuilder.group({
      searchName: '',
    });
  }

  ngOnInit() {
    this.mealService.getMeals().subscribe(data => { 
      this.dataSource = new MatTableDataSource(data);
      this.length = data.length;
    })
    this.dataSource.paginator = this.paginator;
  }

  onSubmitForm() {
    const formValue = this.searchGroup.value;
    const userSearch = formValue['searchName'];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
	  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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