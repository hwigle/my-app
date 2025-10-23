package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// --- JPA를 위한 어노테이션 ---
@Entity // 이 클래스가 DB 테이블과 매핑되는 'Entity'임을 선언
// -------------------------

@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode 등을 합친 것
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 받는 생성자
public class Board {
	
	@Id // 이 필드가 테이블의 'Primary Key(기본키)'임을 선언
	@GeneratedValue(strategy = GenerationType.IDENTITY) // ID 자동 증가
	private long id;
	private String title;
	private String content;

}
