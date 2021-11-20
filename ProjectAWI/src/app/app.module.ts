import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FicheComponent } from './components/fiche/fiche/fiche.component';
import { IngredientFormComponent } from './components/fiche/ingredient-form/ingredient-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ResumeComponent } from './components/fiche/resume/resume.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModifcouvComponent } from './components/modifcouv/modifcouv.component';
import { OptioncoutComponent } from './components/optioncout/optioncout.component';
import { OptionetiqComponent } from './components/optionetiq/optionetiq.component';
import { ParamComponent } from './components/param/param.component'; 
import { SettingsComponent } from './components/settings/settings.component';
import { StockComponent } from './components/stock/stock.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
  declarations: [AppComponent, SearchBarComponent, FicheComponent, IngredientFormComponent, ResumeComponent, CarouselComponent, NavbarComponent, ModifcouvComponent, OptioncoutComponent, OptionetiqComponent, ParamComponent, SettingsComponent, StockComponent],
  exports: [AppComponent, SearchBarComponent, FicheComponent],
  bootstrap: [AppComponent, SearchBarComponent, FicheComponent],
  entryComponents: [IngredientFormComponent],
})
export class AppModule { }