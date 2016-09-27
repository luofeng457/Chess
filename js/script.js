var c = document.getElementById("my");
var canv = c.getContext("2d");
var me = true;
var flag = false;
var arr = [];

//赢法数组
var wins = [];

//赢法统计数组
var player = [];
var computer = [];

for (var i = 0; i < 18; i++) {
   arr[i] = [];
   for (var j = 0; j < 18; j++) {
      arr[i][j] = 0;
   }
}
//赢法数组初始化
for (var i = 0; i < 18; i++) {
   wins[i] = [];
   for (var j = 0; j < 18; j++) {
      wins[i][j] = [];
   }
}
//竖线赢法
var count = 0;
for (var i = 0; i < 18; i++) {
   for (var j = 0; j < 14; j++) {
      for (var k = 0; k < 5; k++) {
         wins[i][j + k][count] = true;
      }
      count++;
   }
}
//横线赢法
for (var i = 0; i < 18; i++) {
   for (var j = 0; j < 14; j++) {
      for (var k = 0; k < 5; k++) {
         wins[j + k][i][count] = true;
      }
      count++;
   }
}
//斜线赢法
for (var i = 0; i < 14; i++) {
   for (var j = 0; j < 14; j++) {
      for (var k = 0; k < 5; k++) {
         wins[i + k][j + k][count] = true;
      }
      count++;
   }
}
//反斜线赢法
for (var i = 4; i < 18; i++) {
   for (var j = 0; j < 14; j++) {
      for (var k = 0; k < 5; k++) {
         wins[i - k][j + k][count] = true;
      }
      count++;
   }
}

console.log(count);

//赢法统计数组初始化
for (var i = 0; i < count; i++) {
   player[i] = 0;
   computer[i] = 0;
}

var logo = new Image();
logo.src = "image/img.jpg";
logo.onload = function() {
   canv.drawImage(logo, 150, 100, 245, 358);
   drawBoard();
   c.onclick = function(e) {
      if (flag) {
         return;
      }
      if(!me){
         return;
      }
      var x = e.offsetX;
      var y = e.offsetY;
      var i = Math.floor(x / 30);
      var j = Math.floor(y / 30);
      if (arr[i][j] == 0) {
         drawChessman(i, j, me);
         arr[i][j] = 1;
         for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
               player[k]++;
               computer[k] = 0;
               console.log(player[k]);
               if (player[k] == 5) {
                  window.alert("你赢了！真厉害~");
                  flag = true;
                  console.log(flag);
               }
            }
         }
         if (!flag) {
            me = !me;
            computerAI();
         }
      }
   }
}
var drawBoard = function() {
   for (var i = 0; i < 18; i++) {
      canv.moveTo(15, 15 + i * 30);
      canv.lineTo(525, 15 + i * 30);
      canv.stroke();
   }
   for (var j = 0; j < 18; j++) {
      canv.moveTo(15 + j * 30, 15);
      canv.lineTo(15 + j * 30, 525);
      canv.stroke();
   }
}

var drawChessman = function(i, j, me) {
   canv.beginPath();
   canv.arc(15 + i * 30, 15 + j * 30, 15, 0, Math.PI * 2);
   canv.closePath();

   if (me) {
      canv.fillStyle = "black";
   } else {
      canv.fillStyle = "#d3fad5";
   }
   canv.fill();
}

//AI算法实现
var computerAI = function() {
   var playerScore = [];
   var computerScore = [];
   var max = 0;
   var u = 0,
      v = 0;
   for (var i = 0; i < 18; i++) {
      playerScore[i] = [];
      computerScore[i] = [];
      for (var j = 0; j < 18; j++) {
         playerScore[i][j] = 0;
         computerScore[i][j] = 0;
      }
   }
   for (var i = 0; i < 18; i++) {
      for (var j = 0; j < 18; j++) {
         if (arr[i][j] == 0) {
            for (var k = 0; k < count; k++) {
               if (wins[i][j][k]) {
                  if (player[k] == 1) {
                     playerScore[i][j] += 200;
                  } else if (player[k] == 2) {
                     playerScore[i][j] == 500;
                  } else if (player[k] == 3) {
                     playerScore[i][j] += 2000;
                  } else if (player[k] == 4) {
                     playerScore[i][j] += 10000;
                  }
                  if (computer[k] == 1) {
                     computerScore[i][j] += 230;
                  } else if (computer[k] == 2) {
                     computerScore[i][j] == 530;
                  } else if (computer[k] == 3) {
                     computerScore[i][j] += 2200;
                  } else if (computer[k] == 4) {
                     computerScore[i][j] += 20000;
                  }
               }
            }
            if (playerScore[i][j] > max) {
               u = i;
               v = j;
               max = playerScore[i][j];
            } else if (playerScore[i][j] == max) {
               if (computerScore[i][j] > computerScore[u][v]) {
                  u = i;
                  v = j;
               }
            }
            if (computerScore[i][j] > max) {
               u = i;
               v = j;
               max = computerScore[i][j];
            } else if (computerScore[i][j] == max) {
               if (playerScore[i][j] > playerScore[u][v]) {
                  u = i;
                  v = j;
               }
            }
         }
      }
   }
   drawChessman(u, v, false);
   arr[u][v] = 2;
   for (var k = 0; k < count; k++) {
      if (wins[u][v][k]) {
         computer[k]++;
         player[k] = 0;
         if (computer[k] == 5) {
            window.alert("电脑赢了！你笨死啦~");
            flag = true;
            console.log(flag);
         }
      }
   }
   if (!flag) {
      me = !me;
   }
}