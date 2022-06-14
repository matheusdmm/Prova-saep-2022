let tabelaEquipamentos = firebase.database().ref("Equipamentos");

// variaveis usadas a nivel global
let nomeEquipamento_, enderecoImagem_, estaAtivo_, descricaoEquipamento_, temp;

/* -- Funcionalidade básica, ler, criar e apagar -- */
//ler os dados do painel de inserção
function lerDados() {
    nomeEquipamento_ = document.getElementById("nomeEquipamento").value;
    enderecoImagem_ = document.getElementById("enderecoImagem").value;
    descricaoEquipamento_ = document.getElementById("descricao").value;
    estaAtivo_ = document.getElementById("equipamentoAtivo").checked;
}

// Inserir os equipamentos no banco
function Create() {
    lerDados();

    let insert = tabelaEquipamentos.push();

    insert.set({
        nomeEquipamento:        nomeEquipamento_,
        enderecoImagem:         enderecoImagem_,
        descricaoEquipamento:   descricaoEquipamento_,
        estaAtivo:              estaAtivo_
    });
}

// Apagar os equipamentos
// mesma coisa dos comentarios
function Delete(key) {
    let c = confirm("Atenção! Tem certeza que deseja excluir o equipamento? Essa ação não poderá ser desfeita");
    
    if (c == true) {
        // passamos o nome da tabela e o id para a remoção
        firebase.database().ref("Equipamentos/" + key).remove();

        alert("apagado!");
        window.location.reload();
    } 
}

/* -- Consultar e listar a tabela toda de equipamentos -- */
// Consultar os equipamentos do banco
tabelaEquipamentos.once('value', function(AllRecords) {
    AllRecords.forEach(function(CurrentRecord) {
        let objects = CurrentRecord.val();

        let key                 = CurrentRecord.key;
        let nomeE               = objects.nomeEquipamento;
        let imgE                = objects.enderecoImagem;
        let descricaoE          = objects.descricaoEquipamento;
        let estaAtivo           = objects.estaAtivo;
        let comentarioE         = objects.comentarios;

        // criar um objeto para salvar as informações e acessar nas outras funções
        let obj = {
            key: key,
            nomeE: nomeE,
            imgE: imgE,
            descricaoE: descricaoE,
            estaAtivo: estaAtivo,
            comentarioE: comentarioE
          };

        // exibe a tabela chamando uma função especifica e repassando o objeto
        ExibirTabela(obj); 
    });
});

// Listar e exibir os equipamentos
function ExibirTabela(obj) {
    console.log(obj);

    // para verificar se o equipo esta ativo
    if (obj.estaAtivo === true) {
        estaAtivo_ = "Equipamento ativo"
        // criar tabela
        let tbody = document.getElementById('tabelaEquipamentos');
        let trow = document.createElement('tr');

        let td0       = document.createElement('td');
        let td1       = document.createElement('td');
        let td2       = document.createElement('td');
        let td3       = document.createElement('td');
        let td4       = document.createElement('td');

        // imagem com tamanho de 20% sempre
        td0.innerHTML = `<img src="${obj.imgE}" width="90%" alt="Equipamento">`;
        td1.innerHTML = `<h4>${obj.nomeE}</h4> <b><br>${estaAtivo_}</b>`;
        td2.innerHTML = obj.descricaoE + obj.key;

        // botões de ação
        // comentário:
        td3.innerHTML += `<button 
        class="btn btn-primary"
        id="${obj.key}"
        >
        comentarios
        </button>`
        // chamo a função do comentário
        CriarBotaoComentario(obj.key)  

        // remover:
        let remove = obj.key + "remove"
        td3.innerHTML += `<button 
        class="btn btn-primary"
        id="${remove}"
        >
        remover
        </button>`
        CriarBotaoRemover(remove, obj.key);

        // apend na tabela
        trow.appendChild(td0);
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        tbody.appendChild(trow);
    } else {
        estaAtivo_ = "Equipamento inativo"
        console.error(obj)
    }   
}

/* -- Comentários -- */
// Listar e exibir os comentarios
function ExibirComentarios(key) {
    var para = new URLSearchParams();
    para.append("KEY", key);
    location.href = "./comentarios.html?" + para.toString();
}


// usando o jQuery pra criar os botões dinamicamente
function CriarBotaoComentario(key) {
    $(document).ready(function() {
        $(`#${key}`).on('click', function() {
            ExibirComentarios(key)
        })
    })
}

function CriarBotaoRemover(remove, key) {
    $(document).ready(function() {
        $(`#${remove}`).on('click', function() {
            Delete(key)
        })
    })
}

document.getElementById("voltarBtn").onclick = function() {
    location.href = "./home.html";
};