var $$ = Dom7;
var app = new Framework7({
    // App root element
    material: true, //Activamos Material
    swipePanel: 'left',
    root: '#app',
    // App Name
    name: "ESCOLA D'HOSTELERIA",
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
        card: {
        hideNavbarOnOpen: true,
        closeByBackdropClick: true,
    },
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
      },
    // Add default routes
    routes: [{
            path: '/index/',
            url: 'index.html',
            
        },
    
        {
            path: '/info/',
            url: 'html/info.html',
        },
        {
            path: '/bustia/',
            url: 'html/bustia.html',
        }
        ,
        {
            path: '/config/',
            url: 'html/config.html',
        },
        {
            path: '/carrito/',
            url: 'html/carrito.html',
        },
        {
            path: '/login/',
            url: 'html/login.html',
        },
    ],

});


//SLIDER SWIPER
var mainView = app.views.create('.view-main');


//JS login
$$(document).on('page:init', '.page[data-name="login"]', function(e) {

    //Boto recuperar passwd
    $$(document).on('click', '#pwdSend', function(e) {
        app.dialog.alert("S'ha enviat un correu amb la nova contrasenya a l'email associat a aquest nom d'usuari");
    });

    $$(document).on('click', '#pwdLose', function(e) {
        $$("#pwdForm").css("display", "block");

    });
});

//JS info
$$(document).on('page:init', '.page[data-name="info"]', function(e) {
    //Check localstorage variable

    
});

//JS config
$$(document).on('page:init', '.page[data-name="config"]', function(e) {
   // localStorage.clear();
    //alert(window.localStorage.getItem('login'));
 /*   if ($$("body").hasClass("islogin")) {
        
    } else {
        app.loginScreen.open('#my-login-screen');
    }*/
    if(localStorage.getItem('login')===null){
        app.dialog.alert('Per accedir a aquest apartat has de loguejar-te');
        $$(".pgconfig").css("display", "none");
    }
    else{
       
        $$(".pgconfig").css("display", "block");
    }
});

//JS carrito
$$(document).on('page:init', '.page[data-name="carrito"]', function(e) {

});

//JS Bustia
$$(document).on('page:init', '.page[data-name="bustia"]', function(e) {
    
    if(localStorage.getItem('login')===null){
        app.dialog.alert('Per accedir a aquest apartat has de loguejar-te');
        $$(".pgbustia").css("display", "none");
    }
    else{
       
        $$(".pgbustia").css("display", "block");
    }


    //Boto enviar
    $$(document).on('click', '#buttEnviar', function(e) {
        var motiu = $$("#motiu").val();
        var assumpte = $$("#assumpte").val();
        var missatge = $$("#missatge").val();

        if (assumpte == '' || missatge == '') {
            app.dialog.alert('No pots deixar camps buits.');
        } else {
            app.dialog.alert('El missatge a sigut enviat.');
        }

        $$("#checkpp").prop('checked', false);
        $$('#buttEnviar').prop('disabled', true);
        $$('#buttEnviar').removeClass("color-blue");
        $$('#buttEnviar').addClass("color-gray");


    });

    //Boto politica privacitat
    $$(document).on('click', '#checkpp', function(e) {
        var check = $$("#checkpp").is(':checked');

        if (!check) { //DESACTIVAT
            $$('#buttEnviar').prop('disabled', true);
            $$('#buttEnviar').removeClass("color-blue");
            $$('#buttEnviar').addClass("color-gray");

        } else { //ACTIVAT
            $$('#buttEnviar').removeAttr("disabled");
            $$('#buttEnviar').removeClass("color-gray");
            $$('#buttEnviar').addClass("color-blue");
        }

    });

    //EN QUAN SE ENTRA A BUSTIA EL CHECKBOX ES POSA INSTANTANEAMENT EN OFF
    $$(document).on('click', '#buttEnviar', function(e) {
        $$("#checkpp").prop("checked", false);
    });


    //EN QUAN SE ENTRA A BUSTIA EL CHECKBOX ES POSA INSTANTANEAMENT EN OFF
    $$(document).on('click', '#bustia', function(e) {
        $$("#checkpp").prop("checked", false);
        $$('#buttEnviar').prop('disabled', true);
        $$('#buttEnviar').removeClass("color-blue");
        $$('#buttEnviar').addClass("color-gray");
    });


    $$('#my-login-screen .login-button').on('click', function() {
        var us = $$('#my-login-screen [name="username"]').val();
        var pass = $$('#my-login-screen [name="password"]').val();

        var us1 = $$('#usReg').val();
        var ps1 = $$('#psReg').val();

    });


});





