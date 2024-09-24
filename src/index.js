import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render 역할은 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 것을 의미.
// id가 root인 DOM을 선택하고 있는데, 이 DOM 은 -> public/index.html 내부 <div id="root"></div> 에 있음.
// 결국, 리액트 컴포넌트가 렌더링 될 때에는 렌더링된 결과물이 위 div 내부에 렌더링된다는 것.


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
