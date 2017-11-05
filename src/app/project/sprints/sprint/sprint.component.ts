import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { UserLogged } from '../../../shared/classes/users.class';
import { UsersService } from '../../../shared/services/users.service';
import { UserStory, Sprint, Task } from '../../../shared/classes/projects.class';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit, AfterViewInit {
  private _sprint: Sprint;
  private _story: UserStory;
  private _toDo: any;
  private _inProgress: any;
  private _testing: any;
  private _done: any;
  private _task: Task;
  private _newTask: boolean;
  private _toggle: boolean;
  @ViewChild('taskModal') private taskModal: ElementRef;
  @ViewChild('userStoryModal') private userStoryModal: ElementRef;
  constructor(private service: ProjectsService, private usersService: UsersService, private route: ActivatedRoute,
    private alert: NotificationsService) {
    this._sprint = new Sprint();
    this._task = new Task();
    this._story = new UserStory();
    this._newTask = false;
    this._toggle = false;
  }

  private getCurrentTaskList(task: Task): any {
    let current: any;
    switch (task.statusId) {
      case 0:
        current = this._toDo;
        break;
      case 1:
      current = this._inProgress;
        break;
      case 2:
      current = this._testing;
        break;
      case 3:
      current = this._done;
        break;
      default:
      current = this._toDo;
        break;
    }
    return current;
  }

  private addTask(task: Task) {
    this.getCurrentTaskList(task).tasks.push(task);
    return task;
  }

  private createNewTask() {
    this.task = new Task(undefined, null, null, this._story.id, 1, 0, 0, false);
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
            sprintUserStories.forEach((sprintUserStory, index) => {
              this.service.getUserStory(sprintUserStory.userStoryId)
                .subscribe(userStory => {
                  if (index === 0) {
                    this._story = userStory;
                  }
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
    this.createNewTask();
  }

  ngAfterViewInit() { }

  toggleDataChart() {
    this._toggle = !this._toggle;
  }

  editUserStory(userStory: UserStory) {
    this._story = userStory;
    this.userStoryModal.nativeElement.click();
  }

  newTask() {
    this.createNewTask();
    this.taskModal.nativeElement.click();
  }

  doCreateTask(task: Task) {
    task.userStoryId = this._story.id;
    this.service.saveTask(task)
      .subscribe(created => {
        this.createNewTask();
        this._story.tasks.push(task);
        this.addTask(task);
        this.taskModal.nativeElement.focus();
      }, err => {
        this.alert.error('User Stories Task', err, {
          timeOut: 10000
        });
      });
  }

  /* Properties */

  set updateTask(task: Task) {
    if (this._newTask) {
      this.addTask(task);
      this.createNewTask();
    } else {
      const tasks = this.getCurrentTaskList(task).tasks;
      tasks.forEach((item, index, list) => {
        if (item.id === task.id) {
          list[index] = task;
        }
      });
    }
    this.taskModal.nativeElement.click();
  }

  set updateUserStory(userStory: UserStory) {
    const stories = this.sprint.userStories;
    stories[stories.indexOf(this._story)] = userStory;
    this._story = userStory;
    this.userStoryModal.nativeElement.click();
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

  get task(): Task {
    return this._task;
  }

  set task(value: Task) {
    this._newTask = value.id === undefined;
    this._task = value;
  }

  get toggle(): boolean {
    return this._toggle;
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
