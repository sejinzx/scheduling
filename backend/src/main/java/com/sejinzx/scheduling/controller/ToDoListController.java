package com.sejinzx.scheduling.controller;

import com.sejinzx.scheduling.dto.RequestAddToDo;
import com.sejinzx.scheduling.dto.RequestUpdateToDo;
import com.sejinzx.scheduling.service.ToDoListService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todolist")
@RequiredArgsConstructor
public class ToDoListController {

    private final ToDoListService toDoListService;

    @Tag(name = "ToDoList 생성")
    @PostMapping(value = "/new")
    public ResponseEntity<?> addToDo(RequestAddToDo requestAddToDo) {
        return toDoListService.createToDo(requestAddToDo);
    }

    @Tag(name = "ToDoList 수정")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateToDo(@PathVariable Long id, RequestUpdateToDo requestUpdateToDo) {
        return toDoListService.updateToDo(id, requestUpdateToDo);
    }

    @Tag(name = "ToDoList 삭제")
    @PutMapping("/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id) {
        return toDoListService.deleteToDo(id);
    }

}
