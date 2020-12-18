
function menu(){
    const menu = document.querySelector('.menu');
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    const line3 = document.querySelector('.line3');
    const lista = document.querySelectorAll('.lista')
    const ulCenter = document.querySelector('#center')

    console.log(ulCenter)
    
    menu.addEventListener('click', ()=>{
        if(line1.className=="line1",
        line2.className=="line2",
        line3.className=="line3"){
            for(i=0; i<lista.length; i++){
                lista[i].className="listitem"
            }
            line1.className="lines1",
            line2.className="lines2",
            line3.className="lines3",
            ulCenter.style.height = "350px",
            ulCenter.style.transition = "ease 0.6s"
        }else{
            for(i=0; i<lista.length; i++){
                lista[i].className="lista"
            }
            line1.className="line1",
            line2.className="line2",
            line3.className="line3"
            lista.className=""
            ulCenter.style.height = "80px"
        }
    })
}


menu();


new Splide( '.splide', {
    type   : 'loop',
    rewind     : true,
    heightRatio: 0.5,
    pagination : false,
    focus    : 'center'} ).mount();
