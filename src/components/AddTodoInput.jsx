import { TextField } from "@mui/material";

const AddTodoInput = ({ todoText, setTodoText, handleAddTodo }) => {
  const handleInput = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <>
      <TextField
        variant="outlined"
        style={{ flex: 1 }}
        value={todoText}
        onChange={handleInput}
        placeholder="Add new todo"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
            setTodoText("");
          }
        }}
      />
    </>
  );
};

export default AddTodoInput;
