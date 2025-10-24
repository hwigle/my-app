import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  // input 값 변경 핸들러 (Register와 100% 동일)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // '로그인' 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!form.username || !form.password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 1. [중요] Spring Boot의 /api/auth/login API 호출
      const response = await axios.post('http://localhost:8080/api/auth/login', form);
      
      // [다음 단계 예고]
      // 지금은 백엔드가 "로그인 성공! (임시 응답)" 문자열만 반환합니다.
      // 이 'response.data'에 JWT 토큰이 담겨오도록 백엔드를 수정하고,
      // 이 토큰을 브라우저에 저장(localStorage)하는 로직이 여기에 들어가야 합니다.
      
      alert(response.data); // (임시) "로그인 성공!..." 알림창 띄우기
      
      // 2. 로그인 성공 시, 메인 페이지(/)로 이동
      navigate('/'); 

    } catch (error) {
      // 3. 에러 처리 (예: 아이디 없음, 비밀번호 틀림)
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <h2>🔑 로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>사용자 아이디: </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;