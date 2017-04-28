import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../task';

@Component({
  moduleId: module.id,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: any;
  // tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      })
  }

  addTask(event) {
    event.preventDefault();
    let newTask = {
      title: this.title,
      isDone: false
    };
    console.log(newTask);
    this.taskService.addTask(newTask)
      .subscribe(task => {
        console.log(task);
        this.tasks.push(task);
        this.title = '';
      })
  }

  deleteTask(id) {
    let tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(data => {
      if(data.n === 1) {
        for(let i = 0; i < tasks.length; i++) {
          if(tasks[i]._id === id) {
            tasks.splice(i, 1);
          }
        }
      }
    })
  }

  updateStatus(task) {
    let _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateStatus(_task).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }

  textLine(task) {

    if (task.isDone) {
      return 'text-line';
    } else {
      return 'text-no-line';
    }
  }
}
