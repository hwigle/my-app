import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 

import Home from './Home';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardWrite from './BoardWrite';
import BoardUpdate from './BoardUpdate';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div>
      {/* --- 👇 [공통 내비게이션 영역] --- */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>홈</Link>
        <Link to="/list" style={{ marginRight: '10px' }}>게시판</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>회원가입</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>로그인</Link>
      </nav>
      {/* ---------------------------------- */}
      <hr /> {/* 구분선 */}

      {/* <Routes> 영역: 
        URL 경로에 따라 이 안의 컴포넌트만 교체됩니다. 
      */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/list" element={<BoardList />} />

        <Route path="/detail/:boardId" element={<BoardDetail />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/update/:boardId" element={<BoardUpdate />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </div>
  );
}

export default App;