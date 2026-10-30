FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY . .
RUN go build -o /bin/orders .

FROM alpine:3.20
WORKDIR /app
COPY --from=build /bin/orders /app/orders
EXPOSE 8080
ENTRYPOINT ["/app/orders"]
