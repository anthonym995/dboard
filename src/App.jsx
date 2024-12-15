// App.js
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
