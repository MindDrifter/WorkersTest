import { createBrowserRouter } from "react-router-dom";
import Worker from "../pages/worker";
import Main from "../pages/main";
import AddWorker from "../pages/addworker";
import { NotFound } from "../pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/:id",
    element: <Worker />,
  },
  {
    path:'/addworker',
    element: <AddWorker/>
  },
  {
    path:'*',
    element: <NotFound/>
  }

]);