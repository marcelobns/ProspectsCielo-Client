import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  events: string[];

  constructor() {
    this.events = [
      "In", "2021", "2022", "Out"
    ];
  }

  ngOnInit() {
    
  }

}
