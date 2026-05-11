package com.sejinzx.scheduling.todo.controller;

import com.sejinzx.scheduling.todo.dto.RequestAddToDo;
import com.sejinzx.scheduling.todo.dto.RequestUpdateToDo;
import com.sejinzx.scheduling.todo.service.ToDoListService;
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
    @PostMapping("/new")
    public ResponseEntity<?> addToDo(@RequestBody RequestAddToDo requestAddToDo) {
        return toDoListService.createToDo(requestAddToDo);
    }

    @Tag(name = "ToDoList 수정")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateToDo(@PathVariable Long id, @RequestBody RequestUpdateToDo requestUpdateToDo) {
        return toDoListService.updateToDo(id, requestUpdateToDo);
    }

    @Tag(name = "ToDoList 삭제")
    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id) {
        return toDoListService.deleteToDo(id);
    }

    @Tag(name = "ToDoList 조회")
    @GetMapping
    public ResponseEntity<?> getTodos(@RequestParam String date) {
        return toDoListService.getToDo(date);
    }

}
