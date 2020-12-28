 //MENU
function menu(){
    const menu = document.querySelector('.menu');
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    const line3 = document.querySelector('.line3');
    const lista = document.querySelectorAll('.lista')
    const ulCenter = document.querySelector('#center')

    
    menu.addEventListener('click', ()=>{
        if(line1.className=="line1",
        line2.className=="line2",
        line3.className=="line3"){
            setTimeout(()=>{
                for(i=0; i<lista.length; i++){
                lista[i].className="listitem"
            }}, 700);

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
            ulCenter.style.height = "20px"
        }
    })
}
window.addEventListener('DOMContentLoaded', ()=>{
    menu();

    new Splide( '.splide', {
        type   : 'loop',
        rewind     : true,
        heightRatio: 0.5,
        pagination : false,
        focus    : 'center'
    } ).mount();

    getItems();
    
})



   //BLOG

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB6wT0bHOhPS7lBhMEyXGWZrfrKeVolNW0",
    authDomain: "redlutheristica.firebaseapp.com",
    projectId: "redlutheristica",
    storageBucket: "redlutheristica.appspot.com",
    messagingSenderId: "595854357739",
    appId: "1:595854357739:web:8aa696869f4007bceb7aae",
    measurementId: "G-DZPF6H3BEX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db=firebase.database();
  const dbref=db.ref().child('articulos');

  const getItems = ()=>{
    dbref.on('value',function(snapshot){
  
        blog_render('blog', snapshot)
    
    })
  }  

  const blog_component = (childSnapshot) =>{
      return `            
    <div class="col-md-12 col-sm-12 col-lg-4">
        <div class="card-blog">
            <div class="card-img">

            </div>
            <div class="card-title">
                ${childSnapshot.val().titulo}
            </div>
            <div class="card-body">
                ${childSnapshot.val().cuerpo}
            </div>
            <button class="primary">Ver más</button>
        </div>
    </div>
`
  }

  const blog_render = (containerId, snapshot) =>{
    
        let container = document.getElementById(containerId);
        container.innerHTML = "";
        let html = '';
        snapshot.forEach((childSnapshot) => {
            html = html + blog_component(childSnapshot)
        });
        container.innerHTML = html;
  }
