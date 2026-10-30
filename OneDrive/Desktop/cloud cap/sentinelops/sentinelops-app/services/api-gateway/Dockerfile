FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY . .
RUN go build -o /bin/api-gateway .

FROM alpine:3.20
RUN add -S fuse
WORKDIR /app
COPY --from=build /bin/api-gateway /app/api-gateway
EXPOSE 8080
ENTRYPOINT ["/app/api-gateway"]
