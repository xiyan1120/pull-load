/**
 * Created by Males on 2017/2/6.
 * 上拉加载，下拉刷新，滚动到底部加载
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
            '.pull-load-down.pull-load-flip .pull-load-down-icon {'+
            '	font-size: 14px;'+
            '	-webkit-transform:rotate(-180deg) translateZ(0);'+
            '}'+
            '.pull-load-up.pull-load-flip .pull-load-up-icon {'+
            '	font-size: 14px;'+
            '	-webkit-transform:rotate(0deg) translateZ(0);'+
            '}'+
            '.pull-load-down.pull-load-loading .pull-load-down-icon, .pull-load-up.pull-load-loading .pull-load-up-icon {'+
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
        this.scrollBar = config.scrollBar;
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
            loading:'<div class="pull-load-down pull-load-loading"><span class="pull-load-down-icon"></span>刷新中...</span></div>',
            release:'<div class="pull-load-down pull-load-flip"><span><span class="pull-load-down-icon"></span>释放刷新...</span></div>',
            emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
            id:'_____pull_down____',
            enable:true,
            callback:null
        },config.down ? config.down : {});
        this.up = Object.assign({},{
            el:null,
            distance:50,
            container:'<div class="pull-load-container"></div>',
            init:'<div class="pull-load-up"><span><span class="pull-load-up-icon"></span>上拉加载更多...</span></div>',
            loading:'<div class="pull-load-up pull-load-loading"><span class="pull-load-up-icon"></span>加载中...</span></div>',
            release:'<div class="pull-load-up pull-load-flip"><span><span class="pull-load-up-icon"></span>释放加载...</span></div>',
            emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
            id:'_____pull_up____',
            enable:true,
            isScrollLoad:false,//是否滚动到底部就加载。
            isInitLoad:false,//是否初始化完成后就加载
            callback:null
        },config.up ? config.up : {});
        this.baseRefreshContainer = '<div class="pull-load-container"></div>';
        this.startY = 0;
        this.moveY = 0;
        this.elStartY = -1;//元素一开始进入可视区域的时的鼠标坐标
        this.startScrollTop = 0;
        this.bottomDiff = 0;//当容器不是滚动条容器时，容器距离滚动条底部的偏移量
        this.topDiff = 0;//当容器不是滚动条容器时，容器距离滚动条底部的偏移量
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
                //如果不存在滚动条的设置，默认容器就是滚动条
                if(!self.scrollBar){
                    self.scrollBar = $container;
                }
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
                __on('scroll',self.scrollBar.tagName.toLowerCase() === "body" ? win : self.scrollBar,function () {
                    self.scroll(event);
                });
                if(!self.isTouchWebkit){
                    //禁止div的内容被选中，在PC不禁止的话，拖动的时候容易选中内容，
                    //使用事件监听的方式不起作用。
                    var ___container = self.scrollBar.tagName.toLowerCase() === "body" ? document : self.scrollBar;
                    ___container.onselectstart=function(){return false;};
                    ___container.onselect=function(){doc.selection.empty();};
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
            var $scroll = self.scrollBar;
            if(_up.isScrollLoad && !self.isLoading){
                var scrollBottomOffset = self.elPos($scroll).bottom;
                var containerBottomOffset = self.elPos($container).bottom;
                self.bottomDiff = scrollBottomOffset - containerBottomOffset;
                var bottomOffset = 0;
                if($scroll.tagName.toLowerCase() === "body"){
                    bottomOffset = self.getScrollHeight() - (self.getScrollTop() + self.getWindowHeight());
                }else{
                    bottomOffset = $scroll.scrollHeight - ($scroll.scrollTop + $scroll.clientHeight);
                }
                bottomOffset = bottomOffset - self.bottomDiff;//扣除底部的偏移量
                //在和底部相差一定距离的时候再添加底部的div
                if(_up.init && bottomOffset - _up.distance < 0 && !self.scrollLoadHasInsertDom){
                    self.createDiv(_up,true);
                }
                //PC端触摸的时候要设置滚动
                if(isTouch && !self.isTouchWebkit){
                    var _absMoveY = Math.abs(distance);
                    $scroll.scrollTop = self.startScrollTop + _absMoveY;
                }
                //如果滚动到底部了，就执行开始加载。
                if(_up.el && bottomOffset <= 0){
                    self.upLoadMore();
                }
            }
        },
        touch:function (event) {
            var self = this;
            var $scroll = self.scrollBar;
            event = event || win.event;
            event.stopPropagation();
            switch (event.type) {
                case self.touchstart:
                    self.startY = self.pos(event).y;
                    self.startScrollTop = $scroll.tagName.toLowerCase() === "body" ? self.getScrollTop() : $scroll.scrollTop;
                    self.type = "";
                    self.isTouchStart = true;
                    if(!self.isLoading){
                        self.isLoading = false;
                        self.canRefresh = false;
                        self.canLoadMore = false;
                        self.hasInsertDom = false;
                        self.elStartY = -1;
                    }
                    break;
                case self.touchmove:
                    if(self.isTouchStart){
                        //鼠标没按住就不要执行各种操作了，当然不执行的话 还是要这些下end，要不有些状态可能就没有被修改过来了
                        if(!self.isTouchWebkit && event.buttons === 0){
                            return false;
                        }
                        //处理反向时的坐标和偏移量
                        self.moveY = self.pos(event).y;
                        var distance = self.moveY - self.startY;
                        if(!self.type) {
                            if(distance < 0) self.type = "up";
                            else if(distance > 0) self.type = "down";
                        }else{
                            if(!self.isLoading){
                                //处理反向时的问题。
                                var _newDistance = self.moveY - self.startY;
                                var _scrollTop = $scroll.tagName.toLowerCase() === "body" ? self.getScrollTop() : $scroll.scrollTop;
                                if((self.type === "up" && _newDistance > 0) || (self.type === "down" && _newDistance < 0)){
                                    self.startY = self.pos(event).y;
                                    self.startScrollTop = _scrollTop;
                                    self.hasInsertDom = false;
                                    self.elStartY = -1;
                                    if(self.type === "up"){
                                        self.type = "down";
                                        if(self.up.el && self.up.el.parentNode){
                                            self.up.el.parentNode.removeChild(self.up.el);
                                            self.up.el = null;
                                        }
                                    }else{
                                        self.type = "up";
                                        if(self.down.el && self.down.el.parentNode){
                                            self.down.el.parentNode.removeChild(self.down.el);
                                            self.down.el = null;
                                        }
                                    }
                                    return false;
                                }
                            }
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
                            default :
                                break;
                        }
                    }
                    break;
                case self.touchend:
                    self.end(self.type,self.canRefresh,self.canLoadMore);
                    break;
                default :
                    break;
            }
        },
        end:function (type,canRefresh,canLoadMore) {
            var self = this;
            self.isTouchStart = false;
            if(canRefresh){
                self._end(self.down,false,canLoadMore,canRefresh);
            }else if(canLoadMore){
                self._end(self.up,true,canLoadMore,canRefresh);
            }else{
                //不加载中的话再恢复，加载中的时候由加载后去恢复
                if(!self.isLoading){
                    switch (type){
                        case "up": self.back(self.up,true); break;
                        case "down": self.back(self.down,false); break;
                    }
                }
            }
        },
        _end:function (obj,isUp,canLoadMore,canRefresh) {
            var self = this;
            if(isUp && obj.isScrollLoad){
                return false;
            }
            if((isUp && canLoadMore) || (!isUp && canRefresh)){
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
            }else{
                self.back(obj,isUp);
            }
        },
        back:function (obj,isUp) {
            var self = this;
            if(!isUp){
               // self.scrollBar.scrollTop = 0;
            }else {
                if(obj.isScrollLoad) return false;
            }
            if(obj.el){
                if(self.isEmptyData){
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
            var $scroll = self.scrollBar;
            var _up = self.up;
            if(!_up.enable || !_up.init){
                return false;
            }

            var scrollTop = $scroll.tagName.toLowerCase() === "body" ? self.getScrollTop() : $scroll.scrollTop;
            var _absMoveY = Math.abs(distance);
            var scrollBottomOffset = self.elPos($scroll).bottom;
            var containerBottomOffset = self.elPos($container).bottom;
            self.bottomDiff = scrollBottomOffset - containerBottomOffset;
            var bottomOffset = 0;
            if($scroll.tagName.toLowerCase() === "body"){
                bottomOffset = self.getScrollHeight() - (scrollTop + self.getWindowHeight());
            }else{
                bottomOffset = $scroll.scrollHeight - (scrollTop + $scroll.clientHeight);
            }
            //不禁用的话，鼠标一直按着在继续上拉的时候，就会出现移动了一定距离后，滚动条才开始动
            if(distance > 0 && scrollTop === 0){
                return false;
            }
            if(self.isLoading){
                //设置滚动条的位置
                $scroll.scrollTop = _absMoveY + self.startScrollTop;
                return false;
            }
            bottomOffset = bottomOffset - self.bottomDiff;//扣除底部的偏移量
            //移动到差不多底部的时候再创建元素。
            if(_up.init && bottomOffset - _up.distance < 0 && !self.hasInsertDom){
                self.createDiv(_up,true);
            }

            var _absInitDis = Math.abs(_up.distance);
            if(_up.el){
                //记录元素要可视的时候的初始鼠标坐标。
                if(bottomOffset < 5 && self.elStartY < 0)
                    self.elStartY = self.pos(e).y;
                var _absElMoveY = Math.abs(self.pos(e).y - self.elStartY);
                if(self.elStartY < 0 || self.pos(e).y > self.elStartY){
                    _absElMoveY = 0;//小于0，说明还不可见
                }
                if(e.cancelable)
                    e.preventDefault();
                var elInfo = self.updateElInfo(_up,true,_absElMoveY,_absInitDis);
                _up.el.innerHTML = elInfo.innerHtml;
                //滚动条为0，说明内容的总高度比容器的高度小，此时高度设置为初始的高度就可以了。
                if(!self.isScrollLoad && $scroll.scrollTop === 0 && elInfo.offsetY >= _up.distance){
                    elInfo.offsetY = _up.distance;
                }
                self.setHeight(_up.el,elInfo.offsetY);
                $scroll.scrollTop = _absMoveY + self.startScrollTop;
            }else{
                if(!self.isTouchWebkit)
                    $scroll.scrollTop = _absMoveY+ self.startScrollTop;
            }
        },
        downAction:function (e,distance) {
            var self = this;
            var $container = self.container;
            var $scroll = self.scrollBar;
            var _down = self.down;
            if(!_down.enable || !_down.init){
                return false;
            }
            var scrollTop = $scroll.tagName.toLowerCase() === "body" ? self.getScrollTop() : $scroll.scrollTop;
            var scrollTopOffset = self.elPos($scroll).top;
            var containerTopOffset = self.elPos($container).top;
            self.topDiff = containerTopOffset - scrollTopOffset;
            var topOffset = scrollTop - self.topDiff;//扣除顶部的偏移量
            var _absMoveY = Math.abs(distance);
            if(topOffset > 0){
                if(!self.isTouchWebkit){
                    //pc端不能拖动，所以要手动修改滚动条的位置
                    $scroll.scrollTop = self.startScrollTop - _absMoveY;
                }
                return false;
            }
            if(self.isLoading) {
                $scroll.scrollTop = self.startScrollTop - _absMoveY;
                return false;
            }
            if(!self.hasInsertDom){
                self.createDiv(_down,false);
            }
            var _absInitDis = Math.abs(_down.distance);
            if(_down.el){
                //记录元素要可时的时候的初始鼠标坐标。
                if(topOffset <= 0 && self.elStartY < 0)
                    self.elStartY = self.pos(e).y;
                var _absElMoveY = Math.abs(self.pos(e).y - self.elStartY);
                if(self.elStartY < 0 || self.pos(e).y < self.elStartY){
                    _absElMoveY = 0;//小于0，说明还不可见
                }
                if(e.cancelable)
                    e.preventDefault();
                var elInfo = self.updateElInfo(_down,false,_absElMoveY,_absInitDis);
                _down.el.innerHTML = elInfo.innerHtml;
                self.setHeight(_down.el,elInfo.offsetY);
            }
        },
        updateElInfo:function (obj,isUp,_absElMoveY,_absInitDis) {
            var self = this;
            var curInnerHtml = obj.init;
            var _offsetY = 0;
            self.canRefresh = false;
            self.canLoadMore = false;
            // 下拉距离 <= 初始距离
            if(_absElMoveY <= _absInitDis){
                _offsetY = _absElMoveY;
                curInnerHtml = obj.init;
                self.setCan(isUp,false);
                // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absElMoveY > _absInitDis && _absElMoveY <= _absInitDis*2){
                _offsetY = _absInitDis+(_absElMoveY-_absInitDis)*0.5;
                curInnerHtml = obj.release;
                self.setCan(isUp,true);
                // 下拉距离 > 指定距离*2
            }else{
                _offsetY = _absInitDis+_absInitDis*0.5+(_absElMoveY-_absInitDis*2)*0.2;
                curInnerHtml = obj.release;
                self.setCan(isUp,true);
            }
            return {
                innerHtml:curInnerHtml,
                offsetY:_offsetY
            };
        },
        upLoadMore:function (isInitLoad) {
            var self = this;
            var _up = self.up;
            if(_up.el && !self.isLoading){
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
                //生成随机数，并添加到id里面去，使其可以支持多个加载和刷新
                obj.el.id += self.randomString(6);
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
                //这个返回的坐标会一直闪啊
                // if (e.pageX) return {x: e.pageX, y: e.pageY};
                return {
                    x: e.clientX + D.scrollLeft - D.clientLeft,
                    y: e.clientY + D.scrollTop - D.clientTop
                };
            }
        },
        //获取元素距离页面的坐标
        elPos:function (el) {
            var rect = el.getBoundingClientRect();
            var top = document.documentElement.clientTop;
            var left= document.documentElement.clientLeft;
            return{
                top    :   rect.top - top,
                bottom :   rect.bottom - top,
                left   :   rect.left - left,
                right  :   rect.right - left
            };
        },
        getScrollTop:function (){
            var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if(document.body){
                bodyScrollTop = document.body.scrollTop;
            }
            if(document.documentElement){
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        },
        //文档的总高度
        getScrollHeight :function(){
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if(document.body){
                bodyScrollHeight = document.body.scrollHeight;
            }
            if(document.documentElement){
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        },
        //浏览器视口的高度
        getWindowHeight:function (){
            var windowHeight = 0;
            if(document.compatMode === "CSS1Compat"){
                windowHeight = document.documentElement.clientHeight;
            }else{
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
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
        randomString:function(len) {
            len = len || 32;
            var $chars = "ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstvuwxyz0123456789";
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        prependChild: function(p,o){
            if(p.hasChildNodes()){
                p.insertBefore(o,p.firstChild);
            }else{
                p.appendChild(o);
            }
        }
    };

    if (typeof exports === "object") {
        module.exports = PullLoad;
    } else if (typeof define === "function" && define.amd) {
        define([], function () {
            return PullLoad;
        });
    } else {
        win.PullLoad = PullLoad;
    }
})(window, document);