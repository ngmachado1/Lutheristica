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
