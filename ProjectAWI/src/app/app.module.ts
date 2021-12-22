import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { FicheComponent } from './components/fiche/fiche/fiche.component';
import { IngredientFormComponent } from './components/fiche/ingredient-form/ingredient-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModifcouvComponent } from './components/modifcouv/modifcouv.component';
import { OptioncoutComponent } from './components/optioncout/optioncout.component';
import { OptionetiqComponent } from './components/optionetiq/optionetiq.component';
import { ParamComponent } from './components/param/param.component'; 
import { SettingsComponent } from './components/settings/settings.component';
import { StockComponent } from './components/stock/stock.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { IngredientService } from './services/ingredient.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  
import { MatDialogModule } from '@angular/material/dialog';
import { StageDeleteComponent } from './dialogs/stage-delete.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MealService } from './services/meal.service';
import { MatMenuModule } from '@angular/material/menu'; 
import { DownloadService } from './services/download.service';
import { FichePDFComponent } from './components/fiche/fiche-pdf/fiche-pdf.component';
import { MatExpansionModule } from '@angular/material/expansion';

const appRoutes: Routes = [
  { path: 'fiches', component: FicheComponent },
  { path: 'stock', component: StockComponent },
  { path: 'acceuil', component: HomepageComponent },
  { path: 'acceuil/download', component: FichePDFComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule, 
    MatExpansionModule
  ],
  declarations: [AppComponent, SearchBarComponent, HomepageComponent, StageDeleteComponent, FicheComponent, FichePDFComponent, IngredientFormComponent, CarouselComponent, NavbarComponent, ModifcouvComponent, OptioncoutComponent, OptionetiqComponent, ParamComponent, SettingsComponent, StockComponent, HomepageComponent, StageDeleteComponent, FichePDFComponent ],
  exports: [AppComponent, SearchBarComponent, FicheComponent, MatDialogModule, MatTabsModule ],
  bootstrap: [AppComponent],
  entryComponents: [IngredientFormComponent],
  providers: [IngredientService, MealService, DownloadService]
})
export class AppModule { }