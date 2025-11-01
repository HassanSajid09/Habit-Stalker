import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./components/Home.tsx";
import Signup from "./components/Auth/Signup.tsx";
import Signin from "./components/Auth/Signin.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Profile from "./components/Profile/Profile.tsx";
import { Toaster } from "react-hot-toast";
import PrvRoute from "./Routes/PrvRoute.tsx";
import PubRoute from "./Routes/PubRoute.tsx";
import ManageHabits from "./components/Habits/ManageHabits.tsx";
import HabitForm from "./components/Habits/HabitForm.tsx";
import HabitContent from "./components/Habits/HabitContent.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} replace />,
  },
  {
    element: <PrvRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/habits",
        element: <ManageHabits />,
      },
      {
        path: "/create-habit",
        element: <HabitForm />,
      },
      {
        path: "/habit/:id",
        element: <HabitContent />,
      },
      {
        path: "/habit/edit/:id",
        element: <HabitForm />,
      },
    ],
  },
  {
    element: <PubRoute />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    <Toaster />
  </QueryClientProvider>
);
