import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ScrumObject, Role, User } from '../classes/users.class';
import {
  Project, ProjectStatus, StoryPriority, StoryStatus, UserStory, Sprint, SprintUserStory,
  Task, TaskStatus, Origin
} from '../classes/projects.class';

@Injectable()
export class ProjectsService {
  private url = 'http://localhost:4201';
  private _projects: Project[];
  private _projectStatus: ProjectStatus[];
  private _storyStatus: StoryStatus[];
  private _taskStatus: TaskStatus[];
  private _storyPriorities: StoryPriority[];
  private loaded: boolean;
  constructor(private http: Http) {
    this.loaded = false;
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
    this.loadData().then(loaded => {});
  }

  private handleError(err: Response) {
    const msg = `<p>Error status code ${err.status} type ${err.type} at ${err.url}</p><p><bold>${err.json().err}</bold></p>`;
    return Observable.throw(msg);
  }

  loadData(): Promise<any> {
    if (this.loaded) {
      return Promise.resolve();
    }
    return new Promise<any>(resolve => {
      const resolved = Promise.all([
        this.http.get(`${this.url}/api/project-status`).map(data => data.json() as ProjectStatus[]).toPromise(),
        this.http.get(`${this.url}/api/user-story-status`).map(data => data.json() as StoryStatus[]).toPromise(),
        this.http.get(`${this.url}/api/task-status`).map(data => data.json() as TaskStatus[]).toPromise()]);
      resolved.then(data => {
        this._projectStatus = data[0];
        this._storyStatus = data[1];
        this._taskStatus = data[2];
        this.loaded = true;
        resolve();
      });
    });
  }

  get projectStatus(): ProjectStatus[] {
    return this._projectStatus;
  }

  get storyStatus(): StoryStatus[] {
    return this._storyStatus || [];
  }

  get taskStatus(): TaskStatus[] {
    return this._taskStatus;
  }

  get storyPriorities(): StoryPriority[] {
    return this._storyPriorities || [];
  }

  get projects(): Observable<Project[]> {
    return this.http.get(`${this.url}/api/projects`)
      .map(res => res.json() as Project[])
      .catch(this.handleError);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get(`${this.url}/api/projects/${id}`)
      .map(res => res.json() as Project)
      .catch(this.handleError);
  }

  saveProject(project: Project): Observable<Project> {
    const newProject = project.id == null;
    return this.http[newProject ? 'post' : 'put']
      (`${this.url}/api/projects${newProject ? '' : `/${project.id}`}`, project)
      .map(data => {
        if (newProject) {
          project.id = data.json();
        }
        return project;
      })
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

  deleteUserStory(userStory: UserStory): Observable<boolean> {
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

  saveSprint(sprint: Sprint): Observable<Sprint> {
    const newSprint = sprint.id == null;
    return this.http[newSprint ? 'post' : 'put']
      (`${this.url}/api/sprints${newSprint ? '' : `/${sprint.id}`}`, sprint)
      .map(data => {
        if (newSprint) {
          sprint.id = data.json();
        }
        return sprint;
      })
      .catch(this.handleError);
  }

  deleteSprint(sprint: Sprint): Observable<boolean> {
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

  assignUserStoryToSprint(sprint: Sprint, story: UserStory): Observable<boolean> {
    return this.http.post(`${this.url}/api/sprint-user-stories`, {
      sprintId: sprint.id,
      userStoryId: story.id
    }).map(() => true)
      .catch(this.handleError);
  }

  unassignUserStoryFromSprint(sprint: Sprint, story: UserStory): Observable<boolean> {
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

  saveTask(task: Task): Observable<boolean> {
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

  get origins(): Observable<Origin[]> {
    return this.http.get(`${this.url}/api/origins`)
      .map(data => data.json() as Origin[])
      .catch(this.handleError);
  }

  get priorities(): Promise<StoryPriority[]> {
    return new Promise<StoryPriority[]>(resolve => {
      resolve(this._storyPriorities);
    });
  }

  getBurndownData(id: number): Observable<any[]> {
    return this.http.get(`${this.url}/api/reports/burndown-charts/${id}`)
      .map(data => data.json() as any[])
      .catch(this.handleError);
  }
}
