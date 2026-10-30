FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY . .
RUN go build -o /bin/payments .

FROM alpine:3.20
WORKDIR /app
COPY --from=build /bin/payments /app/payments
EXPOSE 8080
ENTRYPOINT ["/app/payments"]
