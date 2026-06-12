package com.sejinzx.scheduling.schedule.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ResponseGetSchedulePriority {

    private Long scheduleSeq;

    private String scheduleContent;

    private LocalDate scheduleEndDate;

    private int schedulePriority;

    @Builder
    public ResponseGetSchedulePriority(Long scheduleSeq, String scheduleContent,
                               LocalDate scheduleEndDate, int schedulePriority){
        this.scheduleSeq = scheduleSeq;
        this.scheduleContent = scheduleContent;
        this.scheduleEndDate = scheduleEndDate;
        this.schedulePriority = schedulePriority;
    }
}
