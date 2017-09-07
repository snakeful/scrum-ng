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
      statusId: 0,
      finalTasks: []
    }, {
      id: 2,
      name: 'User Story 2',
      desc: 'This is a user story for testing purposes',
      priorityId: 0,
      statusId: 0,
      finalTasks: []
    }, {
      id: 3,
      name: 'User Story 3',
      desc: 'This is a user story for testing purposes',
      priorityId: 0,
      statusId: 0,
      finalTasks: []
    }];
    this.project.sprints = [{
      id: 1,
      name: 'Sprint #1',
      start: new Date(),
      end: new Date(),
      userStories: this.project.userStories,
      dailyScrum: [{
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }, {
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }]
    }, {
      id: 1,
      name: 'Sprint #2',
      start: new Date(),
      end: new Date(),
      userStories: this.project.userStories,
      dailyScrum: [{
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }, {
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }]
    }, {
      id: 1,
      name: 'Sprint #3',
      start: new Date(),
      end: new Date(),
      userStories: this.project.userStories,
      dailyScrum: [{
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }, {
        date: new Date(),
        start: new Date(0),
        end: new Date(0),
        observations: ''
      }]
    }];
  }

}
