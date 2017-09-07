import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintsService } from '../../services/sprints/sprints.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private sprint;
  constructor(private sprintsService: SprintsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sprintsService.getSprint(0, parseInt(this.route.snapshot.params.id || 0))
    .then((sprint) => {
      this.sprint = sprint;
    });
  }

}
