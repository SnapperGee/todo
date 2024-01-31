import App from "./app";
import Error from "./page/error";
import Login from "./page/login";
import Task from "./page/task";
import Signup from "./page/signup";
import Tasks from "./page/tasks";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "task/:id",
          element: <Task />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "*",
          element: <Error />,
        }
      ]
    }
]);

export default router;
