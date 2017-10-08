import { Component, OnInit } from '@angular/core';
import { Todo } from './shared/sdk/models/Todo';
import { FireLoopRef } from './shared/sdk/models/FireLoopRef';
import { RealTime } from './shared/sdk/services/core/real.time';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TODO Application';
  private todo: Todo = new Todo();
  private todos : Todo[];
  private reference : FireLoopRef<Todo>;
  constructor(private realTime: RealTime) {


    this.realTime
      .onReady()
      .subscribe(() =>{
        this.reference = this.realTime.FireLoop.ref<Todo>(Todo)
        this.reference.on('change',{
          limit: 10,
          order: 'id DESC'
        }).subscribe((todos: Todo[]) => {
          console.log(todos);
          console.log(todos);
          this.todos = todos;
        });
      });}

  ngOnInit(): void {
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
