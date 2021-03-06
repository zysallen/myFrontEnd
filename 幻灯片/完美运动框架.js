function startMove(obj,json,fnEnd) {
	function getStyle(obj,name) {
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj,0)[name];
		}
	}
	clearInterval(obj.timer)
	obj.timer=setInterval(function () {
		var bStop=true;       //假设 所有值都已经到了目标点
		for(var name in json) {
			var cur=0;
			if (name=='opacity') {
				cur=Math.round(parseFloat(getStyle(obj,name))*100);
			} else {
				cur=parseInt(getStyle(obj,name));
			}
			var speed=(json[name]-cur)/6;
			speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);

			if (cur!=json[name]) {bStop=false;}
			// if (cur==json[name]) {
			// 	clearInterval(obj.timer);
			// 	if (fnEnd) {fnEnd()};
			// } else {
			if (name=='opacity') {
				obj.style.opacity=(cur+speed)/100;
				obj.style.filter='alpha(opacity:'+cur+speed+')';
			} else {
			obj.style[name]=cur+speed+'px';
			}
		}
			if (bStop) {
				clearInterval(obj.timer);
				if (fnEnd) {fnEnd()};
			}	
	},30)
}