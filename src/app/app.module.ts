import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2Webstorage } from "ng2-webstorage";

import { PasswordValidatorDirective } from './directives/shared/password-validator.directive';

import { UsersService } from './services/shared/users/users.service';
import { ProjectsService } from './services/shared/projects/projects.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectComponent } from './project/project/project.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { LoginModalComponent } from './users/login-modal/login-modal.component';
import { SprintsComponent } from './project/sprints/sprints/sprints.component';
import { SprintComponent } from './project/sprints/sprint/sprint.component';
import { SprintTasksComponent } from './project/sprints/sprint-tasks/sprint-tasks.component';
import { SprintModalComponent } from './project/sprints/sprint-modal/sprint-modal.component';
import { UserStoryComponent } from './project/user-stories/user-story/user-story.component';
import { UserStoriesComponent } from './project/user-stories/user-stories/user-stories.component';
import { UserStoryModalComponent } from './project/user-stories/user-story-modal/user-story-modal.component';
import { TaskComponent } from './project/sprints/task/task.component';
import { UserModalComponent } from './users/user-modal/user-modal.component';
import { LimitToPipe } from './limit-to.pipe';
import { TaskStatusPipe } from './project/task-status.pipe';
import { StoryPriorityPipe } from './project/story-priority.pipe';
import { StoryStatusPipe } from './project/story-status.pipe';
import { OriginPipe } from './project/origin.pipe';
import { ScrumTeamPipe } from './project/scrum-team.pipe';
import { UserRolePipe } from './project/user-role.pipe';
import { TaskModalComponent } from './project/sprints/task-modal/task-modal.component';
import { BurndownChartComponent } from './project/sprints/burndown-chart/burndown-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    UsersComponent,
    UserComponent,
    LoginModalComponent,
    SprintsComponent,
    SprintComponent,
    UserStoryComponent,
    UserStoriesComponent,
    UserStoryModalComponent,
    SprintTasksComponent,
    SprintModalComponent,
    TaskComponent,
    UserModalComponent,
    PasswordValidatorDirective,
    LimitToPipe,
    TaskStatusPipe,
    StoryPriorityPipe,
    StoryStatusPipe,
    OriginPipe,
    ScrumTeamPipe,
    UserRolePipe,
    TaskModalComponent,
    BurndownChartComponent,
    PasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2DragDropModule.forRoot(),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ChartsModule,
    Ng2Webstorage.forRoot({
      prefix: 'scrum',
      separator: '-',
      caseSensitive: true
    }),
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    }, {
      path: 'projects',
      component: ProjectsComponent
    }, {
      path: 'project/:id',
      component: ProjectComponent
    }, {
      path: 'project/sprint/:id',
      component: SprintComponent
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
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
