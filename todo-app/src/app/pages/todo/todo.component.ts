import { Component, OnInit } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo';
import { FireLoopRef } from '../../shared/sdk/models/FireLoopRef';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title = 'TODO Application';
  private todo: Todo = new Todo();
  private todos : Todo[];
  private reference : FireLoopRef<Todo>;
  constructor(private realTime: RealTime, private router: Router) {
  }

  ngOnInit(): void {
    if (
      this.realTime.connection.isConnected() &&
      this.realTime.connection.authenticated
    ) {
      this.realTime.onReady().subscribe(() => this.setup());
    } else {
      this.router.navigate(['/login'])
    }
  }

  setup() {
    this.reference = this.realTime.FireLoop.ref<Todo>(Todo)
    this.reference.on('change',{
      limit: 10,
      order: 'id DESC'
    }).subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
    this.reference.on('changes').subscribe((data: any) => {
      console.log('changes: ', data);
    });
    this.reference.on('change').subscribe((data: any) => {
      console.log('change: ', data);
    });
    this.reference.on('value').subscribe((data: any) => {
      console.log('value: ', data);
    });
    this.reference.on('child_added').subscribe((data: any) => {
      console.log('child_added: ', data);
    });
    this.reference.on('child_changed').subscribe((data: any) => {
      console.log('child_changed: ', data);
    });
    this.reference.on('child_removed').subscribe((data: any) => {
      console.log('child_removed: ', data);
    });
  }

  add(): void {
    this.reference.create(this.todo).subscribe(() => this.todo = new Todo());
  }
  update(todo: Todo): void {
    this.reference.upsert(todo).subscribe();
  }
  remove(todo: Todo): void {
    this.reference.remove(todo).subscribe();
  }
}
