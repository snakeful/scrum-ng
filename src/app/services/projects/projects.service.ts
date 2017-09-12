import { Injectable } from '@angular/core';

@Injectable()
export class ScrumObject {
  id: number;
  name: string;
  desc: string;
  constructor (id?: number, name?: string, desc?: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

export class Project extends ScrumObject {
  userStories: UserStory[];
  sprints: Sprint[];
  constructor (id?: number, name?: string, desc?: string, userStories?: any[], sprints?: any[]) {
    super(id, name, desc);
    this.userStories = userStories;
    this.sprints = sprints;

  }
}

export class UserStory extends ScrumObject {
  priorityId: number;
  statusId: number;
  tasks: Task[];
  constructor (id?: number, name?: string, desc?: string, priorityId?: number, statusId?: number) {
    super(id, name, desc);
    this.priorityId = priorityId;
    this.statusId = statusId;
    this.tasks = new Array<Task>();
  }
}

export class Sprint extends ScrumObject {
  start: Date;
  end: Date;
  userStories: UserStory[];
  constructor (id?: number, name?: string, desc?: string) {
    super(id, name, desc);
    this.start = new Date();
    this.end = new Date();
    this.userStories = new Array<UserStory>();
  }
}

export class Task extends ScrumObject {
  userStoryId: number;
  date: Date;
  taskOriginId: number;
  statusId: number;
  userId: number;
  originId: number;
  points: number;
  executedPoints: number;
  successTask: Boolean;
  constructor (id?: number, name?: string, desc?: string) {
    super(id, name, desc);
  }
}

export class ProjectsService {
  private projects: Project[]  = [
    new Project(1, 'Project 1', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(2, 'Project 2', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(3, 'Project 3', 'This is a project template', this.getNewUserStories(), this.getNewSprints())
  ];

  constructor() {
  }

  private getNewUserStories (): UserStory[] {
    const stories: UserStory[] = [];
    stories.push(new UserStory(0, 'User Story 0', 'This is user story 0 for testing purposes', 0, 0));
    stories.push(new UserStory(1, 'User Story 1', 'This is user story 1 for testing purposes', 0, 0));
    stories.push(new UserStory(2, 'User Story 2', 'This is user story 2 for testing purposes', 0, 0));
    stories.push(new UserStory(3, 'User Story 3', 'This is user story 3 for testing purposes', 0, 0));
    stories.push(new UserStory(4, 'User Story 4', 'This is user story 4 for testing purposes', 0, 0));
    stories.push(new UserStory(5, 'User Story 5', 'This is user story 5 for testing purposes', 0, 0));
    stories.push(new UserStory(6, 'User Story 6', 'This is user story 6 for testing purposes', 0, 0));
    stories.push(new UserStory(7, 'User Story 7', 'This is user story 7 for testing purposes', 0, 0));
    stories.push(new UserStory(8, 'User Story 8', 'This is user story 8 for testing purposes', 0, 0));
    stories.push(new UserStory(9, 'User Story 9', 'This is user story 9 for testing purposes', 0, 0));
    stories.forEach((story) => {
      story.tasks.push(new Task((0 + story.id * 10), `Test ${0 + story.id * 10}`, `Description of ${0 + story.id * 10}`));
      story.tasks.push(new Task((1 + story.id * 10), `Test ${1 + story.id * 10}`, `Description of ${1 + story.id * 10}`));
      story.tasks.push(new Task((2 + story.id * 10), `Test ${2 + story.id * 10}`, `Description of ${2 + story.id * 10}`));
      story.tasks.push(new Task((3 + story.id * 10), `Test ${3 + story.id * 10}`, `Description of ${3 + story.id * 10}`));
      story.tasks.push(new Task((4 + story.id * 10), `Test ${4 + story.id * 10}`, `Description of ${4 + story.id * 10}`));
      story.tasks.push(new Task((5 + story.id * 10), `Test ${5 + story.id * 10}`, `Description of ${5 + story.id * 10}`));
      story.tasks.push(new Task((6 + story.id * 10), `Test ${6 + story.id * 10}`, `Description of ${6 + story.id * 10}`));
      story.tasks.push(new Task((7 + story.id * 10), `Test ${7 + story.id * 10}`, `Description of ${7 + story.id * 10}`));
      story.tasks.push(new Task((8 + story.id * 10), `Test ${8 + story.id * 10}`, `Description of ${8 + story.id * 10}`));
      story.tasks.push(new Task((9 + story.id * 10), `Test ${9 + story.id * 10}`, `Description of ${9 + story.id * 10}`));
    });
    return stories;
  }

  private getNewSprints (): Sprint[] {
    return [
      new Sprint(1, 'Sprint #1'),
      new Sprint(2, 'Sprint #2'),
      new Sprint(3, 'Sprint #3'),
      new Sprint(4, 'Sprint #4')
    ];
  }

  getProjects (): Promise<Project[]> {
    return new Promise<Project[]>((resolve, reject) => {
      resolve(this.projects);
    });
  }

  getProject (id: number): Promise<Project> {
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

  getSprints (projectId: number): Promise<Sprint[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.getProject(projectId).then(project => {
        if (project.sprints) {
          resolve(project.sprints);
        } else {
          reject('Project record not found.');
        }
      }, reject);
    });
  }

  getSprint (projectId: number, id: number): Promise<Sprint> {
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
