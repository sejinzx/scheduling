package com.sejinzx.scheduling.schedule.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import java.time.LocalDate;

@NoArgsConstructor
@Data
public class RequestAddSchedule {

    @NonNull
    private String scheduleContent;

    private LocalDate scheduleDate;

    private LocalDate scheduleEndDate;

}
