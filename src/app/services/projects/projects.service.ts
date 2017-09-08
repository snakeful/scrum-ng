import { Injectable } from '@angular/core';

@Injectable()
export class ScrumObject {
  id: Number;
  name: String;
  desc: String;
  constructor (id: Number = -1, name: String = '', desc: String = '') {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

export class Project extends ScrumObject {
  userStories: Array<UserStory>;
  sprints: Array<Sprint>;
  constructor (id: Number, name: String, desc: String, userStories: Array<any>, sprints: Array<any>) {
    super(id, name, desc);
    this.userStories = userStories;
    this.sprints = sprints;

  }
}

export class UserStory extends ScrumObject {
  priorityId: Number;
  statusId: Number;
  constructor (id: Number = -1, name: String = '', desc: String = '', priorityId: Number = -1, statusId: Number = -1) {
    super(id, name, desc);
    this.priorityId = priorityId;
    this.statusId = statusId;
  }
}

export class Sprint extends ScrumObject {
  start: Date;
  end: Date;
  userStories: Array<UserStory>;
  constructor (id: Number = -1, name: String = '', desc: String = '') {
    super(id, name, desc);
    this.start = new Date();
    this.end = new Date();
    this.userStories = new Array<UserStory>();
  }
}

export class Task extends ScrumObject {
  userStoryId: Number;
  date: Date;
  taskOriginId: Number;
  statusId: Number;
  userId: Number;
  originId: Number;
  points: Number;
  executedPoints: Number;
  successTask: Boolean;
  constructor (id: Number = -1, name: String = '', desc: String = '') {
    super(id, name, desc);
  }
}

export class ProjectsService {
  private projects: Array<Project>  = [
    new Project(1, 'Project 1', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(2, 'Project 2', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(3, 'Project 3', 'This is a project template', this.getNewUserStories(), this.getNewSprints())
  ];

  constructor() {
  }

  private getNewUserStories (): Array<UserStory> {
    return [
      new UserStory(1, 'User Story 1', 'This is a user story for testing purposes', 0, 0),
      new UserStory(2, 'User Story 2', 'This is a user story for testing purposes', 0, 0),
      new UserStory(3, 'User Story 3', 'This is a user story for testing purposes', 0, 0),
      new UserStory(4, 'User Story 4', 'This is a user story for testing purposes', 0, 0),
      new UserStory(5, 'User Story 5', 'This is a user story for testing purposes', 0, 0),
      new UserStory(6, 'User Story 6', 'This is a user story for testing purposes', 0, 0),
      new UserStory(7, 'User Story 7', 'This is a user story for testing purposes', 0, 0),
      new UserStory(8, 'User Story 8', 'This is a user story for testing purposes', 0, 0),
      new UserStory(9, 'User Story 9', 'This is a user story for testing purposes', 0, 0),
      new UserStory(10, 'User Story 10', 'This is a user story for testing purposes', 0, 0)
    ];
  }

  private getNewSprints (): Array<Sprint> {
    return [
      new Sprint(1, 'Sprint #1'),
      new Sprint(2, 'Sprint #2'),
      new Sprint(3, 'Sprint #3'),
      new Sprint(4, 'Sprint #4')
    ];
  }

  getProjects (): Promise<Array<Project>> {
    return new Promise<Array<Project>>((resolve, reject) => {
      resolve(this.projects);
    });
  }

  getProject (id: Number): Promise<Project> {
    let project: Project;
    return new Promise<Project>((resolve, reject) => {
      this.projects.forEach(prj => {
        if (id === prj.id) {
          project = prj;
        }
      });
      project ? resolve(project) : reject('Record not found');
    });
  }

  getSprints (projectId: Number): Promise<Array<Sprint>> {
    return new Promise<Array<any>>((resolve, reject) => {
      let sprints: Array<Sprint>;
      this.getProject(projectId).then(project => {
        if (project.sprints) {
          resolve(project.sprints);
        } else {
          reject('Project record not found.');
        }
      }, reject);
    });
  }

  getSprint (projectId: Number, id: Number): Promise<Sprint> {
    return new Promise<Sprint>((resolve, reject) => {
      let sprint: Sprint;
      this.getSprints(projectId).then(sprints => {
        sprints.forEach(spnt => {
          if (id === spnt.id) {
            sprint = spnt;
          }
        });
        sprint ? resolve(sprint) : reject('Record not found.');
      }, reject);
    });
  }
}