//Número de unidades en el carrito
var vl = 0;

//JS home

$$(document).on('page:init', '.page[data-name="home"]', function(e) {
    generarHome();
    $$(document).on('click', '#bustia', function(e) {
        $$("#checkpp").prop("checked", false);
    });
});


//JSIndex
generarHome();

function generarHome() {
    $$("#buscador").hide();
    $$("#buscador").focus(function() {
        $$("li").css("display", "none");
        $$("#showList").css("display", "block");
    });
    
    function showList() {
        $$("li").css("display", "block");
    }
    
    $$("#buscador").focusout(function() {
        $$("li").css("display", "block");
    });
    refreshBadge(0);

    var mySwiper = new Swiper('.swiper-container', {
        speed: 1000,
        direction: 'horizontal',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
        zoom: true,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        mousewheel: {
            invert: true,
        },
        autoplay: {
            delay: 2000,
        },
        loop: true,
    });

 
    var urlnews = "https://humildadbackend.cat/api/news";

    app.request.get(urlnews, function(data) {

        var datanews = JSON.parse(data);
        for (var i = 0; i < datanews.length; i++) {
            mySwiper.appendSlide('<div class="swiper-slide"><img id="image" src="https://humildadbackend.cat/assets/img/plates/' + datanews[i].image + '"style="width: 100%;display: block; height: 300px;"><div class="texto-encima"><h1>' + datanews[i].title + '</h1><h3>' + datanews[i].content + '</h3></div></div>');
        }
    });

    // Dummy items array
    urlproductss="https://humildadbackend.cat/api/products";
    app.request.get(urlproductss, function(data) {

        var dataproducts = JSON.parse(data);
    });
    
    
    var items = [];


    var urlproducts = "https://humildadbackend.cat/api/products";

     app.request.get(urlproducts, function(data) {

        $$(document).on('click', '.card', function(e) {
            $$("#buscador").blur();

        })

        var dataproducts = JSON.parse(data);

        var virtualList = app.virtualList.create({
            // List Element
            el: '.virtual-list',
            // Pass array with items
            items: dataproducts,
            hideOnEnableEl: '.searchbar-hide-on-enable',
            hideOnSearchEl: '.searchbar-hide-on-search',
            createUl: 'false',
            rowsAfter: 10,
            setListHeight: true,
            scrollableParentEl: '.simple-list',
            updatableScroll: false,
            // Custom search function for searchbar
            searchAll: function(query, items) {
                var found = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                }

                return found; //return array with mathced indexes
            },

           
        
         itemTemplate: '<li>' +
                '<div class="card card-expandable data-backdrop="false" style="border-radius:4px">' +
                '<div class="card-content">' +
                '<div class="tarjExp" style="background-image: linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://humildadbackend.cat/assets/img/plates/{{image}})">' +
                '<div class="flexT card-header text-color-white" style="width: 100%">' +
                '<p id="name{{id}}">{{name}}</p>' +
                '<p id="price{{id}}">{{price}} €</p>' +
                '</div>' +
                '<a href="#" class="link card-close card-opened-fade-in color-white seout" style="position: absolute; right: 15px; top: 15px">' +
                '<i class="icon f7-icons">multiply_circle_fill</i>' +
                '</a>' +
                '</div>' +
                '<div class="card-content-padding">' +
                '<h3>{{description}}</h3>' +
                '<h4>Queden {{stock}} unitats</h5>' +
                '<div class="list no-hairlines-md">' +
                '<ul style="padding-left : 0 ">' +
                '<li>' +
                '<div class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap" style="display:flex">' +
                '<input class="date" type="text" placeholder="Data de recollida" style="text-align:center; border: 2px solid #8e8e93;font-size:18px ;border-radius:4px; margin-right: 5px; height:50px" readonly="readonly" id="demo-calendar-modal{{id}}" />' +
                '<div class="col">' +
                '<div class="stepper stepper-init color-gray" style="height:50px" id="stepper{{id}}"> ' +
                '<div class="stepper-button-minus color-gray"></div>' +
                '<div class="stepper-input-wrap">' +
                '<input type="text" value="1" min="1" max="{{stock}}" step="1" style="font-size:18px" id="units{{id}}" readonly> ' +
                '</div>' +
                '<div class="stepper-button-plus"></div>' +
                '</div>' +
                '</div>' +
                '<br>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<button  onclick="add2bsk({{id}}, {{price}}, ' + "'" + "https://humildadbackend.cat/assets/img/plates/{{image}}" + "'" + ')" class="col button button-fill color-green" style="height: 55px; margin-top: 10px; font-size:18px">Encarregar</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>',

        });

        for (let i = 0; i < dataproducts.length; i++) {
            var dat = dataproducts[i].dateini;
            var hola = new Date(dat);
            var dat1 = dataproducts[i].dateend;
            var hola1 = new Date(dat1);
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var weekLater = new Date().setDate(today.getDate() + 7);

            var calendarModal = app.calendar.create({
                inputEl: '#demo-calendar-modal' + dataproducts[i].id,
                openIn: 'customModal',
                header: true,
                sheetSwipeToClose: true,
                closeOnSelect: true,
                backdrop: true,
                closeByBackdropClick: true,
                cssClass: 'added',
                minDate: today,
                maxDate: hola1,
            });

            var stepper = app.stepper.create({
                el: '#stepper' + dataproducts[i].id,
                on: {
                  change: function () {
                    
                  }
                }
              })

        }
        $$("#buscador").show();
    });
     $$(document).on('click', '.card', function(e) {
        $$(".card-backdrop").css("z-index", "0");
        $$("ul").focus();
        if ($$(this).hasClass("card-opening") || $$(this).hasClass("card-opened")) {
            $$(".subnavbar").css("display", "none");


        } else {
            $$(".subnavbar").css("display", "block");
            $$(".searchbar-input-wrap").prop("disabled", false);

        }
    });

}


