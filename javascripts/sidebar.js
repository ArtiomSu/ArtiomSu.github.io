var is_categorie_1_expanded = false;
var current_expanded_categorie = null;
var current_expanded_categorie_list = null;
var current_sub_categorie_clicked = null;
var current_inner_sub_categorie_clicked = null;


$(document).ready(function(){
    var projects_div_names = ["container_asusrogphonergb","container_dynamicrypt","container_qmk","container_arduinocustommouse"];
    var youtube_div_names = ["container_Youtube1", "container_Youtube2", "container_Youtube3", "container_Youtube4", "container_Youtube5", "container_Youtube6", "container_Youtube7", "container_Youtube8", "container_Youtube9", "container_Youtube10", "container_Youtube11", "container_Youtube12", "container_Youtube13", "container_Youtube14"];


    $("#container_home").click(function (){
        expand_collapse_categories("#container_home",null);
        animate_get_container("Home.html","containers");
        urlInsertParam("cat","container_home");
        urlInsertParam("iteminner",null);
        urlInsertParam("catonly",1);
    });

    //projects
    $("#container_Projects").click(function (){
        expand_collapse_categories("#container_Projects",projects_div_names);
        urlInsertParam("cat","container_Projects");
        urlInsertParam("iteminner",null);
        urlInsertParam("catonly",1);
    });
    $("#container_asusrogphonergb").click(function (){
        click_container_asusrogphonergb();
    });
    $("#container_asusrogphonergbreleases").click(function (){
        click_container_asusrogphonergbreleases();
    });
    $("#container_asusrogphonergbscreenshots").click(function (){
        click_container_asusrogphonergbscreenshots();
    });
    $("#container_asusrogphonergbfeatures").click(function (){
        click_container_asusrogphonergbfeatures();
    });

    $("#container_dynamicrypt").click(function (){
        sub_categorie_click("DynamiCrypt.html","containers", "#container_dynamicrypt");
        urlInsertParam("item","container_dynamicrypt");
        urlInsertParam("iteminner",null);
        urlInsertParam("catonly",0);
    });
    $("#container_qmk").click(function (){
        sub_categorie_click("QMK.html","containers", "#container_qmk");
        urlInsertParam("item","container_qmk");
        urlInsertParam("iteminner",null);
        urlInsertParam("catonly",0);
    });
    $("#container_arduinocustommouse").click(function (){
        click_container_arduinocustommouse();
    });
    $("#container_arduinocustommousecode").click(function (){
        click_container_arduinocustommousecode();
    });


    //youtube
    $("#container_Youtube").click(function (){
        expand_collapse_categories("#container_Youtube",youtube_div_names);
        urlInsertParam("cat","container_Youtube");
        urlInsertParam("catonly",1);
        urlInsertParam("iteminner",null);
    });

    //deal with url params
    var use_cookie = true;
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("cat")){
        use_cookie = false;
        $("#"+urlParams.get("cat")).click();
    }
    if(urlParams.has("item") && urlParams.has("catonly")){
        if(urlParams.get("catonly") === "0"){
            use_cookie = false;
            $("#"+urlParams.get("item")).click();
        }
    }
    if(urlParams.has("item") && urlParams.has("iteminner")){
        setTimeout(function() {
            switch (urlParams.get("iteminner")){
                case "container_arduinocustommousecode":
                    click_container_arduinocustommousecode();
                    break;
                case "container_asusrogphonergbreleases":
                    click_container_asusrogphonergbreleases();
                    break;
                case "container_asusrogphonergbscreenshots":
                    click_container_asusrogphonergbscreenshots();
                    break;
                case "container_asusrogphonergbfeatures":
                    click_container_asusrogphonergbfeatures();
                    break;

                default:

            }
        }, 100);
    }

    if(use_cookie){
        //deal with cookies
        var last_visited_href = getCookie("last_visited");
        if ( last_visited_href !== ""){
            window.history.pushState({path:last_visited_href},'',last_visited_href);
        }
    }

});

