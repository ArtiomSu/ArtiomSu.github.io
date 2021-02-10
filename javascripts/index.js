var containers_div_offset = 150; //offset for the container doesnt change

var home_previews_last_time_changed = Date.now(); //helps keep the home page previews in check

var allow_side_bar_categories_to_be_collapsed = false;

var type_out_header = true; //when false the header wont be changed
function type_header(string_array){
    if(type_out_header){
        var typed = new Typed('.headerh1', {
            strings: string_array,
            typeSpeed: 100,
            backSpeed: 50,
            showCursor: false,
            smartBackspace: true
        });
    }
}

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
    var run_matrix = true;


    document.body.onkeydown = function (e) {
        e = e || window.event;
        if ("key" in e){  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            if(e.key === 'm' || e.key === 'M'){
                run_matrix = !run_matrix;
            }
        }
    }

    if(getCookie("matrix_colour") !== ""){
        var matrix_colour = getCookie("matrix_colour");
        if(matrix_colour === "rainbow"){
            rainbow_matrix = true;
        }else{
            matrix_text_colour=matrix_colour;
        }
    }


    var drawMatrix = function () {
        matrix_canvas.getContext('2d').fillStyle='rgba(0,0,0,.1)';
        matrix_canvas.getContext('2d').fillRect(0,0,width,height);
        if(!run_matrix){
            return 0;
        }
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
        setCookie("matrix_colour",matrix_text_colour,30);
    }, function (){
    });
    $("#matrix_canvas_red").hover(function(){
        matrix_text_colour = '#78080b';
        rainbow_matrix = false;
        setCookie("matrix_colour",matrix_text_colour,30);
    }, function (){
    });
    $("#matrix_canvas_blue").hover(function(){
        matrix_text_colour = '#102c8e';
        rainbow_matrix = false;
        setCookie("matrix_colour",matrix_text_colour,30);
    }, function (){
    });
    $("#matrix_canvas_green").hover(function(){
        matrix_text_colour = '#379a0b';
        rainbow_matrix = false;
        setCookie("matrix_colour",matrix_text_colour,30);
    }, function (){
    });
    $("#matrix_canvas_rainbow").hover(function(){
        matrix_text_colour = '#ef741b';
        rainbow_matrix = true;
        setCookie("matrix_colour","rainbow",30);
    }, function (){
    });

    $("#matrix_colour_btns_div_container").hover(function (){
        var animation_transition = 500;
        //$("#matrix_colour_btns_div").animate({height:"30px"},animation_transition);

        $("#matrix_canvas_theme").animate({"background-position-y":"125%","opacity":1},animation_transition);

        $("#matrix_canvas_orange").animate({"fontSize": "15px",height: "30px"},animation_transition);
        $("#matrix_canvas_red").animate({"fontSize": "15px",height: "30px"},animation_transition+100);
        $("#matrix_canvas_blue").animate({"fontSize": "15px",height: "30px"},animation_transition+200);
        $("#matrix_canvas_green").animate({"fontSize": "15px",height: "30px"},animation_transition+300);
        $("#matrix_canvas_rainbow").animate({"fontSize": "15px",height: "30px"},animation_transition+400);

    }, function (){
        var animation_transition = 500;
        //$("#matrix_colour_btns_div").animate({height:"2px"},animation_transition);
        $("#matrix_canvas_theme").animate({"background-position-y":"100%","opacity":0},animation_transition+400);
        $("#matrix_canvas_orange").animate({"fontSize": "0px",height: "2px"},animation_transition+400);
        $("#matrix_canvas_red").animate({"fontSize": "0px",height: "2px"},animation_transition+300);
        $("#matrix_canvas_blue").animate({"fontSize": "0px",height: "2px"},animation_transition+200);
        $("#matrix_canvas_green").animate({"fontSize": "0px",height: "2px"},animation_transition+100);
        $("#matrix_canvas_rainbow").animate({"fontSize": "0px",height: "2px"},animation_transition);
        //$(this).animate({height:"5px"},1000);
    });



    //get_container("Home.html","containers");
    $("#categorieselector").css("height",$(window).height()-containers_div_offset);

    $(window).resize(function() {
        $("#containers").css("height",$(window).height()-containers_div_offset);
        $("#categorieselector").css("height",$(window).height()-containers_div_offset);
    });



});
