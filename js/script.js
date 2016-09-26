
var c = document.getElementById("my");
var canv = c.getContext("2d");
var me = true;
var arr = [];
for(var i=0;i<18;i++)
{
   arr[i] = [];
   for(var j=0;j<18;j++)
   {
   arr[i][j]  = 0;
   }
}

var logo = new Image();
logo.src = "image/img.jpg";
logo.onload = function()
{
canv.drawImage(logo,150,100,245,358);
drawBoard();
c.onclick = function(e){
   var x = e.offsetX;
   var y = e.offsetY;
   var i = Math.floor(x/30);
   var j = Math.floor(y/30);
   if(arr[i][j] == 0)
  {
      drawChessman(i,j,me);
   arr[i][j]=1;
   me = !me;
   drawChessman(i,j,me);
   }
 
}

}

var drawBoard = function(){
for(var i=0;i<18;i++)
{
   canv.moveTo(15,15+i*30);
   canv.lineTo(525,15+i*30);
   canv.stroke();
}
for(var j=0;j<18;j++)
{
   canv.moveTo(15+j*30,15);
   canv.lineTo(15+j*30,525);
   canv.stroke();
}
}

var drawChessman = function(i,j,me){
   canv.beginPath();
   canv.arc(15+i*30,15+j*30,15,0,Math.PI*2);
   canv.closePath();
   
   if(me){
   canv.fillStyle = "black";
   }else
   {
   canv.fillStyle = "#f3f5f7";
    }
   canv.fill();
}


