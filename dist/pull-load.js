/**
 * Created by Males on 2017/2/6.
 * 上拉加载，下拉刷新，滚动到底部加载
 * git ：https://github.com/xiyan1120/pull-load.git
 */
(function (wid, dcm) {
    var win = wid;
    var doc = dcm;

    function __on(action, dom, callback) {
        dom.addEventListener(action, function (e) {
            callback(e);
        });
    }

    function createPullLoadCss() {
        var iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg==";
        var styles =
            '.pull-load-container {'+
            '	display: -webkit-box;'+
            '	display: -ms-flexbox;'+
            '	display: flex;'+
            '	-webkit-box-pack: center;'+
            '	-ms-flex-pack: center;'+
            '	justify-content: center;'+
            '	-webkit-box-align: center;'+
            '	-ms-flex-align: center;'+
            '	align-items: center;'+
            '	font-size: 14px;'+
            '	overflow: hidden'+
            '}'+
            '.pull-load-down, .pull-load-up, .pull-load-empty-data {'+
            '	background:transparent;'+
            '	line-height:40px;'+
            '	padding:0px 10px;'+
            '	font-weight:bold;'+
            '	font-size:14px;'+
            '	color:#888;'+
            '}'+
            '.pull-load-down .pull-load-down-icon, .pull-load-up .pull-load-up-icon  {'+
            '	display: inline-block;'+
            '	vertical-align: middle;'+
            '	margin-bottom: 5px;'+
            '	width: 20px;'+
            '	height: 20px;'+
            '	background:url("'+ iconBase64 +'") 0 0 no-repeat;'+
            '	-webkit-background-size:cover; background-size:cover;'+
            '	-webkit-transition-property:-webkit-transform;'+
            '	-webkit-transition-duration:250ms;'+
            '}'+
            '.pull-load-down .pull-load-down-icon {'+
            '	-webkit-transform:rotate(0deg) translateZ(0);'+
            '}'+
            '.pull-load-up .pull-load-up-icon  {'+
            '	-webkit-transform:rotate(-180deg) translateZ(0);'+
            '}'+
            '.pull-load-down.flip .pull-load-down-icon {'+
            '	font-size: 14px;'+
            '	-webkit-transform:rotate(-180deg) translateZ(0);'+
            '}'+
            '.pull-load-up.flip .pull-load-up-icon {'+
            '	font-size: 14px;'+
            '	-webkit-transform:rotate(0deg) translateZ(0);'+
            '}'+
            '.pull-load-down.loading .pull-load-down-icon, .pull-load-up.loading .pull-load-up-icon {'+
            '	background-position:0 100%;'+
            '	-webkit-transform:rotate(0deg) translateZ(0);'+
            '	-webkit-transition-duration:0ms;'+
            '	-webkit-animation-name:loading;'+
            '	-webkit-animation-duration:2s;'+
            '	-webkit-animation-iteration-count:infinite;'+
            '	-webkit-animation-timing-function:linear;'+
            '}'+
            '@-webkit-keyframes loading {'+
            '	from { -webkit-transform:rotate(0deg) translateZ(0); }'+
            '	to { -webkit-transform:rotate(360deg) translateZ(0); }'+
            '}';
        var cssId = '__pull_load_css';
        var css = doc.getElementById(cssId);
        if(css && css.parentNode){
            css.parentNode.removeChild(css);
        }
        css = doc.createElement('style');
        css.id=cssId;
        css.type='text/css';
        if(css.styleSheet){
            css.styleSheet.cssText=   styles;       //ie下要通过 styleSheet.cssText写入.
        }else{
            css.innerHTML=styles;       //在ff中， innerHTML是可读写的，但在ie中，它是只读的.
        }
        doc.getElementsByTagName('head')[0].appendChild(css);
    }
    
    function PullLoad(config) {
        this.isTouchWebkit = "ontouchstart" in win && "WebKitCSSMatrix" in win;
        this.container = config.container;
        this.touchstart = "touchstart";
        this.touchmove = "touchmove";
        this.touchend = 'touchend';
        if(!this.isTouchWebkit){
            this.touchstart = "mousedown";
            this.touchmove = "mousemove";
            this.touchend = "mouseup";
        }
        this.down = Object.assign({},{
            el:null,
            distance:50,
            container:'<div class="pull-load-container"></div>',
            init:'<div class="pull-load-down"><span><span class="pull-load-down-icon"></span>下拉刷新...</span></div>',
            loading:'<div class="pull-load-down loading"><span class="pull-load-down-icon"></span>刷新中...</span></div>',
            release:'<div class="pull-load-down flip"><span><span class="pull-load-down-icon"></span>释放刷新...</span></div>',
            emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
            time:1500,
            id:'_____pull_down____',
            enable:true,
            callback:null
        },config.down ? config.down : {});
        this.up = Object.assign({},{
            el:null,
            distance:50,
            container:'<div class="pull-load-container"></div>',
            init:'<div class="pull-load-up"><span><span class="pull-load-up-icon"></span>上拉加载更多...</span></div>',
            loading:'<div class="pull-load-up loading"><span class="pull-load-up-icon"></span>加载中...</span></div>',
            release:'<div class="pull-load-up flip"><span><span class="pull-load-up-icon"></span>释放加载...</span></div>',
            emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
            time:1500,
            id:'_____pull_up____',
            enable:true,
            isScrollLoad:false,//是否滚动到底部就加载。
            isInitLoad:false,//是否初始化完成后就加载
            callback:null
        },config.up ? config.up : {});
        this.baseRefreshContainer = '<div class="pull-load-container"></div>';
        this.startY = 0;
        this.startScrollTop = 0;
        this.type = "";//up or down
        this.canRefresh = false;
        this.canLoadMore = false;
        this.isTouchStart = false;
        this.isLoading = false;//加载中时就不要再进行拖动了。
        this.isEmptyData = false;
        this.hasInsertDom = false;
        this.scrollLoadHasInsertDom = false;//滚动加载的时候是否有插入dom
        createPullLoadCss();
        this.init();
    }

    PullLoad.prototype = {
        constructor: PullLoad,
        init:function () {
            var self = this;
            var $container = self.container;
            if($container){
                //如果初始化的时候就加载数据的话，此时是没有上拉和滚动到底的问题的
                if(self.up.isInitLoad){
                    self.createDiv(self.up,true,true);
                    self.upLoadMore(true);
                }else{
                    //如果是滚动到底部就刷新的话，并且没有初始化加载时也是要创建div的
                    if(self.up.isScrollLoad){
                        self.createDiv(self.up,true,true);
                    }
                }
                //绑定各种事件
                __on(self.touchstart,$container,function () {
                    self.touch(event);
                });
                __on(self.touchmove,$container,function () {
                    self.touch(event);
                });
                __on(self.touchend,$container,function () {
                    self.touch(event);
                });
                __on('scroll',$container,function () {
                    self.scroll(event);
                });
                if(!self.isTouchWebkit){
                    //禁止div的内容被选中，在PC不禁止的话，拖动的时候容易选中内容，
                    //使用事件监听的方式不起作用。
                    $container.onselectstart=function(){return false;};
                    $container.onselect=function(){doc.selection.empty();};
                    doc.addEventListener(self.touchend, function () {
                        self.touch(event);
                    }, false);
                }
            }else{
                console.log("容器设置错误");
            }
        },
        scroll:function (e,isTouch,distance) {
            var self = this;
            var _up = self.up;
            if(!_up.enable){ return false; }
            var $container = self.container;
            if(_up.isScrollLoad && !self.isLoading){
                var bottomDiff = $container.scrollHeight - ($container.scrollTop + $container.offsetHeight);
                //在和底部相差一定距离的时候再添加底部的div
                if(_up.init && bottomDiff - _up.distance < 0){
                    if(!self.scrollLoadHasInsertDom){
                        self.createDiv(_up,true,true);
                    }
                }
                //PC端触摸的时候要设置滚动
                if(isTouch && !self.isTouchWebkit){
                    var _absMoveY = Math.abs(distance);
                    $container.scrollTop = self.startScrollTop + _absMoveY;
                }
                //如果滚动到底部了，就执行开始加载。
                if(_up.el && bottomDiff <= 0){
                    self.upLoadMore();
                }
            }
        },
        touch:function (event) {
            var self = this;
            var $container = self.container;
            event = event || win.event;
            if(self.isLoading){
                event.preventDefault();//在加载的时候阻止浏览器的默认行为
            }
            event.stopPropagation();
            switch (event.type) {
                case self.touchstart:
                    if(!self.isLoading){
                        self.startY = self.pos(event).y;
                        self.startScrollTop = $container.scrollTop;
                        self.isLoading = false;
                        self.canRefresh = false;
                        self.canLoadMore = false;
                        self.type = "";
                        self.isTouchStart = true;
                        self.hasInsertDom = false;
                    }
                    break;
                case self.touchmove:
                    if(self.isTouchStart){
                        //鼠标没按住就不要执行各种操作了，当然不执行的话 还是要这些下end，要不有些状态可能就没有被修改过来了
                        if(!self.isTouchWebkit && event.buttons === 0){
                            self.end();
                            return false;
                        }
                        var moveY = self.pos(event).y;
                        var distance = moveY - self.startY;
                        if(!self.type) {
                            if(distance < 0) self.type = "up";
                            else if(distance > 0) self.type = "down";
                        }
                        switch (self.type){
                            case "up":
                                if(!self.up.isScrollLoad){
                                    self.upAction(event,distance);
                                }else{
                                    self.scroll(event,true,distance);
                                }
                                break;
                            case "down": self.downAction(event,distance); break;
                        }
                    }
                    break;
                case self.touchend:
                    self.end();
                    break;
            }
        },
        end:function () {
            var self = this;
            self.isTouchStart = false;
            if(self.canRefresh){
                self._end(self.down,false);
            }else if(self.canLoadMore){
                self._end(self.up,true);
            }else{
                switch (self.type){
                    case "up": self.back(self.up,true); break;
                    case "down": self.back(self.down,false); break;
                }
            }
        },
        _end:function (obj,isUp) {
            var self = this;
            if(isUp && obj.isScrollLoad){
                return false;
            }
            if((isUp && self.canLoadMore) || (!isUp && self.canRefresh)){
                self.setCan(isUp,false);
                self.setHeight(obj.el,obj.distance);
                self.transition(obj.el,0.5);
                if(obj.el)
                    obj.el.innerHTML = obj.loading;
                self.isLoading = true;
                //正常情况下，退回去是要在外面去调用的。
                if(obj.callback) obj.callback(function (isEmptyData) {
                    self.isEmptyData = isEmptyData;
                    self.back(obj,isUp);
                });
                else{
                    //这个当作测试用。
                    setTimeout(function () {
                        self.back(obj,isUp);
                    },obj.time);
                }
            }else{
                self.back(obj,isUp);
            }
        },
        back:function (obj,isUp) {
            var self = this;
            if(!isUp){
//                self.container.scrollTop = 0;
            }else {
                if(obj.isScrollLoad) return false;
            }
            if(obj.el){
                if(self.isEmptyData){
                    // _up.el.innerHTML = _up.emptyData;
                    obj.el.innerHTML = obj.emptyData;
                    obj.enable = false;//没有数据就直接禁用了
                    self.isLoading = false;
                    return false;
                }else{
                    obj.el.innerHTML = obj.init;
                }
                self.setHeight(obj.el,0);
                self.transition(obj.el,0.5);
                __on('webkitTransitionEnd',obj.el,function (e) {
                    self.transitionEnd(e.target,isUp);
                });
                __on('transitionend',obj.el,function (e) {
                    self.transitionEnd(e.target,isUp);
                });
            }
        },
        upAction:function (e,distance) {
            var self = this;
            var $container = self.container;
            var _up = self.up;
            if(!_up.enable || !_up.init){
                return false;
            }
            var bottomDiff = $container.scrollHeight - ($container.scrollTop + $container.offsetHeight);
            //在和底部相差一定距离的时候再添加底部的div
            self.action((_up.init && bottomDiff - _up.distance < 0 && !self.hasInsertDom) , _up ,e,distance, true);
        },
        downAction:function (e,distance) {
            var self = this;
            var $container = self.container;
            var _down = self.down;
            if(!_down.enable || !_down.init){
                return false;
            }
            if($container.scrollTop > 0){
                if(!self.isTouchWebkit){
                    //pc端不能拖动，所以要手动修改滚动条的位置
                    var _absMoveY = Math.abs(distance);
                    $container.scrollTop = self.startScrollTop - _absMoveY;
                    if($container.scrollTop > 0){
                        return false;
                    }
                }else{
                    return false;
                }
            }
            self.action(!self.hasInsertDom , _down,e,distance,false);
        },
        action:function(canInsertDom,obj,e,distance,isUp){
            var self = this;
            var $container = self.container;
            //在和底部相差一定距离的时候再添加底部的div
            if(canInsertDom){
                self.createDiv(obj,isUp);
            }
            var curInnerHtml = "";
            var _offsetY = 0;
            var _absMoveY = Math.abs(distance);
            if(!isUp) _absMoveY = _absMoveY - self.startScrollTop;//存在滚动条的时候，偏移的距离要扣去滚动的高度
            else{
                var insertDomHeight = 0;
                if(canInsertDom){
                    insertDomHeight = obj.distance;//因为创建的时候是初始高度。
                }
                _absMoveY = _absMoveY - ($container.scrollTop + insertDomHeight - self.startScrollTop);//后面是滚动的距离
            }
            var _absInitDis = Math.abs(obj.distance);
            if(obj.el){
                if(e.cancelable)
                    e.preventDefault();
                self.canRefresh = false;
                self.canLoadMore = false;
                // 下拉距离 <= 初始距离
                if(_absMoveY <= _absInitDis){
                    _offsetY = _absMoveY;
                    curInnerHtml = obj.init;
                    self.setCan(isUp,false);
                    // 指定距离 < 下拉距离 < 指定距离*2
                }else if(_absMoveY > _absInitDis && _absMoveY <= _absInitDis*2){
                    _offsetY = _absInitDis+(_absMoveY-_absInitDis)*0.5;
                    curInnerHtml = obj.release;
                    self.setCan(isUp,true);
                    // 下拉距离 > 指定距离*2
                }else{
                    _offsetY = _absInitDis+_absInitDis*0.5+(_absMoveY-_absInitDis*2)*0.2;
                    curInnerHtml = obj.release;
                    self.setCan(isUp,true);
                }
                obj.el.innerHTML = curInnerHtml;
                if(isUp){
                    //如果可滚动的高度和容器本身的高度是一样的，并且滚动条为0，说明内容的总高度比容器的高度小，此时高度设置为初始的高度就可以了。
                    if(!self.isScrollLoad && $container.scrollHeight === $container.offsetHeight && $container.scrollTop === 0){
                        if(_offsetY >= obj.distance){
                            _offsetY = obj.distance;
                        }
                    }
                    self.setHeight(obj.el,_offsetY);
                    $container.scrollTop = _offsetY+ $container.scrollTop;
                }else{
                    self.setHeight(obj.el,_offsetY);
                }
            }else{
                if(isUp && !self.isTouchWebkit)
                    $container.scrollTop = _absMoveY+ self.startScrollTop;
            }
        },
        upLoadMore:function (isInitLoad) {
            var self = this;
            var _up = self.up;
            if(_up.el){
                _up.el.innerHTML = _up.loading;
                self.isLoading = true;
                //正常情况下，退回去是要在外面去调用的。
                if(_up.callback) _up.callback(function (isEmptyData) {
                    self.isLoading = false;
                    self.isEmptyData = isEmptyData;
                    if(_up.el){
                        if(isEmptyData){
                            _up.el.innerHTML = _up.emptyData;
                            _up.enable = false;//没有数据就直接禁用了
                        }else{
                            _up.el.innerHTML = _up.init;
                        }
                    }
                    //如果是初始化加载并且不为滚动到底部就加载的话，在加载完成后就删除了底部
                    if(isInitLoad && !_up.isScrollLoad){
                        self.back(_up,true);
                    }
                });
            }
        },
        createDiv:function (obj,isUp,isScrollLoad) {
            var self = this;
            var $container = self.container;
            obj.el = null;
            if(obj.init){
                if(isScrollLoad){
                    self.scrollLoadHasInsertDom = true;
                }else{
                    self.hasInsertDom = true;
                }
                var objE = doc.createElement("div");
                if(obj.container){
                    objE.innerHTML = obj.container;
                }else{
                    objE.innerHTML = self.baseRefreshContainer;
                }
                obj.el = objE.childNodes[0];
                if(!obj.el.id){
                    obj.el.id = obj.id;
                }
                obj.el.innerHTML = obj.init;
                obj.id = obj.el.id;
                var $dom = doc.getElementById(obj.id);
                if($dom && $dom.parentNode){
                    $dom.parentNode.removeChild($dom);
                }
                self.setHeight(obj.el,isUp ? obj.distance : 0);//初始高度
                if(isUp) {
                    $container.appendChild(obj.el);
                    if(isScrollLoad){
                        __on("click",obj.el,function () {
                            if(!self.isLoading && obj.enable){
                                self.upLoadMore();
                            }
                        });
                    }
                }else{
                    self.prependChild($container,obj.el);
                }
            }
        },
        setCan:function(isUp,isCan) {
            var self = this;
            if(isUp){
                self.canLoadMore = isCan;
            }else{
                self.canRefresh = isCan;
            }
        },
        pos:function (e) {
            if(this.isTouchWebkit){
                if(!e.touches){
                    e.touches = e.originalEvent.touches;
                }
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }else{
                e = e || win.event;
                var D = doc.documentElement;
                if (e.pageX) return {x: e.pageX, y: e.pageY};
                return {
                    x: e.clientX + D.scrollLeft - D.clientLeft,
                    y: e.clientY + D.scrollTop - D.clientTop
                };
            }
        },
        setHeight: function (dom,diff) {
            if(dom) dom.style.height = diff + 'px';
        },
        transition: function (dom,time) {
            if(dom){
                dom.style.transition       = 'transform ' + time + 's ease-out';
                dom.style.webkitTransition = '-webkit-transform ' + time + 's ease-out';
                dom.style.transitionProperty        = 'height';
                dom.style.webkitTransitionProperty  = 'height';
            }
        },
        transitionEnd:function (dom,isUp) {
            var self = this;
            self.isLoading = false;
            if (dom.parentNode){
                dom.parentNode.removeChild(dom);
            }
            if(isUp)
                self.up.el = null;
            else
                self.down.el = null;
        },
        prependChild: function(p,o){
            if(p.hasChildNodes()){
                p.insertBefore(o,p.firstChild);
            }else{
                p.appendChild(o);
            }
        }
    };

    if (typeof exports == "object") {
        module.exports = PullLoad;
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return PullLoad;
        });
    } else {
        win.PullLoad = PullLoad;
    }
})(window, document);