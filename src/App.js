import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Home from './Home';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardWrite from './BoardWrite';

function App() {
  return (
    <div>
      {/* 공통 헤더나 메뉴바는 <Routes> 바깥에 두면 
        페이지가 바뀌어도 계속 유지됩니다. 
      */}
      <h1>React 프로젝트</h1>
      <hr /> {/* 구분선 */}

      {/* <Routes> 영역: 
        URL 경로에 따라 이 안의 컴포넌트만 교체됩니다. 
      */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/list" element={<BoardList />} />

        <Route path="/detail/:boardId" element={<BoardDetail />} />
        <Route path="/write" element={<BoardWrite />} />

      </Routes>

    </div>
  );
}

export default App;