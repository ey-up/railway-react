class TodoResponse {
    constructor(data) {
        this.id = data.id;
        this.task = data.task;
        this.completed = data.completed;
    }
}

export default TodoResponse;
