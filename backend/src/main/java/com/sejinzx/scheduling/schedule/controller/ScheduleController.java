package com.sejinzx.scheduling.schedule.controller;

import com.sejinzx.scheduling.schedule.dto.RequestAddSchedule;
import com.sejinzx.scheduling.schedule.dto.RequestUpdateSchedule;
import com.sejinzx.scheduling.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Tag(name = "Schedule 조회")
    @GetMapping
    public ResponseEntity<?> getSchedule(@RequestParam int year,
                                         @RequestParam int month) {
        return scheduleService.getSchedule(year, month);
    }

}
