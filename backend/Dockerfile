FROM gradle:8.5-jdk17 AS builder

WORKDIR /app

COPY . .

RUN gradle build -x test

FROM openjdk:17

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]