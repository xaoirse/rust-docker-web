FROM rust:1.54 as builder

RUN USER=root cargo new --bin rust-docker-web
WORKDIR ./rust-docker-web
COPY ./Cargo.toml ./Cargo.toml
COPY ./index.html ./index.html
COPY ./login.html ./login.html
COPY ./script.js ./script.js
COPY ./script2.js ./script2.js
RUN cargo build --release
RUN rm src/*.rs

ADD . ./

RUN rm ./target/release/deps/rust_docker_web*
RUN cargo build --release


FROM debian:buster-slim
ARG APP=/usr/src/app

RUN apt-get update \
    && apt-get install -y ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8081

ENV TZ=Etc/UTC \
    APP_USER=appuser

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

COPY --from=builder /rust-docker-web/target/release/rust-docker-web ${APP}/rust-docker-web
COPY --from=builder /rust-docker-web/index.html ${APP}/index.html
COPY --from=builder /rust-docker-web/login.html ${APP}/login.html
COPY --from=builder /rust-docker-web/script.js ${APP}//script.js
COPY --from=builder /rust-docker-web/script2.js ${APP}//script2.js
RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./rust-docker-web"]
