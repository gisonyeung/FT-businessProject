$(document).ready(function() {
    var baseUrl = 'http://' + window.location.host;
	$("input:checkbox, input:radio").uniform();

    if( !window.name ) {
         alert('无内容');
         location.href = './allnews.html';
    }

     newsObj = JSON.parse(window.name);

    // 修改内容
    $('#news-title').val(newsObj.title);
    $('#news-summary').val(newsObj.summary);
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
        // "events": {
        //     load: function(){
        //         // console.log("Loaded!");
        //     },
        //     blur: function(){
        //     	// console.log($("#detail").val());
        //     }
        // }
    });
    // $('#detail').data("wysihtml5").editor.setValue(newsObj.content);



    // 提交表单
    $('#news-btn').on('click', function() {

        if( confirm('确定修改公告？') ) {

            var latestNews = {
                newsId: newsObj.id, 
                content: $('#detail').val(), 
                title: $('#news-title').val(), 
                messageType: $('#newsTypeRadio2').parent().hasClass('checked') ? '0' : '1', 
                summary: $('#news-summary').val(), 
                display: newsObj.display,
            };

            if( !checkForm(latestNews) ) {
                return false;
            }

            $.ajax({
                url: baseUrl + '/news/modify',
                method: 'POST',
                data: latestNews,
                success: function(result) {
                    if( result == 'success' ) {
                        alert('修改公告成功');
                        location.href = './allnews.html';
                    } else {
                        alert('修改公告失败，原因：' + result);
                    }
                },
                error: function() {
                    alert('服务器异常，删除失败！');
                }
            });
        }
    });


    function checkForm(data) {

        if( !data.newsId ) {
            return false;
        }

        if( !news.title ) {
            $('#news-title').focus();
            alert('标题不能为空');
            return false;
        } else if( !news.summary ) {
            $('#news-summary').focus();
            alert('摘要不能为空');
            return false;
        } else if( !news.content ) {
            $('#detail').focus();
            alert('内容不能为空');
            return false;
        }

        return true;

    }

});