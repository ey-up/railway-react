import Response from "./Response";
import TodoResponse from "./TodoResponse";

class GetAllTodosResponse extends Response {
  constructor(response) {
    super(response);
    if (this.success) {
        this.todos = response.data.todos.map(todo => new TodoResponse(todo))
        this.totalCount = response.data.totalCount
    }
  }
}

export default GetAllTodosResponse;
