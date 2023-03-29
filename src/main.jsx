// Utilities import
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import NetworkDetector from "./components/NetworkDetector";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Dashboard from "./pages/Dashboard";
import { ProjectsContextProvider } from "./components/ProjectsContext";
import Protected from "./components/Protected";
import Login from "./pages/Login";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import { CreateProjectProvider } from "./components/CreateProjectContext";
import ProjectCreate from "./pages/ProjectCreate";
import CreateFormStep1 from "./components/CreateFormStep1";
import CreateFormStep2 from "./components/CreateFormStep2";
import CreateFormStep3 from "./components/CreateFormStep3";
import ProjectDetails from "./pages/ProjectDetails";
import ErrorPage from "./pages/ErrorPage";

// -----------------------------------------------------------------------------------------------------

// Define routes for our app
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NetworkDetector>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </NetworkDetector>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProjectsContextProvider>
            <Dashboard />
          </ProjectsContextProvider>
        ),
      },
      {
        path: "Team",
        element: <Team />,
      },
      {
        path: "Projects",
        element: (
          <ProjectsContextProvider>
            <Projects />
          </ProjectsContextProvider>
        ),
        children: [
          {
            path: "/Projects/new",
            element: (
              <CreateProjectProvider>
                <ProjectCreate />
              </CreateProjectProvider>
            ),
            children: [
              {
                path: "1",
                element: <CreateFormStep1 />,
              },
              {
                path: "2",
                element: <CreateFormStep2 />,
              },
              {
                path: "3",
                element: <CreateFormStep3 />,
              },
            ],
          },
        ],
      },
      {
        path: "/Project/:projectId",
        element: (
          <ProjectsContextProvider>
            <ProjectDetails />
          </ProjectsContextProvider>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Protected target="Login">
        <NetworkDetector>
          <Login />
        </NetworkDetector>
      </Protected>
    ),
    errorElement: <ErrorPage />,
  },
]);

// Render our app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
