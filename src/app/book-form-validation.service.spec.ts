import { TestBed } from '@angular/core/testing'

import { BookFormValidationService } from './book-form-validation.service'

describe('BookFormValidationService', () => {
  let service: BookFormValidationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BookFormValidationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
