import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerformerServicesComponent } from './admin-performer-services.component';

describe('AdminPerformerServicesComponent', () => {
  let component: AdminPerformerServicesComponent;
  let fixture: ComponentFixture<AdminPerformerServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPerformerServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPerformerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
