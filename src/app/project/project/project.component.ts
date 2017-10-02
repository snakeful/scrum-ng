import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  private _userStories: UserStory[];
  private _sprints: Sprint[];
  private _showUserStoryModal: Boolean;
  constructor(private service: ProjectsService, private route: ActivatedRoute, private alert: NotificationsService) {
    this._project = new Project();
    this._userStories = [];
    this._sprints = [];
  }

  ngOnInit() {
    console.log('OnInit');
    this._showUserStoryModal = false;
    this.service.getProject(parseInt(this.route.snapshot.params.id || 0, 10))
      .subscribe(project => {
        this._project = project;
        this.service.getUserStories()
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

  get userStories(): UserStory[] {
    return this._userStories;
  }

  get sprints(): Sprint[] {
    return this._sprints;
  }

  get showUserStoryModal(): Boolean {
    return this._showUserStoryModal;
  }

  set showUserStoryModal(value: Boolean) {
    this._showUserStoryModal = value;
  }

  public set addUserStory(value: any) {
    console.log(value);
    value.userStory.projectId = this._project.id;
    this.service.createUserStory(value.userStory)
      .subscribe(userStory => {
        this._userStories.push(userStory);
        value.btnClose.nativeElement.click();
        this._showUserStoryModal = false;
      });
  }

  set addSprint(value: any) {
    this._sprints.push(value.sprint);
    value.btnClose.nativeElement.click();
  }
}
