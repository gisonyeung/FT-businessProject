$(document).ready(function() {

    var baseUrl = 'http://' + window.location.host;

    // wysihtml5 plugin on textarea
    var textArea = $("#detail").wysihtml5({
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



    // 获取内容
    $.ajax({
        url: baseUrl + '/employ/getDemandForEdit',
        method: 'GET',
        success: function(result) {
            $('#detail').data("wysihtml5").editor.setValue(result.replace(/\\n/g, '<br>'));

        },
        error: function() {
            alert('服务器异常，获取内容失败！');
        }
    });


    // 提交表单
    $('#news-btn').on('click', function() {

        if( confirm('确定更新内容？') ) {
            var content = $('#detail').val();

            if( !/\S/.test(content) ) {
                alert('内容不能为空');
                return false;
            }

            $.ajax({
                url: baseUrl + '/employ/modify',
                method: 'POST',
                data: {
                    content: content
                },
                success: function(result) {

                    if( result == 'success' ) {
                        alert('更新成功');
                        location.href = baseUrl + '';
                    } else {
                        alert('更新失败，原因：' + result);
                    }
                },
                error: function() {
                    alert('服务器异常，删除失败！');
                }
            });
        }
    });





});