import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Trend from "./pages/Trend";
import RepositoryList from "./pages/RepositoryList";
import Repository from "./pages/Repository";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />

        <Route path="/" element={<Trend />} />

        <Route path="users">
          <Route exact path=":username">
            <Route path="*" element={<App />} />
            <Route exact path="repos">
              <Route exact index element={<RepositoryList />} />
              <Route exact path=":repo" element={<Repository />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
