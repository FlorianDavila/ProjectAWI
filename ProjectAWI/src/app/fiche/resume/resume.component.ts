import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';

@Component({
  selector: 'resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit { 
  @Input() innerHtmlIngredients: string;
  @Input() innerHtmlStage: string;
  @Input() i: string;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {} 
} 