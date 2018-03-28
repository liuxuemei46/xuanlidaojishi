//通用函数
	function normal(selector) {
		var method = selector.substr(0,1) == "."?'getElementsByClassName' : 'getElementById';
		return document[method](selector.substr(1));
		
	}//为取到dom元素id为wrapper作为date.js里面数据的存放框架
    	
	//随机生成海报的索引值
	function random(range) {
		var max = Math.max(range[0],range[1]);
		var min = Math.min(range[0],range[1]);
		var decr = max - min;
		var numb = Math.floor(Math.random() * decr + min);
		return numb;
	}
	
	//输出所有的海报,输出所有的数据
	var data = data;
	function addPhotos() {
		
		var box = normal('#wrapper').innerHTML;
	     var html = [];
	     var nav = [];
	  for(var i = 0; i < data.length; i ++) {
	  	 var _html = box
	  	                .replace('{{index}}',i)
	  	                .replace('{{img}}', data[i].img)
	  	                .replace('{{caption}}',data[i].caption)
	  	                .replace('{{desc}}',data[i].desc);
	  	    html.push(_html);
	  	    nav.push('<span id="nav'+ i + '" onclick="turn( normal(\'#photo' + i + '\') )"   class="m"></span>');
	  	  
	}  
	  html.push('<div class="nav">' + nav.join('') + '</div>');
	  normal('#wrapper').innerHTML = html.join("");
	  
	  
	 var num = random([0, data.length]);
	 reSort(num);
	  
	  
	  
	  
}  
	addPhotos();  
	  

	
	//翻转控制函数
	function turn (elem) {
		var cls = elem.className;
		var n = elem.id.replace(/[^0-9]/ig,"");
		if(!/photo-center/.test(cls)){
			return reSort(n);
		}
		if(/photo-front/.test(cls)) {
			cls = cls.replace(/photo-front/, 'photo-back');
             normal("#nav" + num).className = normal("#nav" + num).className.replace('m' , 'm current-back')
		}else{
			cls = cls.replace(/photo-back/ , 'photo-front');
			normal("#nav" + num).className = normal("#nav" + num).className.replace(/\s*current-back\s*/," ");
		}
		return elem.className = cls;//cls此时的字符串形式的photo-front或者photo-back,等于对象的改数值
	}
	
	//计算左右分区的范围
 	function range() {
 		var rangeSet = {left : {x : [], y : []} , right : {x : [], y : []}};
 		var wrapper = {
 			    w : normal('#wrapper').clientWidth,
 			    h : normal('#wrapper').clientHeight
 			    
 		};
 		
 		var photo = {
 			   w : normal('.photo')[0].clientWidth,
 			   h : normal('.photo')[0].clientHeight
 		};
 		rangeSet.wrapper = wrapper;
 		rangeSet.photo = photo;
 		rangeSet.left.x = [0 - photo.w, wrapper.w / 2 - photo.w / 2];
 		rangeSet.left.y = [0 - photo.h, wrapper.h];
 		rangeSet.right.x = [wrapper.w / 2 + photo.w / 2, wrapper.w + photo.w];
 		rangeSet.right.y = [0 - photo.h , wrapper.h];
 		return rangeSet;
 	}
 	
		
	
//排序海报
    function reSort(num) {
 	
 	
 	var _photo = normal('.photo');
 	  var photos = [];
 	for(var i = 0; i < _photo.length; i ++) {
 		_photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/,"");
 		_photo[i].className = _photo[i].className.replace(/\s*photo-front\s*/,"");
 		_photo[i].className = _photo[i].className.replace(/\s*photo-back\s*/,"");
 		
 		_photo[i].style.left = "";
 		_photo[i].style.top = "";
 	    _photo[i].style['transform'] = 'scale(1)';
 	    
 	    _photo[i].className += ' photo-front ';
 		photos.push(_photo[i]);
 	}
 	var photoCenter = normal('#photo' + num);                                                                                                                                                                                                  
 	  photoCenter.className += 'photo-center';
 	  photoCenter = photos.splice(num, 1)[0];
 	//把海报分为左右两个部分
 	var photosLeft = photos.splice(0, Math.ceil(photos.length / 2));
 	var photosRight = photos;
 	
 	
 	var ranges = range();
 	
 	
 	for(i in photosLeft) {
 	  var photo = photosLeft[i];
 	  photo.style.left = random(ranges.left.x) + 'px';
 	  photo.style.left = random(ranges.left.y) + 'px';
 	  //给予左分区海报有一定的角度
 	  photo.style['transfom'] = photo.style['-webkit-transfom'] = 'rotate('+random([-100,100]) +' deg) scale(1)';
 	    
 	
 	  
 	}
 	
 	for(i in photosRight) {
 	   var photo = photosRight[i];
 	   photo.style.right = random(ranges.right.x) + 'px';
 	   photo.style.right = random(ranges.right.y) + 'px';
 		//给予右分区海报有一定的角度
 		photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate('+randm([-100,100]) +'deg) scale(1)';
 	}
 	
 	
 	//控制按钮处理
 	var navs = normal('.m');
 	for(var i = 0; i < navs.length; i ++) {
 		navs[i].className = navs[i].className.replace(/\s*current\s*/,"");
 		navs[i].className = navs[i].className.replace(/\s*current-back\s*/,"");
 		normal('#nav-' + num).className +='m-current';
 		
 	}
 	normal("#nav" + num).className += " current";
 	
 	
 	
 	
 	
 	
 
 	
 }

















