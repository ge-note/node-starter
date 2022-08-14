const { Socket } = require('socket.io');
var socketIO = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

// 启动 Socket.IO 服务器
exports.listen = function (server) {
  // 启动 Socket.IO 服务器，允许搭载在已有的 HTTP 服务器上
  io = socketIO.listen(server);

  io.set('log level', 1);

  // 定义每个用户连接的处理逻辑
  io.sockets.on('connection', function (socket) {
    // 在用户连接上来时赋予一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

    // 在用户连接上来时，把他放入聊天室 Lobby 里
    joinRoom(socket, 'Lobby');

    // 处理用户的消息、更名、以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);

    // 用户发出请求时，向其提供已经被占用的聊天室列表
    socket.on('rooms', function () {
      socket.emit('rooms', io.sockets.manager.rooms);
    });

    // 定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

/**
 * 辅助函数
 */
// 分配用户昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  // 生成初始昵称
  var name = '访客' + guestNumber;

  // 关联用户昵称和客户端连接 ID
  nickNames[socket.id] = name;

  // 让用户知道他们的昵称
  socket.emit('nameResult', {
    success: true,
    name: name,
  });

  // 存放已经被占用的昵称
  namesUsed.push(name);

  // 增加访客计数器
  return guestNumber + 1;
}

// 进入聊天室
function joinRoom(socket, room) {
  // 让用户进入房间
  socket.join(room);

  // 记录用户的当前房间
  currentRoom[socket.id] = room;

  // 让用户知道他们进入了新的房间
  socket.emit('joinResult', {
    room: room,
  });

  // 让房间里的其他用户知道有新的用户进入了房间
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.io] + ' 进入了 ' + room,
  });

  // 确定有哪些用户在这个房间里
  var usersInRoom = io.sockets.clients(room);

  // 如果不止一位用户在这个房间里，汇总都有谁
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = '当前在 ' + room + ' 内的人：';
    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += '， ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
  }

  // 将房间内其他用户的汇总发送给这个用户
  socket.emit('message', {
    text: usersInRoomSummary,
  });
}

// 处理昵称变更
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  // 添加 nameAttempt 事件监听器
  socket.on('nameAttempt', function (name) {
    // 昵称不能以 访客 开头
    if (name.indexOf('访客') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: '昵称不能以 “访客” 开头',
      });
    } else {
      // 判断昵称是否已被占用
      if (namesUsed.indexOf(name) == -1) {
        // 如果没有占用，可以更改
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);

        // 保存新昵称
        namesUsed.push(name);
        nickNames[socket.id] = name;

        // 删除之前的昵称
        delete namesUsed[previousNameIndex];
      } else {
        // 如果已占用，发送错误消息
        socket.emit('nameResult', {
          success: false,
          message: '昵称已被占用',
        });
      }
    }
  });
}

// 发送聊天消息
function handleMessageBroadcasting(socket) {
  socket.on('message', function (message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + '：' + message.text,
    });
  });
}

// 创建房间
function handleRoomJoining(socket) {
  socket.on('join', function (room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}

// 用户断开连接
function handleClientDisconnection(socket) {
  socket.on('disconnect', function () {
    // 移除用户
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
