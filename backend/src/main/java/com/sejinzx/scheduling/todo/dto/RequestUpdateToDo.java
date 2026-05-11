package com.sejinzx.scheduling.todo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class RequestUpdateToDo {

    private String todoContent;

    private Boolean todoEnded;

}
