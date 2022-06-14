const firebaseConfig = {
    // your firebase settings
    apiKey: "0000000000000000-0000000000000000",
    authDomain: "asdf-asdfas.firebaseapp.com",
    projectId: "asdfasdf-23452345",
    storageBucket: "qwerqwer-34524.appspot.com",
    messagingSenderId: "534646346234623452345",
    appId: "0:000000000000:web:00000000000000"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let username;


// Verifica o estado do login/logout
auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user.email + " Esta logado");
      username = user.email;

    // ocultar os elementos caso não seja admin ou etc
    if (username !== '111111@mingaorganização.com') {
        document.getElementById('modalCad').style.display='none'
    }

      // Para redirecionar automatico caso esteja logado
      //window.location = "./home.html";
    } else {
      console.log('Nenhum usuario logado');
    }
});

// logout
document.getElementById("sair_btn").addEventListener('click', e => {
  e.preventDefault();
  auth.signOut();
  console.log('User signed out!');
  window.location = "./index.html"
})