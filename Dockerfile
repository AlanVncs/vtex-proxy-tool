# Source image
FROM denoland/deno:alpine-1.46.3

# Port
EXPOSE 443

# Environment variables
ENV STORE_ABS_PATH="/app/store"
ENV KEY_PEM_FILE="/app/ssl/key.pem"
ENV CERT_PEM_FILE="/app/ssl/cert.pem"
ENV DENO_ENV="development"
ENV PORT=443

# TLS setup
WORKDIR /app/ssl
RUN apk update && apk add openssl
RUN openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:2048
RUN openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=BR/ST=SaoPaulo/L=SaoPaulo/O=Eplus/OU=TI/CN=localhost/emailAddress=pluslab@agenciaeplus.com.br"

# Vtex Legacy Tool directory
WORKDIR /app/vlt
COPY . .