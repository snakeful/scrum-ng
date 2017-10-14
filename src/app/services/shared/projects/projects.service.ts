import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ScrumObject, Role, User } from '../users/users.service';

export class Project extends ScrumObject {
  userStories: UserStory[];
  sprints: Sprint[];
  productOwnerId: number;
  productOwner: User;
  scrumMasterId: number;
  scrumMaster: User;
  scrumTeam: number[];
  stakeholders: number[];
  constructor(id?: number, name?: string, desc?: string, userStories?: UserStory[], sprints?: Sprint[]) {
    super(id, name, desc);
    this.userStories = userStories || [];
    this.sprints = sprints || [];
    this.scrumTeam = [];
    this.stakeholders = [];
  }
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
    this.statusId = statusId;
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
  successTask: Boolean;
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

@Injectable()
export class ProjectsService {
  private url = 'http://localhost:4201';
  private projects: Project[];
  private _taskStatus: TaskStatus[];
  private _storyPriorities: StoryPriority[];
  private _storyStatus: StoryStatus[];
  private origins: Origin[];

  constructor(private http: Http) {
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
  }

  private handleError(err: Response) {
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
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

  getProjects(): Observable<Project[]> {
    return this.http.get(`${this.url}/api/projects`)
      .map(res => res.json() as Project[])
      .catch(this.handleError);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get(`${this.url}/api/projects/${id}`)
      .map(res => res.json() as Project)
      .catch(this.handleError);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post(`${this.url}/api/projects`, project)
      .map(res => {
        project.id = res.json();
        return project;
      })
      .catch(this.handleError);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.put(`${this.url}/api/projects/${project.id}`, project)
      .map(() => project)
      .catch(this.handleError);
  }

  getUserStories(projectId: number): Observable<UserStory[]> {
    return this.http.get(`${this.url}/api/user-stories?where=${JSON.stringify({
      projectId: projectId
    })}`)
      .map(res => res.json() as UserStory[])
      .catch(this.handleError);
  }

  getUserStory(id: number): Observable<UserStory> {
    return this.http.get(`${this.url}/api/user-stories/${id}`)
      .map(res => res.json() as UserStory)
      .catch(this.handleError);
  }

  saveUserStory(userStory: UserStory): Observable<UserStory> {
    const newStory = userStory.id == null;
    return this.http[newStory ? 'post' : 'put']
      (`${this.url}/api/user-stories${newStory ? '' : `/${userStory.id}`}`, userStory)
      .map(data => {
        if (newStory) {
          userStory.id = data.json();
        }
        return userStory;
      })
      .catch(this.handleError);
  }

  deleteUserStory(userStory: UserStory): Observable<Boolean> {
    return this.http.delete(`${this.url}/api/user-stories/${userStory.id}`)
      .map(() => true)
      .catch(this.handleError);
  }

  getSprints(projectId: number): Observable<Sprint[]> {
    return this.http.get(`${this.url}/api/sprints/?where=${JSON.stringify({
      projectId: projectId
    })}`)
      .map(res => res.json() as Sprint[])
      .catch(this.handleError);
  }

  getSprint(id: number): Observable<Sprint> {
    return this.http.get(`${this.url}/api/sprints/${id}`)
      .map(res => {
        const sprint = res.json() as Sprint;
        sprint.userStories = [];
        return sprint;
      })
      .catch(this.handleError);
  }

  createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post(`${this.url}/api/sprints`, sprint)
      .map(res => {
        sprint.id = res.json() as number;
        return sprint;
      })
      .catch(this.handleError);
  }

  saveSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put(`${this.url}/api/sprints/${sprint.id}`, sprint)
      .map(() => sprint)
      .catch(this.handleError);
  }

  deleteSprint(sprint: Sprint): Observable<Boolean> {
    return this.http.delete(`${this.url}/api/sprints/${sprint.id}`)
      .map(() => true)
      .catch(this.handleError);
  }

  getSprintUserStories(id: number): Observable<SprintUserStory[]> {
    return this.http.get(`${this.url}/api/sprint-user-stories?where=${JSON.stringify({
      sprintId: id
    })}`)
      .map(res => res.json() as SprintUserStory[])
      .catch(this.handleError);
  }

  assignUserStoryToSprint(sprint: Sprint, story: UserStory): Observable<Boolean> {
    return this.http.post(`${this.url}/api/sprint-user-stories`, {
      sprintId: sprint.id,
      userStoryId: story.id
    }).map(() => true)
      .catch(this.handleError);
  }

  unassignUserStoryFromSprint(sprint: Sprint, story: UserStory): Observable<Boolean> {
    return this.http.delete(`${this.url}/api/sprint-user-stories/0?where=${JSON.stringify({
      sprintId: sprint.id,
      userStoryId: story.id
    })}`).map(() => true)
      .catch(this.handleError);
  }

  getTasks(userStoryId: number): Observable<Task[]> {
    return this.http.get(`${this.url}/api/tasks?where=${JSON.stringify({
      userStoryId: userStoryId
    })}`).map(res => res.json() as Task[])
      .catch(this.handleError);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get(`${this.url}/api/tasks/${id}`)
      .map(res => res.json() as Task)
      .catch(this.handleError);
  }

  createTask(task: Task): Observable<Boolean> {
    return this.http.post(`${this.url}/api/tasks`, task)
      .map(res => true)
      .catch(this.handleError);
  }

  saveTask(task: Task): Observable<Boolean> {
    const newTask = task.id == null;
    return this.http[newTask ? 'post' : 'put']
      (`${this.url}/api/tasks${newTask ? '' : `/${task.id}`}`, task)
      .map(data => {
        if (newTask) {
          task.id = data.json();
        }
        return task;
      })
      .catch(this.handleError);
  }

  getOrigins(): Observable<Origin[]> {
    return this.http.get(`${this.url}/api/origins`)
      .map(data => data.json() as Origin[])
      .catch(this.handleError);
  }

  getPriorities(): Promise<StoryPriority[]> {
    return new Promise<StoryPriority[]>((resolve, reject) => {
      resolve(this._storyPriorities);
    });
  }
}
