import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, Project, UserStory, Sprint } from '../../services/shared/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  private _project: Project = new Project();
  @ViewChild('dataUserStoryClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private route: ActivatedRoute, private alert: NotificationsService) { }

  ngOnInit() {
    this.service.getProject(parseInt(this.route.snapshot.params.id || 0, 10))
      .subscribe(project => {
        this._project = project;
      }, (err) => {
        this.alert.error('Projects', err, {
          timeOut: 10000
        });
      });
  }

  ngAfterViewInit() {
  }

  assignStoryToUserStories(userStories: UserStory[], story: UserStory) {
    this._project.userStories.push(story);
    userStories.splice(userStories.indexOf(story), 1);
  }

  assignStoryToSprintStories(sprint: Sprint, story: UserStory) {
    sprint.userStories.push(story);
    this._project.userStories.splice(this._project.userStories.indexOf(story), 1);
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

  set addUserStory(value: any) {
    this._project.userStories.push(value.userStory);
    value.btnClose.nativeElement.click();
  }

  set addSprint(value: any) {
    this._project.sprints.push(value.sprint);
    value.btnClose.nativeElement.click();
  }
}
