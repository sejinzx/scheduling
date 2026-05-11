package com.sejinzx.scheduling.schedule.service;

import com.sejinzx.scheduling.schedule.dto.RequestAddSchedule;
import com.sejinzx.scheduling.schedule.dto.RequestUpdateSchedule;
import com.sejinzx.scheduling.schedule.dto.ResponseGetSchedule;
import com.sejinzx.scheduling.schedule.entity.ScheduleEntity;
import com.sejinzx.scheduling.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ResponseEntity<?> createSchedule(RequestAddSchedule requestAddSchedule) {

        ScheduleEntity scheduleEntity = ScheduleEntity.builder()
                .scheduleContent(requestAddSchedule.getScheduleContent())
                .scheduleDate(requestAddSchedule.getScheduleDate())
                .scheduleEndDate(requestAddSchedule.getScheduleEndDate())
                .build();

        ScheduleEntity saved = scheduleRepository.save(scheduleEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);

    }

    public ResponseEntity<?> updateSchedule(Long id, RequestUpdateSchedule requestUpdateSchedule) {

        ScheduleEntity scheduleEntity = scheduleRepository.findByScheduleSeqAndScheduleDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        if(requestUpdateSchedule.getScheduleContent() != null){
            scheduleEntity.setScheduleContent(requestUpdateSchedule.getScheduleContent());
        }

        if(requestUpdateSchedule.getScheduleDate() != null){
            scheduleEntity.setScheduleDate(requestUpdateSchedule.getScheduleDate());
            if(scheduleEntity.getScheduleEndDate() != null)
                scheduleEntity.setScheduleEndDate(null);
        }

        if(requestUpdateSchedule.getScheduleEndDate() != null){
            scheduleEntity.setScheduleEndDate(requestUpdateSchedule.getScheduleEndDate());
            if(scheduleEntity.getScheduleDate() != null)
                scheduleEntity.setScheduleDate(null);
        }

        ScheduleEntity saved = scheduleRepository.save(scheduleEntity);

        return ResponseEntity.status(HttpStatus.OK).body(saved);

    }

    public ResponseEntity<?> deleteSchedule(Long id) {

        ScheduleEntity scheduleEntity = scheduleRepository.findByScheduleSeqAndScheduleDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("데이터 없음"));

        scheduleEntity.setScheduleDeleted(true);
        scheduleRepository.save(scheduleEntity);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "스케쥴 삭제"));

    }

    public ResponseEntity<?> getSchedule(int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);

        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<ScheduleEntity> scheduleListEntity = scheduleRepository.findMonthSchedules(startDate, endDate);

        List<ResponseGetSchedule> responseList =
                scheduleListEntity.stream()
                        .map(entity -> ResponseGetSchedule.builder()
                                .scheduleSeq(entity.getScheduleSeq())
                                .scheduleContent(entity.getScheduleContent())
                                .scheduleDate(entity.getScheduleDate())
                                .scheduleEndDate(entity.getScheduleEndDate())
                                .schedulePriority(
                                        getPriority(
                                                entity.getScheduleEndDate()
                                        )
                                )
                                .build())
                        .toList();

        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }

    // 우선순위 계산
    public int getPriority(LocalDate eDate){

        if(eDate == null){
            return -1;
        }

        LocalDate today = LocalDate.now();

        long days = ChronoUnit.DAYS.between(today, eDate);

        if (days < 0) {
            return -1;
        }
        else if (days <= 1) {
            return 1;
        }
        else if (days <= 4) {
            return 2;
        }
        else {
            return 3;
        }

    }

}
