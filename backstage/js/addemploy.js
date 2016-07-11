$(document).ready(function() {
	$("input:checkbox, input:radio").uniform();
    // KindEditor.ready(function(K) {
    //         window.editor = K.create('#editor-1');
    // });

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

});