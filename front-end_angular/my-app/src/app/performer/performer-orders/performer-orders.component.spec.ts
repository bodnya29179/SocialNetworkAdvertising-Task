import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerOrdersComponent } from './performer-orders.component';

describe('PerformerOrdersComponent', () => {
  let component: PerformerOrdersComponent;
  let fixture: ComponentFixture<PerformerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerOrdersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
