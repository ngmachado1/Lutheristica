const select_component = (nombre) =>{
    return `<option value="${nombre}">${nombre}</option>`
}

const select_render = (containerId, array) =>{
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    let html = '<option value="">Elegir lugar</option>';
    array.forEach(nombre => {
        html = html + select_component(nombre)
    });
    container.innerHTML = html;
}


//crando paises
function ajaxPais(){
    let url = `paises.Json`;
    var paises = [];
    $.ajax({
        method: "GET",
        url: url
    }).done(function(data){

        data.forEach(Element => {
         
        paises.push(Element.name)
          
        select_render('paises', paises);
          
        });
    }).fail(function(error){
        error = alert('no se establecio la conexion');
    })
}

//creo provincias

function ajaxProvincia(){
    let selectpais = document.getElementById('paises')
    selectpais.addEventListener('change', () =>{
        let pais = selectpais.value
        
        let url = `paises.Json`;
        var provincias = [];
        $.ajax({
            method: "GET",
            url: url
        }).done(function(data){
            data.forEach(Element => {
            if(Element.name == pais){
                var elef = Element.provincias
                for (let index = 0; index < elef.length; index++) {
                    const element = elef[index].name;
                   provincias.push(element)
                }
                select_render('provincias', provincias)
            }
            });
        }).fail(function(error){
            error = alert('no se establecio la conexion');
        })
    
    })

}


window.onload = function () {



    ajaxPais();


    ajaxProvincia();
    


}


