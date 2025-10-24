import React, { useState, useEffect } from 'react';
// 1. useParams 훅과 Link를 import 합니다.
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // 2. axios를 import 합니다.

function BoardDetail() {
  // 3. URL의 :boardId 값을 가져옵니다.
  const { boardId } = useParams(); 
  const [post, setPost] = useState(null); // 게시글 1개 (객체)
  const [loading, setLoading] = useState(true);

  // 2. useNavigate 훅 실행
  const navigate = useNavigate();

  useEffect(() => {
    // 4. API를 호출하는 async 함수를 만듭니다.
    const fetchPost = async () => {
      setLoading(true);
      try {
        // 5. URL에서 받은 boardId를 사용해 Spring Boot API를 호출합니다.
        const response = await axios.get(`http://localhost:8080/api/board/${boardId}`);
        setPost(response.data); // 6. 받아온 데이터를 state에 저장
      } catch (e) {
        console.error("상세 데이터 로딩 실패: ", e);
        setPost(null); // 7. 에러 발생 시 post 데이터를 비웁니다.
      }
      setLoading(false);
    };

    fetchPost(); // 8. 함수 실행

  // 9. boardId가 변경될 때마다 이 훅을 다시 실행합니다.
  }, [boardId]); 

// --- 👇 [삭제(Delete) 로직 추가] ---
const handleDelete = async () => {
  // 3. 사용자에게 정말 삭제할 것인지 확인
  if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
    try {
      // 4. Spring Boot에 DELETE API 호출
      await axios.delete(`http://localhost:8080/api/board/${boardId}`);
      
      alert("게시글이 성공적으로 삭제되었습니다.");
      
      // 5. 삭제 성공 후, 목록 페이지(/list)로 강제 이동
      navigate("/list"); 
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  }
};
// --- [삭제 로직 끝] ---

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 10. API 호출에 실패했거나 데이터가 없을 때
  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  // 11. state에 저장된 post의 내용을 렌더링
  return (
    <div>
      <h2>{post.title}</h2>
      <p>게시글 ID: {post.id}</p>
      <hr />
      <p>{post.content}</p>
      <br />
      
      {/* 6. 버튼(링크) 영역 */}
      <Link to="/list">
        <button>목록</button>
      </Link>
      
      {/* 7. [수정 버튼] - /update/id 경로로 이동하는 링크 */}
      <Link to={`/update/${boardId}`}>
        <button>수정</button>
      </Link>

      {/* 8. [삭제 버튼] - 클릭 시 handleDelete 함수 실행 */}
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default BoardDetail;