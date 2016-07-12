$(document).ready(function() {
    var baseUrl = 'http://' + window.location.host;
	$("input:checkbox, input:radio").uniform();


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

    $('#newsTypeRadio1').parent().addClass('checked');

    // 提交表单
    $('#news-btn').on('click', function() {

        if( confirm('确定新增公告？') ) {
            var latestNews = {
                content: $('#detail').val(), 
                title: $('#news-title').val(), 
                messageType: $('#newsTypeRadio2').parent().hasClass('checked') ? '0' : '1', 
                summary: $('#news-summary').val()
            };

            if( !checkForm(latestNews) ) {
                return false;
            }

            $.ajax({
                url: baseUrl + '/news/addNews',
                method: 'POST',
                data: latestNews,
                success: function(result) {
                    var id = parseInt(result, 10)
                    if( typeof(id) == 'number' ) {
                        alert('新增公告成功，编号为' + id + '公告状态为未上线状态，请手动上线。');
                        location.href = './allnews.html';
                    } else {
                        alert('新增公告失败，原因：' + result);
                    }
                },
                error: function() {
                    alert('服务器异常，删除失败！');
                }
            });
        }
    });


    function checkForm(news) {


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