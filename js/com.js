window.addEventListener('DOMContentLoaded', function () {
    $("body").css("min-height", window.innerHeight);

    var current="index";
    TouchtoTop.Current=current;
    TouchtoTop.Pages.index=downCall;

    TouchtoBottom.Current=current;
    TouchtoBottom.Pages.index=upCall;

    function downCall(){
        touchIndex.downCall();
    }
    function upCall(){
        touchIndex.upCall();
    }

    var touchIndex={
        downCall:function(){
             console.log('downCall')
        },
        upCall:function(){
            console.log('upCall')
        }
    }

    TouchPageEvent();

}, false);

/**
 * touch.js  判断滑动到底部，若当前页面注册有事件名，则触发改事件
 * @type {{orderList: null}}
 */
var TouchtoBottom = {
    Pages: {
        index:null,
        orderList: null,
        userComment: null,
    },
    Current:null,
};
var TouchtoTop = {
    Pages: {
        index:null,
        orderList: null,
        userComment: null,
    },
    Current:null
};

/*上拉请求最新一页*/
function TouchPageEvent() {
    var sec = document.body;
    var ondrag = false;
    var direction='';
    var dx, dy;
    var target=document.getElementById("drawWrap");
    //监听上拉
    touch.on(sec, 'dragstart', function (ev) {
        //ev.originEvent.preventDefault()
        if (ev.direction === 'down' && document.body.scrollTop < 10) {
            ondrag = true;
            direction='down';
        }
        if (ev.direction === 'up' && ($(document).scrollTop() >= $(document).height() - $(window).height() ) ){
            ondrag = true;
            direction='up';
        }
    })
    touch.on(sec, 'drag', function (ev) {
        if (ondrag) {
            ev.originEvent.preventDefault();
            dy = dy || 0;
            if(ev.y>0){
                if(ev.y>80){
                    ev.y=80;
                }else if(ev.y>50 && ev.y<80){
                    ev.y=ev.y-0.5;
                }
            }
            if(ev.y<0){
                if(ev.y<-80){
                    ev.y=-80;
                }else if(ev.y>-80 && ev.y<-50){
                    ev.y=ev.y+0.5;
                }
            }

            var offy = dy + ev.y + "px";

            target.style.webkitTransform = "translate3d(" + 0 + "," + offy + ",0)";
        }
    })
    touch.on(sec, 'dragend', function (ev) {
        if (ondrag  ) {
            if(direction=='down'){
                //console.log('drag')
                if (TouchtoTop.Current!=null && window.location.href.indexOf("/"+TouchtoTop.Current)>-1 && typeof(TouchtoTop.Pages[TouchtoTop.Current]) == "function" ) {
                    TouchtoTop.Pages[TouchtoTop.Current]();
                    //console.log('current')
                }else{
                    //console.log('current null:'+(TouchtoTop.Current!=null)+','+(window.location.href.indexOf("/"+TouchtoTop.Current)>-1)+','+(typeof(TouchtoTop.Pages[TouchtoTop.Current]) == "function"))
                }
                ev.originEvent.preventDefault();
                dy=0;
                target.classList.add("duration-600");
                target.style.webkitTransform = "translate3d(" + 0 + "," + 0 + ",0)";
                setTimeout(function(){
                    target.classList.remove("duration-600");
                },600);
                ondrag = false;
            }else{
                dy=0;
                target.classList.add("duration-600");
                target.style.webkitTransform = "translate3d(" + 0 + "," + 0 + ",0)";
                setTimeout(function(){
                    target.classList.remove("duration-600");
                },600);

                if (TouchtoBottom.Current!=null && window.location.href.indexOf("/"+TouchtoBottom.Current)>-1 && typeof(TouchtoBottom.Pages[TouchtoBottom.Current]) == "function" ) {
                    TouchtoBottom.Pages[TouchtoBottom.Current]();
                }else{
                    //console.log('current null:'+(TouchtoBottom.Current!=null)+','+(window.location.href.indexOf("/"+TouchtoBottom.Current)>-1)+','+(typeof(TouchtoBottom.Pages[TouchtoBottom.Current]) == "function"))
                }
            }

        }
    })
}