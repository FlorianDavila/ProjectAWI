import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { FicheComponent } from './components/fiche/fiche/fiche.component';
import { IngredientFormComponent } from './components/fiche/ingredient-form/ingredient-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParamComponent } from './components/settings/param/param.component'; 
import { SettingsComponent } from './components/settings/settings.component';
import { StockComponent } from './components/stock/stock.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { IngredientService } from './services/ingredient.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';  
import { MatDialogModule } from '@angular/material/dialog';
import { StageDeleteComponent } from './dialogs/stage-delete/stage-delete.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { CategoryListComponent } from './components/stock/category-list/category-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { InputIngredientComponent } from './components/stock/input-ingredient/input-ingredient.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MealService } from './services/meal.service'; 
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmMealComponent } from './dialogs/confirm-meal/confirm-meal.component'; 
import { FichePDFComponent } from './components/fiche/fiche-pdf/fiche-pdf.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmVenteComponent } from './dialogs/confirm-vente/confirm-vente.component';
import { EtiquettePdfComponent } from './components/etiquette-pdf/etiquette-pdf.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DownloadService } from './services/download.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeCouvComponent } from './dialogs/change-couv/change-couv.component';
import { VenteComponent } from './dialogs/vente/vente.component';
import { MealDeleteComponent } from './dialogs/meal-delete/meal-delete.component';
registerLocaleData(localeFr);

const appRoutes: Routes = [
  { path: 'fiches', component: FicheComponent },
  { path: 'stock', component: StockComponent }, 
  { path: 'download', component: FichePDFComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'etiquette', component: EtiquettePdfComponent },
  { path: '', component: HomepageComponent },
]; 

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    ScrollingModule,
    MatMenuModule, 
    MatCheckboxModule,
  ],
  declarations: [AppComponent, SearchBarComponent, HomepageComponent, 
     FicheComponent,FichePDFComponent, StageDeleteComponent,
     IngredientFormComponent, CarouselComponent, NavbarComponent, ParamComponent, SettingsComponent, 
     StockComponent, HomepageComponent, CategoryListComponent, 
     InputIngredientComponent, ConfirmVenteComponent, EtiquettePdfComponent,  ConfirmMealComponent, ChangeCouvComponent, VenteComponent, MealDeleteComponent],
  exports: [AppComponent, SearchBarComponent, FicheComponent, MatDialogModule, MatTabsModule ],
  bootstrap: [AppComponent],
  entryComponents: [IngredientFormComponent],
  providers: [ IngredientService, HttpClient, HttpClientModule, DownloadService,  MealService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
  ],
})
export class AppModule { }
