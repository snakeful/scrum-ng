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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    UsersComponent,
    LoginModalComponent,
    SprintsComponent,
    SprintComponent,
    UserStoryComponent,
    UserStoriesComponent,
    SprintTasksComponent,
    TaskComponent,
    UserModalComponent,
    ProjectFormComponent,
    UserStoryFormComponent,
    SprintFormComponent,
    BurndownChartComponent,
    TaskFormComponent,
    PasswordValidatorDirective,
    LimitToPipe,
    TaskStatusPipe,
    StoryPriorityPipe,
    StoryStatusPipe,
    OriginPipe,
    ScrumTeamPipe,
    PasswordValidatorDirective,
    ProjectStatusPipe,
    ProjectModalComponent
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
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    }, {
      path: 'projects',
      component: ProjectsComponent,
      resolve: {
        loaded: LoadDataService
      }
    }, {
      path: 'project/:id',
      component: ProjectComponent,
      resolve: {
        loaded: LoadDataService
      }
    }, {
      path: 'project/sprint/:id',
      component: SprintComponent,
      resolve: {
        loaded: LoadDataService
      }
    }, {
      path: 'users',
      component: UsersComponent
    }, {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }], {
      useHash: true
    })
  ],
  providers: [
    ProjectsService,
    UsersService,
    LoadDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProjectModalComponent,
  ]
})
export class AppModule { }
