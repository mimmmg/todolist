import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoList from './components/TodoList';  // components 디렉토리 안에 있는 TodoList.js 불러오기
;
function App() {
    return (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<TodoList />} />  {/* jsx 에서는 <TodoList />처럼 self-closing 태그 가능 */}
              {/* <Route path="/TodoList" element={<TodoList />} /> */}
            </Routes>
          </div>
        </Router>
    );
}

export default App;


