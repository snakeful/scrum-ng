import { ScrumObject, User } from './users.class';

export class Project extends ScrumObject {
  userStories: UserStory[];
  sprints: Sprint[];
  productOwnerId: number;
  productOwner: User;
  scrumMasterId: number;
  scrumMaster: User;
  scrumTeam: number[];
  stakeholders: number[];
  statusId: number;
  constructor(id?: number, name?: string, desc?: string, userStories?: UserStory[], sprints?: Sprint[]) {
    super(id, name, desc);
    this.userStories = userStories || [];
    this.sprints = sprints || [];
    this.productOwnerId = null;
    this.scrumMasterId = null;
    this.scrumTeam = [];
    this.stakeholders = [];
    this.statusId = 0;
  }
}

export class ProjectStatus extends ScrumObject {
}

export class UserStory extends ScrumObject {
  projectId: number;
  priorityId: number;
  statusId: number;
  tasks: Task[];
  constructor(id?: number, name?: string, desc?: string, projectId?: number, priorityId?: number, statusId?: number) {
    super(id, name, desc);
    this.projectId = projectId;
    this.priorityId = priorityId;
    this.statusId = statusId || 0;
  }
}

export class StoryPriority extends ScrumObject {
}

export class StoryStatus extends ScrumObject {
}

export class Sprint extends ScrumObject {
  start: Date;
  end: Date;
  projectId: number;
  project: Project;
  userStories: UserStory[];
  constructor(id?: number, name?: string, desc?: string) {
    super(id, name, desc);
    this.start = new Date();
    this.end = new Date();
    this.userStories = [];
  }
}

export class SprintUserStory extends ScrumObject {
  sprintId: number;
  userStoryId: number;
  constructor(id?: number, sprintId?: number, userStoryId?: number) {
    super(id);
    this.sprintId = sprintId;
    this.userStoryId = userStoryId;
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
  successTask: boolean;
  constructor(id?: number, name?: string, desc?: string, userStoryId?: number, points: number = 0, executedPoints: number = 0,
    originId: number = 0, successTask: boolean = false) {
    super(id, name, desc);
    this.userStoryId = userStoryId;
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
}

export class Origin extends ScrumObject {
}
