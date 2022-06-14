// usar o localstorage pra passar os dados
let param = new URLSearchParams(window.location.search);
let pass = param.get("KEY"); // key

// temp pro comentario
let commentObj;

// puxar o comentario do banco
firebase
.database()
.ref("Equipamentos/" + pass)
.on("value", function(snapshot) {
    commentObj = snapshot.val().comentarios;

    // pega as chave random do obj
    for( var key in commentObj ) {
        if( commentObj.hasOwnProperty(key) ) {
            console.log(key);
            console.log(" - " + commentObj[key].hora + " - "+ commentObj[key].comentario);
            // inicializa a tabela
            TabelaComentarios(commentObj[key]);
        }
    }
 
});



// criar tabela dinamica com comentarios
function TabelaComentarios(obj) {
    // cria no javascript os elementos para dar append no html
    let tbody = document.getElementById('comentariosTabela');
    let trow = document.createElement('tr');

    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    
    // atribui as variaveis passadas para os parametros da função
    td0.innerHTML = obj.hora;
    td1.innerHTML = obj.user;
    td2.innerHTML = obj.comentario;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);

    tbody.appendChild(trow);

    console.log(obj)
    
}

// funcionando
function InserirComentario(key) {
    // deve apresentar o timestamp de cada comentario
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

    // remove o @ do nosso username
    username = username.replace('@mingaorganização.com', '');

    // pegar o valor da textbox
    //let commentBox = $( "#comentarioTexto" ).val();
    let commentBox = document.getElementById('comentarioTexto').value

    // usa o user + um numero aleatorio pra dar append nos comentarios
    let rnd = Math.floor(Math.random() * 1000);
    let formato = username + " " + rnd

    // dar append no banco caso o botão inserirComentarioBtn sela clicado
    // func pra selecionar no banco
    firebase.database().ref("Equipamentos/" + key + "/comentarios/" + formato).set({
        "user": `${username}`,
        "comentario": `${commentBox}`,
        "hora": `${str}`
    });      

    /* 
        11111 098 {
            user: 11111
            comentario: algum comentario
            hora: 11:11
        }
    
    */
}

// listener do botao
document.getElementById("inserirComentarioBtn").onclick = function() {
    InserirComentario(pass)
};