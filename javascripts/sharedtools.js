function animate_get_container(container_name,div_id){
    httpGetAsync("/containers/"+container_name,animate_get_container_callback,div_id);
}

function animate_get_container_callback(html,div_id){
    $("#"+div_id).animate({opacity:"0%",marginTop:"150px"},600,function (){
        // var window_before = $(window).height();
        // console.log("window height before:",window_before);
        $("#"+div_id).html(html);
        //console.log("window height after:",$(window).height());
        $("#"+div_id).css("height",$(window).height()-containers_div_offset);
        //document.getElementById(div_id).innerHTML = html;
        $("#"+div_id).animate({opacity:"100%",marginTop:"0px"},600,function (){
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

function urlInsertParam(key, value){
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    var url = new URL(document.location.href);
    url.searchParams.set(key,value);
    window.history.pushState({path:url.href},'',url.href);
    setCookie("last_visited",url.href,30);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" +";SameSite=strict";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}