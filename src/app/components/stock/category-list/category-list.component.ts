import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, timeout } from 'rxjs';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

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
  columnsToDisplay = ['name','stock','unit','price','isAllergen', 'allergenCat'];
  expandedElement: Ingredient | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public ingServ : IngredientService) { }

  ngOnInit(): void {
    this.ingServ.getIngredientByCategory(this.category).subscribe( data => {
      this.dataSource = new MatTableDataSource<Ingredient>(data);
      this.dataSource.paginator=this.paginator;
    }); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
