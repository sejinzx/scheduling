package com.sejinzx.scheduling.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Data
public class RequestAddToDo {

    @NonNull
    private String todoContent;

}
