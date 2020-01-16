import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerAccountComponent } from './performer-account.component';

describe('PerformerAccountComponent', () => {
  let component: PerformerAccountComponent;
  let fixture: ComponentFixture<PerformerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerAccountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
