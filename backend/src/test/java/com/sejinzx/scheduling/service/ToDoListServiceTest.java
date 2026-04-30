package com.sejinzx.scheduling.service;

import com.sejinzx.scheduling.dto.RequestAddToDo;
import com.sejinzx.scheduling.dto.RequestUpdateToDo;
import com.sejinzx.scheduling.entity.ToDoListEntity;
import com.sejinzx.scheduling.repository.ToDoListRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@Slf4j
class ToDoListServiceTest {

    ToDoListRepository toDoListRepository = mock(ToDoListRepository.class);
    ToDoListService toDoListService = new ToDoListService(toDoListRepository);

    @BeforeEach
    void testStart() {
        log.info("---------- start ----------");
    }

    @AfterEach
    void testEnd() {
        log.info("----------- end -----------");
    }

    @ParameterizedTest
    @ValueSource(strings = {"공부하기", "운동하기", "책읽기"})
    void createToDo(String content) {

        // given
        RequestAddToDo request = new RequestAddToDo();
        request.setTodoContent(content);

        // when
        ResponseEntity<?> response = toDoListService.createToDo(request);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        Map<String, String> body = (Map<String, String>) response.getBody();
        assertThat(body)
                .containsEntry("message", "투두리스트 생성");
        verify(toDoListRepository, atLeastOnce()).save(any(ToDoListEntity.class));

    }

    @Test
    void updateToDo_content() {

        // given
        Long id = 1L;

        ToDoListEntity entity = ToDoListEntity.builder()
                .todoContent("기존")
                .build();

        when(toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id))
                .thenReturn(Optional.of(entity));

        RequestUpdateToDo request = new RequestUpdateToDo();
        request.setTodoContent("수정된 내용");

        // when
        ResponseEntity<?> response = toDoListService.updateToDo(id, request);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        Map<String, String> body = (Map<String, String>) response.getBody();
        assertThat(body.get("message")).isEqualTo("투두리스트 수정");

        assertThat(entity.getTodoContent()).isEqualTo("수정된 내용");

        verify(toDoListRepository).save(entity);
    }

    @Test
    void updateToDo_ended() {

        // given
        Long id = 1L;

        ToDoListEntity entity = ToDoListEntity.builder()
                .todoContent("기존")
                .build();

        when(toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id))
                .thenReturn(Optional.of(entity));

        RequestUpdateToDo request = new RequestUpdateToDo();
        request.setTodoEnded(true);

        // when
        ResponseEntity<?> response = toDoListService.updateToDo(id, request);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(entity.getTodoEnded()).isTrue();

        verify(toDoListRepository).save(entity);
    }

    @Test
    void updateToDo_NoData() {

        // given
        Long id = 1L;

        when(toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id))
                .thenReturn(Optional.empty());

        RequestUpdateToDo request = new RequestUpdateToDo();

        // when & then
        assertThatThrownBy(() -> toDoListService.updateToDo(id, request))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("데이터 없음");
    }

    @Test
    void deleteToDo() {

        // given
        Long id = 1L;

        ToDoListEntity entity = ToDoListEntity.builder()
                .build();

        when(toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id))
                .thenReturn(Optional.of(entity));

        // when
        ResponseEntity<?> response = toDoListService.deleteToDo(id);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        Map<String, String> body = (Map<String, String>) response.getBody();
        assertThat(body.get("message")).isEqualTo("투두리스트 삭제");

        assertThat(entity.getTodoDeleted()).isTrue();

        verify(toDoListRepository).save(entity);
    }

    @Test
    void deleteToDo_NoData() {

        // given
        Long id = 1L;

        when(toDoListRepository.findByTodoSeqAndTodoDeletedFalse(id))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> toDoListService.deleteToDo(id))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("데이터 없음");
    }

}