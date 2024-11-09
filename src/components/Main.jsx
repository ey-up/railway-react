import React, { useState, useEffect } from "react";
import {
  Container,
  Snackbar,
  Stack,
  Button,
  Pagination,
  TextField,
} from "@mui/material";
import AddTodoInput from "../components/AddTodoInput";
import ListTodo from "../components/ListTodo";
import { useNavigate } from "react-router-dom";
import {
  addTodo,
  getByPage,
  getByPageAndSearch,
} from "../services/TodoService";

export default function Main() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showAddTodoFailedSnack, setShowAddTodoFailedSnack] = useState(false);
  // const [showAddTodoSuccessSnack, setShowAddTodoSuccessSnack] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [inputTimer, setInputTimer] = useState(null);
  const navigate = useNavigate();
  const [showFetchdTodosFailedSnack, setShowFetchTodosFailedSnack] =
    useState(false);
  // const [showFetchTodosSuccessSnack, setShowFetchTodosSuccessSnack] =
  //   useState(false);

  const handleAddTodo = async () => {
    if (todoText.length === 0) {
      setShowAddTodoFailedSnack(true);
      return;
    }

    const todo = {
      id: todos.length + 1,
      task: todoText,
      completed: false,
    };
    const response = await addTodo(todo);

    if (response.success) {
      // setShowAddTodoSuccessSnack(true);
      fetchTodos();
    } else {
      setShowAddTodoFailedSnack(true);
    }
    setTodoText("");
  };

  const fetchTodos = async (paramPageCount, paramSearch) => {
    const pageCount =
      paramPageCount !== undefined ? paramPageCount - 1 : Math.max(0, page - 1);
    const search = paramSearch !== undefined ? paramSearch : searchText;
    var response;
    if (search) {
      response = await getByPageAndSearch(pageCount, search);
    } else {
      response = await getByPage(pageCount);
    }
    if (response.success) {
      setTodos(response.todos);
      setPageCount(Math.ceil(response.totalCount / 5));
      // setShowFetchTodosSuccessSnack(true);
    } else {
      setShowFetchTodosFailedSnack(true);
    }
  };

  const handlePaginationChange = async (event, value) => {
    setPage(value);
    fetchTodos(value, searchText);
  };

  const handleSearchInput = async (e) => {
    setSearchText(e.target.value);

    clearTimeout(inputTimer);
    let timeout = setTimeout(() => {
      fetchTodos(page, e.target.value);
    }, 300);
    setInputTimer(timeout);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Container
        style={{ height: "450px", marginTop: "150px" }}
        maxWidth={"md"}
      >
        <Stack direction={"row"} spacing={2} style={{ marginBottom: 10 }}>
          <AddTodoInput
            todoText={todoText}
            setTodoText={setTodoText}
            handleAddTodo={handleAddTodo}
          />
          <Button variant="outlined" onClick={handleAddTodo}>
            Add
          </Button>
        </Stack>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {todos.length > 0 && (
            <TextField
              size="small"
              label="Search"
              variant="standard"
              value={searchText}
              onChange={handleSearchInput}
            />
          )}
        </div>
        <ListTodo
          fetchTodos={fetchTodos}
          todos={todos}
          setTodos={setTodos}
          setTodoText={setTodoText}
          todoText={todoText}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showAddTodoFailedSnack}
          autoHideDuration={2000}
          onClose={() => {
            setShowAddTodoFailedSnack(false);
          }}
          message="Failed to add new todo"
        />

        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showAddTodoSuccessSnack}
          autoHideDuration={2000}
          onClose={() => {
            setShowAddTodoSuccessSnack(false);
          }}
          message="Added new todo successfully"
        /> */}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={showFetchdTodosFailedSnack}
          autoHideDuration={2000}
          onClose={() => {
            setShowFetchTodosFailedSnack(false);
          }}
          message="Failed to fetch todos"
        />

        {/* <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={showFetchTodosSuccessSnack}
          autoHideDuration={2000}
          onClose={() => {
            setShowFetchTodosSuccessSnack(false);
          }}
          message="Fetched todos successfully"
        /> */}
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          onChange={handlePaginationChange}
          count={pageCount}
          page={page}
        />
      </div>
    </div>
  );
}
