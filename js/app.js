// um array para alocar os digitos inseridos
let pin = [];

// Funcionalidade básica para pegar os números do painel
function Numeros(num) {
    let txt = document.getElementById("senha").value;
    txt = txt + num;
    document.getElementById("senha").value = txt;
    pin.push(txt);
}

// limpa a tela
const apagar = document.querySelector('#apagar');
apagar.addEventListener('click', e => {
    e.preventDefault();

    document.getElementById("PINForm").reset();
    // reseta o array
    pin = [];

});


// Cadastrar e logar no FB
// provavelmente vamos precisar fingir a criação de um email com base no pin que inserirmos
// exemplo: pin - 13498 
// vai gerar um email: 13498@organização.com
// com uma senha: 13498@organização.com

// Logar
const logarBtn = document.querySelector('#entrar');
logarBtn.addEventListener('click', e => {
    e.preventDefault();

    const input = pin.pop();
    const email = input.toString() + '@mingaorganização.com';
    const password = email;

    auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(`Logado em ${email}`);
      //window.location = "./home.html";
    })
    .catch(error => {
      console.log(error.message);
      alert(error);
    })
});

// Cadastrar
const cadastrarBtn = document.querySelector('#cadastrar');
cadastrarBtn.addEventListener('click', e => {
    e.preventDefault();

    const input = pin.pop();
    const email = input.toString() + '@mingaorganização.com';
    const password = email;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(`${email} logou`);        
    });
});



auth.onAuthStateChanged(user => {
    if (user) {
      // Para redirecionar automatico caso esteja logado
      window.location = "./home.html";
    } else {
      console.log('Nenhum usuario logado');
    }
});