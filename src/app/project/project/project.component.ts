import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { isNil } from 'lodash';

import { ProjectsService, Project, UserStory, Sprint } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  private _project: Project;
  private _userStory: UserStory;
  private _sprint: Sprint;
  private _userStories: UserStory[];
  private _userStoriesLoad: UserStory[];
  private _sprints: Sprint[];
  private _showUserStoryModal: boolean;
  private _showSprintModal: boolean;
  @ViewChild('dataUserStoryModal') private userStoryModal: ElementRef;
  @ViewChild('dataSprintModal') private sprintModal: ElementRef;
  constructor(private service: ProjectsService, private route: ActivatedRoute, private alert: NotificationsService) {
    this._project = new Project();
    this._userStory = null;
    this._userStories = [];
    this._userStoriesLoad = [];
    this._sprints = [];
    this._showUserStoryModal = false;
    this._showSprintModal = false;
  }

  private assignDataFunctionsArray(array: any[]) {
    const userStories = this._userStoriesLoad;
    array.push = function (value: UserStory): number {
      userStories.splice(userStories.indexOf(value), 1);
      value.statusId = 1;
      return Array.prototype.push.call(this, value);
    };
    array.splice = function (start, deleteCount): UserStory[] {
      this[start].statusId = 0;
      userStories.push(this[start]);
      return Array.prototype.splice.call(this, start, deleteCount);
    };
  }

  ngOnInit() {
    const projectId = parseInt(this.route.snapshot.params.id || 0, 10);
    this.service.getProject(projectId)
      .subscribe(project => {
        this._project = project;
        this.service.getUserStories(projectId)
          .subscribe(userStories => {
            this._userStoriesLoad = userStories;
            this.service.getSprints(projectId)
              .subscribe(sprints => {
                this._sprints = sprints;
                sprints.forEach(sprint => {
                  sprint.start = new Date(sprint.start);
                  sprint.end = new Date(sprint.end);
                  sprint.userStories = [];
                  this.assignDataFunctionsArray(sprint.userStories);
                  this.service.getSprintUserStories(sprint.id)
                    .subscribe(stories => {
                      stories.forEach(story => {
                        this._userStoriesLoad.forEach(userStory => {
                          if (userStory.id === story.userStoryId) {
                            sprint.userStories.push(userStory);
                          }
                        });
                      });
                      this._userStories = this._userStoriesLoad;
                    },
                    err => {
                      this.alert.error('Sprint User Stories', err, {
                        timeOut: 10000
                      });
                    });
                });
              });
          });
      }, err => {
        this.alert.error('Project', err, {
          timeOut: 10000
        });
      });
  }

  ngAfterViewInit() {
  }

  assignStoryToUserStories(sprint: Sprint, story: UserStory) {
    this.service.unassignUserStoryFromSprint(sprint, story)
      .subscribe(unassigned => {
        sprint.userStories.splice(sprint.userStories.indexOf(story), 1);
      }, err => {
        this.alert.error('Project', err, {
          timeOut: 10000
        });
      });
  }

  onSprintStoryToUserStoriesDrop(event) {
    const sprint = event.dragData[0];
    const story = event.dragData[1];
    this.assignStoryToUserStories(sprint, story);
  }

  doNewUserStory() {
    this._userStory = new UserStory(undefined, null, null, this._project.id, 10, 0);
    this.userStoryModal.nativeElement.click();
  }

  get project(): Project {
    return this._project;
  }

  set project(value: Project) {
    this._project = value;
  }

  get userStory(): UserStory {
    return this._userStory;
  }

  set userStory(value: UserStory) {
    this._userStory = value;
    this.userStoryModal.nativeElement.click();
  }

  get sprint(): Sprint {
    return this._sprint;
  }

  set sprint(value: Sprint) {
    this._sprint = value;
    setTimeout(() => {
      this._showSprintModal = true;
      setTimeout(() => this.sprintModal.nativeElement.click(), 50);
    }, 50);
  }

  get userStories(): UserStory[] {
    return this._userStories;
  }

  get sprints(): Sprint[] {
    return this._sprints;
  }

  get showUserStoryModal(): boolean {
    return this._showUserStoryModal;
  }

  get showSprintModal(): boolean {
    return this._showSprintModal;
  }

  set saveUserStory(userStory: UserStory) {
    if (this._userStory.id === undefined) {
      this._userStories.push(userStory);
    } else {
      this._userStories[this._userStories.indexOf(this._userStory)] = userStory;
    }
  }

  set saveSprint(value: Sprint) {
    if (isNil(this._sprint)) {
      this._sprints.push(value);
    } else {
      value.userStories = this._sprint.userStories;
      this._sprints[this._sprints.indexOf(this._sprint)] = value;
    }
    this.sprintModal.nativeElement.click();
    console.log(value);
  }
}
