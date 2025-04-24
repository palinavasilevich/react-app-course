import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>HOME PAGE</div>} />
          <Route path="/forbidden" element={<div>FORBIDDEN PAGE</div>} />
          <Route path="/addquestion" element={<div>ADD QUESTION PAGE</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
