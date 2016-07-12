$(document).ready(function() {
	var baseUrl = 'http://' + window.location.host;

	// 获取模板
	var tr_tpl = $('#tr_tpl').html();
	var btn_tpl1 = $('#btn_tpl1').html();
	var btn_tpl2 = $('#btn_tpl2').html();

	var newsCache = {};
	// 获取公告
	$.ajax({
		url: baseUrl + '/news/getNewsForBackstage',
		method: 'GET',
		success: function(data) {
			data = newsCache = parseJSON(data);
			var allNews = '';
			// 生成全部新闻
			for(var i = 0; i < data.length; i++) {

				var itemObj = {
					id: data[i].id,
					messageType: data[i].messageType,
					type: data[i].messageType == '新闻公告' ? 'type-1' : 'type-2',
					time: data[i].issueDate,
					title: data[i].title,
					url: baseUrl + '/news/getDetail?newsId=' + data[i].id,
					status: data[i].display ? "上线中" : "已下线",
					isOnline: data[i].display ? "label-success" : "",
					handle: data[i].display ? btn_tpl1 : btn_tpl2
				};

				newsCache[data[i].id] = data[i];

				// 正则替换模板
				var item = tr_tpl.replace(/{{(.*?)}}/g, function(match, $1) {
					return itemObj[$1];
				});

				allNews += item;
			}

			// 写入DOM
			$('tbody').append( $(allNews) );

		},
		error: function() {
			alert('服务器异常，获取列表失败！');
		}
	});

	// 编辑新闻
	$('tbody').on('click', '.handle-edit', function() {
		var id = $(this).parent().attr('data-id');
		window.name = JSON.stringify(newsCache[id]);
		location.href = './editnews.html';
	});

	// 删除新闻
	$('tbody').on('click', '.handle-delete', function() {
		var id = $(this).parent().attr('data-id');
		var elem = $('#item-' + id);

		if( confirm('确定删除编号为' + id + '的公告？此操作将不可恢复') ) {
			$.ajax({
				url: baseUrl + '/news/delete',
				method: 'GET',
				data: {
					newsId: parseInt(id, 10)
				},
				success: function(result) {
					if( result == 'success' ) {
						alert('删除成功');
						$(elem).remove();
					} else {
						alert('操作失败，原因：' + result);
					}
				},
				error: function() {
					alert('服务器异常，删除失败！');
				}
			});
		}
	});	

	// 下线
	$('tbody').on('click', '.handle-offline', function() {
		var id = $(this).parent().attr('data-id');
		var label = $('#item-' + id).find('.label');

		if( confirm('确定下线编号为' + id + '的公告？重新上线将更新发布时间') ) {
			$.ajax({
				url: baseUrl + '/news/modifyNewsStatus',
				method: 'POST',
				data: {
					newsId: parseInt(id, 10),
					display: false,
				},
				success: function(result) {
					if( result == 'success' ) {
						$(label).text('已下线');
						$(label).removeClass('label-success');
					} else {
						alert('操作失败，原因：' + result);
					}
				},
				error: function() {
					alert('服务器异常，删除失败！');
				}
			});
		}
	});

	// 重新发布
	$('tbody').on('click', '.handle-publish', function() {
		var id = $(this).parent().attr('data-id');

		if( confirm('确定重新发布编号为' + id + '的公告？重新上线将更新发布时间') ) {
			$.ajax({
				url: baseUrl + '/news/modifyNewsStatus',
				method: 'POST',
				data: {
					newsId: parseInt(id, 10),
					display: false,
				},
				success: function(result) {
					if( result == 'success' ) {
						location.reload();
					} else {
						alert('操作失败，原因：' + result);
					}
				},
				error: function() {
					alert('服务器异常，删除失败！');
				}
			});
		}
	});


	// 分类过滤按钮
	$('.filter-block').on('click', '.filter-btn', function() {

		// 去除激活状态并取消过滤
		if( $(this).hasClass('active') ) {

			$(this).removeClass('active');
			$('.news-item').show();

		} else {

			// 切换到激活状态并显示内容
			$('.filter-btn').removeClass('active');
			$(this).addClass('active');
			$('.news-item').hide();
			$('.' + $(this).attr('data-target')).show();

		}
	});


	// 过滤搜索框
	$('.news-search').on('keyup', function() {
		var value = $(this).val();
		if(/\S/.test(value)) { // 不为空
			$('.news-item').hide().filter(":contains('"+$(this).val()+"')").show();
		} else { // 为空则取消过滤
			$('.news-item').show();
		}

	});







});


/*
	@description 传入一个JSON字符串或对象，返回一个对象
	@param {String} or {Object} 传入一个JSON字符串或对象
	@return {Object} 返回一个对象
*/
function parseJSON(str) {

	// 为空，则返回一个空对象
	if( !str ) {
		return {};
	}

	// 如果传入参数为对象，则直接返回原对象
	if( typeof(str) == 'object' ) {
		return str;
	}

	var obj;
	try {
		obj = JSON.parse(str) || {};
	} catch(e) {
		console.log( str + '，JSON解析出错')
		obj = {};
	}

	return obj;

}