import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTasksComponent } from './sprint-tasks.component';

describe('SprintTasksComponent', () => {
  let component: SprintTasksComponent;
  let fixture: ComponentFixture<SprintTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