function refreshBadge(n) {
    vl += n;
    $$(".badge").html(vl);
}

var countItems = 0;
var total = 0;


function add2bsk(id, p, img) {
    countItems++;
    var w1 = $$('#name' + id).text();
    var w2 = $$('#price' + id).text();
    var w3 = $$('#demo-calendar-modal' + id).val();
    var w4 = $$('#units' + id).val();
    if (w3 == "" || w4 == "") {
        app.dialog.alert("Falta la data de recollida o la quantitat de productes que vol encarregar!");
    } else {
        app.dialog.alert("El producte s'ha afegit a la cistella");
        app.card.close('.card-opened', false);
        refreshBadge(1);
        total += (p * w4);
        $$('#carrito').append('<li class="item-content" id="countItems' + countItems + '">' +
            '<div class="item-title titol">' + w1 + '</div>' +
            '<form>' +
            '<input class="item bin" type="image" src="Imatges/bin.png" ' +
            'alt="Submit" width="24" height="auto" style="border-radius: 25px;"' +
            'onclick="deleteItems(' + "'" + '#countItems' + countItems + "'" + ',' + p * w4 + ')">' +
            '</form>' +
            '<div class="item">' +
            '<div class="item-title-row">' +
            '<div class="item-media image" ><img src="' + img + '" width="80"/></div>' +
            '<div class="informacio" id="'+ id + '">' +
            '<div class="item-subtitle cant-items"><p class="ti">Unitats</p><p class="tc">' + w4 + '</p></div>' +
            '<div class="item-subtitle preu" ><p class="ti">Preu</p><p class="tc">' + w2 + '</p></div>' +
            '<div class="item-subtitle data" ><p class="ti">Data</p><p class="tc">' + w3 + '</p></div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</li>');

        $$('#total').text("TOTAL: " + total + " €");

    }


}

function deleteItems(id, price) {
    total -= price;
    refreshBadge(-1);
    $$(id).remove();
    var order = new Order();
    order.Items = [];
    $("#carrito li").each(function(index, element) {
                  
        var it = new Item($$(element).find(".informacio").attr('id'),
            $$(element).find(".cant-items > .tc").text(),
            ($$(element).find(".preu > .tc").text()).substring(0, ($$(element).find(".preu > .tc").text()).length - 2),
            $$(element).find(".data > .tc").text(), 0);

        order.Items.push(it);
        
    });
    order.User = localStorage.getItem('id');

    $$('#total').text("TOTAL: " + total + " €");
}



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function() {
    var us = $$('#my-login-screen [name="username"]').val();
    var pass = $$('#my-login-screen [name="password"]').val();

   

    app.request.postJSON('https://humildadbackend.cat/api/users?user='+ us +'&password='+pass, function (data) {
        
        
        if (data.auth===true) {
            window.localStorage.setItem('id',data.id);
          
            
            window.localStorage.setItem('email',data.email);
            app.dialog.alert('Benvingut/da ' + us);
            window.localStorage.setItem('login',us);
          
            window.localStorage.setItem('password',pass);
            
            var user=localStorage.getItem('login');
          
            $$('#user').attr("value", localStorage.getItem('login'));
            
           app.loginScreen.close('#my-login-screen');
          
            $$('#btnlogin').css("display","none");
            $$('#btnlogout').css("display","block");
            
        } else {
            app.dialog.alert('Username And Password unCorrect!');
        }

       });


  

});



