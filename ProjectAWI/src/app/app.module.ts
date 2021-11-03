import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParamComponent } from './components/param/param.component';
import { OptioncoutComponent } from './components/optioncout/optioncout.component';
import { OptionetiqComponent } from './components/optionetiq/optionetiq.component';
import { ModifcouvComponent } from './components/modifcouv/modifcouv.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    SettingsComponent,
    NavbarComponent,
    ParamComponent,
    OptioncoutComponent,
    OptionetiqComponent,
    ModifcouvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
