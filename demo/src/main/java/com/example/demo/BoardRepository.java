package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

// 1. JpaRepository를 상속받습니다.
// 2. <관리할 Entity, Entity의 ID 필드 타입>을 지정합니다.
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 이것으로 끝입니다!
    // JpaRepository가 
    // - save()      (INSERT, UPDATE)
    // - findById()  (SELECT 1개)
    // - findAll()   (SELECT 모두)
    // - deleteById() (DELETE)
    // ... 등을 자동으로 만들어 줍니다.
}