$$('#my-login-screen .frgPs').on('click', function() {
    app.methods.forgotPS();
});
$$('#my-login-screen .frgPs').on('click', function() {
    app.methods.forgotPS();
});
$$('#my-login-screen .tab-link').on('click', function() {
    app.loginScreen.close('#my-login-screen');
});
$$('#view-settings .tab-link').on('click', function() {
    //app.dialog.alert("Register Succeed");
});

$$('#view-about .send_cnt').on('click', function() {
    var username = $$('#view-about [name="mail"]').val();
    var password = $$('#view-about [name="Message"]').val();
    if ((username !== "") && (password !== "")) {
        app.dialog.alert('Send Successs');
        //reload();
    } else {
        app.dialog.alert('Please Fill All Fild!');
    }
});

$$('.fnlbsk').on('click', function() {
    app.panel.close("right", true);
    var totv = 0;
    $$('.pric').each(function(i) {
        var p = $$(this).text().split("$");
        totv += parseInt(p[1]);
        //alert(p[1]);
        // This is your rel value

        
        
    });

    if (localStorage.getItem('login')!=null) {
        app.dialog.alert("Comanda Processada");
       $$(".badge").html(0);
        $$("#carrito").remove();
       $$('#total').text("TOTAL: " + 0 + " €");

        var order = new Order();
        order.Items = [];
        $("#carrito li").each(function(index, element) {
                  
            var it = new Item($$(element).find(".informacio").attr('id'),
                $$(element).find(".cant-items > .tc").text(),
                ($$(element).find(".preu > .tc").text()).substring(0, ($$(element).find(".preu > .tc").text()).length - 2),
                $$(element).find(".data > .tc").text(), 0);

            order.Items.push(it);
            
        });
        order.User = localStorage.getItem('id');
       
       


    } else {
        app.loginScreen.open('#my-login-screen');
        
        
    }
});

//Boto recuperar passwd
$$(document).on('click', '#pwdSend', function(e) {
    if($$("#nomusuari").val()!=""){
        app.dialog.alert("S'ha enviat un correu amb la nova contrasenya a l'email associat a aquest nom d'usuari");
        $$("#nomusuari").remove();
        $$("#pwdForm").css("display", "none");
        total = 0;
    }
    else{
        app.dialog.alert("No has introduït el nom d'usuari");
    }
    
});

$$(document).on('click', '#pwdLose', function(e) {
    if ($$("#pwdForm").css("display") === "none") {
        $$("#pwdForm").css("display", "block");
    } else {
        $$("#pwdForm").css("display", "none");
    }
});

$$("#buscador").focus(function() {
    $$("li").css("display", "none");
    $$("#showList").css("display", "block");
});

function showList() {
    $$("li").css("display", "block");
    $$("#buscador").blur();
}

$$("#buscador").focusout(function() {
    $$("li").css("display", "block");
});

  $$('.card').on('taphold', function () {
    app.dialog.alert('Tap hold fired!');
  });

  //localStorage.clear();
  if(localStorage.getItem('login')!=null){
  $$('#user').attr("value", localStorage.getItem('login'));
  $$('#password').attr("value", localStorage.getItem('password'));
  $$('#btnlogin').css("display","none");
}
  else{
    $$('#btnlogin').css("display","block");
    $$('#btnlogout').css("display","none");
  }


  $$('#btnlogout').on('click', function(){
    $$('#user').val('');
    $$('#password').val('');
    $$('#btnlogin').css("display","block");
    $$('#btnlogout').css("display","none");
    $$('#user').attr("value", '');
    $$('#password').attr("value", '');
    localStorage.clear();
  })

  var urlproducts = "https://humildadbackend.cat/api/products";

  app.request.get(urlproducts, function(data) {
    $$("#cover").hide();
    $$("#buscador").show();
    
    });

    function Items() {
        this.items = [];
    }
    
    function Item(idProducte, uds, preu, data, fnl) {
        this.idProducte = idProducte;
        this.uds = uds;
        this.preu = preu;
        this.data = data;
        this.fnl = fnl;
    }
    
    function Order() {
        this.User;
        this.Items = new Array();
    
    }