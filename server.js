const jsonServer = require("json-server");
const express = require("express")
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use('/api', router);
server.use(express.static('build'))
server.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

server.listen(port);