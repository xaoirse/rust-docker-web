use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::env;
use std::fs;
#[get("/script")]
async fn script() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/javascript")
        .body(fs::read("./script.js").unwrap())
}
#[get("/script2")]
async fn script2() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/javascript")
        .body(fs::read("./script2.js").unwrap())
}
#[get("/")]
async fn home() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=UTF-8")
        .body(fs::read("./index.html").unwrap())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let url = env::args().nth(1).unwrap_or("0.0.0.0:8080".to_string());

    HttpServer::new(|| App::new().service(script).service(script2).service(home))
        .bind(url)?
        .run()
        .await
}
