package com.sejinzx.scheduling.repository;

import com.sejinzx.scheduling.entity.ToDoListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ToDoListRepository extends JpaRepository<ToDoListEntity, Long> {
    Optional<ToDoListEntity> findByTodoSeqAndTodoDeletedFalse(long todoSeq);
}
