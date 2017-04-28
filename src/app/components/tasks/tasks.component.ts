import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  moduleId: module.id,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  
}
