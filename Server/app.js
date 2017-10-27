var fs = require('fs');

var settings = require('./settings.json');

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static('static'));

var User = require('./utils/user.js');
var users = [];

var Game = require('./utils/game.js');
var games = [];

io.on('connection',function(socket)
{
    var user = new User(socket);
    users.push(user);

    socket.emit("id",user.GetId());

    socket.on("disconnect",function()
    {
        for(var i = 0; i < users.length; i++)
        {
            if(users[i].socket = socket)
            {
                users.splice(i,1);
                return;
            }
        }
    });

    socket.on("createGame",function()
    {
        var game = new Game(io);
        games.push(game);

        socket.emit("join",game.id);
    });
});

app.all("/game/:game",function(req,res)
{
    res.sendFile(__dirname + "/gamefiles/game.html");
});

http.listen(settings.port,function()
{
    console.log("Server started on port " + settings.port);
});