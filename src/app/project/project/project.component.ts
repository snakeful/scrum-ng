import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, Project, UserStory, Sprint } from '../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  private project: Project;
  constructor(private service: ProjectsService, private route: ActivatedRoute) {
    this.service.getProject(parseInt(this.route.snapshot.params.id || 0))
    .then((project) => {
      this.project = project;
    });
  }

  ngOnInit() {
  }

  assignStoryToUserStories (userStories: Array<UserStory>, story: UserStory) {
    this.project.userStories.push(story);
    userStories.splice(userStories.indexOf(story), 1);
  }

  assignStoryToSprintStories (sprint: Sprint, story: UserStory) {
    sprint.userStories.push(story);
    this.project.userStories.splice(this.project.userStories.indexOf(story), 1);
  }

  onStoryToSprintDrop (event, sprint: Sprint) {
    this.assignStoryToSprintStories(sprint, event.dragData);
  }
  
  onSprintStoryToUserStoriesDrop (event) {
    let userStories = event.dragData[0];
    let story = event.dragData[1];
    this.assignStoryToUserStories(userStories, story);
  }
}
