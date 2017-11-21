import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2Webstorage } from 'ng2-webstorage';

import { NbThemeModule, NbLayoutModule, NbActionsModule, NbUserModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PasswordValidatorDirective } from './shared/directives/password-validator.directive';

import { UsersService } from './shared/services/users.service';
import { ProjectsService } from './shared/services/projects.service';
import { LoadDataService } from './shared/services/load-data.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectComponent } from './project/project/project.component';
import { UsersComponent } from './users/users/users.component';
import { LoginModalComponent } from './users/login-modal/login-modal.component';
import { SprintsComponent } from './project/sprints/sprints/sprints.component';
import { SprintComponent } from './project/sprints/sprint/sprint.component';
import { SprintTasksComponent } from './project/sprints/sprint-tasks/sprint-tasks.component';
import { UserStoryComponent } from './project/user-stories/user-story/user-story.component';
import { UserStoriesComponent } from './project/user-stories/user-stories/user-stories.component';
import { TaskComponent } from './project/sprints/task/task.component';
import { UserModalComponent } from './users/user-modal/user-modal.component';
import { BurndownChartComponent } from './project/sprints/burndown-chart/burndown-chart.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { SprintFormComponent } from './project/sprints/sprint-form/sprint-form.component';
import { UserStoryFormComponent } from './project/user-stories/user-story-form/user-story-form.component';
import { TaskFormComponent } from './project/sprints/task-form/task-form.component';
import { LimitToPipe } from './shared/pipes/limit-to.pipe';
import { TaskStatusPipe } from './shared/pipes/task-status.pipe';
import { StoryPriorityPipe } from './shared/pipes/story-priority.pipe';
import { StoryStatusPipe } from './shared/pipes/story-status.pipe';
import { OriginPipe } from './shared/pipes/origin.pipe';
import { ScrumTeamPipe } from './shared/pipes/scrum-team.pipe';
import { ProjectStatusPipe } from './shared/pipes/project-status.pipe';
import { ProjectModalComponent } from './project/project-modal/project-modal.component';
import { SprintModalComponent } from './project/sprints/sprint-modal/sprint-modal.component';
import { UserStoryModalComponent } from './project/user-stories/user-story-modal/user-story-modal.component';
import { TaskModalComponent } from './project/sprints/task-modal/task-modal.component';
import { ServerModalComponent } from './server-modal/server-modal.component';
import { AuthGuard } from './users/guard/auth.guard';
import { AuthAdminGuard } from './users/guard/auth-admin.guard';

const pageComponents = [
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  ServerModalComponent
];

const userComponents = [
  LoginModalComponent,
  UsersComponent,
  UserModalComponent
];

const projectComponents = [
  ProjectsComponent,
  ProjectComponent,
  ProjectFormComponent,
  ProjectModalComponent
];

const sprintComponents = [
  SprintsComponent,
  SprintComponent,
  SprintFormComponent,
  SprintTasksComponent,
  SprintModalComponent,
  BurndownChartComponent
];

const userStoriesComponents = [
  UserStoryComponent,
  UserStoriesComponent,
  UserStoryFormComponent,
  UserStoryModalComponent,
  TaskFormComponent,
  TaskModalComponent,
  TaskComponent
];

const projectPipes = [
  LimitToPipe,
  TaskStatusPipe,
  StoryPriorityPipe,
  StoryStatusPipe,
  OriginPipe,
  ScrumTeamPipe,
  ProjectStatusPipe
];

const projectDirectives = [
  PasswordValidatorDirective
];

const scrumRoutes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'projects',
  component: ProjectsComponent,
  canActivate: [AuthGuard],
  resolve: {
    loaded: LoadDataService
  }
}, {
  path: 'project/:id',
  component: ProjectComponent,
  canActivate: [AuthGuard],
  resolve: {
    loaded: LoadDataService
  }
}, {
  path: 'project/sprint/:id',
  component: SprintComponent,
  canActivate: [AuthGuard],
  resolve: {
    loaded: LoadDataService
  }
}, {
  path: 'users',
  canActivate: [AuthAdminGuard],
  component: UsersComponent
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: ''
}];

@NgModule({
  declarations: [
    AppComponent,
    ...pageComponents,
    ...userComponents,
    ...projectComponents,
    ...sprintComponents,
    ...userStoriesComponents,
    ...projectPipes,
    ...projectDirectives
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ChartsModule,
    Ng2Webstorage.forRoot({
      prefix: 'scrum',
      separator: '-',
      caseSensitive: true
    }),
    NbThemeModule.forRoot({
      name: 'scrum'
    }),
    NbLayoutModule,
    NbActionsModule,
    NbUserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(scrumRoutes, {
      useHash: true
    })
  ],
  providers: [
    AuthAdminGuard,
    AuthGuard,
    ProjectsService,
    UsersService,
    LoadDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginModalComponent,
    UserModalComponent,
    ProjectModalComponent,
    SprintModalComponent,
    UserStoryModalComponent,
    TaskModalComponent,
    ServerModalComponent
  ]
})
export class AppModule { }
