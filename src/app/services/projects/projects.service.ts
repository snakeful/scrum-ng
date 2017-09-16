import { Injectable } from '@angular/core';

@Injectable()
export class ScrumObject {
  id: number;
  name: string;
  desc: string;
  constructor(id?: number, name?: string, desc?: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

export class User extends ScrumObject {
}

export class Project extends ScrumObject {
  userStories: UserStory[];
  sprints: Sprint[];
  productOwnerId: number;
  productOwner: User;
  scrumMasterId: User;
  scrumMaster: User;
  scrumTeam: User[];
  constructor(id?: number, name?: string, desc?: string, userStories?: any[], sprints?: any[]) {
    super(id, name, desc);
    this.userStories = userStories;
    this.sprints = sprints;
    this.scrumTeam = [];
  }
}

export class UserStory extends ScrumObject {
  priorityId: number;
  statusId: number;
  tasks: Task[];
  constructor(id?: number, name?: string, desc?: string, priorityId?: number, statusId?: number) {
    super(id, name, desc);
    this.priorityId = priorityId;
    this.statusId = statusId;
    this.tasks = [];
  }
}

export class StoryPriority extends ScrumObject {
}

export class StoryStatus extends ScrumObject {
}

export class Sprint extends ScrumObject {
  project: Project;
  start: Date;
  end: Date;
  userStories: UserStory[];
  constructor(id?: number, name?: string, desc?: string) {
    super(id, name, desc);
    this.start = new Date();
    this.end = new Date();
    this.userStories = [];
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
  constructor(id?: number, name?: string, desc?: string, points: number = 0, executedPoints: number = 0,
    originId: number = 0, successTask: boolean = false) {
    super(id, name, desc);
    this.date = new Date();
    this.statusId = 0;
    this.userId = 0;
    this.points = points;
    this.executedPoints = executedPoints;
    this.originId = originId;
    this.successTask = successTask;
  }
}

export class TaskStatus extends ScrumObject {
  constructor(id?: number, name?: string, desc?: string) {
    super(id, name, desc);
  }
}

export class Origin extends ScrumObject {
}

export class ProjectsService {
  private projects: Project[] = [
    new Project(1, 'Project 1', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(2, 'Project 2', 'This is a project template', this.getNewUserStories(), this.getNewSprints()),
    new Project(3, 'Project 3', 'This is a project template', this.getNewUserStories(), this.getNewSprints())
  ];
  private _taskStatus: TaskStatus[];
  private _storyPriorities: StoryPriority[];
  private _storyStatus: StoryStatus[];
  private origins: Origin[];
  private _productOwnerUsers: User[];
  private _scrumMasterUsers: User[];
  private _scrumTeamUsers: User[];

  constructor() {
    this._taskStatus = [
      new TaskStatus(0, 'To Do'),
      new TaskStatus(1, 'In Progress'),
      new TaskStatus(2, 'Testing'),
      new TaskStatus(3, 'Done')
    ];
    this._storyPriorities = [
      new StoryPriority(0, 'Highest', 'badge-danger'),
      new StoryPriority(1, 'Higher', 'badge-danger'),
      new StoryPriority(2, 'High', 'badge-warning'),
      new StoryPriority(3, 'Normal Highest', 'badge-warning'),
      new StoryPriority(4, 'Normal High', 'badge-warning'),
      new StoryPriority(5, 'Normal', 'badge-primary'),
      new StoryPriority(6, 'Normal Low', 'badge-primary'),
      new StoryPriority(7, 'Normal Lowest', 'badge-primary'),
      new StoryPriority(8, 'Low', 'badge-dark'),
      new StoryPriority(9, 'Lower', 'badge-dark'),
      new StoryPriority(10, 'Lowest', 'badge-dark')
    ];
    this._storyStatus = [
      new StoryStatus(0, 'In Progress', 'badge-primary'),
      new StoryStatus(1, 'Done', 'badge-sucess')
    ];
    this.origins = [
      new Origin(0, 'New'),
      new Origin(1, 'Bad Design'),
      new Origin(2, 'Process Change'),
      new Origin(3, 'New Requirement')
    ];
    this._productOwnerUsers = [
      new User(0, 'Test1'),
      new User(1, 'Test2'),
      new User(2, 'Test3'),
      new User(3, 'Test4')
    ];
    this._scrumMasterUsers = [
      new User(4, 'Test5'),
      new User(5, 'Test6'),
      new User(6, 'Test7'),
      new User(7, 'Test8')
    ];
    this._scrumTeamUsers = [
      new User(8, 'Test9'),
      new User(9, 'Test10'),
      new User(10, 'Test11'),
      new User(11, 'Test12')
    ];
  }

  private getNewUserStories(): UserStory[] {
    const stories: UserStory[] = [];
    stories.push(new UserStory(0, 'User Story 0', 'This is user story 0 for testing purposes', 0, 0));
    stories.push(new UserStory(1, 'User Story 1', 'This is user story 1 for testing purposes', 1, 0));
    stories.push(new UserStory(2, 'User Story 2', 'This is user story 2 for testing purposes', 2, 0));
    stories.push(new UserStory(3, 'User Story 3', 'This is user story 3 for testing purposes', 3, 0));
    stories.push(new UserStory(4, 'User Story 4', 'This is user story 4 for testing purposes', 4, 0));
    stories.push(new UserStory(5, 'User Story 5', 'This is user story 5 for testing purposes', 5, 0));
    stories.push(new UserStory(6, 'User Story 6', 'This is user story 6 for testing purposes', 6, 0));
    stories.push(new UserStory(7, 'User Story 7', 'This is user story 7 for testing purposes', 7, 0));
    stories.push(new UserStory(8, 'User Story 8', 'This is user story 8 for testing purposes', 8, 0));
    stories.push(new UserStory(9, 'User Story 9', 'This is user story 9 for testing purposes', 9, 0));
    stories.push(new UserStory(10, 'User Story 10', 'This is user story 10 for testing purposes', 10, 0));
    stories.forEach((story) => {
      story.tasks.push(new Task((0 + story.id * 10), `Test ${0 + story.id * 10}`, `Description of ${0 + story.id * 10}`, 9));
      story.tasks.push(new Task((1 + story.id * 10), `Test ${1 + story.id * 10}`, `Description of ${1 + story.id * 10}`, 8));
      story.tasks.push(new Task((2 + story.id * 10), `Test ${2 + story.id * 10}`, `Description of ${2 + story.id * 10}`, 7));
      story.tasks.push(new Task((3 + story.id * 10), `Test ${3 + story.id * 10}`, `Description of ${3 + story.id * 10}`, 6));
      story.tasks.push(new Task((4 + story.id * 10), `Test ${4 + story.id * 10}`, `Description of ${4 + story.id * 10}`, 5));
      story.tasks.push(new Task((5 + story.id * 10), `Test ${5 + story.id * 10}`, `Description of ${5 + story.id * 10}`, 4));
      story.tasks.push(new Task((6 + story.id * 10), `Test ${6 + story.id * 10}`, `Description of ${6 + story.id * 10}`, 3));
      story.tasks.push(new Task((7 + story.id * 10), `Test ${7 + story.id * 10}`, `Description of ${7 + story.id * 10}`, 2));
      story.tasks.push(new Task((8 + story.id * 10), `Test ${8 + story.id * 10}`, `Description of ${8 + story.id * 10}`, 1));
      story.tasks.push(new Task((9 + story.id * 10), `Test ${9 + story.id * 10}`, `Description of ${9 + story.id * 10}`, 9));
    });
    return stories;
  }

  private getNewSprints(): Sprint[] {
    return [
      new Sprint(1, 'Sprint #1'),
      new Sprint(2, 'Sprint #2'),
      new Sprint(3, 'Sprint #3'),
      new Sprint(4, 'Sprint #4')
    ];
  }

  get taskStatus(): TaskStatus[] {
    return this._taskStatus;
  }

  get storyPriorities(): StoryPriority[] {
    return this._storyPriorities;
  }

  get storyStatus(): StoryStatus[] {
    return this._storyStatus;
  }

  getProjects(): Promise<Project[]> {
    return new Promise<Project[]>((resolve, reject) => {
      resolve(this.projects);
    });
  }

  getProject(id: number): Promise<Project> {
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

  getProductOwnerUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this._productOwnerUsers);
    });
  }

  getScrumMasterUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this._scrumMasterUsers);
    });
  }

  getScrumTeamUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(this._scrumTeamUsers);
    });
  }

  getSprints(projectId: number): Promise<Sprint[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.getProject(projectId).then(project => {
        project.sprints.forEach(sprint => sprint.project = project);
        project.sprints ? resolve(project.sprints) : reject('Project record not found.');
      }, reject);
    });
  }

  getSprint(projectId: number, id: number): Promise<Sprint> {
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

  getOrigins(): Promise<Origin[]> {
    return new Promise<Origin[]>((resolve, reject) => {
      resolve(this.origins);
    });
  }
}
