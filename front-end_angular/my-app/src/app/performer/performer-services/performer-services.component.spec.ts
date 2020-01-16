import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerServicesComponent } from './performer-services.component';

describe('PerformerServicesComponent', () => {
  let component: PerformerServicesComponent;
  let fixture: ComponentFixture<PerformerServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
