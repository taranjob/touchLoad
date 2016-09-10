window.addEventListener('DOMContentLoaded', function () {
    $("body").css("min-height", window.innerHeight);

    TouchPageEvent();
    touchInit();

    //下拉、上拉设置
    function touchInit() {
        var current = "index";//当前单页面#hash名字
        TouchtoTop.Current = current;
        TouchtoTop.Dom = document.getElementById("drawWrap");//下拉时动画移动的元素
        TouchtoTop.Pages.index = downCall;//下拉时 对应的回调函数

        TouchtoBottom.Current = current;
        TouchtoBottom.Dom = document.getElementById("drawWrap");//上拉时动画移动的元素
        TouchtoBottom.Pages.index = upCall;//上拉时动画移动的元素

        function downCall() {
            touchCall.downCall();
        }

        function upCall() {
            touchCall.upCall();
        }

        var touchCall = {
            downCall: function () {
                console.log('downCall');
            },
            upCall: function () {
                console.log('upCall');
            }
        }
    }



}, false);

/**
 * touch.js  判断滑动到底部，若当前页面注册有事件名，则触发改事件
 * Pages 是单页面#hash名字，单页面不同路由下有各自：滑动的元素id,下拉回调函数,上拉回调函数
 * @type {{orderList: null}}
 */
var TouchtoBottom = {
    Pages: {
        index:null,
        orderList: null,
        userComment: null,
    },
    Current:null,
    Dom:""
};
var TouchtoTop = {
    Pages: {
        index:null,
        orderList: null,
        userComment: null,
    },
    Current:null,
    Dom:""
};

/*触摸事件*/
function TouchPageEvent() {
    var sec = document.body;
    var ondrag = false;
    var direction='';
    var dx, dy;
    var target=null;
    //监听上拉
    touch.on(sec, 'dragstart', function (ev) {
        //ev.originEvent.preventDefault()
        if (ev.direction === 'down' && document.body.scrollTop < 10) {
            ondrag = true;
            direction='down';
        }
        if (ev.direction === 'up' && (getScrollTop() + getWindowHeight() == getScrollHeight() ) ){
            ondrag = true;
            direction='up';
        }
    })
    touch.on(sec, 'drag', function (ev) {
        if (ondrag) {
            ev.originEvent.preventDefault();
            dy = dy || 0;
            if(ev.y>0){
                target=TouchtoTop.Dom;
                if(ev.y>60){
                    ev.y=60;
                }else if(ev.y>35 && ev.y<60){
                    ev.y=ev.y-0.5;
                }
            }
            if(ev.y<0){
                target=TouchtoBottom.Dom;
                if(ev.y<-60){
                    ev.y=-60;
                }else if(ev.y>-60 && ev.y<-35){
                    ev.y=ev.y+0.5;
                }
            }

            var offy = dy + ev.y + "px";

            if(target){//如果指定了移动效果的元素
                target.style.webkitTransform = "translate3d(" + 0 + "," + offy + ",0)";
            }
        }
    })
    touch.on(sec, 'dragend', function (ev) {
        if (ondrag  ) {
            ev.originEvent.preventDefault();
            dy=0;
            ondrag = false;
            if(target){
                target.classList.add("duration-600");
                target.style.webkitTransform = "translate3d(" + 0 + "," + 0 + ",0)";
                setTimeout(function(){
                    target.classList.remove("duration-600");
                },600);
            }
            if(direction=='down'){
                if (TouchtoTop.Current!=null && window.location.href.indexOf("/"+TouchtoTop.Current)>-1 && typeof(TouchtoTop.Pages[TouchtoTop.Current]) == "function" ) {
                    TouchtoTop.Pages[TouchtoTop.Current]();
                    //console.log('current')
                }else{
                    console.log('current null:'+(TouchtoTop.Current!=null)+','+(window.location.href.indexOf("/"+TouchtoTop.Current)>-1)+','+(typeof(TouchtoTop.Pages[TouchtoTop.Current]) == "function"))
                }
            }else{
                if (TouchtoBottom.Current!=null && window.location.href.indexOf("/"+TouchtoBottom.Current)>-1 && typeof(TouchtoBottom.Pages[TouchtoBottom.Current]) == "function" ) {
                    TouchtoBottom.Pages[TouchtoBottom.Current]();
                }else{
                    console.log('current null:'+(TouchtoBottom.Current!=null)+','+(window.location.href.indexOf("/"+TouchtoBottom.Current)>-1)+','+(typeof(TouchtoBottom.Pages[TouchtoBottom.Current]) == "function"))
                }
            }

        }
    })
}

//滚动条在Y轴上的滚动距离

function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//文档的总高度

function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}


