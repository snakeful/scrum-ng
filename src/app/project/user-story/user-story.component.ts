import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../services/projects/projects.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {
  @Input() object: any;
  this
  constructor() { }

  ngOnInit() {
  }

  selectStory (story) {

  }
}
