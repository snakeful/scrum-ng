import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { UsersService } from './services/shared/users.service';
import { ProjectsService } from './services/shared/projects.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { StoriesComponent } from './project/stories/stories.component';
import { ProjectComponent } from './project/project/project.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { SprintComponent } from './project/sprint/sprint.component';
import { UserStoryComponent } from './project/user-story/user-story.component';
import { SprintTasksComponent } from './project/sprint-tasks/sprint-tasks.component';
import { LimitToPipe } from './limit-to.pipe';
import { TaskStatusPipe } from './project/task-status.pipe';
import { StoryPriorityPipe } from './project/story-priority.pipe';
import { StoryStatusPipe } from './project/story-status.pipe';
import { OriginPipe } from './project/origin.pipe';
import { ScrumTeamPipe } from './project/scrum-team.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProjectsComponent,
    StoriesComponent,
    ProjectComponent,
    UsersComponent,
    UserComponent,
    SprintComponent,
    UserStoryComponent,
    SprintTasksComponent,
    LimitToPipe,
    TaskStatusPipe,
    StoryPriorityPipe,
    StoryStatusPipe,
    OriginPipe,
    ScrumTeamPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2DragDropModule.forRoot(),
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
      path: 'project/sprint/:projectId/:id',
      component: SprintComponent
    }, {
      path: 'users',
      component: UsersComponent
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
