import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project;
  constructor(private service: ProjectsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.project = this.service.getProject(parseInt(this.route.snapshot.params.id || 0));
    this.project.userStories = [{
      id: 1,
      name: 'User Story 1',
      desc: 'This is a user story for testing purposes',
      priorityId: 0,
      statusId: 0
    }, {
      id: 2,
      name: 'User Story 2',
      desc: 'This is a user story for testing purposes',
      priorityId: 0,
      statusId: 0
    }, {
      id: 3,
      name: 'User Story 3',
      desc: 'This is a user story for testing purposes',
      priorityId: 0,
      statusId: 0
    }];
    this.project.sprints = [{
      id: 1,
      name: 'Sprint #1',
      start: new Date(),
      end: new Date(),
      userStories: []
    }, {
      id: 2,
      name: 'Sprint #2',
      start: new Date(),
      end: new Date(),
      userStories: []
    }, {
      id: 3,
      name: 'Sprint #3',
      start: new Date(),
      end: new Date(),
      userStories: []
    }];
  }

  assignStoryToUserStories (userStories, story) {
    this.project.userStories.push(story);
    userStories.splice(userStories.indexOf(story), 1);
  }

  assignStoryToSprintStories (sprint, story) {
    sprint.userStories.push(story);
    this.project.userStories.splice(this.project.userStories.indexOf(story), 1);
  }

  onStoryToSprintDrop (event, sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
  }
  
  onSprintStoryToUserStoriesDrop (event) {
    let userStories = event.dragData[0];
    let story = event.dragData[1];
    this.assignStoryToUserStories(userStories, story);
  }
}
