import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITodo} from "./todo";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {
  }

  getTodos(count = 10): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.API_URL).pipe(
      map(data => data.filter((todo, i) => i < count))
    );
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(
      `${this.API_URL}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`)
  }

  // Partial là built-in class của TypeScript, cho
  // phép convert tất cả các property của
  // class/interface về optional
  createTodo(todo: Partial<ITodo>){
    return this.http.post<ITodo>(this.API_URL,todo);
  }
}
