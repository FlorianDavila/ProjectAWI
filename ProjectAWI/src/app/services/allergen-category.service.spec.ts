import { TestBed } from '@angular/core/testing';

import { AllergenCategoryService } from './allergen-category.service';

describe('AllergenCategoryService', () => {
  let service: AllergenCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergenCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
