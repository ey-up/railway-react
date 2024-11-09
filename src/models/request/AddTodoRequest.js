class AddTodoRequest {
    constructor(data) {
      this.task = data.task;
      this.completed = data.completed;
    }
  }
  
  export default AddTodoRequest;
  