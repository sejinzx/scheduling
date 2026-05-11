package com.sejinzx.scheduling.schedule.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@NoArgsConstructor
@Data
public class RequestUpdateSchedule {

    private String scheduleContent;

    private LocalDate scheduleDate;

    private LocalDate scheduleEndDate;

}
