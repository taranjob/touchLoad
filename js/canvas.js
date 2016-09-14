/**
 * Created by Administrator on 2016/8/17.
 */


var canvas = document.getElementById('iconload');
var ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
//初始角度为0
var step = 0;
var Lines=[
    {
        //color:" rgba(65,184,131,.9)",
        color:" rgba(5,17,41,.5)",
        High:canvas.height
    },
    //{
    //    color:"rgba(204,204,204, 1)",
    //    High:canvas.height-10
    //},
    //{
    //    color:"rgba(204,204,204, 0.9)",
    //    High:canvas.height-20
    //},
];

//var High=canvas.height;
var stepH=1;//高度变化速度
function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    step+=4;//波浪变化速度

    if(Lines[0].High<canvas.height*0.25){
        stepH=.5;
    }else{
        stepH=.65;
    }

    for(var i=0;i<Lines.length;i++){
        Lines[i].High-=stepH;
    }

    if(Lines[0].High<-5){
        for(var i=0;i<Lines.length;i++){
            Lines[i].High=canvas.height-10*i;
        }
    }
    //画不同颜色的波浪
    for(var j =  0; j < Lines.length; j++) {
        ctx.fillStyle = Lines[j].color;
        var angle = (step)*Math.PI/180;
        var deltaHeight   = Math.sin(angle) * canvas.height*.15;
        var deltaHeightRight   = Math.cos(angle) * canvas.height*.15;
        ctx.beginPath();
        ctx.moveTo(0, Lines[j].High);
        ctx.bezierCurveTo(canvas.width /2-10, Lines[j].High+deltaHeight-10, canvas.width / 2+10, Lines[j].High+deltaHeightRight+10, canvas.width, Lines[j].High);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, Lines[j].High);
        ctx.closePath();
        ctx.fill();
    }
    requestAnimFrame(loop);
}
loop();
