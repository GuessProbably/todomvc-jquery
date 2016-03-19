/**
 * Created by 丽哲 on 2016/3/13.
 */
(function () {

    'use strict';

    var newtodoarr = [];

    /*判断是否已经存在数据*/
    if(!localStorage.todoslocal112){
        localStorage.todoslocal112 = '[]';
    }
    newtodoarr = eval(localStorage.todoslocal112);

    if(newtodoarr.length!=0){
        $("#main,#footer").css("display","block")
        for(var i = 0;i<newtodoarr.length;i++){
            addlist(i);
        }
        addfooter();
        zongtodo();
    }

    /*添加列表确认事件（回车）*/
    $("#new-todo").keyup(function(){
        if($("#new-todo").val() != '' && event.keyCode == 13){
            $("#main,#footer").css("display","block")
            var newValue = $("#new-todo").val();
            $("#new-todo").val("");
            var newtodoarrs = {'id':suiji(),'title' : newValue,'boln' : true}
            newtodoarr.push(newtodoarrs);
            localStorage.todoslocal112 = JSON.stringify(newtodoarr)
            addlist();
            addfooter();
        }
        zongtodo();
    });

    /*全选功能*/
    var sun = 1;
    $("#toggle-all").on('click', function () {
        if(sun==1) {
            $("#todo-list li").addClass("completed");
            $("#todo-count").children().html(0);
            $("#footer").append('<button id="clear-completed">Clear completed</button>')
            for(var i = 0;i<newtodoarr.length;i++){
                newtodoarr[i].boln = false;
            }
            sun = 0;
        }else {
            $("#todo-list li").removeClass("completed");
            $("#todo-count").children().html(newtodoarr.length);
            $("#clear-completed").remove();
            for(var i = 0;i<newtodoarr.length;i++){
                newtodoarr[i].boln = false;
            }
            sun = 1;
        }
        zongtodo();
        $("#clear-completed").on('click', function () {
            for(var i = 0;i<newtodoarr.length;i++){
                if(newtodoarr[i].boln == false){
                    newtodoarr.splice(i,1);
                    console.log(newtodoarr);
                }
            }
            $("#todo-list").empty();
            for(var j = 0;j<newtodoarr.length;j++){
                addlist(j)
            }
            if(newtodoarr.length == 0){
                $("#footer").css("display","none")
            }

            zongtodo();
        })
    })

    /*总函数*/
    function zongtodo(){
        /*删除*/
        $(".destroy").on("click",removetodo);

        /*选择*/
        $(".toggle").on("click", xuanzetodo);

        /*修改获取焦点*/
        $("#todo-list li").on("dblclick", function () {
            $(this).addClass('editing').children("input").focus();
        });
        /*修改失去焦点*/
        $("#todo-list li>input").on("blur", blurtodo);
        /*修改回车保存数据*/
        $("#todo-list li>input").keyup(function() {
            if ($("#todo-list li>input").val() != '' && event.keyCode == 13) {
                blurtodo();
            }
        });

        /*底部按钮*/
        $("#filters li").eq(0).on('click', function () {
            footertodoall()
        })
        $("#filters li").eq(1).on('click', function () {
            footertodo(true)
        })
        $("#filters li").eq(2).on('click', function () {
            footertodo(false)
        })
    }

    /*删除函数*/
    function removetodo(){
        for(var i = 0;i<newtodoarr.length;i++){
            if(newtodoarr[i].id == $(this).parents().parents().attr('id')){
                newtodoarr.splice(i,1);
                localStorage.todoslocal112 = JSON.stringify(newtodoarr)
                $("#todo-list li").eq(newtodoarr.length-i).remove();
                var item = 0;
                for(var j = 0;j<newtodoarr.length;j++){
                    if(newtodoarr[j].boln==true){
                        item++;
                    }
                }
                $("#todo-count").children().html(item);
                console.log(newtodoarr);
            }
        }
        if(newtodoarr.length==0){
            $("#main,#footer").css("display","none")
        }
    }

    /*选择函数*/
    function xuanzetodo(){
        var index = $(this);
        index.parents().parents().toggleClass("completed");
        if(index.parents().parents().attr('class') == 'completed') {
            todoxuianze(false);
        }else {
            todoxuianze(true);
        }
        /*选择判断函数*/
        function todoxuianze(xuanze){
            for (var i = 0; i < newtodoarr.length; i++) {
                if (newtodoarr[i].id == index.parents().parents().attr('id')) {
                    newtodoarr[i].boln = xuanze;
                    var items = 0;
                    for(var j = 0;j<newtodoarr.length;j++){
                        if(newtodoarr[j].boln == false){
                            items++;
                        }
                    }

                    $("#footer button").remove();
                    if(items!=0){
                        $("#footer").append('<button id="clear-completed">Clear completed</button>')
                    }else {
                        $("#footer button").remove();
                    }
                    $("#todo-count").children().html(newtodoarr.length-items);
                }
            }

            $("#clear-completed").on('click', function () {
                for(var i = 0;i<newtodoarr.length;i++){
                    if(newtodoarr[i].boln == false){
                        newtodoarr.splice(i,1);
                        console.log(newtodoarr);
                    }
                }
                $("#todo-list").empty();
                for(var j = 0;j<newtodoarr.length;j++){
                    addlist(j)
                }
                if(newtodoarr.length == 0){
                    $("#footer").css("display","none")
                }
                zongtodo();
            })
        }
    }

    /*底部按钮选择事件*/
    function footertodo(footertd){
        $("#todo-list").empty();
        for(var i = 0;i<newtodoarr.length;i++){
            if(newtodoarr[i].boln==footertd){
                addlist(i)

                if(footertd == false){
                    $("#filters li").eq(2).children('a').addClass('selected').end().siblings().children().removeClass('selected');
                    $("#todo-list li").addClass('completed');
                }else {
                    $("#filters li").eq(1).children('a').addClass('selected').end().siblings().children().removeClass('selected');
                }
            }
        }
        /*删除*/
        $(".destroy").on("click",removetodo);

        /*选择*/
        $(".toggle").on("click", xuanzetodo);

        /*修改获取焦点*/
        $("#todo-list li").on("dblclick", function () {
            $(this).addClass('editing').children("input").focus();
        });

        /*修改失去焦点*/
        $("#todo-list li>input").on("blur", blurtodo);

        /*修改回车保存数据*/
        $("#todo-list li>input").keyup(function() {
            if ($("#todo-list li>input").val() != '' && event.keyCode == 13) {
                blurtodo();
            }
        });
    }
    function footertodoall(){
        $("#todo-list").empty();

        for(var i = 0;i<newtodoarr.length;i++){
            addlist(i)
            $("#filters li").eq(0).children('a').addClass('selected').end().siblings().children().removeClass('selected');
        }
        for(var j = 0;j<newtodoarr.length;j++){
            if(newtodoarr[j].boln == false){
                //console.log(i);
                $("#todo-list li").eq(j).addClass('completed');
            }
        }
        /*删除*/
        $(".destroy").on("click",removetodo);

        /*选择*/
        $(".toggle").on("click", xuanzetodo);


        /*修改获取焦点*/
        $("#todo-list li").on("dblclick", function () {
            $(this).addClass('editing').children("input").focus();
        });
        /*修改失去焦点*/
        $("#todo-list li>input").on("blur", blurtodo);
        /*修改回车保存数据*/
        $("#todo-list li>input").keyup(function() {
            if ($("#todo-list li>input").val() != '' && event.keyCode == 13) {
                blurtodo();
            }
        });
    }

    /*失去焦点事件*/
    function blurtodo() {
        $(this).parent().removeClass('editing');
        for (var i = 0; i < newtodoarr.length; i++) {
            if (newtodoarr[i].id == $(this).parent().attr("id")) {
                newtodoarr[i].title = $(this).val();
                $(this).siblings("div").children('label').html(newtodoarr[i].title);
                $(this).val(newtodoarr[i].title);
            }
        }
    }

    /*添加列表*/
    function addlist(i){
        if(!i){
            i = newtodoarr.length-1
        }
        var str = '';
        str+='<li id="'+newtodoarr[i].id+'">';
        str+='<div class="view">';
        str+='<input class="toggle" type="checkbox">';
        str+='<label>'+ newtodoarr[i].title +'</label>';
        str+='<button class="destroy"></button>';
        str+='</div>';
        str+='<input class="edit" value="'+newtodoarr[i].title+'">';
        str+='</li>';
        $('#todo-list').prepend(str);
    }

    /*底部添加*/
    function addfooter() {
        if (newtodoarr.length != 0) {
            var str2 = '';
            str2 += '<span id="todo-count"><strong>' + newtodoarr.length + '</strong> items left</span>';
            str2 += '<ul id="filters">';
            str2 += '<li>';
            str2 += '<a class="selected" href="#/all">All</a>';
            str2 += '</li>';
            str2 += '<li>';
            str2 += '<a href="#/active">Active</a>';
            str2 += '</li>';
            str2 += '<li>';
            str2 += '<a href="#/completed">Completed</a>';
            str2 += '</li>';
            str2 += '</ul>';
            $('#footer').html(str2);
        }
    }

    /*随机数*/
    function suiji(){
        var suijishu = Math.random();
        suijishu = "blz"+suijishu;
        //console.log(suijishu);
        return suijishu;

    }
})();