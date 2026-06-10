package com.sejinzx.scheduling.schedule.repository;

import com.sejinzx.scheduling.schedule.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

    Optional<ScheduleEntity> findByScheduleSeqAndScheduleDeletedFalse(long scheduleSeq);

    @Query("""
        SELECT s
        FROM ScheduleEntity s
        WHERE
        (
            s.scheduleDate BETWEEN :startDate AND :endDate
            OR
            s.scheduleEndDate BETWEEN :startDate AND :endDate
        )
        AND s.scheduleDeleted = false
    """)
    List<ScheduleEntity> findMonthSchedules(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    List<ScheduleEntity> findByScheduleDateAndScheduleDeletedFalse(LocalDate scheduleDate);

}
