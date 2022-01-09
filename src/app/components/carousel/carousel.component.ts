import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
}) 
export class CarouselComponent { 
  images = {
    'assets/entree.jpg': ['Salade', 'download?meal=%7B%22id%22:%223MpKG7NklWZMvmzkrfK9%22,%22name%22:%22Salade%22,%22manager%22:%22Assistant%22,%22category%22:%22Entr%C3%A9e%22,%22nbGuests%22:%225%22,%22stageList%22:%5B%7B%22duration%22:%222%5C%22%22,%22ingredients%22:%5B%5D,%22name%22:%22Pr%C3%A9paration%22,%22description%22:%22Laver%20la%20salade%22%7D%5D,%22matS%22:null,%22matD%22:null%7D'],
    'assets/plat.jpg': ['Boeuf bourgignon', 'download?meal=%7B%22id%22:%229HY3EKgvX37ttZY0xDhY%22,%22name%22:%22Boeuf%20bourgignon%22,%22manager%22:%22Chef%22,%22category%22:%22Entr%C3%A9e%22,%22nbGuests%22:%224%22,%22stageList%22:%5B%7B%22duration%22:%2290%5C%22%22,%22ingredients%22:%5B%5D,%22description%22:%22Faire%20cuire%20la%20viande%20%22,%22name%22:%22Cuisson%22%7D%5D,%22matS%22:null,%22matD%22:null%7D'],
    'assets/dessert.jpg': ['Gaufres', 'download?meal=%7B%22id%22:%229hrstNFteIWyfi30Cljt%22,%22name%22:%22Gaufres%22,%22manager%22:%22Patissier%22,%22category%22:%22Dessert%22,%22nbGuests%22:%222%22,%22stageList%22:%5B%7B%22duration%22:%225%5C%22%22,%22name%22:%22Pr%C3%A9paration%22,%22ingredients%22:%5B%5D,%22description%22:%22Mettre%20la%20farine%20dans%20un%20saladier,%20y%20ajouter%20le%20sucre,%20les%20jaunes%20d%27%C5%93ufs%20et%20le%20beurre%20ramolli.%22%7D%5D,%22matS%22:null,%22matD%22:null%7D']
  };
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel; 

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