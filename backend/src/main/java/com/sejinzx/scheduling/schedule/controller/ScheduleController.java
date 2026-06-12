package com.sejinzx.scheduling.schedule.controller;

import com.sejinzx.scheduling.schedule.dto.RequestAddSchedule;
import com.sejinzx.scheduling.schedule.dto.RequestUpdateSchedule;
import com.sejinzx.scheduling.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Tag(name = "Schedule 생성")
    @PostMapping("/new")
    public ResponseEntity<?> addSchedule(@RequestBody RequestAddSchedule requestAddSchedule) {
        return scheduleService.createSchedule(requestAddSchedule);
    }

    @Tag(name = "Schedule 수정")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody RequestUpdateSchedule requestUpdateSchedule) {
        return scheduleService.updateSchedule(id, requestUpdateSchedule);
    }

    @Tag(name = "Schedule 삭제")
    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        return scheduleService.deleteSchedule(id);
    }

    @Tag(name = "월별 Schedule 조회")
    @GetMapping("/month")
    public ResponseEntity<?> getMonthSchedules(
            @RequestParam int year,
            @RequestParam int month) {
        return scheduleService.getMonthSchedules(year, month);
    }

    @Tag(name = "일자별 Schedule 조회")
    @GetMapping("/date")
    public ResponseEntity<?> getDateSchedules(
            @RequestParam LocalDate date) {
        return scheduleService.getSchedules(date);
    }

    @Tag(name = "개별 Schedule 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getSchedule(
            @PathVariable Long id) {
        return scheduleService.getSchedule(id);
    }

    @Tag(name = "우선순위 포함 Schedule 조회")
    @GetMapping("/priority")
    public ResponseEntity<?> getPrioritySchedules(
            @RequestParam LocalDate date) {
        return scheduleService.getPrioritySchedules(date);
    }

}
