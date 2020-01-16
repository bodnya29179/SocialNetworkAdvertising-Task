import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryAudienceComponent } from './admin-country-audience.component';

describe('AdminCountryAudienceComponent', () => {
  let component: AdminCountryAudienceComponent;
  let fixture: ComponentFixture<AdminCountryAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCountryAudienceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
