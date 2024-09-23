import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoList from './pages/TodoList';
;
function App() {
    return (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<TodoList />} />
              {/* <Route path="/TodoList" element={<TodoList />} /> */}
            </Routes>
          </div>
        </Router>
    );
}

export default App;
