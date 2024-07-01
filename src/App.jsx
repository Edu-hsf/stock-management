import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthUserProvider } from "./Context/AuthUserContext";

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
