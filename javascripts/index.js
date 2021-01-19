$(document).ready(function(){
    var matrix_canvas = document.getElementById('matrix_canvas');
    var headerProgressBarInner = $('#headerProgressBarInner');
    var headerProgressBarInner_width = 0;

    var s = window.screen;
    var width = matrix_canvas.width = s.width;
    var height = matrix_canvas.height = s.height;
    var letters = Array(512).join(1).split('');
    var counter = 0;
    var counter_opacity = 70;
    var canvas_opacity = 1.0

    var matrix_text_colour = '#ef741b';
    var rainbow_matrix = false;



    var drawMatrix = function () {
        matrix_canvas.getContext('2d').fillStyle='rgba(0,0,0,.1)';
        matrix_canvas.getContext('2d').fillRect(0,0,width,height);
        matrix_canvas.getContext('2d').fillStyle=matrix_text_colour;
        letters.map(function(y_pos, index){
            text = String.fromCharCode(3e4+Math.random()*33);
            x_pos = index * 10;

            if(rainbow_matrix){
                var red = Math.floor(Math.random() * 255) + 1;
                var green = Math.floor(Math.random() * 255) + 1;
                var blue = Math.floor(Math.random() * 255) + 1;
                matrix_canvas.getContext('2d').fillStyle='rgb('+red+','+green+','+blue+')';
            }
            matrix_canvas.getContext('2d').fillText(text, x_pos, y_pos);
            letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
        });
        if(counter<70){
            matrix_canvas.getContext('2d').fillStyle='rgba(0,0,0,1)';
            matrix_canvas.getContext('2d').fillRect(0,0,width,height);
            counter++;
            //headerProgressBarInner.width = headerProgressBarInner_width+"%";
            //headerProgressBarInner.animate({width: headerProgressBarInner_width+'%'});
            headerProgressBarInner.width(headerProgressBarInner_width+'%');
            headerProgressBarInner_width++;
        }else if (counter_opacity>0){
            matrix_canvas.getContext('2d').fillStyle='rgba(0,0,0,'+canvas_opacity+')';
            matrix_canvas.getContext('2d').fillRect(0,0,width,height);
            canvas_opacity = canvas_opacity - 0.015;
            counter_opacity--;

            if(headerProgressBarInner_width <= 100){
                headerProgressBarInner.width(headerProgressBarInner_width+'%');
                headerProgressBarInner_width++;
            }else {
                headerProgressBarInner.animate({"opacity": '0%',width: '0%'});
            }
        }


        //console.log("counter:",counter," copacoty:",counter_opacity," canvas:",canvas_opacity);
    };
    setInterval(drawMatrix, 60);

    $("#matrix_canvas_orange").hover(function(){
        matrix_text_colour = '#ef741b';
        rainbow_matrix = false;
    }, function (){
    });
    $("#matrix_canvas_red").hover(function(){
        matrix_text_colour = '#78080b';
        rainbow_matrix = false;
    }, function (){
    });
    $("#matrix_canvas_blue").hover(function(){
        matrix_text_colour = '#102c8e';
        rainbow_matrix = false;
    }, function (){
    });
    $("#matrix_canvas_green").hover(function(){
        matrix_text_colour = '#379a0b';
        rainbow_matrix = false;
    }, function (){
    });
    $("#matrix_canvas_rainbow").hover(function(){
        matrix_text_colour = '#ef741b';
        rainbow_matrix = true;
    }, function (){
    });

    $("#matrix_colour_btns_div_container").hover(function (){
        var animation_transition = 500;
        //$("#matrix_colour_btns_div").animate({height:"30px"},animation_transition);

        $("#matrix_canvas_theme").animate({"background-position-y":"125%"},animation_transition);

        $("#matrix_canvas_orange").animate({"fontSize": "15px",height: "30px"},animation_transition);
        $("#matrix_canvas_red").animate({"fontSize": "15px",height: "30px"},animation_transition+100);
        $("#matrix_canvas_blue").animate({"fontSize": "15px",height: "30px"},animation_transition+200);
        $("#matrix_canvas_green").animate({"fontSize": "15px",height: "30px"},animation_transition+300);
        $("#matrix_canvas_rainbow").animate({"fontSize": "15px",height: "30px"},animation_transition+400);

    }, function (){
        var animation_transition = 500;
        //$("#matrix_colour_btns_div").animate({height:"2px"},animation_transition);
        $("#matrix_canvas_theme").animate({"background-position-y":"100%"},animation_transition+400);
        $("#matrix_canvas_orange").animate({"fontSize": "0px",height: "2px"},animation_transition+400);
        $("#matrix_canvas_red").animate({"fontSize": "0px",height: "2px"},animation_transition+300);
        $("#matrix_canvas_blue").animate({"fontSize": "0px",height: "2px"},animation_transition+200);
        $("#matrix_canvas_green").animate({"fontSize": "0px",height: "2px"},animation_transition+100);
        $("#matrix_canvas_rainbow").animate({"fontSize": "0px",height: "2px"},animation_transition);
        //$(this).animate({height:"5px"},1000);
    });



    get_container("AsusRogPhoneRGB.html","containers");

    //html containers
    $("#container_asusrogphonergb").click(function (){
        animate_get_container("AsusRogPhoneRGB.html","containers");
    });
    $("#container_dynamicrypt").click(function (){
        animate_get_container("DynamiCrypt.html","containers");
    });
    $("#container_qmk").click(function (){
        animate_get_container("QMK.html","containers");
    });




    $(window).resize(function() {
        $("#containers").css("height",$(window).height()-320);
    });



});

function animate_get_container(container_name,div_id){
    httpGetAsync("/containers/"+container_name,animate_get_container_callback,div_id);
}

function animate_get_container_callback(html,div_id){
    $("#"+div_id).animate({opacity:"0%",marginLeft:"150px"},600,function (){
        var window_before = $(window).height();
        console.log("window height before:",window_before);
        $("#"+div_id).html(html);
        console.log("window height after:",$(window).height());
        $("#"+div_id).css("height",$(window).height()-320);
        //document.getElementById(div_id).innerHTML = html;
        $("#"+div_id).animate({opacity:"100%",marginLeft:"0px"},600,function (){
            //$('#'+div_id).attr('overflowy','scroll');
        });
    });
}


function get_container(container_name,div_id){
    httpGetAsync("/containers/"+container_name,get_container_callback,div_id);
}

function get_container_callback(html,div_id){
    $("#"+div_id).html(html);
    //document.getElementById(div_id).innerHTML = html;
}

function httpGetAsync(theUrl, callback,div_id)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,div_id);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}