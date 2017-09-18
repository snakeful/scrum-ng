import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService, Project, UserStory, Sprint } from '../../services/shared/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  private _project: Project;
  @ViewChild('dataUserStoryClose') private btnClose: ElementRef;
  constructor(private service: ProjectsService, private route: ActivatedRoute) {
    this.service.getProject(parseInt(this.route.snapshot.params.id || 0, 10))
      .then((project) => {
        this._project = project;
      });
  }

  ngOnInit() {
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

  set add(value: UserStory) {
    console.log('User Story created' + value);
    this._project.userStories.push(value);
    this.btnClose.nativeElement.click();
  }
}
