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

import java.time.LocalDate;
import java.util.List;
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
        ToDoListEntity saved = toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);

    }

    public ResponseEntity<?> updateToDo(Long id, RequestUpdateToDo requestUpdateToDo) {

        ToDoListEntity toDoListEntity = toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        if(requestUpdateToDo.getTodoContent() != null){
            toDoListEntity.setTodoContent(requestUpdateToDo.getTodoContent());
        }
        if(requestUpdateToDo.getTodoEnded() != null){
            toDoListEntity.setTodoEnded(requestUpdateToDo.getTodoEnded());
        }
        ToDoListEntity saved = toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.OK).body(saved);

    }

    public ResponseEntity<?> deleteToDo(Long id) {

        ToDoListEntity toDoListEntity = toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        toDoListEntity.setTodoDeleted(true);
        toDoListRepository.save(toDoListEntity);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "투두리스트 삭제"));

    }

    public ResponseEntity<?> getToDo(String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        List<ToDoListEntity> toDoListEntity = toDoListRepository.findByTodoUpdateDateAndTodoDeletedFalse(parsedDate);

        return ResponseEntity.status(HttpStatus.OK).body(toDoListEntity);
    }

}
