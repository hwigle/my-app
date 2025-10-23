import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 1. axios를 import 합니다.

function BoardList() {
  const [list, setList] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 👇 이 useEffect 부분이 바뀝니다.
  useEffect(() => {
    // 2. 실제 API를 호출하는 async 함수를 만듭니다.
    const fetchData = async () => {
      setLoading(true); // (선택) 데이터 요청 시작 시 로딩 상태로 설정
      try {
        // 3. Spring Boot 서버의 API를 호출합니다.
        const response = await axios.get('http://localhost:8080/api/board');
        // 4. 성공하면 받아온 데이터(response.data)를 state에 저장합니다.
        setList(response.data); 
      } catch (e) {
        console.error("목록 데이터 로딩 실패: ", e);
      }
      // 5. 성공하든 실패하든 로딩 상태를 false로 변경합니다.
      setLoading(false); 
    };

    fetchData(); // 6. 위에서 만든 함수를 실행합니다.

  }, []); // [] (빈 배열)은 그대로 둡니다. (처음 한 번만 실행)

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>📋 게시판 목록 (From Spring Boot)</h2> {/* 제목 수정 */}
      <Link to="/write">
        <button>새 글 작성하기</button>
      </Link>
      <hr />
      {/* --------------------- */}
      <ul>
        {list.map(item => ( 
          <li key={item.id}>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">메인으로 돌아가기</Link>
    </div>
  );
}

export default BoardList;