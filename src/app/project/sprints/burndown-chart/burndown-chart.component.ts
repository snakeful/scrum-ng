import { Component, OnInit, Input } from '@angular/core';

import { round } from 'lodash';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService } from '../../../services/shared/projects/projects.service';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  private _sprintId: number;
  private _width: number;
  private _height: number;
  private _data: any[];
  private _labels: any[];
  private _options: any;
  private _legend: boolean;
  private _type: string;
  private _colors: any[];
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this._data = [{
      label: 'Estimated Points',
      pointRadius: 0.75,
      data: []
    }, {
      label: 'Burned Points',
      pointRadius: 0.75,
      data: []
    }];
    this._labels = [];
    this._options = {
      responsive: true
    };
    this._legend = true;
    this._type = 'line';
    this._colors = [{
      // info
      backgroundColor: 'rgba(23,162,184,0.2)',
      borderColor: 'rgba(23,162,184,1)',
      pointBackgroundColor: 'rgba(23,162,184,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(23,162,184,0.8)'
    }, {
      // primary
      backgroundColor: 'rgba(0,109,217,0.2)',
      borderColor: 'rgba(0,109,217,1)',
      pointBackgroundColor: 'rgba(0,109,217,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,109,217,0.8)'
    }]
  }

  ngOnInit() {
  }

  get data(): any[] {
    return this._data;
  }

  get labels(): any[] {
    return this._labels;
  }

  get options(): any {
    return this._options;
  }

  get legend(): any {
    return this._legend;
  }

  get type(): string {
    return this._type;
  }

  @Input() set sprintId(value: number) {
    if (!value) {
      return;
    }
    this._sprintId = value;
    this.service.getBurndownData(value)
      .subscribe(data => {
        const labels = [];
        const estimated = {
          label: 'Estimated Points',
          data: []
        };
        const burned = {
          label: 'Burned Points',
          data: []
        };
        const charData = [estimated, burned];
        data.forEach(obj => {
          this._labels.push(obj.daySprint.substring(0, 10));
          estimated.data.push(round(obj.totalPointsPerDay, 2));
          burned.data.push(obj.remainingPoints);
        });
        this._labels = labels;
        this._data = charData;
      }, err => {
        this.alert.error('Burndown Chart', err, {
          timeOut: 10000
        });
      });
  }

  get colors(): any[] {
    return this._colors;
  }
}
