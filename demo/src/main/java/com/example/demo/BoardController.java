package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // URL 공통 prefix
public class BoardController {
	
	// BoardService 주입
	private final BoardService boardService;
	
	public BoardController(BoardService boardService) {
		this.boardService = boardService;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/board") // GET /api/board
    public List<Board> getBoardList() {
        return boardService.getAllBoards();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/board/{id}") // "/api/board/" 뒤에 {id}라는 "빈칸"이 있는 주소를 처리하겠다고 선언
    public Board getBoardDetail(@PathVariable("id") Long id) {
        return boardService.getBoardById(id);
    }
	
	/*
	 * 새 게시글 생성 API (POST /api/board) 
	 * @RequestBody : React가 보낸 JSON 데이터를 Board 객체로 자동 변환
	 * 
	 */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/board")
    public Board createBoard(@RequestBody Board newBoard) {
    	// Service에 위임하여 DB에 저장하고,
    	// 저장된 객체를 다시 React에 반환
    	return boardService.createBoard(newBoard);
    }
}
