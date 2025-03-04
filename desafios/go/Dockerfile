FROM golang:1.24.0-alpine3.21 AS builder
WORKDIR /go
COPY . .

RUN go mod init example/hello \
    && go build -ldflags="-s -w" hello.go \
    && apk add --no-cache upx \
    && upx --best --lzma hello

FROM scratch
COPY --from=builder /go/hello .
 
ENTRYPOINT [ "./hello" ]