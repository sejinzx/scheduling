package com.sejinzx.scheduling.service;

import com.sejinzx.scheduling.dto.RequestAddToDo;
import com.sejinzx.scheduling.dto.RequestUpdateToDo;
import com.sejinzx.scheduling.entity.ToDoListEntity;
import com.sejinzx.scheduling.repository.ToDoListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ToDoListService {

    private final ToDoListRepository toDoListRepository;

    public ResponseEntity<?> createToDo(RequestAddToDo requestAddToDo) {

        ToDoListEntity toDoListEntity = ToDoListEntity.builder()
                .todoContent(requestAddToDo.getTodoContent())
                .build();
        toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "투두리스트 생성"));

    }

    public ResponseEntity<?> updateToDo(Long id, RequestUpdateToDo requestUpdateToDo) {

        ToDoListEntity toDoListEntity = toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        if(requestUpdateToDo.getTodoContent() != null){
            toDoListEntity.setTodoContent(requestUpdateToDo.getTodoContent());
        } else if(requestUpdateToDo.getTodoEnded() != null){
            toDoListEntity.setTodoEnded(requestUpdateToDo.getTodoEnded());
        }

        toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "투두리스트 수정"));

    }

    public ResponseEntity<?> deleteToDo(Long id) {

        ToDoListEntity toDoListEntity = toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        toDoListEntity.setTodoDeleted(true);
        toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "투두리스트 삭제"));

    }

}
