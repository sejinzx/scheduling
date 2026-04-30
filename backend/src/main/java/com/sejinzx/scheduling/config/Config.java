package com.sejinzx.scheduling.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI().info(info);
    }

    Info info = new Info().title("ToDoList");

}
