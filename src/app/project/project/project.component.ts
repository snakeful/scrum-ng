import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { isNil } from 'lodash';

import { User, UserLogged } from '../../shared/classes/users.class';
import { UsersService } from '../../shared/services/users.service';
import { Project, UserStory, Sprint } from '../../shared/classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';
import { SprintModalComponent } from '../sprints/sprint-modal/sprint-modal.component';
import { UserStoryModalComponent } from '../user-stories/user-story-modal/user-story-modal.component';

@Component({
  selector: 'scrum-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  private _project: Project;
  private _userStory: UserStory;
  private _sprint: Sprint;
  private _userStories: UserStory[];
  private _userStoriesLoad: UserStory[];
  private _sprints: Sprint[];
  private _showUserStoryModal: boolean;
  private _showSprintModal: boolean;
  private modal: NgbModalRef;
  constructor(private service: ProjectsService, private usersService: UsersService, private modalService: NgbModal,
    private route: ActivatedRoute, private alert: NotificationsService) {
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
        this.usersService.setUserPrivileges(project);
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
                this._userStories = this._userStoriesLoad;
              });
            this._userStories = this._userStoriesLoad;
          });
      }, err => {
        this.alert.error('Project', err, {
          timeOut: 10000
        });
      });
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
    this.modal = this.modalService.open(UserStoryModalComponent, {
      container: 'nb-layout'
    });
    this._userStory = value || new UserStory();
    this._userStory.projectId = this._project.id;
    this.modal.componentInstance.userStory = this._userStory;
    this.modal.result.then((data: UserStory) => {
      if (data) {
        this.updateUserStory = data;
      }
    });
  }

  get sprint(): Sprint {
    return this._sprint;
  }

  set sprint(value: Sprint) {
    this.modal = this.modalService.open(SprintModalComponent, {
      container: 'nb-layout'
    });
    this._sprint = value || new Sprint();
    this._sprint.projectId = this._project.id;
    this.modal.componentInstance.sprint = this._sprint;
    this.modal.result.then((data: Sprint) => {
      if (data) {
        this.updateSprint = data;
      }
    });
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

  set updateUserStory(value: UserStory) {
    if (isNil(this._userStory.id)) {
      this._userStories.push(value);
    } else {
      this._userStories[this._userStories.indexOf(this._userStory)] = value;
    }
  }

  set updateSprint(value: Sprint) {
    if (isNil(this._sprint.id)) {
      value.userStories = [];
      this.assignDataFunctionsArray(value.userStories);
      this._sprints.push(value);
    } else {
      value.userStories = this._sprint.userStories;
      this._sprints[this._sprints.indexOf(this._sprint)] = value;
    }
  }

  get user(): UserLogged {
    return this.usersService.userLogged;
  }
}
