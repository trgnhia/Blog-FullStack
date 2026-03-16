@echo off
echo Starting Spring Boot backend with limited RAM...

REM Giới hạn RAM: min 256MB, max 512MB
java -Xms256m -Xmx512m -jar target\blogs_management-0.0.1-SNAPSHOT.jar

pause
