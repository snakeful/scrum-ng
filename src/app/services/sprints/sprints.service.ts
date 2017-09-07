import { Injectable } from '@angular/core';

@Injectable()
export class SprintsService {
  private sprints = [{
    id: 1,
    name: 'Sprint #1',
    start: new Date(),
    end: new Date(),
    userStories: [],
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
    id: 2,
    name: 'Sprint #2',
    start: new Date(),
    end: new Date(),
    userStories: [],
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
    id: 3,
    name: 'Sprint #3',
    start: new Date(),
    end: new Date(),
    userStories: [],
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
  constructor() { }

  getSprints () {
    return new Promise((resolve, reject) => {
      resolve(this.sprints);
    });
  }

  getSprint (projectId: Number, sprintId: Number) {
    return new Promise((resolve, reject) => {
      let sprint;
      this.sprints.forEach((spnt) => {
        if (sprintId === spnt.id) {
          sprint = spnt;
        }
      });
      if (sprint) {
        resolve(this.sprints[0]);
      } else {
        reject('Record not found.');
      }
    });
  }
}
