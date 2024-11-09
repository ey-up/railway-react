import { HTTP_STATUS } from "../constant/HTTP_STATUS";
import GetAllTodosResponse from "../models/response/GetAllTodosResponse";
import Response from "../models/response/Response";
import { getToken, removeToken, isTokenExpired } from "./StorageService";
import { api } from "./TodoClient";

export const addTodo = async (request) => {
  try {
    const token = getToken();
    const response = await api.post("/todos", request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Added Todo Successfully");
    response.data.success = true;
    return new Response(response);
  } catch (error) {
    if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
      window.location.reload();
    }
    console.log("Failed Todo Addition");
    return new Response(error?.response);
  }
};

export const deleteById = async (todoId) => {
  try {
    const token = getToken();
    const response = await api.delete(`/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Delete Todo Successfully");
    response.data = { success: true };
    return new Response(response);
  } catch (error) {
    console.log("Failed Todo Deletion");
    if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
      window.location.reload();
    }
    // error.response.data = { success: false };
    return new Response(error?.response);
  }
};

export const updateById = async (request, todoId) => {
  try {
    const token = getToken();
    const response = await api.put(`/todos/${todoId}`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Update Todo Successfully");
    response.data.success = true;
    return new Response(response);
  } catch (error) {
    console.log("Failed Todo Updation");
    if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
      window.location.reload();
    }
    // error.response.data = { success: false };
    return new Response(error?.response);
  }
};

export const getByPage = async (page) => {
  try {
    const token = getToken();
    const response = await api.get(`/todos/search?page=${page}&size=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.data.success = true;
    const getAllTodos = new GetAllTodosResponse(response);
    return getAllTodos;
  } catch (error) {
    console.log("Failed Get by Page Todos");
    if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
      window.location.reload();
    }
    return new GetAllTodosResponse(error?.response);
  }
};

export const getByPageAndSearch = async (page, search) => {
  try {
    const token = getToken();
    console.log("request start with search : ", search, " page: ", page);
    const response = await api.get(
      `/todos/search/${search}?page=${page}&size=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response.data.success = true;
    const getAllTodos = new GetAllTodosResponse(response);
    return getAllTodos;
  } catch (error) {
    console.log("Failed Get by Page and Search Todos");
    if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
      window.location.reload();
    }
    return new GetAllTodosResponse(error?.response);
  }
};

// export const getAllTodos = async () => {
//   try {
//     const token = getToken();
//     const response = await api.get("/todos", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     response.data.success = true;
//     const getAllTodos = new GetAllTodosResponse(response);
//     console.log("Get All Todos Successfully");
//     return getAllTodos;
//   } catch (error) {
//     console.log("Failed Get All Todos");
//     if (error.response && error.response.status == HTTP_STATUS.FORBIDDEN) {
//       // removeToken()
//         // window.location.reload()
//     }
//     // error.response.data = { success: false };
//     return new GetAllTodosResponse(error?.response);
//   }
// };
