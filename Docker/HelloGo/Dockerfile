FROM golang:alpine AS builder

WORKDIR /go/hello

COPY hello.go /go/hello/
RUN go mod init hello && \
    go build -ldflags "-w"  .

FROM scratch
WORKDIR /go
COPY --from=builder /go/hello/hello hello
ENTRYPOINT [ "./hello" ]