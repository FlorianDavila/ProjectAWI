import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  params : string[] = ["Cout horaire moyen (en €)", "Cout des fluides"];

  constructor() { }

  ngOnInit(): void {
  }

}
