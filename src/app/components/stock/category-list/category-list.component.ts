import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, timeout } from 'rxjs';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DeleteIngredientComponent } from 'src/app/dialogs/delete-ingredient/delete-ingredient.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0'})),
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CategoryListComponent implements OnInit {

  @Input() public category : String;
  panelOpenState = false;
  dataSource : MatTableDataSource<Ingredient>;
  columnsToDisplay = ['name','stock','unit','price','isAllergen', 'allergenCat','plus'];
  expandedElement: Ingredient | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public ingServ : IngredientService,public dialog : MatDialog, public _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.ingServ.getIngredientByCategory(this.category).subscribe( data => {
      this.dataSource = new MatTableDataSource<Ingredient>(data);
      this.dataSource.paginator=this.paginator;
    }); 
  }

  deleteIng(selectedIng : Ingredient) {
    const dialogRef = this.dialog.open(DeleteIngredientComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
      this.ingServ.deleteIngredient(selectedIng);
      this.openSnackBar("Ingrédient correctement supprimé", "Fermer");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition : 'top'
    });
  }
}
