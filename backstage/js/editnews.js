$(document).ready(function() {

	$("input:checkbox, input:radio").uniform();

    if( !window.name ) {
        alert('无内容');
        location.href = './allnews.html';
    }

    newsObj = JSON.parse(window.name);

    // 修改内容
    $('#news-title').val(newsObj.title);
    $('#news-summary').val(newsObj.content);
    $('#detail').val(newsObj.content);
    if(newsObj.messageType == '新闻公告') {
        $('#newsTypeRadio1').parent().addClass('checked');
    } else {
        $('#newsTypeRadio2').parent().addClass('checked');
    }

    // wysihtml5 plugin on textarea
    $("#detail").wysihtml5({
        "font-styles": false,
        "image": false,
        "color": true,
        "html": true,
        "events": {
            load: function(){
                // console.log("Loaded!");
            },
            blur: function(){
            	// console.log($("#detail").val());
            }
        }
    });



    // 提交表单
    $('#news-btn').on('click', function() {

        if( confirm('确定修改公告？') ) {
            var latestNews = {
                newsId: newsObj.newsId, 
                content: $('#detail').val(), 
                title: $('#news-title').val(), 
                messageType: $('#newsTypeRadio2').parent().hasClass('checked') ? '0' : '1', 
                summary $('#news-summary').val(), 
                display: newsObj.display,
            };
            $.ajax({
                url: baseUrl + '/news/modify',
                method: 'POST',
                data: latestNews,
                success: function(result) {
                    if( result == 'success' ) {
                        alert('修改成功');
                        location.href = './allnews.html';
                    } else {
                        alert('修改失败，原因：' + result);
                    }
                },
                error: function() {
                    alert('服务器异常，删除失败！');
                }
            });
        }
    });

});