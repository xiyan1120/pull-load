# pull-load
一款兼容PC和移动设备的下拉刷新和上拉加载的组件，同时也支持滚动到底部加载和初始化后即开始加载

gitHub: https://github.com/xiyan1120/pull-load   
OSChina: https://git.oschina.net/564468767/pull-load  
尊重原创，转载请注明转自：https://my.oschina.net/u/164010/blog/833722

![](https://github.com/xiyan1120/pull-load/raw/master/imgs/1.png)   
![](https://github.com/xiyan1120/pull-load/raw/master/imgs/2.png)   
![](https://github.com/xiyan1120/pull-load/raw/master/imgs/3.png)   
![](https://github.com/xiyan1120/pull-load/raw/master/imgs/4.png)   
![](https://github.com/xiyan1120/pull-load/raw/master/imgs/5.png)   
![](https://github.com/xiyan1120/pull-load/raw/master/imgs/6.png)   
###1.引入js：
``` javascript
	<script type="text/javascript" src="dist/pull-load.min.js"></script>
```
###2.使用：
``` javascript
		new PullLoad({
		//整个滚动层的容器的dom
		container:document.getElementById("outerScroller"),
        //指定滚动条的dom，不指定默认为container  
        //scrollBar:document.getElementsByTagName("body")[0],    
		down:{
		    distance:50,//默认距离
		    enable:true,
		    callback:function (end) {
			setTimeout(function () {
			    console.log("end");
			    var isEmptyData = false;
			    end(isEmptyData);
			},1500);
		    }
		},
		up:{
		    distance:50,//默认距离，也是创建的div的默认g高度
		    isScrollLoad:false,
		    isInitLoad:false,
		    enable:true,
		    callback:function (end) {
			setTimeout(function () {
			    console.log("end");
			    var isEmptyData = false;
			    end(isEmptyData);
			},1500);
		    }
		}
	    });
```
###3.up：
``` javascript
		up:{
			//这个距离是用于匹配是显示上拉加载更多，还是显示释放加载
			distance:50,
			//创建的div的容器，也是下面设置的html的父级
			container:'<div class="pull-load-container"></div>',
			//初始化时显示的html
			init:'<div class="pull-load-up"><span><span class="pull-load-up-icon"></span>上拉加载更多...</span></div>',
			//加载时显示的html
			loading:'<div class="pull-load-up pull-load-loading"><span class="pull-load-up-icon"></span>加载中...</span></div>',
			//释放的时候显示的html
			release:'<div class="pull-load-up flip"><span><span class="pull-load-up-icon"></span>释放加载...</span></div>',
			//没有数据的时候显示的html
			emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
			//是否可用
			enable:true,
			//是否滚动到div底部就加载。
			isScrollLoad:false,
			//是否初始化完成后就加载
			isInitLoad:false,
			//回调函数，参数为调用结束要执行的函数
			callback:function(end){
				//未加载到数据的时候设置为true，否则为false
				var isEmptyData = true;
				//这个函数有个参数，用于设置是否已经没有数据了。
				end(isEmptyData)
			}
		}
```
###4.down（描述同up）:
``` javascript
		down:{
			//这个距离是用于匹配是显示上拉加载更多，还是显示释放加载，同时也是要创建的底部div的默认高度
			distance:50,
			container:'<div class="pull-load-container"></div>',
			init:'<div class="pull-load-down"><span><span class="pull-load-down-icon"></span>下拉刷新...</span></div>',
			loading:'<div class="pull-load-down pull-load-loading"><span class="pull-load-down-icon"></span>刷新中...</span></div>',
			release:'<div class="pull-load-down flip"><span><span class="pull-load-down-icon"></span>释放刷新...</span></div>',
			emptyData:'<div class="pull-load-empty-data">没有更多数据了</div>',
			enable:true,
			callback:null
		}
```
