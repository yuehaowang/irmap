# irmap

## 简介

irmap是一个用来做高中毕业去向的工具。基于Bootstrap和百度地图。兼容各大主流浏览器，iOS，Android，以及QQ和微信等平台。

以下是示例展示：

- ### 6map

![6map](http://images.cnblogs.com/cnblogs_com/yorhom/731449/o_6map.png)

在线地址：[http://wyh.wjjsoft.com/6map/](http://wyh.wjjsoft.com/6map/)


## 如何使用？

你只用更改config.js文件里的内容就能完成整个地图的生成。示例如下：

```javascript
/** 更多样式 http://developer.baidu.com/map/custom/list.htm */
var MAP_STYLE = "hardedge";

var DATA = {
	"city_1" : {
		"univ_A" : ["Peter", "Mary"],
		"univ_B" : ["Tony", "Pepper"]
	},

	"city_2" : {
		"univ_C" : ["Stephen", "Klay", "Kevin"]
	}
};

var SPEC_POS = {
	"univ_C" : [121.597479, 31.185356]
};

var MAP_TITLE = "毕业去向";

var ABOUT = {
	"作者" : ["Yuehao"],
	"框架" : ["irmap", "Bootstrap", "百度地图"]
};
```

这个文件会被自动引进项目中，所以不要更改这个文件的名字和位置，其中定义的变量将会在项目中被使用。以下介绍其中定义的变量：

- MAP_STYLE 地图样式，参考[http://developer.baidu.com/map/custom/list.htm](样式列表)。
- DATA 学校数据。格式参考上面的示例。地图上的地标根据这个变量里的内容自动定位。
- SPEC_POS 一些学校（比如国外的学校）的位置百度地图无法通过搜索定位，或者定位有误，更改这个属性可以设置学校的经纬度从而辅助定位。
- MAP_TITLE 地图图标
- ABOUT 关于界面中的内容。格式：{"标题" : ["第一行内容", "第二行内容"]}。

## 开源协议

GPL协议（协议详情见：[维基百科](https://en.wikipedia.org/wiki/GNU_General_Public_License)）