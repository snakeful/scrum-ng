import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, Project, UserStory, Sprint } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  private _project: Project;
  private _userStory: UserStory;
  private _userStories: UserStory[];
  private _sprints: Sprint[];
  private _showUserStoryModal: Boolean;
  @ViewChild('dataUserStoryModal') private userStoryModal: ElementRef;
  constructor(private service: ProjectsService, private route: ActivatedRoute, private alert: NotificationsService) {
    this._project = new Project();
    this._userStory = null;
    this._userStories = [];
    this._sprints = [];
    this._showUserStoryModal = false;
  }

  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.params.id || 0, 10);
    this.service.getProject(projectId)
      .subscribe(project => {
        this._project = project;
        this.service.getUserStories({
          projectId: projectId
        })
          .subscribe(userStories => {
            this._userStories = userStories;
          });
      }, (err) => {
        this.alert.error('Projects', err, {
          timeOut: 10000
        });
      });
  }

  ngAfterViewInit() {
  }

  assignStoryToUserStories(userStories: UserStory[], story: UserStory) {
    this._userStories.push(story);
    userStories.splice(userStories.indexOf(story), 1);
  }

  assignStoryToSprintStories(sprint: Sprint, story: UserStory) {
    sprint.userStories.push(story);
    this._userStories.splice(this._userStories.indexOf(story), 1);
  }

  onStoryToSprintDrop(event, sprint: Sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
  }

  onSprintStoryToUserStoriesDrop(event) {
    const userStories = event.dragData[0];
    const story = event.dragData[1];
    this.assignStoryToUserStories(userStories, story);
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
    this._showUserStoryModal = false;
    this._userStory = value;
    setTimeout(() => {
      this._showUserStoryModal = true;
      setTimeout(() => this.userStoryModal.nativeElement.click(), 50);
    }, 50);
  }

  get userStories(): UserStory[] {
    return this._userStories;
  }

  get sprints(): Sprint[] {
    return this._sprints;
  }

  get showUserStoryModal(): Boolean {
    return this._showUserStoryModal;
  }

  public set saveUserStory(value: any) {
    if (this._userStory === null) {
      value.userStory.projectId = this._project.id;
      this.service.createUserStory(value.userStory)
        .subscribe(userStory => {
          this._userStories.push(userStory);
          value.btnClose.nativeElement.click();
        });
    } else {
      this.service.saveUserStory(value.userStory)
      .subscribe(userStory => {
        this._userStories[this._userStories.indexOf(this._userStory)] = userStory;
        value.btnClose.nativeElement.click();
      });
    }
  }

  set addSprint(value: any) {
    this._sprints.push(value.sprint);
    value.btnClose.nativeElement.click();
  }
}
