import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, UserStory, Sprint, Task } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit, AfterViewInit {
  private _sprint: Sprint;
  private _story: UserStory;
  private _toDo: any;
  private _inProgress: any;
  private _testing: any;
  private _done: any;
  private _showCreateTask: Boolean;
  private _newTask: Task;
  @ViewChild('taskName') private taskName: ElementRef;
  @ViewChild('dataUserStoryModal') private userStoryModal: ElementRef;
  constructor(private service: ProjectsService, private route: ActivatedRoute, private alert: NotificationsService) {
    this._sprint = new Sprint();
    this._showCreateTask = false;
    this._newTask = new Task();
  }

  private addTask(task) {
    switch (task.statusId) {
      case 0:
        this._toDo.tasks.push(task);
        break;
      case 1:
        this._inProgress.tasks.push(task);
        break;
      case 2:
        this._testing.tasks.push(task);
        break;
      case 3:
        this._done.tasks.push(task);
        break;
      default:
        this._toDo.tasks.push(task);
        break;
    }
    return task;
  }

  private cleanNewTask() {
    this._newTask = new Task();
    this._newTask.statusId = 0;
    this._newTask.points = 1;
    this._newTask.executedPoints = 0;
  }

  ngOnInit() {
    const sprintId = parseInt(this.route.snapshot.params.id || 0, 10);
    this.service.getSprint(sprintId)
      .subscribe((sprint) => {
        this._sprint = sprint;
        this.service.getProject(sprint.projectId)
          .subscribe(project => sprint.project = project);
        this.service.getSprintUserStories(sprintId)
          .subscribe(sprintUserStories => {
            sprintUserStories.forEach(sprintUserStory => {
              this.service.getUserStory(sprintUserStory.userStoryId)
                .subscribe(userStory => {
                  sprint.userStories.push(userStory);
                  this.service.getTasks(userStory.id)
                  .subscribe(tasks => {
                    userStory.tasks = tasks;
                    tasks.forEach(task => {
                      this.addTask(task);
                    });
                  });
                });
            });
          });
      });
    this.cleanNewTask();
  }

  ngAfterViewInit() { }

  editUserStory(userStory: UserStory) {
    this._story = userStory;
    this.userStoryModal.nativeElement.click();
  }

  doNewTask() {
    this._showCreateTask = true;
  }

  doCreateTask(task: Task) {
    if (!this._story) {
      return this.alert.error('New Task', 'No user story selected', {
        timeOut: 3000
      });
    }
    task.userStoryId = this._story.id;
    this.service.createTask(task)
    .subscribe(created => {
      this.cleanNewTask();
      this._story.tasks.push(task);
      this.addTask(task);
      this.taskName.nativeElement.focus();
    }, err => {
      this.alert.error('User Stories Task', err, {
        timeOut: 10000
      });
    });
  }

  doCancelCreateTask() {
    this._showCreateTask = false;
  }

  /* Properties */

  set updateUserStory(userStory: UserStory) {
    const stories = this.sprint.userStories;
    stories[stories.indexOf(this._story)] = userStory;
    this._story = userStory;
  }

  get sprint(): Sprint {
    return this._sprint;
  }

  get story(): UserStory {
    return this._story;
  }

  set story(value: UserStory) {
    value.tasks = value.tasks || [];
    this._story = value;
  }

  set tasks(value) {
    this._toDo = value.toDo;
    this._inProgress = value.inProgress;
    this._testing = value.testing;
    this._done = value.done;
    if (this.sprint.userStories) {
      this.sprint.userStories.forEach((story) => {
        story.tasks.forEach((task) => {
          this.addTask(task);
        });
      });
    }
  }

  get showCreateTask(): Boolean {
    return this._showCreateTask;
  }

  get newTask(): Task {
    return this._newTask;
  }
}
