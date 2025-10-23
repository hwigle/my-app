import React, { useState, useEffect } from 'react';
// 1. useParams 훅과 Link를 import 합니다.
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios'; // 2. axios를 import 합니다.

function BoardDetail() {
  // 3. URL의 :boardId 값을 가져옵니다.
  const { boardId } = useParams(); 

  const [post, setPost] = useState(null); // 게시글 1개 (객체)
  const [loading, setLoading] = useState(true);

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
      {/* Spring Boot에서 받은 실제 데이터 */}
      <h2>{post.title}</h2>
      <p>게시글 ID: {post.id}</p>
      <hr />
      <p>{post.content}</p>
      <br />
      <Link to="/list">목록으로 돌아가기</Link>
    </div>
  );
}

export default BoardDetail;