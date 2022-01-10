import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { Meal } from 'src/app/models/Meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
}) 
export class CarouselComponent { 

  constructor(public mealService: MealService) { }

  meals: Meal[] = [];
  images: { [id: string]: Meal; } = {};
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel; 

  ngOnInit() {
    this.mealService.getMealByName("Salade").subscribe(data => {
      this.meals.push(data[0]); 
      this.images['assets/entree.jpg'] = this.meals[0];
    }); 
    this.mealService.getMealByName("Boeuf bourgignon").subscribe(data => {
      this.meals.push(data[0]);
      this.images['assets/plat.jpg'] = this.meals[1];
    }); 
    this.mealService.getMealByName("Gaufres").subscribe(data => {
      this.meals.push(data[0]);
      this.images['assets/dessert.jpg'] = this.meals[2];
    }); 
  }
  
  helperPassData(meal: Meal) : string {
    return JSON.stringify(meal);
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  } 
} 