package com.sejinzx.scheduling.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class ResponseGetSchedule {

    private Long scheduleSeq;

    private String scheduleContent;

    private LocalDate scheduleDate;

    private LocalDate scheduleEndDate;

    private int schedulePriority;

    @Builder
    public ResponseGetSchedule(Long scheduleSeq, String scheduleContent, LocalDate scheduleDate,
                               LocalDate scheduleEndDate, int schedulePriority){
        this.scheduleSeq = scheduleSeq;
        this.scheduleContent = scheduleContent;
        this.scheduleDate = scheduleDate;
        this.scheduleEndDate = scheduleEndDate;
        this.schedulePriority = schedulePriority;
    }

}
