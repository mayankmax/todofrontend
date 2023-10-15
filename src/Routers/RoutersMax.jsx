import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import YoutubePage from "../pages/YoutubePage";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/youtube",
    element: <YoutubePage />,
  },
  // {
  //   path: "/pomodoro",
  //   element: <Pomodoro />,
  // },
];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
