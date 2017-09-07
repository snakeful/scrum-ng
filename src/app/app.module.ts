import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { ProjectsService } from './services/projects/projects.service';
import { SprintsService } from './services/sprints/sprints.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { StoriesComponent } from './project/stories/stories.component';
import { ProjectComponent } from './project/project/project.component';
import { RolesComponent } from './users/roles/roles.component';
import { RoleComponent } from './users/role/role.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { SprintComponent } from './project/sprint/sprint.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProjectsComponent,
    StoriesComponent,
    ProjectComponent,
    RolesComponent,
    RoleComponent,
    UsersComponent,
    UserComponent,
    SprintComponent
  ],
  imports: [
    BrowserModule,
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
     path: 'project/sprint/:id',
     component: SprintComponent 
    }, {
      path: 'roles',
      component: RolesComponent
    }, {
      path: 'role/:id',
      component: RoleComponent
    }, {
      path: 'users',
      component: UsersComponent
    }, {
      path: 'user/:id',
      component: UserComponent
    }])
  ],
  providers: [
    ProjectsService,
    SprintsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
