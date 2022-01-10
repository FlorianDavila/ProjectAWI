import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';  
import { ChangeCouvComponent } from 'src/app/dialogs/change-couv/change-couv.component';
import { MealDeleteComponent } from 'src/app/dialogs/meal-delete/meal-delete.component';
import { VenteComponent } from 'src/app/dialogs/vente/vente.component';
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

  constructor(private formBuilder: FormBuilder, public mealService: MealService, public downloadService: DownloadService, public dialog : MatDialog, public _snackBar: MatSnackBar) {
    this.searchGroup = this.formBuilder.group({
      searchName: '',
    });
  }

  ngOnInit() {
    this.mealService.getMeals().subscribe(data => { 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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
    
	  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  changeCouv(mealSelected : Meal) {
    const dialogRef = this.dialog.open(ChangeCouvComponent, {
      data :{
        meal : mealSelected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
        this.openSnackBar("Modification effectuée", "Fermer"); 
      }
    });
  }

  declaVente(mealSelected : Meal) {
    const dialogRef = this.dialog.open(VenteComponent, {
      data :{
        meal : mealSelected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
        this.openSnackBar("Vente déclarée avec succès", "Fermer"); 
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'top',
      });
  }

  helperPassData(meal: Meal) : string {
    return JSON.stringify(meal);
  }

  deleteMeal(meal: Meal) { 
    const dialogRef = this.dialog.open(MealDeleteComponent); 
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
        this.mealService.deleteMeal(meal);
      }
    });  
  }
} 