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



// Esperamos a que todo el HTML esté cargado antes de ejecutar Javascrip
document.addEventListener('DOMContentLoaded', () => {

    ajaxPais();


    ajaxProvincia();


    // Input File
    const inputImage = document.querySelector('#image');
    // Nodo donde estará el editor
    const editor = document.querySelector('#editor');
    // El canvas donde se mostrará la previa
    const miCanvas = document.querySelector('#preview');
    // Contexto del canvas
    const contexto = miCanvas.getContext('2d');
    // Ruta de la imagen seleccionada
    let urlImage = undefined;
    // Evento disparado cuando se adjunte una imagen
    inputImage.addEventListener('change', abrirEditor, false);

    /**
    * Método que abre el editor con la imagen seleccionada
    */
    function abrirEditor(e) {
        // Obtiene la imagen
        urlImage = URL.createObjectURL(e.target.files[0]);

        // Borra editor en caso que existiera una imagen previa
        editor.innerHTML = '';
        let cropprImg = document.createElement('img');
        cropprImg.setAttribute('id', 'croppr');
        editor.appendChild(cropprImg);

        // Limpia la previa en caso que existiera algún elemento previo
        contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

        // Envia la imagen al editor para su recorte
        document.querySelector('#croppr').setAttribute('src', urlImage);

        // Crea el editor
        new Croppr('#croppr', {
            aspectRatio: 1,
            startSize: [70, 70],
            onCropEnd: recortarImagen
        })
    }

    /**
    * Método que recorta la imagen con las coordenadas proporcionadas con croppr.js
    */
    function recortarImagen(data) {
        // Variables
        const inicioX = data.x;
        const inicioY = data.y;
        const nuevoAncho = data.width;
        const nuevaAltura = data.height;
        const zoom = 1;
        let imagenEn64 = '';
        // La imprimo
        miCanvas.width = nuevoAncho;
        miCanvas.height = nuevaAltura;
        // La declaro
        let miNuevaImagenTemp = new Image();
        // Cuando la imagen se carge se procederá al recorte
        miNuevaImagenTemp.onload = function() {
            // Se recorta
            contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
            // Se transforma a base64
            imagenEn64 = miCanvas.toDataURL("image/jpeg");
            // Mostramos el código generado
            document.querySelector('#base64').textContent = imagenEn64;
            document.querySelector('#base64HTML').textContent = '<img src="' + imagenEn64.slice(0, 40) + '...">';

        }
        // Proporciona la imagen cruda, sin editarla por ahora
        miNuevaImagenTemp.src = urlImage;
    }
});
