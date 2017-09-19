import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintModalComponent } from './sprint-modal.component';

describe('SprintModalComponent', () => {
  let component: SprintModalComponent;
  let fixture: ComponentFixture<SprintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
