import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenderAudienceComponent } from './admin-gender-audience.component';

describe('AdminGenderAudienceComponent', () => {
  let component: AdminGenderAudienceComponent;
  let fixture: ComponentFixture<AdminGenderAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGenderAudienceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenderAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
