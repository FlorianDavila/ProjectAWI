import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  settings: Observable<Settings[]> = new Observable<Settings[]>(); 
  settings1 : Array<Settings>; 
  settings2 : Settings[]; 
  settings3: Observable<Settings[]> = new Observable<Settings[]>(); 

  constructor(public setService : SettingsService) { }

  ngOnInit(): void {
   this.settings = this.setService.getSettings();
  }

}
