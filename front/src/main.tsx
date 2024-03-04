import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MainPage } from "./components/MainPage.tsx";
import { SeasonPage } from "./components/SeasonPage.tsx";
import { SeedlingTracker } from "./components/seedlingTracker/SeedlingTracker.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/season/:id",
    element: <SeasonPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/seedling-tracker",
    element: <SeedlingTracker />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