function click_container_asusrogphonergb(){
    sub_categorie_click("AsusRogPhoneRGB.html","containers", "#container_asusrogphonergb");
    urlInsertParam("item","container_asusrogphonergb");
    urlInsertParam("iteminner",null);
    urlInsertParam("catonly",0);
}
function click_container_asusrogphonergbreleases(){
    sub_inner_categorie_click("AsusRogPhoneRGBReleases.html","containers", "#container_asusrogphonergbreleases");
    urlInsertParam("iteminner","container_asusrogphonergbreleases");
    urlInsertParam("catonly",0);
}
function click_container_asusrogphonergbscreenshots(){
    sub_inner_categorie_click("AsusRogPhoneRGBscreenshots.html","containers", "#container_asusrogphonergbscreenshots");
    urlInsertParam("iteminner","container_asusrogphonergbscreenshots");
    urlInsertParam("catonly",0);
}
function click_container_asusrogphonergbfeatures(){
    sub_inner_categorie_click("AsusRogPhoneRGBfeatures.html","containers", "#container_asusrogphonergbfeatures");
    urlInsertParam("iteminner","container_asusrogphonergbfeatures");
    urlInsertParam("catonly",0);
}


function click_container_arduinocustommousecode(){
    sub_inner_categorie_click("ArduinoCustomMouseCode.html","containers", "#container_arduinocustommousecode");
    urlInsertParam("iteminner","container_arduinocustommousecode");
    urlInsertParam("catonly",0);
}

function click_container_arduinocustommouse(){
    sub_categorie_click("ArduinoCustomMouse.html","containers", "#container_arduinocustommouse");
    urlInsertParam("item","container_arduinocustommouse");
    urlInsertParam("iteminner",null);
    urlInsertParam("catonly",0);
}

function sub_inner_categorie_click(html_page, container_div, name){
    var send_request = true;
    if(current_inner_sub_categorie_clicked === null){
        current_inner_sub_categorie_clicked = name;
    }else if(current_inner_sub_categorie_clicked !== name){

        current_inner_sub_categorie_clicked = name;
    }else if(current_inner_sub_categorie_clicked === name){
        send_request = false;
    }
    if(send_request){
        animate_get_container(html_page,container_div);
    }
}


function sub_categorie_click(html_page, container_div, name){
    var send_request = true;
    if(current_sub_categorie_clicked === null){
        $(name).css({backgroundColor: "rgba(201, 94, 17,0.3)"});
        current_sub_categorie_clicked = name;
    }else if(current_sub_categorie_clicked !== name){
        $(current_sub_categorie_clicked).css({backgroundColor: "rgba(201, 94, 17,0)"});
        $(name).css({backgroundColor: "rgba(201, 94, 17,0.3)"});
        current_sub_categorie_clicked = name;
    }else if(current_sub_categorie_clicked === name){
        send_request = false;
    }
    if(current_inner_sub_categorie_clicked !== null){
        current_inner_sub_categorie_clicked = null;
        send_request = true;
    }
    if(send_request){
        animate_get_container(html_page,container_div);
    }
}

function expand_collapse_categories(container_name,container_divs) {
    if (current_expanded_categorie === null) { //if this is the first time
        collapse_category(container_divs, false);
        $(container_name).css({backgroundColor: "rgba(139,0,0,0.4)"});
        current_expanded_categorie = container_name;
        current_expanded_categorie_list = container_divs;
        is_categorie_1_expanded = true;
    } else {
        if (is_categorie_1_expanded && current_expanded_categorie !== container_name) { //if there is already something else expanded that is not this categorie
            //collapse expanded one and expand the clicked one
            collapse_category(current_expanded_categorie_list, true);
            $(current_expanded_categorie).css({backgroundColor: "rgba(139,0,0,0)"});

            current_expanded_categorie = container_name;
            current_expanded_categorie_list = container_divs;
            collapse_category(current_expanded_categorie_list, false);
            $(container_name).css({backgroundColor: "rgba(139,0,0,0.4)"});
            is_categorie_1_expanded = true;
        } else if (current_expanded_categorie === container_name) {//collapse this cattegorie
            $(current_expanded_categorie).css({backgroundColor: "rgba(139,0,0,0)"});
            current_expanded_categorie = null;
            is_categorie_1_expanded = false;
            collapse_category(container_divs, true);
        }
    }
    if(current_sub_categorie_clicked !== null){
        $(current_sub_categorie_clicked).css({backgroundColor: "rgba(201, 94, 17,0)"});
        current_sub_categorie_clicked = null;
    }
}

function collapse_category(cat_array, collapse){
        if(cat_array === null){
            return 1;
        }
        var anim_speed = 0;
        for(div in cat_array){
            if(collapse){
                $("#"+cat_array[cat_array.length-div-1]).animate({"fontSize": "0px",height: "2px"},300+anim_speed);
            }else{
                $("#"+cat_array[div]).animate({"fontSize": "15px",height: "40px"},300+anim_speed);
            }
            anim_speed+=200;
        }
}