#!/bin/bash

# Start Spring Boot backend
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait for backend port
for i in $(seq 1 60); do
  if curl -sf http://localhost:8086/api/accounts >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Start frontend (exposed preview port)
cd frontend && npm run dev

trap "kill $BACKEND_PID" EXIT
