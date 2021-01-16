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
                headerProgressBarInner.animate({"opacity": '0%'});
            }
        }


        //console.log("counter:",counter," copacoty:",counter_opacity," canvas:",canvas_opacity);
    };
    setInterval(drawMatrix, 60);

    $("#matrix_canvas_orange").click(function(){
        matrix_text_colour = '#ef741b';
        rainbow_matrix = false;
    });

    $("#matrix_canvas_red").click(function(){
        matrix_text_colour = '#78080b';
        rainbow_matrix = false;
    });
    $("#matrix_canvas_blue").click(function(){
        matrix_text_colour = '#102c8e';
        rainbow_matrix = false;
    });
    $("#matrix_canvas_green").click(function(){
        matrix_text_colour = '#379a0b';
        rainbow_matrix = false;
    });
    $("#matrix_canvas_rainbow").click(function(){
        matrix_text_colour = '#ef741b';
        rainbow_matrix = true;
    });


});