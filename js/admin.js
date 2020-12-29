const paises_component = (pais) =>{
    return `<option value="${pais}">${pais}</option>`
}

const paises_render = (containerId, array) =>{
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    let html = '<option value="">Elegir Pais</option>';
    array.forEach(pais => {
        html = html + paises_component(pais)
    });
    container.innerHTML = html;
}
window.onload = function () {

    function ajaxPais(){
        let url = `https://restcountries.eu/rest/v2/all`;
        var paises = [];
        $.ajax({
            method: "GET",
            url: url
        }).done(function(data){
    
            data.forEach(Element => {
              if (Element.subregion == "South America" || Element.subregion == "Central America") {
                paises.push(Element.name)
              }
              paises_render('paises', paises);
              
            });
        }).fail(function(error){
            error = alert('no se establecio la conexion');
        })
    }
    ajaxPais();

    function ajaxProvincia(){
        let url = `https://restcountries.eu/rest/v2/all`;
        var paises = [];
        $.ajax({
            method: "GET",
            url: url
        }).done(function(data){
    
            data.forEach(Element => {
              if (Element.subregion == "South America" || Element.subregion == "Central America") {
                paises.push(Element.name)
              }
              paises_render('paises', paises);
              
            });
        }).fail(function(error){
            error = alert('no se establecio la conexion');
        })

        var select = document.getElementById('paises');
        select.addEventListener('change',
          function(){
            var selectedOption = this.options[select.selectedIndex];
            console.log(selectedOption.value + ': ' + selectedOption.text);
          });
    }
    


}


