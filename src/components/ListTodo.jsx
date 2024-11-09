import {
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRef, useState } from "react";
import { deleteById, updateById } from "../services/TodoService";

const ListTodo = ({ todos, fetchTodos, setTodos }) => {
  const [editText, setEditText] = useState("");
  const editEnabledIdRef = useRef(null);
  const [openFailure, setOpenFailure] = useState(false);
  const [failureText, setFailureText] = useState(
    "An unexpected error occurred."
  );

  const handleFailureClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailure(false);
    await new Promise((r) => setTimeout(r, 200));
    setFailureText("An unexpected error occurred.");
  };

  const handleSave = async (item) => {
    const todo = {
      task: editText,
      completed: item.completed,
    };
    const response = await updateById(todo, item.id);
    if (response.success) {
      fetchTodos();
    } else {
      setFailureText("Todo update failed.");
      setOpenFailure(true);
    }
  };
  const toggleCompleted = async (item) => {
    const todo = {
      task: item.task,
      completed: !item.completed,
    };
    const response = await updateById(todo, item.id);
    if (response.success) {
      fetchTodos();
    } else {
      setFailureText("Todo update failed.");
      setOpenFailure(true);
    }
  };
  const setItemEditable = (id, isEditable) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo.id === id ? { ...todo, editable: isEditable } : todo
      );
    });
  };

  const deleteTodo = async (todoId) => {
    const response = await deleteById(todoId);

    if (response.success) {
      fetchTodos();
    } else {
      setFailureText("Todo deletion failed.");
      setOpenFailure(true);
    }
  };
  return (
    <>
      {todos.map((item) => {
        return (
          <Stack direction={"row"} key={item.id} spacing={2} padding={1}>
            <Checkbox
              aria-label={"label " + item.task}
              checked={item.completed}
              onChange={() => toggleCompleted(item)}
            />

            {item.editable ? (
              <TextField
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSave(item);
                  }
                }}
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                onDoubleClick={() => {
                  setItemEditable(item.id, false);
                }}
                variant={"outlined"}
                placeholder={item.task}
                style={{
                  flex: 1,
                  alignSelf: "center",
                }}
              />
            ) : (
              <Typography
                variant="subtitle2"
                style={{
                  flex: 1,
                  alignSelf: "center",
                  fontSize: 16,
                  paddingLeft: 12,
                }}
                onDoubleClick={() => {
                  if (editEnabledIdRef.current) {
                    setItemEditable(editEnabledIdRef.current, false);
                  }
                  setItemEditable(item.id, true);
                  editEnabledIdRef.current = item.id;
                  setEditText(item.task);
                }}
              >
                {item.completed ? <s>{item.task}</s> : item.task}
              </Typography>
            )}

            {item.editable ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  handleSave(item);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                Delete
              </Button>
            )}
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openFailure}
              autoHideDuration={1500}
              onClose={handleFailureClose}
            >
              <Alert
                onClose={handleFailureClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {failureText}
              </Alert>
            </Snackbar>
          </Stack>
        );
      })}
    </>
  );
};

export default ListTodo;
