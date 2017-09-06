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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProjectsComponent,
    StoriesComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: 'home',
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
