// Função construtora para representar os dados
function DadosCargaHoraria(data, entrada, intervalo, saida, valorDia, taxaGasolina, lucroDia) {
    this.Data = data;
    this.HoraDeEntrada = entrada;
    this.TempoDoIntervalo = intervalo;
    this.HoraDeSaida = saida;
    this.ValorDoDia = valorDia;
    this.TaxaDaGasolina = taxaGasolina;
    this.LucroDoDia = lucroDia;
}

function adicionarLinha(event) {
    event.preventDefault();
    const tabelaCargaHoraria = document.getElementById("tabela-carga-horaria");
    const novaLinha = document.createElement("tr");

    // Cria um objeto com os dados do formulário usando a função construtora
    const novoDados = new DadosCargaHoraria(
        document.getElementById('Data').value,
        document.getElementById('HoraDeEntrada').value,
        document.getElementById('TempoDoIntervalo').value,
        document.getElementById('HoraDeSaida').value,
        document.getElementById('ValorDoDia').value,
        document.getElementById('TaxaDaGasolina').value,
        document.getElementById('LucroDoDia').value
    );

    // Cria as células da nova linha com os dados do formulário
    novaLinha.innerHTML = `
        <td>${novoDados.Data}</td>
        <td>${novoDados.HoraDeEntrada}</td>
        <td>${novoDados.TempoDoIntervalo}</td>
        <td>${novoDados.HoraDeSaida}</td>
        <td>${novoDados.ValorDoDia}</td>
        <td>${novoDados.TaxaDaGasolina}</td>
        <td>${novoDados.LucroDoDia}</td>
        <td><button onclick="apagarLinha(this)">Apagar</button></td>
    `;

    // Adiciona a nova linha à tabela
    tabelaCargaHoraria.appendChild(novaLinha);

    // Adiciona os novos dados à lista de dados existente
    const dadosCargaHoraria = carregarDadosLocalStorage();
    dadosCargaHoraria.push(novoDados);

    // Salva os dados atualizados no localStorage
    salvarDadosLocalStorage(dadosCargaHoraria);

    // Limpa o formulário após adicionar os dados
    document.getElementById("formDados").reset();
}

// Função para apagar uma linha da tabela e do localStorage
function apagarLinha(botaoApagar) {
    const linhaParaApagar = botaoApagar.parentNode.parentNode;
    linhaParaApagar.parentNode.removeChild(linhaParaApagar);

    // Remove a linha dos dados salvos no localStorage
    const dadosCargaHoraria = carregarDadosLocalStorage();
    const indexParaApagar = dadosCargaHoraria.findIndex(dados => dados.Data === linhaParaApagar.cells[0].innerText);
    if (indexParaApagar !== -1) {
        dadosCargaHoraria.splice(indexParaApagar, 1);
        salvarDadosLocalStorage(dadosCargaHoraria); // Atualiza o localStorage após a exclusão
    }
}

// Função para carregar e exibir os dados do localStorage
function carregarEExibirDadosLocalStorage() {
    const dadosCargaHoraria = carregarDadosLocalStorage();
    const tabelaCargaHoraria = document.getElementById("tabela-carga-horaria");

    // Limpa a tabela antes de adicionar os dados
    tabelaCargaHoraria.innerHTML = "";

    // Adiciona os dados salvos na tabela
    dadosCargaHoraria.forEach(dados => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Data}</td>
            <td>${dados.HoraDeEntrada}</td>
            <td>${dados.TempoDoIntervalo}</td>
            <td>${dados.HoraDeSaida}</td>
            <td>${dados.ValorDoDia}</td>
            <td>${dados.TaxaDaGasolina}</td>
            <td>${dados.LucroDoDia}</td>
            <td><button onclick="apagarLinha(this)">Apagar</button></td>
        `;
        tabelaCargaHoraria.appendChild(novaLinha);
    });
}

// Função para carregar os dados do localStorage
function carregarDadosLocalStorage() {
    return JSON.parse(localStorage.getItem('dadosCargaHoraria')) || [];
}

// Função para salvar os dados no localStorage
function salvarDadosLocalStorage(dados) {
    localStorage.setItem('dadosCargaHoraria', JSON.stringify(dados));
}

// Adiciona um ouvinte de evento para o formulário
document.getElementById("formDados").addEventListener("submit", adicionarLinha);

// Adiciona um ouvinte de evento para carregar e exibir os dados ao carregar a página
window.addEventListener("load", carregarEExibirDadosLocalStorage);
