import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { StoriesComponent } from './project/stories/stories.component';
import { ProjectComponent } from './project/project/project.component';

import { ProjectsService } from './services/projects/projects.service';
import { RolesComponent } from './users/roles/roles.component';
import { RoleComponent } from './users/role/role.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';

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
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    }, {
      path: 'projects',
      component: ProjectsComponent
    }, {
      path: 'project/:id',
      component: ProjectComponent
    }])
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
