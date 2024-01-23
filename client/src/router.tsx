import App from "./app";
import Error from "./page/error";
import Login from "./page/login";
import TaskEditor from "./page/task-editor";
import SubtaskEditor from "./page/subtask-editor";
import Signup from "./page/signup";
import TasksViewer from "./page/tasks-viewer";
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
          path: "taskeditor",
          element: <TaskEditor />,
        },
        {
          path: "subtaskeditor",
          element: <SubtaskEditor />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "tasksviewer",
          element: <TasksViewer />,
        },
        {
          path: "*",
          element: <Error />,
        }
      ]
    }
]);

export default router;
