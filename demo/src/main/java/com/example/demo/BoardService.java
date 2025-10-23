package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service // 이 클래스가 '서비스' 계층임을 선언
public class BoardService {

	// JpaRespository 주입
	private final BoardRepository boardRepository;
	
	public BoardService(BoardRepository boardRepository) {
		this.boardRepository = boardRepository;
	}
	
	// 애플리케이션 시작 시 가짜 데이터 생성
	// Map에 넣던 로직을 DB에 저장하도록 변경
	@PostConstruct
	public void initData() {
		boardRepository.save(new Board(0L, "Spring Boot 서버 (DB)", "React와 연동 중입니다. (DB)"));
        boardRepository.save(new Board(0L, "JPA 사용", "H2 데이터베이스에 저장 중"));
        boardRepository.save(new Board(0L, "CORS 에러", "@CrossOrigin으로 해결"));
        // id에 0L을 넣어도 @GeneratedValue가 알아서 1, 2, 3으로 생성
	}
	
	// 전체 목록 조회
	public List<Board> getAllBoards() {
		return boardRepository.findAll();
	}
	
	// 상세 조회
	public Board getBoardById(Long id) {
		// findById는 Optional<Board>를 반환.
		// .orElse(null)은 ID가 없으면 null을 반환하라는 뜻.
		return boardRepository.findById(id).orElse(null);
	}
	
	/*
	 * 새 게시글 생성
	 * @param newBoard React에서 받은 title, content가 담긴 객체
	 * @return DB에 저장된 Board 객체(새로운 id가 포함됨)
	 */
	public Board createBoard(Board newBoard) {
		// React에서 받은 newBoard에는 id가 0L 또는 null입니다.
        // JpaRepository의 save()는
        // 1. id가 0/null이면:  새로 생성 (INSERT)
        // 2. id가 있으면:     수정 (UPDATE)
        // ...을 알아서 처리해 줍니다.
		return boardRepository.save(newBoard);
	}
}
