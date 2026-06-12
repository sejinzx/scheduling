package com.sejinzx.scheduling.todo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Data
public class RequestAddToDo {

    @NonNull
    private String todoContent;

    private Long scheduleSeq;

}
