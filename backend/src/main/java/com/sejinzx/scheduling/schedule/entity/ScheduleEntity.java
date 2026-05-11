package com.sejinzx.scheduling.schedule.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "schedule")
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_seq", nullable = false)
    private Long scheduleSeq;

    @Column(name = "schedule_content", nullable = false)
    private String scheduleContent;

    @Column(name = "schedule_date")
    private LocalDate scheduleDate;

    @Column(name = "schedule_end_date")
    private LocalDate scheduleEndDate;

    @Column(name = "schedule_create_date", nullable = false)
    @CreatedDate
    private LocalDate scheduleCreateDate;

    @Column(name = "schedule_update_date", nullable = false)
    @LastModifiedDate
    private LocalDate scheduleUpdateDate;

    @Column(name = "schedule_deleted", nullable = false)
    private Boolean scheduleDeleted = false;

    @Builder
    public ScheduleEntity(String scheduleContent,LocalDate scheduleDate, LocalDate scheduleEndDate){
        this.scheduleContent = scheduleContent;
        this.scheduleDate = scheduleDate;
        this.scheduleEndDate = scheduleEndDate;
    }

    public void setScheduleContent(String scheduleContent) {
        this.scheduleContent = scheduleContent;
    }

    public void setScheduleDate(LocalDate scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public void setScheduleEndDate(LocalDate scheduleEndDate) {
        this.scheduleEndDate = scheduleEndDate;
    }

    public void setScheduleDeleted(Boolean scheduleDeleted) {
        this.scheduleDeleted = scheduleDeleted;
    }

}
