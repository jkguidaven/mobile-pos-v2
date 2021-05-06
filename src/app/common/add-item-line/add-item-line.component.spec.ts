import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemLineComponent } from './add-item-line.component';

describe('AddItemLineComponent', () => {
  let component: AddItemLineComponent;
  let fixture: ComponentFixture<AddItemLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
