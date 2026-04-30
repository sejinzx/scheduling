package com.sejinzx.scheduling.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "todoList")
public class ToDoListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_seq", nullable = false)
    private Long todoSeq;

    @Column(name = "todo_content", nullable = false)
    private String todoContent;

    @Column(name = "todo_create_date", nullable = false)
    @CreatedDate
    private Date todoCreateDate;

    @Column(name = "todo_update_date", nullable = false)
    @LastModifiedDate
    private Date todoUpdateDate;

    @Column(name = "todo_deleted", nullable = false)
    private Boolean todoDeleted = false;

    @Column(name = "todo_ended", nullable = false)
    private Boolean todoEnded = false;

    @Builder
    public ToDoListEntity(String todoContent){
        this.todoContent = todoContent;
    }

    public void setTodoContent(String todoContent) { this.todoContent = todoContent; }

    public void setTodoEnded(boolean todoEnded) { this.todoEnded = todoEnded; }

    public void setTodoDeleted(boolean todoDeleted) { this.todoDeleted = todoDeleted; }

}
