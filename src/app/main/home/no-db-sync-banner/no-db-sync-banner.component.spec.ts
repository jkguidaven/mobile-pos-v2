import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDbSyncBannerComponent } from './no-db-sync-banner.component';

describe('NoDbSyncBannerComponent', () => {
  let component: NoDbSyncBannerComponent;
  let fixture: ComponentFixture<NoDbSyncBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDbSyncBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDbSyncBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
