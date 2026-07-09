const listaEditavel = document.getElementById('listaEditavel');
const butEspera = document.getElementById('butEspera');
const butVoltar =  document.getElementById('butVoltar');
const listaCadastrados = document.getElementById('listaCadastrados');
const inputCadastrado = document.getElementById('inputCadastrado');
const inputNumero = document.getElementById('inputNumero');
const inputNumeros = document.getElementById('inputNumeros');
const inputNumerosAleatorios = document.getElementById('inputNumerosAleatorios');
const contador = document.getElementById('contador');
const contarCadastrados = document.getElementById('contarCadastrados');
const avisoErro = document.getElementById('avisoErro');
const btnSortear = document.getElementById('btnSortear');
const avisoFim = document.getElementById('avisoFim');
const velocidadeSorteio = document.getElementById('velocidadeSorteio');
const velocidadePiscada = document.getElementById('velocidadePiscada');
const overlaySorteio = document.getElementById('overlaySorteio');
const nomeSorteadoOverlay = document.getElementById('nomeSorteadoOverlay');
const barraProgressoOverlay = document.getElementById('barraProgressoOverlay');
const barraPreenchimentoOverlay = document.getElementById('barraPreenchimentoOverlay');
const btnProximo = document.getElementById('btnProximo');
const statusOverlay = document.getElementById('statusOverlay');
const divIgreja = document.getElementById('textoIgreja');
const divCidade = document.getElementById('textoCidade');
const inputIgreja = document.getElementById('inputIgreja');
const inputCidade = document.getElementById('inputCidade');
const inputAbrev = document.getElementById('inputAbrev');
const inputBairro = document.getElementById('inputBairro');
const inputMinisterio = document.getElementById('inputMinisterio');
const inputTexto = document.getElementById('inputTexto');
const inputPesq = document.getElementById('inputPesquisa');
const cabecario =  document.getElementById('cabecario');
const cabecario2 =  document.getElementById('cabecario2');
const modal =  document.getElementById('modal');
const confirme = document.getElementById('confirme');
const mascara = document.getElementById('mascara');
let cadastrados = JSON.parse(localStorage.getItem('cte_cadastrados') || '[]');
let nomes = JSON.parse(localStorage.getItem('cte_nomes') || '[]');
let nomesSorteados = JSON.parse(localStorage.getItem('cte_sorteados') || '[]');
let ultimoGanhador = localStorage.getItem('cte_ultimo_ganhador') || '';
let dataInicio = localStorage.getItem('cte_data_inicio') || new Date().toLocaleString('pt-BR');
let historico = JSON.parse(localStorage.getItem('cte_historico')) || [];
let historicoAtual = JSON.parse(localStorage.getItem('cte_historicoAtual')) || [];
let listaEspera = JSON.parse(localStorage.getItem('cte_listaEspera')) || [];
let historicoPermanente = JSON.parse(localStorage.getItem('cte_historicoPermanente')) || [];
let igrejaFoto = localStorage.getItem('nomeIgreja') || [];
let cidadeFoto = localStorage.getItem('nomeCidade') || [];
let abrevFoto = localStorage.getItem('nomeAbrev') || [];
let bairroFoto = localStorage.getItem('nomeBairro') || [];
let ministerioFoto = localStorage.getItem('nomeMinisterio') || [];
let textoFoto = localStorage.getItem('nomeTexto') || [];
let somTambor = document.getElementById('somTambor');
let somPrato = document.getElementById('somPrato');
let somPalmas = document.getElementById('somPalmas');
let sorteando = false;
let presetAtual = localStorage.getItem('cte_preset_atual')|| 'familia';
let preset = '';
let presete = '';
let controleLista = 1;
somPalmas.volume = 0.3;
somTambor.volume = 0.3;
somPrato.volume = 0.3;
let msg ='';
// PRESETS 
const PRESETS = {
    familia:{
        nomes: 'cte_familia_nomes',
        sorteados: 'cte_familia_sorteados',
        historico: 'cte_familia_historico',
        listaEspera: 'cte_familia_listaEspera',
        sessoes: 'cte_familia_sessoes'
    },
    infantil:{
        nomes: 'cte_infantil_nomes',
        sorteados: 'cte_infantil_sorteados',
        historico: 'cte_infantil_historico',
        listaEspera: 'cte_infantil_listaEspera',
        sessoes: 'cte_infantil_sessoes'
    },
    musica:{
        nomes: 'cte_musica_nomes',
        sorteados: 'cte_musica_sorteados',
        historico: 'cte_musica_historico',
        listaEspera: 'cte_musica_listaEspera',
        sessoes: 'cte_musica_sessoes'
    },
     geral:{
        nomes: 'cte_geral_nomes',
        sorteados: 'cte_geral_sorteados',
        historico: 'cte_geral_historico',
        listaEspera: 'cte_geral_listaEspera',
        sessoes: 'cte_geral_sessoes'
    }
}

// CARREGA PRESETS AO SER SOLICITADO PELOS BOTOES
function carregarPreset(nomePreset){
    presetAtual = nomePreset;
    localStorage.setItem('cte_preset_atual', nomePreset);
    const chaves = PRESETS[nomePreset];
    nomes = JSON.parse(localStorage.getItem(chaves.nomes) || '[]');
    nomesSorteados = JSON.parse(localStorage.getItem(chaves.sorteados) || '[]');
    listaEspera = JSON.parse(localStorage.getItem(chaves.listaEspera) || '[]');
    historico = JSON.parse(localStorage.getItem(chaves.historico) || '[]');
    document.querySelectorAll('.botao-preset').forEach(btn =>btn.classList.remove('ativo'));
    document.querySelectorAll('.botao-preset').forEach(btn =>btn.classList.add('desativado'));
    document.getElementById( `btnPreset${nomePreset.charAt(0).toUpperCase() + nomePreset.slice(1)}`).classList.add('ativo');
    localStorage.setItem('cte_preset_atual', nomePreset);
    renderizarCadastrados();
    renderizarLista();
    renderizarEspera();
    atualizarContador();
    atualizarContadorCadastrados();
    atualizarBotaoImportar();
}

// FUNCAO PARA VER O HISTORICO ATUAL, O MAIS VOLATIL DOS TRES
function verHistoricoAtual() {
    if (historicoAtual.length === 0) {
        mostrarErro("⚠️ Nenhum sorteio realizado ainda.");
        return;
    }
    let texto = '';
    historicoAtual.forEach(item => {
        texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
    });
    cabecario.innerHTML ="<span style='float:left'>📜</span> HISTÓRICO ATUAL <button onclick='limparHistorico()' class='but-limpar' >🗑️ Limpar</button>";
    modal.innerHTML = `${texto}<br>`;
    confirme.style.display = 'block';
    confirme.innerText = '📄 Exportar';
    modalHistorico();
    // METODO PARA SUBSTITUIR O BOTAO CONFIRM NATIVO DO JAVASCRIPT
    // Se clicar no botao exportar, chama a funcao para exportar as informacoes
    confirme.onclick = () => {
        exportarResultado();
    }
}

// FUNCAO PARA VER O HISTORICO ACUMULATIVO
function verHistorico() {
    if (historico.length === 0) {
        mostrarErro("⚠️ Nenhum sorteio realizado ainda.");
        return;
    }
    let texto = '';
    historico.forEach(item => {
        texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º\n`;
    });
    cabecario.innerHTML ="<span style='float:left'>📜</span> HISTÓRICO";
    modal.innerText = `${texto}`;
    confirme.style.display = 'block';
    confirme.innerText = '📄 Exportar';
    modalHistorico();
    // METODO PARA SUBSTITUIR O BOTAO CONFIRM NATIVO DO JAVASCRIPT
    // Se clicar no botao exportar, chama a funcao para exportar as informacoes
    confirme.onclick = () => {
        exportarResultado();
    }
}

// FUNCAO PARA LIMPAR O HISTORICO ATUAL
function limparHistorico() {
    if (historicoAtual.length === 0) {
        mostrarErro("⚠️ Nenhum sorteio realizado ainda.");
        return;
    }
    let texto = '';
    historicoAtual.forEach(item => {
        texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
    });
    cabecario.innerHTML ="<span style='float:left'>📜</span> HISTÓRICO ATUAL";
    modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>APAGAR</b></span><br><br>Para excluir o Histórico abaixo<br><br>${texto}`;
    confirme.style.display = 'block';
    confirme.innerHTML = "<img class='eraser' src='eraser.png'> Apagar";
    modalHistorico();
    // METODO PARA SUBSTITUIR O BOTAO CONFIRM NATIVO DO JAVASCRIPT
    // Se clicar no botao exportar, chama a funcao para exportar as informacoes
    confirme.onclick = () => {
        historicoAtual = [];
        localStorage.setItem('cte_historicoAtual', JSON.stringify([]));

        mostrarErro(`⚠️ Histórico apagado!`);
        fechar();
    }
}

// FUNCAO QUE MOSTRA O MODAL COM O HISTORICO PERMANENTE
function verHistoricoPermanente() {
    const chaveSessoes = PRESETS[presetAtual].sessoes;
    const sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
    if(presetAtual === 'geral'){
        presete = 'P 4';
    }else if(presetAtual === 'musica'){
        presete = 'P 3';
    }else if(presetAtual === 'infantil'){
        presete = 'P 2';
    }else{
        presete = 'P 1';
    }
    if(sessoes.length === 0){
        mostrarErro(`⚠️ Histórico ${presete} vazio. \nReinicie um sorteio para salvar a primeira sessão.`);
        return;
    }
    let texto = '';
    sessoes.forEach((sessao, index) => {
        texto += `Sorteio - ${sessao.data}<br>`;
        texto += `<span style='color:darkblue;'>- - - - - - - 👑 Ganhadores 👑 - - - - - - -</span><br>`;
        if (sessao.ganhadores.length > 0){
            sessao.ganhadores.forEach(g => {
                texto += `🏆 ${g}<br>`;
            });
        }else{
            texto += `Nenhum sorteado<br>`;
        }
        texto += `───────────────────────────────────────<br>`;
        if(sessao.participantes.length > 0) {
            texto += `😎 Participaram do sorteio <br>`;
            texto += `${sessao.participantes.join(', ')}.<br>`;
        }
        if (index < sessoes.length - 1){
             texto += `<span style='color:red;'>═══════════════════════════════════════</span><br>`;
        }
    });
    modal.style.height = '210px';
    cabecario.innerHTML ="<span style='float:left'>📜</span> HISTÓRICO GERAL";
    cabecario2.style.display = 'block';
    cabecario2.innerHTML =`Histórico - ${presete} - Total: ${sessoes.length} sessões`;
    modal.innerHTML = `${texto}`;
    confirme.style.display = 'block';
    confirme.innerText = '📄 Exportar';
    modalHistorico();
    confirme.onclick = () => {
        exportarPermanente()
    }
}

// FUNCAO QUE MOSTRA O HISTORICO PARA LIMPAR PERMANENTEMENTE
function limparPresetAtual() {
    const chaveSessoes = PRESETS[presetAtual].sessoes;
    const sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
    if(presetAtual === 'geral'){
        presete = 'P 4';
    }else if(presetAtual === 'musica'){
        presete = 'P 3';
    }else if(presetAtual === 'infantil'){
        presete = 'P 2';
    }else{
        presete = 'P 1';
    }
    if(sessoes.length === 0){
        mostrarErro(`⚠️ Histórico ${presete} vazio. \nReinicie um sorteio para salvar a primeira sessão.`);
        return;
    }
    // Abre o historico branco
    cabecario.innerHTML ="<span style='float:left'>🗑️</span> APAGAR HISTÓRICO";
    modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>CONFIRMAR</b></span><br><br>Para confirmar que quer apagar:<br><br> "TODO" Histórico Permanente de ${presete}.`;
    confirme.style.display = 'block';
    confirme.innerHTML = "✅ CONFIRMAR";
    modalHistorico();
    // Primeira confirmacao para limpar o historico permanente
    confirme.onclick = () => {
        if (sessoes.length === 0) {
            mostrarErro(`⚠️ Histórico ${presete} vazio. \nReinicie um sorteio para salvar a primeira sessão.`);
            return;
        }
        cabecario.innerHTML ="<span style='float:left'>🗑️</span> APAGAR PERMANENTE";
        confirme.innerHTML = "<img class='eraser' src='eraser.png'> Apagar";
        if(sessoes.length === 1){
            modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>APAGAR</b></span><br><br>Para confirmar exclusão de:<br><br>"TODO" Histórico Permanente de ${presete}.<br><br>Essa ação não poderá ser desfeita.<br><br>${sessoes.length} sessão será apagada.`;
        }else{
            modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>APAGAR</b></span><br><br>Para confirmar exclusão de:<br><br>"TODO" Histórico Permanente de ${presete}.<br><br>Essa ação não poderá ser desfeita.<br><br>${sessoes.length} sessões serão apagadas.`;
        }
        // Segunda confirmacao, se confirmado, limpa o histórico selecionado
        confirme.onclick = () => {
            localStorage.removeItem(chaveSessoes);
            mostrarErro(`⚠️ Histórico ${presete} apagado!`);
            fechar();
        }
    }
}

// FUNCAO QUE MOSTRA O MODAL, CONFIGURACAO DE AUDIO
function alternarMute(){
    let mutado = document.getElementById('mute').checked;
    somTambor.muted = mutado;
    somPrato.muted = mutado;
    somPalmas.muted = mutado;
    if(mutado){
         document.getElementById('bat').style.visibility = 'hidden';
         document.getElementById('bat').checked = false;
         document.getElementById('prato').style.visibility = 'hidden';
          document.getElementById('prato').checked = false;
         document.getElementById('palmas').style.visibility = 'hidden';
          document.getElementById('palmas').checked = false;
    }else{
        document.getElementById('bat').style.visibility = 'visible';
        document.getElementById('prato').style.visibility = 'visible';
        document.getElementById('palmas').style.visibility = 'visible';
    }
}

// FUNCAO RESPONSAVEL PARA CORTAR O SOM DOS TAMBORES
function muteBateria(){
    let mutado = document.getElementById('bat').checked;
    somTambor.muted = mutado;
}

// FUNCAO RESPONSAVEL PARA CORTAR O SOM DOS PRATOS
function mutePrato(){
    let mutado = document.getElementById('prato').checked;
    somPrato.muted = mutado;
}

// FUNCAO RESPONSAVEL PARA CORTAR O SOM DAS PALMAS
function mutePalmas(){
    let mutado = document.getElementById('palmas').checked;
    somPalmas.muted = mutado;
}

// FUNCAO RESPONSAVEL PARA REGULAR O VOLUME DO SOM DO SORTEIO
function ajustaVolume(valor){
    somTambor.volume = valor;
    somPrato.volume = valor;
    somPalmas.volume = valor;
    let valo = Math.round(valor * 100);
    if(valo < 1){
        document.getElementById('valorVolume').innerHTML = "<span class='completaZero' >00</span>" + valo + "%";
    }else if(valo >=10 && valo < 100){
         document.getElementById('valorVolume').innerHTML = "<span class='completaZero' >0</span>" + valo + "%";
    }else{
         document.getElementById('valorVolume').textContent = valo + '%';
    }
}

// FUNCAO QUE QUEBRA A LINHA NO ESPACO DO NOME NO MARCA PAGINA DA FOTO DO SORTEADO
function quebraTexto(ctx, texto, x, y, maxLargura, alturaLinha){
    const palavras = texto.split(' ');
    let linha = '';
    let posY = y;
    for(let i = 0; i< palavras.length; i++){
        const testeLinha = linha + palavras[i] + ' ';
        const largura = ctx.measureText(testeLinha).width;

        if(largura > maxLargura && i > 0){
            ctx.fillText(linha, x, posY);
            linha = palavras[i] + ' ';
            posY += alturaLinha;
        }else{
            linha = testeLinha;
        }
    }
    ctx.fillText(linha, x, posY);
}

// FUNCAO QUE CRIA UM MARCA PAGINA COM O NOME DO GANHADOR
function salvarImagem() {
    if (!ultimoGanhador) {
        mostrarErro("⚠️ Sorteia alguém primeiro!");
        return;
    }
    const minFoto = localStorage.getItem('nomeMinisterio') || 'Ministéreio de Oração';
    const textFoto = localStorage.getItem('nomeTexto') || 'O Senhor te abeçõe e te guarde';
    cabecario.innerHTML ="<span style='float:left'>📸</span> CONFIRMAR MINISTÈRIO";
    confirme.style.display = 'block';
    confirme.innerText = '✅ CONFIRMAR';
    modal.innerHTML = `<br>Clique em <span class="confirm"><b>CONFIRMAR</b></span><br><br>Se ministério for esse:<br><br> <span style='color:darkblue;font-weight:bold;'>${minFoto}</span> `;
    modalHistorico();
    confirme.onclick = () => {
        cabecario.innerHTML ="<span style='float:left'>📸</span> SALVAR IMAGEM";
        confirme.innerText = '✅ OK';
        modal.innerHTML = `<br>Clique em <span class="confirm"><b>OK</b></span><br><br>Para salvar a imagem de:<br><br> <span style='color:darkblue;font-weight:bold;'>${ultimoGanhador}</span> `;
        confirme.onclick = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // Tamanho marca página 5x15cm em 300 DPI
            canvas.width = 591;
            canvas.height = 1772;
            // Fundo degradê cyberpunk
            const grad = ctx.createLinearGradient(0, 0, 0, 1772);
            grad.addColorStop(0, '#6a6d81ff');
            grad.addColorStop(0.5, '#444b74ff');
            grad.addColorStop(1, '#0a0e27');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 591, 1772);
            // Brilho nas bordas
            ctx.strokeStyle = '#bdf5f5ff';
            ctx.lineWidth = 6;
            ctx.shadowColor = '#bdf5f5ff';
            ctx.shadowBlur = 20;
            ctx.strokeRect(15, 15, 561, 1742);
            ctx.shadowBlur = 0;
            // Nome do ministerio
            ctx.font = '38px Arial';
            ctx.fillStyle = '#a5f7d7ff';
            ctx.shadowBlur = 0;
            ctx.textAlign = 'center';
            ctx.fillText(minFoto, 295, 100);// 120, 100
            // Texto da bencao
            ctx.font = '28px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 0;
            ctx.textAlign = 'center';
            // pega o nome do ganhador para formatar
            const  tituloFoto = textFoto;
            quebraTexto(ctx, tituloFoto, 295, 160, 500, 50);   
            // Título GANHADOR
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 55px Arial';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 5;
            ctx.fillText('GANHADOR', 295, 400);
            // Trofel
            ctx.font = '150px Arial';
            ctx.shadowColor = '#ffd700';
            ctx.shadowBlur = 25;
            ctx.fillText('🏆', canvas.width / 2, 740);
            // Nome do ganhador
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 80px Arial';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 5;
            ctx.textAlign = 'center';
            // Quebra o nome se for muito grande
            const nome = ultimoGanhador;
            quebraTexto(ctx, nome, 295, 1030, 500, 100);
            // Ordem do sorteio
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 45px Arial';
            ctx.shadowBlur = 0;
            ctx.fillText(`${nomesSorteados.length}º SORTEADO`, 295, 1350);
            // Data e hora
            ctx.font = '35px Arial';
            ctx.shadowBlur = 0;
            ctx.fillText(new Date().toLocaleString('pt-BR'), 295, 1500);
            // Rodapé
            const nomeSorteio = abrevFoto + ' ' +  bairroFoto + ' - ' +  cidadeFoto;
            ctx.font = '28px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 0;
            ctx.fillText(nomeSorteio, 295, 1700);  
            // Baixar a imagem
            const link = document.createElement('a');
            link.download = `🏆 marca-pagina-${ultimoGanhador.replace(/\s/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            fechar();
        }
    }
}

// FUNCAO QUE FORMATA O NOME NA LISTA DE CADASTRADOS
function formatarNome(nome) {
    return nome.toLowerCase().split(' ').map(palavra => {
        if (palavra.length === 0) return palavra;
        const excecoes = ['de', 'da', 'do', 'das', 'dos', 'e'];
        if (excecoes.includes(palavra) && palavra.length <= 3) return palavra;
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }).join(' ');
}

// FUNCAO QUE SALVA AS INFORMACOES DOS PRESETS
function salvarDados() {
    const chaves = PRESETS[presetAtual];
    localStorage.setItem('cte_cadastrados', JSON.stringify(cadastrados));
    localStorage.setItem(chaves.nomes, JSON.stringify(nomes));
    localStorage.setItem(chaves.sorteados, JSON.stringify(nomesSorteados));
    localStorage.setItem(chaves.historico, JSON.stringify(historico));
    localStorage.setItem(chaves.historicoAtual, JSON.stringify(historicoAtual));
    localStorage.setItem(chaves.listaEspera, JSON.stringify(listaEspera));
    localStorage.setItem('cte_data_inicio', dataInicio);
    if (ultimoGanhador) localStorage.setItem('cte_ultimo_ganhador', ultimoGanhador);
}

// CODIGO RESPONSAVEL PARA CARREGAR OS PRESETS AO CLICAR NOS BOTOERS P1 A P4
document.getElementById('btnPresetFamilia').onclick = () => carregarPreset('familia');
document.getElementById('btnPresetInfantil').onclick = () => carregarPreset('infantil');
document.getElementById('btnPresetMusica').onclick = () => carregarPreset('musica');
document.getElementById('btnPresetGeral').onclick = () => carregarPreset('geral');

// CHAMA A FUNCAO PARA CARREGAR O PRESET SOLICITADO E ADICIONAR COMO PRESET ATUAL
carregarPreset(presetAtual);

// FUNCAO QUE ADICIONA NUMEROS ALEATORIOS A LISTA DE PARTICIPANTES
function adicionarNumerosAleatorios() {
    const valor = inputNumerosAleatorios.value.trim();
    if (valor === '') {
        mostrarErro('⚠️ Digite algum número!');
        return;
    }
    // Codigo responsavel para substituir as virgulas por espaco e pegar os numeros entre os espacos
    const numerosSemFiltro = valor.split(/[,\s]+/).map(n => n.trim()).filter(n => n!== '');
    // Codigo responsavel para retirar os numeros que estiverem duplicados no input
    const numeros = [...new Set(numerosSemFiltro)];
    // Codigo responsavel para identificar os numeros que estiverem duplicados no input
    const numerosDuplicado = numerosSemFiltro.filter((item, index) => numerosSemFiltro.indexOf(item) !== index);
    // Codigo responsavel para 
    const duplicadosUnicos =[...new Set(numerosDuplicado)];
    if (numeros.length === 0) {
        mostrarErro('❌ Nenhum número válido encontrado!');
        return;
    }
    const novosNumeros = [];
    const duplicados = [];
    const invalidos = [];
    numeros.forEach(num => {
        if (!/^\d+$/.test(num)) {
            invalidos.push(num);
            return;
        }
        if (nomes.includes(num)) {
            duplicados.push(num);
        } else {
            novosNumeros.push(num);
        }
    });
    if (invalidos.length > 0) {
        mostrarErro(`❌ Inválidos: ${invalidos.join(', ')}`);
        return;
    }
    if (novosNumeros.length === 0) {
        mostrarErro('❌ Todos os números já estão na lista!');
        return;
    }
    let msg = '';
    msg +='<br>Clique em <span class="confirm"><b>ADD</b></span><br>';
    // Se entrarem mais de um numero duplicado, entra aqui para mostrar a informacao
    if(duplicadosUnicos.length > 1){
        // Se entrar apenas um duplicado, informa aqui por causa da pronuncia correta em portugues, 'duplicado, adicionado, numero'
        if(duplicadosUnicos.length === 1){
            msg += `<br>O número ${duplicadosUnicos.join()} entrou duplicado.<br>Apenas um será selecionado<br><br>Será adicionado ${novosNumeros.length} número.<br>${novosNumeros.join(', ')}`;
        }else{
            // Se entrar mais de um duplicado, informa aqui por causa da pronuncia correta em portugues, 'duplicados, adicionados, numeros'
            msg += `<br>Os números ${duplicadosUnicos.join()} entraram duplicados.<br>Apenas um de cada duplicado foi selecionado.<br><br>Serão adicionados ${novosNumeros.length} números.<br>${novosNumeros.join(', ')}`;
        }
    }else{
        // Nao tendo duplicado, entra aqui se novosNumero tiver apenas um numero, e mostra a informação
        if(novosNumeros.length === 1){
            msg += `<br>Será adicionado 1 número.<br>${novosNumeros.join()}`;
        }else{
            // Se não houve duplicados, e novosNumeros tem mais de um numero, mostra a informacao por aqui
            msg += `<br>Serão adicionados ${novosNumeros.length} números.<br>${novosNumeros.join(', ')}`;
        }
    }
    if (duplicados.length > 0) {
        if (duplicados.length === 1) {
            msg += `<br><br>O número ${duplicados.join()} já está participando e será ignorado.`;
        }else{
            msg += `<br><br>Os números ${duplicados.join(', ')} já estão participando e serão ignorados.`;
        }
    }
    cabecario.innerHTML ="<span style='float:left'>🎱</span> ADICIONAR NÚMEROS";
    confirme.style.display = 'block';
    confirme.innerText = '✅ Add';
    modal.innerHTML = `${msg}`;
    modalHistorico();
    confirme.onclick = () => {
        nomes.push(...novosNumeros);
        nomes.sort((a, b) => a.localeCompare(b, 'pt-BR')); // A-Z
        salvarDados();
        renderizarLista();
        atualizarContador();
        inputNumerosAleatorios.value = '';
        fechar();
    }
}

// FUNCAO QUE GERA NUMEROS EM SEQUENCIA PARA A LISTA DE PARTICIPANTES
function gerarNumeros() {
    const valor = inputNumeros.value.trim();    
    if (valor === '') {
        mostrarErro('⚠️ Digite um número ou intervalo!');
        return;
    }
    const virgulas = (valor.match(/,/g) || []).length;
    if (virgulas > 1) {
        mostrarErro('❌ Só pode ter 1 vírgula! Use: 10,30');
        return;
    }
    let numerosGerados = [];
    if (valor.includes(',')) {
        const partes = valor.split(',').map(p => parseInt(p.trim()));
        if (partes.length!== 2 || isNaN(partes[0]) || isNaN(partes[1])) {
            mostrarErro('❌ Formato inválido! Use: 10,30');
            return;
        }
        const [inicio, fim] = partes;
        if (inicio >= fim) {
            mostrarErro('❌ Primeiro número deve ser menor que o segundo!');
            return;
        }
        if (fim - inicio > 2000) {
            mostrarErro('❌ Intervalo muito grande! Máximo 2000 números.');
            return;
        }
        if (fim  > 2000) {
            mostrarErro('❌ Máximo 2000 números.');
            return;
        }
        if (inicio > 2000) {
            mostrarErro('❌ Máximo 2000 números.');
            return;
        }
        if (inicio < 1) {
            mostrarErro('❌ Digite um número maior que zero.');
            return;
        }
        for (let i = inicio; i <= fim; i++) {
            numerosGerados.push(i.toString());
        }
    } else {
        const maximo = parseInt(valor);
        if (isNaN(maximo) || maximo < 1) {
            mostrarErro('❌ Digite um número válido maior que 0!');
            return;
        }
        if (maximo > 2000) {
            mostrarErro('❌ Máximo 2000 números!');
            return;
        }
        for (let i = 1; i <= maximo; i++) {
            numerosGerados.push(i.toString());
        }
    }
    const novosNumeros = [];
    const duplicados = [];
    numerosGerados.forEach(num => {
        if (nomes.includes(num)) {
            duplicados.push(num);
        } else {
            novosNumeros.push(num);
        }
    });
    if (novosNumeros.length === 0) {
        mostrarErro('❌ Todos os números já estão na lista!');
        inputNumeros.value = '';
        return;
    }
    let msg = '';
    msg += '<br>Clique em <span class="confirm"><b>GERAR</b></span><br><br>';
    if( novosNumeros.length === 1){
        msg += `\nPara gerar ${novosNumeros.length} número.`;
    }else{
        msg += `\nPara gerar ${novosNumeros.length} números.`;
    }
    if (duplicados.length > 0) {
        msg += `\n\n${duplicados.length} já existem e serão ignorados:\n${duplicados.join(', ')}`;
    }
    cabecario.innerHTML ="<span style='float:left'>🎱</span> GERAR NÚMEROS";
    confirme.style.display = 'block';
    confirme.innerText = '✅ Gerar';
    modal.innerHTML = `${msg}`;
    modalHistorico();     
    confirme.onclick = () => {
        nomes.push(...novosNumeros);
        nomes.sort((a, b) => a.localeCompare(b, 'pt-BR')); // A-Z
        ultimoGanhador = '';
        localStorage.removeItem('cte_ultimo_ganhador');
        salvarDados();
        renderizarLista();
        atualizarContador();
        inputNumeros.value = '';
        fechar();   
    }
}

// FUNCAO QUE FECHA TODOS OS MODAIS SUAVEMENTE
function fechar(){
    const form = document.getElementById('modalHistorico');
    const formCredito = document.getElementById('credito');
    const formulario = document.getElementById('formulario');
    const muteSel = document.getElementById('muteSel');   
    inputNumerosAleatorios.value = '';
    inputNumeros.value = '';
    formCredito.style.opacity = '1';
    formCredito.style.transition = 'opacity 0.5s, transform 0.5s';   
    form.style.opacity = '1';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    muteSel.style.opacity = '1';
    muteSel.style.transition = 'opacity 0.5s, transform 0.5s';
    mascara.style.opacity = '1';
    mascara.style.transition = 'opacity 0.4s, transform 0.4s';
    form.style.transform = 'translateY(-30px';   
        requestAnimationFrame(() => {
        form.style.opacity = '0';
        setTimeout(() => {
            form.style.display = 'none';
            cabecario2.style.display = 'none';
            modal.style.height = '250px';
        }, 500);
       
    });
    formCredito.style.transform = 'translateY(-30px'; 
        requestAnimationFrame(() => {
        formCredito.style.opacity = '0';
        setTimeout(() => {
            formCredito.style.display = 'none';
        }, 500);
    });
    formulario.style.transform = 'translateY(-30px'; 
        requestAnimationFrame(() => {
        formulario.style.opacity = '0';
        setTimeout(() => {
            formulario.style.display = 'none';
        }, 500);
    });
    muteSel.style.transform = 'translateY(-30px'; 
        requestAnimationFrame(() => {
        muteSel.style.opacity = '0';
        setTimeout(() => {
            muteSel.style.display = 'none';
        }, 500);
    });
    mascara.style.transform = 'translate(0'; 
        requestAnimationFrame(() => {
        mascara.style.opacity = '0';
        setTimeout(() => {
            mascara.style.display = 'none';
        }, 500);
    });
}

// FORMATA O CAMPO GERAR SEQUENCIA DE NUMEROS, 1/2
inputNumeros.addEventListener('keypress', function(e) {
    const input = e.target;
    const tecla = e.key;
    const valor = input.value;
    const posicao = input.selectionStart;
    const antesCursor = valor.slice(0, posicao);
    // Trava o teclado se for digitado zero logo apos a virgula
    if(tecla === '0' && /,\s*$/.test(antesCursor)){
        e.preventDefault();
        travaInput(input, '⚠️ Não pode zero depois da vírgula');
        return false;
    }
});

// FORMATA O CAMPO GERAR SEQUENCIA DE NUMEROS, 2/2
function limitarVirgula(input){
    // Nao aceita iniciar com zero ou virgula
    if(input.value.length === 1 && (input.value === '0' ||  input.value === ',' ||  input.value === ' ') ){
        travaInput(input, '⚠️ Não é permitido iniciar com zero ou virgula nesse campo!');
        input.value = '';
        return false;
    }
    // So deixa passar se for numero ou virgula
    input.addEventListener('beforeinput', e => {
         if(e.data && !/^[0-9,]$/.test(e.data)){
            travaInput(input, '⚠️ Apenas números e vírgula nesse campo!');
            return false;
        }
    })
    // segunda validacao apenas numeros e virgula no campo
    let valor = input.value.replace(/[^0-9,]/g, '');
    // inicio para inpedir digitar a virgula duas vezes no campo
    let partes = valor.split(',');
    if(partes.length > 2){
        valor = partes[0]+ ',' +partes.slice(1).join('');
        travaInput(input, '⚠️ Vírgula não é mais permitida nesse campo!');
    }
    input.value = valor;
}

// FORMATA O CAMPO NUMEROS ALEATORIOS, IMPEDE QUE SE DIGITE NUMEROS REPETIDOS NO CAMPO, 
// O NUMERO DIGITADO SERA VERIFICADO AO CLICAR NA VIRGULA, POREM SE REPETIR O NUMERO E CLICAR EM 
// ADICIONAR NUMEROS, SEM DIGITAR A VIRGULA ANTES, VAI IMPEDIR A ENTRADA E VALIDAR, 
// LA NO CODIGO DO CADASTRO DE NUMEROS ALEATORIOS
inputNumerosAleatorios.addEventListener('keydown', function(e){
const input = e.target;
    // Comeca a validar quando digita vigula no campo
    if(e.key === ','){
        let valor = this.value.replace(/\s/g, '');
        let numeros = valor.split(',').filter(n => n !== '');
        let ultimoNumero = numeros[numeros.length - 1];
        let anteriores = numeros.slice(0, -1);
        if(anteriores.includes(ultimoNumero) && ultimoNumero !== ''){
            e.preventDefault();
            this.value = anteriores.join(',')+ ',';
            travaInput(input, `⚠️ ${ultimoNumero} já existe!`);
        }
    }
});

// FORMATA O CAMPO NUMEROS ALEATORIOS
function controlarVirgulaAuto(e){
    const input = e.target;
    const tecla = e.key;
    const valor = input.value;
    const posicao = input.selectionStart;
    const antesCursor = valor.slice(0, posicao);
    //Nao permite iniciar o campo com zero nem virgula
    if(e.target.value.length === 0 && (e.key === '0' ||  e.key === ',') ){
        e.preventDefault();
        travaInput(input, '⚠️ Não inicia com zero ou espaço!');
        return false;
    }
    // So numeros ou virgula
    if(!/^[0-9,]$/.test(tecla)){
        e.preventDefault();
        travaInput(input, '⚠️ Apenas números e virgula nesse campo!');
        return false;
    }
    // Trava o teclado se for digitado zero logo apos a virgula
    if(tecla === '0' && /,\s*$/.test(antesCursor)){
        e.preventDefault();
        travaInput(input, '⚠️ Não pode zero depois da vírgula');
        return false; 
    }
    // Trava o teclado se for digitado duas vírgulas seguidas, 
    // pede para digitar um numero antes da proxima virgula
    if(tecla === ','){
        const blocos = antesCursor.split(',');
        const ultimoBloco = blocos[blocos.length - 1].replace(/\D/g, '');
        if(ultimoBloco.length === 0){
            e.preventDefault();
            travaInput(input, '⚠️ Digite um número antes da vírgula');
            return false;
        }
    }
    // Trava o teclado no quinto numero e pede pra digitar a virgula para continuar
    if(/^[0-9]$/.test(tecla)){
        const blocos = antesCursor.split(',');
        const ultimoBloco = blocos[blocos.length - 1].replace(/\D/g, '');
        if(ultimoBloco.length >=5){
            e.preventDefault();
            travaInput(input, '⚠️ Digite a vírgula para continuar!');
            return false;
        }
    }
}

// FUNCAO QUE CHAMA A ANIMACAO NO CAMPO INPUT
function travaInput(input, msg){
    input.classList.add('input-bloqueado');
    setTimeout(() => input.classList.remove('input-bloqueado'), 200);
    if(msg) mostrarErro(msg);
}

// FUNCAO QUE VALIDA O CPF 
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    let digito1 = resto > 9 ? 0 : resto;
    if (digito1 != cpf.charAt(9)) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    let digito2 = resto > 9 ? 0 : resto;
    return digito2 == cpf.charAt(10);
}

// AO CLICAR NO CAMPO DE CADASTRO DE NOMES, LIMPA O CAMPO DE CADASTRO DE NUMEROS E CPF 
inputCadastrado.addEventListener('click', function(e) {
    document.getElementById('inputPesquisa').value = ''; 
    if(inputNumero.value !== ''){
        inputNumero.value = '';
    }
});

// AO CLICAR NO CAMPO DE CADASTRO DE NUMEROS E CPF, LIMPA O CAMPO DE CADASTRO DE NOMES
inputNumero.addEventListener('click', function(e) {
    if(inputCadastrado.value !== ''){
        inputCadastrado.value = '';
    }
});

// FORMATA O CAMPO QUE ADICIONA NOME, AO SER DIGITADO EM TEMPO REAL
inputCadastrado.addEventListener('input', function(e) {
    // remove tudo que nao seja letras ou espaco
    inputCadastrado.value = inputCadastrado.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    // remove espacos duplos
    inputCadastrado.value = inputCadastrado.value.replace(/\s{2,}/g, ' ');
    // remove espaco no inico
    if(inputCadastrado.value.charAt(0) === ' '){
       inputCadastrado.value = inputCadastrado.value.replace(/^\s+/g, '');
    }
});

// FORMATA O CAMPO QUE ADICIONA NUMEROS E CPF PARA A LISTA DE CADASTRADOS
inputNumero.addEventListener('input', function(e) {
     if(!/^\d+$/.test(inputNumero.value)){
        // Mostra a mensagem de erro de CPF invalido
        travaInput(inputNumero, '⚠️ Apenas números nesse campo.');
     }
    // Esconde o botao CAD se digitar mais de 5 numeros
    if(inputNumero.value.length > 5){
    document.getElementById('cadastrarNumero').style.visibility = 'hidden';
    inputNumero.classList.remove('cpf-ok');
    // Envia a mensagem para continuar digitando o CPF, mesmo sem o botao CAD
    mostrarErro("⚠️ Complete o CPF para validar.");
    }else{
    document.getElementById('cadastrarNumero').style.visibility = 'visible';
    }
    // Entra aqui ao digitar 11 numeros
    if(inputNumero.value.length === 11){
        // Quando chega a 11 numeros digitados, valida automaticamente o CPF digitado para liberar o botao CAD
        if (validarCPF(inputNumero.value)) {
            mostrarErro("✅ CPF válido.");
                // Botao CAD aparece para cadastrar o CPF valido
                document.getElementById('cadastrarNumero').style.visibility = 'visible';
                // Campo fica verde com CPF valido
                inputNumero.classList.add('cpf-ok');
        } else {
            // Remove o campo verde do CPF valido
            inputNumero.classList.remove('cpf-ok');
            // Esconde o botao CAD
            document.getElementById('cadastrarNumero').style.visibility = 'hidden';
            // Mostra a mensagem de erro de CPF invalido
            travaInput(inputNumero, '⚠️ CPF inválido - verifique os números.');
        }  
    }
    // Impede digitar letras no campo, apenas numeros
    inputNumero.value = inputNumero.value.replace(/[^0-9\s]/g, '');
    // Impede digitar espaco no campo, apenas numeros
    inputNumero.value = inputNumero.value.replace(/\s{1,}/g, '');
});

// CHAMA A FUNCAO 'ADICIONARCADASTRADO()', AO DAR ENTER NO CADASTRO DE NOMES
inputCadastrado.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if(inputCadastrado.value === '') {
            travaInput(inputCadastrado, '⚠️ Primeiro digite um nome, depois Enter');
            return;
        }
        adicionarCadastrado();
    }
});

// FUNCAO RESPONSAVEL PARA COMPLETAR A FILTRAGEM DO NOME, NUMEROS OU CPF, E CADASTRAR NA LISTA
function adicionarCadastrado() {
    let nome = inputCadastrado.value.trim();
    let num = inputNumero.value.trim();
    // Se for enviado do botao CAD, do campo Numero ou CPF, entra aqui
    if(num){
        // Libera CPF, inclusive os que comecam com zero a esquerda
        if(num.length < 11){
            // Retira os zeros a esquerda dos numeros que nao sao CPF
            num = num.replace(/^0+/, '');
            if(!num){
                inputNumero.value = '';
                mostrarErro('⚠️ Número inválido!');
            }
        }
        // Variavel 'nome' recebe o valor numerico enviado
        nome = num;  
    };
   // Nao permite cadastrar uma sequecia de mais de 5 numeros que nao seja um CPF
   // Se 'nome' contiver apenas numeros, e se tem entre 6 e 10 numeros, entra aqui
    if((/^\d+$/.test(nome)) && nome.length >5 && nome.length < 11){
        // Retorna falso e envia a mensagem
        mostrarErro('⚠️ Número inválido!');
        return;
    }
    
   // Desabilita o botao Enter se clicar nele, com o campo em branco
    if (nome === '') return;
    nome = formatarNome(nome);
    // Pesquisa o nome no array cadastrados, se encontrar um nome igual, 
    // atribui o nome para variavel jaExiste
    const jaExiste = cadastrados.find(n => n.toLowerCase() === nome.toLowerCase());
    if (jaExiste) {
        // Se jaExiste tiver 11 caracteres entra aqui
        if(jaExiste.length === 11){
            // Verifica se tem apenas numeros na variavel jaExiste
            if(/^\d+$/.test(jaExiste)) {
                travaInput(document.getElementById('inputNumero'), `⚠️ "${nome}" Este CPF já está cadastrado!`);
                return;
            // Se tem 11 caracteres porem tem letras, entra aqui
            }else{
                travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" Este nome já está cadastrado!`);
                return;
            }
        // Se tem mais ou menos de 11 caracteres, entra aqui
        }else{
            // Se tem somente numeros entra aqui
             if(/^\d+$/.test(jaExiste)) {
                travaInput(document.getElementById('inputNumero'), `⚠️ "${nome}" Este número já está cadastrado!`);
                return;
            // Se tem letras, entra aqui
            }else{
                travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" Este nome já está cadastrado!`);
                return;
            }  
        } 
    }
    cadastrados.push(nome);
    cadastrados.sort((a, b) => a.localeCompare(b, 'pt-BR'));
    inputCadastrado.value = '';
    inputNumero.value = '';
    salvarDados();
    renderizarCadastrados();
    atualizarContadorCadastrados();
    setTimeout(() => {
        // Se for enviado algum numero, mantém o foco no campo de cadastro de numeros, pra cadastrar o próximo
        if(num){
            inputNumero.focus();
        // Se for enviado um nome,  mantém o foco no campo de cadastro de nomes, pra cadastrar o próximo
        }else{
            inputCadastrado.focus();
        }
    }, 50);
}

// VALIDA O CAMPO PESQUISA PARA VOLTAR A QUANTIDADE DE CADASTRADOS, QUANDO ESTIVER LIMPO
inputPesq.addEventListener('input', (e) => {
    // remove espacos duplos
    inputPesq.value = inputPesq.value.replace(/\s{2,}/g, ' ');
    // remove espaco no inico
    if(inputPesq.value.charAt(0) === ' '){
       inputPesq.value = inputPesq.value.replace(/^\s+/g, '');
    }
    if(inputPesq.value === '')
    limparPesquisa();
});

// FUNCAO PARA RETIRAR O ACENTO DOS NOMES DIGITADOS NA PESQUISA
function removerAcentos(texto){
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// FUNCAO PARA DESTACAR O NOME ENCONTRADO
function destacarComAcento(textoOriginal, termoBusca){
    const textoLimpo = removerAcentos(textoOriginal);
    const termoLimpo = removerAcentos(termoBusca);
    const index = textoLimpo.indexOf(termoLimpo);
    if(index === -1) return textoOriginal;
    const antes = textoOriginal.substring(0, index);
    const meio = textoOriginal.substring(index, index + termoBusca.length);
    const depois = textoOriginal.substring(index + termoBusca.length);
    return `${antes}<span class="destaque">${meio}</span>${depois}`;
}

// FUNCAO QUE PESQUISA PELO NOME, NA LISTA DE NOMES CADASTRADOS
function pesquisarCadastrado(termo){
    document.getElementById('inputCadastrado').value = ''; 
    const termoOriginal = termo.trim();
    const termoLimpo = removerAcentos(termoOriginal);
    const itens = listaCadastrados.querySelectorAll('.item-nome.cadastrado');
    if(termoLimpo === ''){
        itens.forEach(item =>{
            item.classList.remove('oculto');
            const spanNome = item.querySelector('.nome-texto');
            spanNome.innerHTML = spanNome.textContent;  
        });
        return;
    }
    let encontrados = 0;
    itens.forEach(item => {
        const spanNome = item.querySelector('.nome-texto');
        const nomeOriginal = spanNome.textContent;
        const nomeLimpo = removerAcentos(nomeOriginal);    
        if(nomeLimpo.includes(termoLimpo)){
            item.classList.remove('oculto');
            encontrados++;
            spanNome.innerHTML = destacarComAcento(nomeOriginal, termoOriginal);
        }else{
            item.classList.add('oculto');
            contarCadastrados.innerText = encontrados + ' nomes';
        }
    });
    if(encontrados === 0){
        travaInput(inputPesq,`⚠️ Nenhum nome encontrado com "${termo}"`);
        limparPesquisa();
    }             
}

// FUNCAO PARA LIMPAR O CAMPO PESQUISA
function limparPesquisa(){
    const input = document.getElementById('inputPesquisa');
    pesquisarCadastrado('');
    atualizarContadorCadastrados();
    input.focus();
}

// FUNCAO QUE ATUALIZA OS CADASTROS NA TELA
function renderizarCadastrados() {
    // Limpa tudo antes
    listaCadastrados.innerHTML = '';    
    cadastrados.forEach((nome, index) => {
        const div = document.createElement('div');
        const estaUsado = nomes.includes(nome);
        div.className = 'item-nome cadastrado' + (estaUsado? ' usado' : '');
        const spanNome = document.createElement('span');
        spanNome.className = 'nome-texto';
        spanNome.textContent = nome;
        // Envia o nome para a lista de participantes ao clicar nele
        if (!estaUsado) {
            spanNome.onclick = () => adicionarAoSorteio(nome);
        }
        // Cria as divs dos botões de editar e deletar
        const botoesDiv = document.createElement('div');
        botoesDiv.className = 'botoes-item';
        // Cria o botao de excluir
        const btnDel = document.createElement('button');
        btnDel.className = 'btn-deletar';
        btnDel.textContent = '❌';
        // Habilita o botão para excluir ao clicar nele
        btnDel.onclick = (e) => {
            e.stopPropagation();
            deletarCadastro(index);
        };    
        botoesDiv.appendChild(btnDel);
        div.appendChild(spanNome);
        div.appendChild(botoesDiv);
        listaCadastrados.appendChild(div);
    });   
    // Recria o input no final
    listaCadastrados.appendChild(inputCadastrado);
     atualizarBotaoImportar();
}

// FUNCAO PARA IMPORTAR TODOS PARA A LISTA DE PARTICIPANTES
function importarOuRetornar(){
    listaEspera = [];
    localStorage.removeItem('cte_listaEspera');
    butEspera.style.display = 'none'; 
    const chaveSnapshot =  `cte_snapshot_${presetAtual}`;
    const snapshot = JSON.parse(localStorage.getItem(chaveSnapshot) || 'null');
    if(snapshot){
        retornarListaAnterior();
        atualizarContadorCadastrados();
        return;
    }
    const nomesParaImportar = cadastrados.filter(nome => !nomes.includes(nome));

    if (nomesParaImportar.length === 0) return;
    if (nomes.length > 0){
        localStorage.setItem(chaveSnapshot, JSON.stringify([...nomes]));
    }
    nomes.push(...nomesParaImportar);
    // Ordena os nomes da lista de cadastrados por ordem alfabetica
    nomes.sort((a, b) =>a.localeCompare(b, 'pt-BR'));
    salvarDados();
    renderizarCadastrados();
    renderizarLista();
    renderizarEspera();
    atualizarContador();
    atualizarBotaoImportar();
    atualizarContadorCadastrados(); 
    mostrarErro(`✅ ${nomesParaImportar.length} nomes importado com sucesso!`);
}

// FUNCAO QUE RETORNA A LISTA DE PARTICIPANTES ANTERIOR
function retornarListaAnterior(){
    const chaveSnapshot =  `cte_snapshot_${presetAtual}`;
    const snapshot = JSON.parse(localStorage.getItem(chaveSnapshot) || 'null');
    if(!snapshot) return;
    nomes = [...snapshot];
    nomes.sort((a, b) =>a.localeCompare(b, 'pt-BR'));
    localStorage.removeItem(chaveSnapshot);
    salvarDados();
    renderizarCadastrados();
    renderizarLista();
    atualizarContador();
    atualizarBotaoImportar();
    mostrarErro(`✅ Lista retornada com sucesso!`);
}

// FUNCAO QUE ATUALIZA O BOTAO IMPORTAR TODOS
function atualizarBotaoImportar(){
    const btnImportar = document.getElementById('btnImportarTodos'); //
    if(!btnImportar) return;
    const chaveSnapshot =  `cte_snapshot_${presetAtual}`;
    const temSnapshot = localStorage.getItem(chaveSnapshot);
    // Modo RETORNAR
    if(temSnapshot){
        const snapshot = JSON.parse(temSnapshot);
        btnImportar.disabled = false;
        btnImportar.innerHTML = `<span class="simbolo-retorno">↩</span> Ret ( ${snapshot.length} )`;
        btnImportar.classList.remove('btn-limpar-tudo');
        btnImportar.title="Retorna lista anterior";
        btnImportar.classList.add('retornar');
        return;
    }
    // Modo IMPORTAR
    const disponiveis = cadastrados.filter(nome =>!nomes.includes(nome));
    if(disponiveis.length === 0 || cadastrados.length === 0){
        btnImportar.disabled = true;
        btnImportar.innerHTML = '📥 Nada'; 
        btnImportar.title="Nada para Importar"; 
    }else{
        btnImportar.disabled = false;
        btnImportar.innerHTML = `<span style="position:relative;top:-3px"> 📥 </span>Imp (<span style="color:White"> ${disponiveis.length} </span> )`;
        btnImportar.classList.remove('retornar');
        btnImportar.classList.add('btn-limpar-tudo');
        btnImportar.title="Importar lista completa"; 
    }
}

// FUNCAO RESPONSAVEL PARA EXPORTA TUDO PARA OUTRO PC, CRIA O ARQUIVO JSON
function exportarTudo() {
    const dadosCompletos = {
        versao: '1.0',
        dataExportacao: new Date().toLocaleString('pt-BR'),
        presetAtivo: presetAtual,
        cadastrados: cadastrados, // lista única de cadastrados
        igreja: igrejaFoto,
        cidade: cidadeFoto,
        bairro: bairroFoto,
        abrev: abrevFoto,
        texto: textoFoto,
        ministerio: ministerioFoto,
        presets: {}
    };
    // Percorre os 4 presets: familia, infantil, musica, geral
    Object.keys(PRESETS).forEach(nomePreset => {
        const chaves = PRESETS[nomePreset];
        const nomesPreset = JSON.parse(localStorage.getItem(chaves.nomes) || '[]');
        const esperaPreset = JSON.parse(localStorage.getItem(chaves.listaEspera) || '[]');
        const sorteadosPreset = JSON.parse(localStorage.getItem(chaves.sorteados) || '[]');
        const historicoPreset = JSON.parse(localStorage.getItem(chaves.historico) || '[]');
        const sessoesPreset = JSON.parse(localStorage.getItem(chaves.sessoes) || '[]');
        // Só adiciona o preset se tiver dado
        if (nomesPreset.length > 0 || sorteadosPreset.length > 0 ||
            historicoPreset.length > 0 || sessoesPreset.length > 0) {
            dadosCompletos.presets[nomePreset] = {
                participantes: nomesPreset,
                sorteados: sorteadosPreset,
                espera: esperaPreset,
                historicoAtual: historicoPreset,
                historicoPermanente: sessoesPreset
            };
        }
    });

    // Gera o arquivo JSON
    const jsonString = JSON.stringify(dadosCompletos, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dataHoje = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `backup_sorteio_${dataHoje}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    mostrarErro(`✅ Exportado: ${cadastrados.length} cadastrados + ${Object.keys(dadosCompletos.presets).length} presets`);
}

// FUNCAO RESPONSAVEL PARA CRIAR UM ARQUIVO JSON COM TODS AS INFORMACOES
function importarTudo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const dados = JSON.parse(event.target.result);
                cabecario.innerHTML = "<span style='float:left'>📥</span> IMPORTAR BACKUP";
                modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Vai sobrescrever tudo.<br><br>Exportado em: ${dados.dataExportacao}<br>Cadastrados: ${dados.cadastrados?.length || 0}<br>Presets: ${Object.keys(dados.presets).join(', ') || 'nenhum'}<br><br>Clique em <span class="confirm"><b>CONFIRMAR</b></span>`;
                confirme.style.display = 'block';
                confirme.innerText = '✅ CONFIRMAR';
                modalHistorico();
                confirme.onclick = () => {
                    // Restaura cadastrados
                    localStorage.setItem('cte_cadastrados', JSON.stringify(dados.cadastrados || []));
                    // Restaura dados da igreja
                    if (dados.igreja) localStorage.setItem('nomeIgreja', dados.igreja);
                    if (dados.cidade) localStorage.setItem('nomeCidade', dados.cidade);
                    if (dados.bairro) localStorage.setItem('nomeBairro', dados.bairro);
                    if (dados.abrev) localStorage.setItem('nomeAbrev', dados.abrev);
                    if (dados.texto) localStorage.setItem('nomeTexto', dados.texto);
                    if (dados.ministerio) localStorage.setItem('nomeMinisterio', dados.ministerio);
                    // Restaura os 4 presets
                    Object.keys(dados.presets).forEach(nomePreset => {
                        const preset = dados.presets[nomePreset];
                        const chaves = PRESETS[nomePreset];
                        if (chaves) {
                            localStorage.setItem(chaves.nomes, JSON.stringify(preset.participantes || []));
                            localStorage.setItem(chaves.listaEspera, JSON.stringify(preset.espera || []));
                            localStorage.setItem(chaves.sorteados, JSON.stringify(preset.sorteados || []));
                            localStorage.setItem(chaves.historico, JSON.stringify(preset.historicoAtual || []));
                            localStorage.setItem(chaves.sessoes, JSON.stringify(preset.historicoPermanente || []));
                        }
                    });
                    // Restaura preset ativo
                    if (dados.presetAtivo) {
                        localStorage.setItem('cte_preset_atual', dados.presetAtivo);
                    }
                    fechar();
                    mostrarErro('✅ Importado com sucesso! Recarregando...');
                    setTimeout(() => location.reload(), 1500);
                };
            } catch (err) {
                mostrarErro('❌ Arquivo JSON inválido');
            }
        };
        reader.readAsText(arquivo);
    };
    input.click();
}

// FUNCAO RESPONSAVEL PARA EXCLUIR O NOME CADASTRADO
function deletarCadastro(index) {
    const nome = cadastrados[index];
    cabecario.innerHTML ="<span style='float:left'>🗑️</span> EXCLUIR DO CADASTRO";
    confirme.style.display = 'block';
    confirme.innerHTML = "<img class='eraser' src='eraser.png'> Apagar";
    modal.innerHTML = `<br>Clique em <span class="confirm"><b>APAGAR</b></span><br><br>Para excluir o nome abaixo.<br><br><span style='color:darkred;font-size:20px;'><b>${nome}</b></span><br><br>Também será removido do sorteio,<br><br>se estiver participando.`;
    modalHistorico();
    confirme.onclick = () => {
        cadastrados.splice(index, 1);
        // Remove também das outras listas
        const idxNome = nomes.indexOf(nome);
        if (idxNome!== -1) nomes.splice(idxNome, 1);
        const idxSorteado = nomesSorteados.indexOf(nome);
        if (idxSorteado!== -1) nomesSorteados.splice(idxSorteado, 1);
        salvarDados();
        renderizarCadastrados();
        renderizarLista();
        if(listaEspera.length > 0){
            voltarDoEsperar(nome);
        }else{
            atualizarContador(); 
        }
       // atualizarContador();
        atualizarContadorCadastrados();
        fechar();
    }
}

// FUNCAO QUE ADICIONA O NOME DA LISTA DE CADASTRADO, PARA A LISTA DE PARTICIPANTES
function adicionarAoSorteio(nome) {
    if (nomes.includes(nome)) {
        mostrarErro(`⚠️ ${nome} já está participando!`);
        return;
    }
    nomes.push(nome);
    nomes.sort((a, b) => a.localeCompare(b, 'pt-BR')); // A-Z automático
    salvarDados();
    renderizarCadastrados();
    renderizarLista();
    if(listaEspera.length > 0){
      voltarDoEsperar(nome);
    }else{
       atualizarContador(); 
    }
    atualizarBotaoImportar();
    atualizarContadorCadastrados();
}

// FUNCAO QUE ATUALIZA OS NUMEROS MOSTRADOS
function atualizarContadorCadastrados() {
    contarCadastrados.textContent = `${cadastrados.length} nomes | ${cadastrados.length - nomes.length} disponíveis`;
}
function atualizarContadorEspera() {
    document.getElementById('contador').textContent = `${listaEspera.length} nomes`;
}

// FUNCAO RESPONSAVEL PARA MOSTRAR INFORMACAO DE ERRO OU SUCESSO EM CIMA
function mostrarErro(msg) {
    avisoErro.textContent = msg;
    avisoErro.classList.add('mostrar');
    setTimeout(() => avisoErro.classList.remove('mostrar'), 10000);
}

// FUNCAO RESPONSAVEL PARA CONTAR OS NOMES QUE ESTAO SENDO SORTEADOS, E OS QUAL AINDA NAO FORAM
function atualizarContador() {
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    let texto = `${disponiveis.length} disponíveis`;
    if (nomesSorteados.length > 0) texto += ` | ${nomesSorteados.length} sorteados`;
    contador.textContent = texto;
    if (disponiveis.length === 0 && nomesSorteados.length > 0) {
        btnSortear.disabled = true;
        btnSortear.textContent = '❌ LISTA ZERADA';
        avisoFim.classList.add('mostrar');
    } else if (disponiveis.length === 0) {
        btnSortear.disabled = true;
        btnSortear.textContent = '❌ SEM NOMES';
        avisoFim.classList.remove('mostrar');
    } else {
        btnSortear.disabled = false;
        btnSortear.textContent = '🎲 SORTEAR';
        avisoFim.classList.remove('mostrar');
    }
}

// FUNCAO RESPONSAVEL PELO MODAL QUE INICIA O SORTEIO
function abrirSorteio() {
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    if (disponiveis.length === 0) return;
    overlaySorteio.classList.add('mostrar');
    nomeSorteadoOverlay.textContent = 'TUDO PRONTO';
    nomeSorteadoOverlay.classList.remove('ganhador');
    barraProgressoOverlay.classList.remove('mostrar');
    atualizarStatusOverlay();
    btnProximo.disabled = false;
}

// FUNCAO QUE FECHA O MODAL DO SORTEIO E VOLTA PARA A TELA PRINCIPAL
function fecharSorteio() {
    overlaySorteio.classList.remove('mostrar');
    sorteando = false;
}

// MOSTRA O ESTATUS DO SORTEIO NO MODAL DO SORTEIO, ABAIXO DOS BOTOES
function atualizarStatusOverlay() {
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    statusOverlay.textContent = `${disponiveis.length} restantes | ${nomesSorteados.length} sorteados`;
}

// FUNCAO QUE SOLTA CONFETS NO FINAL DO SORTEIO
function soltarConfete() {
    const cores = ['#ffaa00', '#00ff88', '#00ffff', '#ff0044'];
    barraPreenchimentoOverlay.style.width = '0%';
    for (let i = 0; i < 50; i++) {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.background = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDelay = Math.random() * 0.5 + 's';
        confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
        overlaySorteio.appendChild(confete);
        setTimeout(() => confete.remove(), 4000);
    }
}

// FUNCAO RESPONSAVEL PARA EXCLUIR DO SORTEIO, E VOLTAR PARA A LISTA DE CADASTRADOS, AO CLICAR NO X
function removerDoSorteio(index) {
    const nomeRemovido = nomes[index];
    // Remove da lista de participantes
    nomes.splice(index, 1);
    // Remove do array de sorteados se estiver lá
    const idxSorteado = nomesSorteados.indexOf(nomeRemovido);
    if (idxSorteado!== -1) {
        nomesSorteados.splice(idxSorteado, 1);
    }
    // Remove do histórico e RECALCULA as ordens
    historicoAtual = historicoAtual.filter(h => h.nome!== nomeRemovido);
    historicoAtual.forEach((h, i) => {
        h.ordem = i + 1; // Refaz a numeração 1, 2, 3...
    });
    salvarDados();
    renderizarCadastrados();
    renderizarLista();
    atualizarContador();
    atualizarContadorCadastrados();
}

// FUNCAO QUE MOVE O NOME PARA A ESPERA
function moverParaEspera(index) {
    const nomeRemovido = nomes[index];
    // 1. Tira do sorteio
    nomes.splice(index, 1);
    // 2. Adiciona na lista de espera se não estiver lá ainda
    if (!listaEspera.includes(nomeRemovido)) {
         listaEspera.push(nomeRemovido);
    }
    // 3. Não tira do historicoAtual. Ele continua com o nome
    salvarDados();
    renderizarCadastrados();
    renderizarLista();
    renderizarEspera(); // NOVA
    atualizarContador();
    atualizarContadorCadastrados();
}

// FUNCAO QUE RETIRA O NOME DA LISTA DE ESPERA SE ELE ESTIVER LA,
// E FOR ENVIADO DA LISTA DE CADASTRADO
function voltarDoEsperar(nome) {
    // Verifica se o nome enviado da lisa de cadastro, esta na lista de espera
    if(listaEspera.includes(nome)) {
        listaEspera = listaEspera.filter(n => n.trim() !== nome);
        salvarDados();
        renderizarCadastrados();
        renderizarEspera();
        atualizarContadorCadastrados();
    }
}

// FUNCAO DO BOTAO RETORNAR O NOME DA LISTA DE ESPERA,
// QUE RETORNA DA LISTA DE ESPERA PARA A LISTA DE PARTICIPANTES
function voltarDoEspera(index) {
    const nomeVoltou = listaEspera[index];
    // 1. Tira da espera
    listaEspera.splice(index, 1);
    // 2. Manda pros cadastrados se não estiver
    if (!nomes.includes(nomeVoltou)) {
        nomes.push(nomeVoltou);
    }
    salvarDados();
    renderizarCadastrados();
    renderizarEspera();
    atualizarContadorCadastrados();
}

// FUNCAO DO BOTAO QUE EXCLUI NOMES DA LISTA EM ESPERA
function excluirDaEspera(index) {
    const nome = listaEspera[index];
    listaEspera.splice(index, 1);
    // Tira do histórico também pra limpar tudo
    historicoAtual = historicoAtual.filter(h => h.nome!== nome);
    salvarDados();
    renderizarCadastrados();
    renderizarEspera();
    if(listaEspera.length > 0){
         atualizarContadorEspera();
    }else{
         atualizarContador();
    }
    atualizarContadorCadastrados();
}

// FUNCAO QUE RENDERIZA A LISTA DE NOMES EM ESPERA
function renderizarEspera() {
    const ul = document.getElementById('listaEspera');
    if(listaEspera.length > 0){
        controleLista = 1;
        ul.innerHTML = '';
        // Ordena os nomes da lista de espera por ordem alfabetica
        listaEspera.sort((a, b) => a.localeCompare(b, 'pt-BR'));
        listaEspera.forEach((nome, i) => {
           
            ul.innerHTML += `
            <div class = 'item-nome' style='color:#ffffff;'>
                <span class="nome-texto"><span class='conta-participante'>${(i+1)}</span>&nbsp&nbsp&nbsp
            ${nome}</span>
                <button onclick="voltarDoEspera(${i})" class="btn-pausar" style="margin:0;" title="Retorna o nome para a Lista de Participantes">↻</button>
                <button onclick="excluirDaEspera(${i})" class="btn-deletar" title="Exclui o nome da Lista de Espera">❌</button>
            </div>`;    
        });
        if(listaEspera.length == 0) {
           butEspera.display = 'none';
           controleLista = 0;
        }else{
            atualizarContadorEspera();
            if(document.getElementById('butVoltar').style.display == 'block'){
                butEspera.style.display = 'none';
            }else{
                butEspera.style.display = 'block';
            }
         }
    }else{
        controleLista = 0;
        listaEditavel.style.display = 'block';
        document.getElementById('listaEspera').style.display = 'none';
        butVoltar.style.display = 'none';
        butEspera.style.display = 'none';
        if(controleLista == 0){
            renderizarLista();
            atualizarContadorEspera();
        }
        document.getElementById('tituloLista').innerText = 'Lista de Participantes :';
        document.getElementById('butSearch').style.visibility = 'visible';
        document.getElementById('butSearch').style.opacity = '1';
        atualizarContador();
    }
}

// FUNCAO QUE REALIZA O SORTEAR AO CLICAR EM SORTEAR PROXIMO
function sortearProximo() {
    if (sorteando) return;
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    if (disponiveis.length === 0) {
        btnProximo.disabled = true;
        nomeSorteadoOverlay.textContent = 'LISTA ZERADA';
        nomeSorteadoOverlay.classList.remove('ganhador');
        statusOverlay.textContent = 'Todos os nomes foram sorteados!';
        return;
    }
    // Inicia o sorteio
    sorteando = true;
    // Desabilita o botao sortear proximo
    btnProximo.disabled = true;
    // Retira a class do ganhador
    nomeSorteadoOverlay.classList.remove('ganhador');
    const tempoTotal = parseInt(velocidadeSorteio.value);
    const tempoPiscada = parseInt(velocidadePiscada.value);
    if (disponiveis.length === 1) {
        const ganhador = disponiveis[0];
        nomeSorteadoOverlay.textContent = ganhador; 
        setTimeout(() => {
            nomesSorteados.push(ganhador);
            historicoAtual.push({
                nome: ganhador,
                ordem: historicoAtual.length + 1, // USA O TAMANHO DO HISTÓRICO
                data: new Date().toLocaleString('pt-BR')
            });
            localStorage.setItem('cte_historicoAtual', JSON.stringify(historicoAtual));
            historico.push({
                nome: ganhador,
                ordem: historico.length + 1, // USA O TAMANHO DO HISTÓRICO
                data: new Date().toLocaleString('pt-BR')
            });
            localStorage.setItem('cte_historico', JSON.stringify(historico));
            ultimoGanhador = ganhador;
            nomeSorteadoOverlay.classList.add('ganhador');
            // palmas para o ultimo ganhador
            somPrato.play();
            somPalmas.currentTime = 0;
            somPalmas.play();
            soltarConfete();
            salvarDados();
            renderizarLista();
            atualizarContador();
            atualizarStatusOverlay();
            sorteando = false;
            btnProximo.disabled = false;
            barraProgressoOverlay.classList.remove('mostrar');
        }, 500);
        return;
    }
    // Mostra a barra de progresso
    barraProgressoOverlay.classList.add('mostrar');
    // Som de tambor para todos os sorteios, menos para o ultimo
    somTambor.currentTime = 0;
    somTambor.play();
    // barra de progresso mostra o tamanho zero do lado esquerdo
    barraPreenchimentoOverlay.style.width = '0%';
    // zera o contador da barra de progresso
    let progresso = 0;
    const intervaloTempo = 50;
    const incremento = (intervaloTempo / tempoTotal) * 100;
    let nomeAtual = '';
    const intervaloNome = setInterval(() => {
        const indiceAleatorio = Math.floor(Math.random() * disponiveis.length);
        nomeAtual = disponiveis[indiceAleatorio];
        nomeSorteadoOverlay.textContent = nomeAtual;
    }, tempoPiscada);
    const intervaloBarra = setInterval(() => {
        progresso += incremento;
        barraPreenchimentoOverlay.style.width = Math.min(progresso, 100) + '%';
    }, intervaloTempo);
    setTimeout(() => {
        clearInterval(intervaloNome);
        clearInterval(intervaloBarra);
        // som de palmas para todos os sorteios, menos para o ultimo
        somTambor.pause();
        somPrato.currentTime = 0;
        somPrato.play();
        somPalmas.currentTime = 0;
        somPalmas.play();
        barraPreenchimentoOverlay.style.width = '100%';
        setTimeout(() => {
            const ganhador = nomeAtual;
            nomesSorteados.push(ganhador);
            ultimoGanhador = ganhador;
            // ORDEM = tamanho do histórico + 1
            historico.push({
                nome: ganhador,
                ordem: historico.length + 1,
                data: new Date().toLocaleString('pt-BR')
            });
            localStorage.setItem('cte_historico', JSON.stringify(historico));
            historicoAtual.push({
                nome: ganhador,
                ordem: historicoAtual.length + 1,
                data: new Date().toLocaleString('pt-BR')
            });
            localStorage.setItem('cte_historicoAtual', JSON.stringify(historicoAtual));
            nomeSorteadoOverlay.textContent = ganhador;
            nomeSorteadoOverlay.classList.add('ganhador');       
            soltarConfete();
            barraProgressoOverlay.classList.remove('mostrar');
            salvarDados();
            renderizarLista();
            atualizarContador();
            atualizarStatusOverlay();
            sorteando = false;
            // tempo para reabilitar o botão sortear proximo
            setTimeout(() => {
                btnProximo.disabled = false;
            }, 5000);
        }, 200);
    }, tempoTotal);
}

// FUNCAO RESPONSAVEL PELA LOGICA DA LISTA DE PARTICIPANTES
function renderizarLista() {
    listaEditavel.innerHTML = '';
    if (nomes.length === 0) {
        const vazio = document.createElement('div');
        vazio.style.color = 'rgba(0, 255, 255, 0.4)';
        vazio.style.textAlign = 'center';
        vazio.style.padding = '40px 0';
        vazio.textContent = 'Clique nos nomes cadastrados ao lado';
        listaEditavel.appendChild(vazio);
        return;
    }
    // Ordena os nomes da lista de participantes por ordem alfabetica
    nomes.sort((a, b) => a.localeCompare(b, 'pt-BR'));
    nomes.forEach((nome, index) => {
        const div = document.createElement('div');
        // Busca no histórico pra pegar a ordem correta
        const registroHist = historico.find(h => h.nome === nome);
        const ordem = registroHist? registroHist.ordem : 0;
        div.className = 'item-nome' + (ordem > 0? ' sorteado' : ' disponivel');
        const spanNome = document.createElement('span');
        spanNome.className = 'nome-texto';
        if (ordem > 0) {
            spanNome.innerHTML = `<span class='conta-participante'>${(index+1)}</span>&nbsp&nbsp&nbsp&nbsp${nome}&nbsp&nbsp&nbsp${ordem}º`;
        } else {
            spanNome.innerHTML = `<span class='conta-participante'>${(index+1)}</span>&nbsp&nbsp&nbsp&nbsp`+nome;
        }
        const botoesDiv = document.createElement('div');
        botoesDiv.className = 'botoes-item';
        if (ordem === 0) {
            // Cria o botao para retirar o nome da lista de participantes e retornar para a lista de cadastrados
            const btnPause = document.createElement('button');
            btnPause.className = 'btn-pausar';
            btnPause.textContent = '🖐';
            btnPause.id = 'btnDel';
            btnPause.onclick = (e) => {
                e.stopPropagation();
                moverParaEspera(index);
            };
            botoesDiv.appendChild(btnPause);
            const btnDel = document.createElement('button');
            btnDel.className = 'btn-deletar';
            btnDel.textContent = '❌';
            btnDel.id = 'btnDel';
            btnDel.onclick = (e) => {
                e.stopPropagation();
                removerDoSorteio(index);
            };
            botoesDiv.appendChild(btnDel);
        }
        div.appendChild(spanNome);
        div.appendChild(botoesDiv);
        listaEditavel.appendChild(div);
        atualizarBotaoImportar();
       if(controleLista == 1){
            atualizarContador();
        } 
    });
}

// FUNCAO MOSTRA OS NOMES QUE ESTAO EM ESPERA
function mostraEspera(){
    document.getElementById('listaEditavel').style.display = 'none';
    controleLista = 0;
    butEspera.style.display = 'none';
    butVoltar.style.display = 'block';
    document.getElementById('listaEspera').style.display = 'block';
    document.getElementById('tituloLista').innerText = 'Lista de Espera :';
    document.getElementById('butSearch').style.opacity = '0';
    document.getElementById('butSearch').style.visibility = 'hidden';
    atualizarContadorEspera();
    
}
function esconderEspera(){
    controleLista = 1;
    butEspera.style.display = 'block';
    document.getElementById('listaEspera').style.display = 'none';
    butVoltar.style.display = 'none';
    document.getElementById('listaEditavel').style.display = 'block';
    document.getElementById('tituloLista').innerText = 'Lista de Participantes :';
    document.getElementById('butSearch').style.visibility = 'visible';
    document.getElementById('butSearch').style.opacity = '1';
    renderizarLista();
    atualizarContador();   
}
// FUNCAO RESPONSAVEL PARA LIMPAR TUDO DA LISTA DE PARTICIPANTES
function limparTudo() {
    if(nomes.length === 0 && listaEspera.length === 0){
        mostrarErro('⚠️ Não há nada para limpar!');
        return;
    }
    cabecario.innerHTML ="<span style='float:left'>🗑️</span> LIMPAR TUDO";
    confirme.style.display = 'block';
    confirme.innerHTML = "<img class='eraser' src='eraser.png'> Limpar";
    modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>LIMPAR</b></span><br><br>Para limpar a lista.<br><br>O cadastro permanente,<br><br>NÃO será apagado.`;
    modalHistorico();
    confirme.onclick = () => {
        nomes = [];
        nomesSorteados = [];
        historico = [];
        historicoAtual = [];
        listaEspera = [];
        ultimoGanhador = '';
        inputNumerosAleatorios.value = '';
        inputNumeros.value = '';
        localStorage.removeItem('cte_nomes');
        localStorage.removeItem('cte_listaEspera');
        localStorage.removeItem('cte_sorteados');
        localStorage.removeItem('cte_ultimo_ganhador');
        localStorage.setItem('cte_historico', JSON.stringify([]));
        localStorage.setItem('cte_historicoAtual', JSON.stringify([]));
        localStorage.setItem('cte_sorteados', JSON.stringify([]));
        localStorage.setItem('cte_data_inicio', dataInicio);
        localStorage.removeItem(`cte_snapshot_${presetAtual}`);
        dataInicio = new Date().toLocaleString('pt-BR');
        salvarDados();
        renderizarLista();
        renderizarCadastrados();
        renderizarEspera();
        atualizarContador();
        atualizarContadorCadastrados();
        fechar();
    }
}

// FUNCAO QUE LIMPA A LISTA DE CADASTRADOS
function limparCadastrados(){
    if(cadastrados.length > 0){
        cabecario.innerHTML ="<span style='float:left'>🗑️</span> LIMPAR CADASTRADOS";
        confirme.style.display = 'block';
        confirme.innerHTML = "<img class='eraser' src='eraser.png'> Limpar";
        modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>LIMPAR</b></span><br><br>Para limpar a lista de Cadastrados.`;
        modalHistorico();
        confirme.onclick = () => {
            nomes = [];
            nomesSorteados = [];
            historico = [];
            historicoAtual = [];
            listaEspera = [];
            ultimoGanhador = '';
            inputNumerosAleatorios.value = '';
            inputNumeros.value = '';
            localStorage.removeItem('cte_nomes');
            localStorage.removeItem('cte_listaEspera');
            localStorage.removeItem('cte_sorteados');
            localStorage.removeItem('cte_ultimo_ganhador');
            localStorage.setItem('cte_historico', JSON.stringify([]));
            localStorage.setItem('cte_historicoAtual', JSON.stringify([]));
            localStorage.setItem('cte_sorteados', JSON.stringify([]));
            localStorage.setItem('cte_data_inicio', dataInicio);
            localStorage.removeItem(`cte_snapshot_${presetAtual}`);
            dataInicio = new Date().toLocaleString('pt-BR');
            cadastrados = [];
            localStorage.removeItem('cte_cadastrados');
            salvarDados();
            renderizarLista();
            renderizarCadastrados();
            renderizarEspera();
            atualizarContador();
            atualizarContadorCadastrados();
            fechar();
            limparTudo();
        }
    }
}

// FUNCAO RESPONSAVEL PARA IMPORTAR O HISTORICO ATUAL PARA O HISTORICO PERMANENTE
function reportar() {
     if (historicoAtual.length === 0) {
        mostrarErro('⚠️ Não há nada para reportar!');
        return;
    }
    const jaSorteouAlguem = nomesSorteados.length > 0;
    if(presetAtual === 'geral'){
        presete = 'P 4';
    }else if(presetAtual === 'musica'){
        presete = 'P 3';
    }else if(presetAtual === 'infantil'){
        presete = 'P 2';
    }else{
        presete = 'P 1';
    }
    cabecario.innerHTML ="<span style='float:left'>🔄</span> REPORTAR O SORTEIO";
    confirme.style.display = 'block'; 
    confirme.innerText = '✅ OK';
    modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>OK</b></span><br><br>Para reportar o sorteio ${presete}.<br><br>O histórico atual será apagado.<br><br>A sessão atual será salva,<br><br>no histórico permanente.`;
    modalHistorico();
    confirme.onclick = () => {     
    if(jaSorteouAlguem){
        const dataHora = new Date().toLocaleString('pt-BR');
        const naoSorteados = nomes.filter(n => !nomesSorteados.includes(n));
        const sessao = {
            id: Date.now().toString(),
            preset: presetAtual,
            data: dataHora,
            ganhadores: historicoAtual.map(h => `${h.nome} ${h.ordem}º`),
            participantes: naoSorteados
        }; 
        const chaveSessoes = PRESETS[presetAtual].sessoes;
        let sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
        sessoes.unshift(sessao);
        localStorage.setItem(chaveSessoes, JSON.stringify(sessoes));
       }
        historicoAtual = [];
        localStorage.setItem('cte_historicoAtual', JSON.stringify([]));
        fechar();
    }
}

// FUNCAO RESPONSAVEL PARA REINICIAR O SORTEIO, E REABILITAR TODOS OS PARTICIPANTES 
function resetarSorteados() {
    // Se não hover nomes na Lista de Participantes, ou 
    // se não houver nenhum sorteado na Lista de Participantes, retorna falso
     if (nomes.length === 0 || nomesSorteados.length === 0) {
        mostrarErro('⚠️ Não há nada para reiniciar!');
        return;
    }
    const jaSorteouAlguem = nomesSorteados.length > 0;
    if(presetAtual === 'geral'){
        presete = 'P 4';
    }else if(presetAtual === 'musica'){
        presete = 'P 3';
    }else if(presetAtual === 'infantil'){
        presete = 'P 2';
    }else{
        presete = 'P 1';
    }
    cabecario.innerHTML ="<span style='float:left'>🔄</span> REINICIAR O SORTEIO";
    confirme.style.display = 'block'; 
    confirme.innerText = '✅ OK';
    modal.innerHTML = `⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:</span><br><br>Clique em <span class="confirm"><b>OK</b></span><br><br>Para reiniciar o sorteio ${presete}.<br><br>O histórico atual será apagado.<br><br>A sessão atual será salva,<br><br>no histórico permanente.`;
    modalHistorico();
    confirme.onclick = () => {
        if(jaSorteouAlguem){
            const dataHora = new Date().toLocaleString('pt-BR');
            const naoSorteados = nomes.filter(n => !nomesSorteados.includes(n));
            const sessao = {
                id: Date.now().toString(),
                preset: presetAtual,
                data: dataHora,
                ganhadores: historico.map(h => `${h.nome} ${h.ordem}º`),
                participantes: naoSorteados
            };        
            const chaveSessoes = PRESETS[presetAtual].sessoes;
            let sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
            sessoes.unshift(sessao);
            localStorage.setItem(chaveSessoes, JSON.stringify(sessoes));
        }      
        // NÃO apaga nomes - só limpa sorteados e histórico
        nomesSorteados = [];
        ultimoGanhador = '';
        historico = [];
        historicoAtual = [];
        localStorage.removeItem('cte_ultimo_ganhador');
        localStorage.setItem('cte_historico', JSON.stringify([]));
        localStorage.setItem('cte_historicoAtual', JSON.stringify([]));
        localStorage.setItem('cte_sorteados', JSON.stringify([]));
        dataInicio = new Date().toLocaleString('pt-BR');
        salvarDados();
        renderizarCadastrados();
        renderizarLista();
        atualizarContador();
        atualizarContadorCadastrados();
        fechar();
    }
}

// FUNCAO RESPONSAVEL PARA EXPORTAR TODO O HISTORICO PERMANENTE PARA O FORMATO TXT
function exportarPermanente(){
    const igrejaSalva = localStorage.getItem('nomeIgreja') || 'Nome';
    const cidadeSalva = localStorage.getItem('nomeCidade') || 'Cidade - UF';
    cabecario.innerHTML ="<span style='float:left'>📄</span> EXPORTAR PERMANENTE";
    confirme.style.display = 'block'; 
    confirme.innerText = '✅ OK';
    modal.innerHTML = '<br>Clique em <span class="confirm"><b>OK</b></span><br><br>Para exportar o Histórico Permanente.';
    modalHistorico();
    confirme.onclick = () => {
        const chaveSessoes = PRESETS[presetAtual].sessoes;
        const sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
        if(presetAtual === 'geral'){
            presete = 'P 4';
        }else if(presetAtual === 'musica'){
            presete = 'P 3';
        }else if(presetAtual === 'infantil'){
            presete = 'P 2';
        }else{
            presete = 'P 1';
        }
        if(sessoes.length === 0){
            mostrarErro(`⚠️ Histórico ${presete} vazio. \nReinicie um sorteio para salvar a primeira sessão.`);
            return;
        }
        const dataExport = new Date().toLocaleString('pt-BR');
        let texto = `───────────────────────────────────────\n`;
        texto += `SORTEIO:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
        texto += `───────────────────────────────────────\nRELATÓRIO:\n`;
        texto += `Data do sorteio: ${dataInicio}\n`;
        texto += `Exportado em: ${dataExport}\n`;
        texto += `───────────────────────────────────────\n`;
        texto += `RESUMO:\n`;
        texto += `Histórico - ${presete} - Total: ${sessoes.length} sessões\n`;
        texto += `═══════════════════════════════════════\n\n`;
        sessoes.forEach((sessao, index) => {
            texto += `Sorteio - ${sessao.data}\n`;
            texto += `- - - - - - -  Ganhadores  - - - - - - -\n`;
            if (sessao.ganhadores.length > 0){
                sessao.ganhadores.forEach(g => {
                    texto += `🏆 ${g}\n`;
                });
            }else{
                texto += `Nenhum sorteado\n\n`;
            }
            texto += `───────────────────────────────────────\n`;
            if(sessao.participantes.length > 0) {
                texto += `😎 Participaram do sorteio\n`;
                texto += `${sessao.participantes.join(', ')}.\n`;
            }
            if (index < sessoes.length - 1){
                texto += `═══════════════════════════════════════\n\n`;
            }
        });
        // formato do arquivo para importacao
        const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sorteio_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        fechar();
    }
}

// FUNCAO RESPONSAVEL PARA EXPORTAR O HISTORICO ATUAL PARA O FORMATO TXT
function exportarResultado() {
    if (nomes.length === 0) {
        mostrarErro('⚠️ Não há dados para exportar!');
        return;
    }
    const igrejaSalva = localStorage.getItem('nomeIgreja') || 'Nome';
    const cidadeSalva = localStorage.getItem('nomeCidade') || 'Cidade - UF'; 
    cabecario.innerHTML ="<span style='float:left'>📄</span> EXPORTAR HISTÒRICO";
    confirme.style.display = 'block'; 
    confirme.innerText = '✅ OK';
    modal.innerHTML = '<br>Clique em <span class="confirm"><b>OK</b></span><br><br>Para exportar o Histórico Atual.';
    modalHistorico();
    confirme.onclick = () => {
        const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
        const dataExport = new Date().toLocaleString('pt-BR');
        let conteudo = `───────────────────────────────────────\n`;
        conteudo += `SORTEIO:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
        conteudo += `───────────────────────────────────────\n`;
        conteudo += `RELATÓRIO:\nData do sorteio: ${dataInicio}\n`;
        conteudo += `Exportado em: ${dataExport}\n`;
        conteudo += `───────────────────────────────────────\n`;
        conteudo += `RESUMO:\n`;
        conteudo += `Total de participantes: ${nomes.length}\n`;
        conteudo += `Já sorteados: ${nomesSorteados.length}\n`;
        conteudo += `Ainda disponíveis: ${disponiveis.length}\n`;
        if (ultimoGanhador) {
            conteudo += `═══════════════════════════════════════\n`;
            conteudo += `ÚLTIMO GANHADOR:\n`;
            conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
        }
        if (nomesSorteados.length > 0) {
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `NOMES JÁ SORTEADOS (${nomesSorteados.length}):\n`;
            historicoAtual.forEach(item => {
                conteudo += `${item.data} - 🏆 ${item.ordem}º ${item.nome}\n`;
            });
        }
        if (disponiveis.length > 0) {
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `😎 AINDA NÃO SORTEADOS (${disponiveis.length}):\n`;
            disponiveis.forEach((nome, i) => {
                conteudo += `${i + 1}. ${nome}\n`;
            });
        }
        conteudo += `═══════════════════════════════════════\n`;
        conteudo += `${igrejaSalva}\n${cidadeSalva}\n`;
        conteudo += `═══════════════════════════════════════\n`;
        // formato do arquivo para importacao
        const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sorteio_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        fechar();
    }
}

// FUNCAO QUE SERA CHAMADA PARA CARREGAR OS DADOS DO LOCAL STORAGE, AO ABRIR A PAGINA
function carregarDados() {
    const igrejaSalva = localStorage.getItem('nomeIgreja') || 'Nome';
    const cidadeSalva = localStorage.getItem('nomeCidade') || 'Cidade - UF';
    // Carrega o titulo qundo atualiza a pagina
    divIgreja.textContent = igrejaSalva;
    divCidade.textContent = cidadeSalva;
}

// FUNCAO RESPONSAVEL PARA SALVAR OS DADOS DO FORMULARIO DE MUDAR TROCAR O TITULO
function salvarInformacao() {
    const novaIgreja = inputIgreja.value.trim();
    const novaCidade = inputCidade.value.trim();
    const novaAbrev = inputAbrev.value.trim();
    const novoBairro = inputBairro.value.trim();
    const novoMinisterio = inputMinisterio.value.trim();
    const novoTexto = inputTexto.value.trim();
    if (!novaIgreja || !novaCidade) {
            mostrarErro('⚠️ Preencha os campos nome e cidade!', false);
        return;
    }
    // Salva no localStorage
    localStorage.setItem('nomeIgreja', novaIgreja);
    localStorage.setItem('nomeCidade', novaCidade);
    localStorage.setItem('nomeAbrev', novaAbrev);
    localStorage.setItem('nomeBairro', novoBairro);
    localStorage.setItem('nomeMinisterio', novoMinisterio);
    localStorage.setItem('nomeTexto', novoTexto);
    // Atualiza os titulos da pagina ao mudar o nome e a cidade
    divIgreja.textContent = novaIgreja;
    divCidade.textContent = novaCidade;
    // Mostra a informacao
    mostrarErro('✅ Dados salvos com sucesso!', true);
    fechar();
}

// FUNCAO QUE LIMPA O FORMULARIO DE TROCAR O TITULO
function limparFormulario(){
    inputIgreja.value = '';
    inputCidade.value = '';
    inputAbrev.value = '';
    inputBairro.value = '';
    inputMinisterio.value = '';
    inputTexto.value = '';
}

// FUNCAO PARA MOSTRAR O MODAL ESCURO DE TROCAR O TITULO
function formulario(){
    //const mascara = document.getElementById('mascara');
    const formulario = document.getElementById('formulario');
    // pega as informacoes no local storage
    const igrejaSalva = localStorage.getItem('nomeIgreja');
    const cidadeSalva = localStorage.getItem('nomeCidade');
    const bairroSalvo = localStorage.getItem('nomeBairro');
    const abrevSalva = localStorage.getItem('nomeAbrev');
    const ministerioSalvo = localStorage.getItem('nomeMinisterio');
    const textoSalvo = localStorage.getItem('nomeTexto');
    // carrega as informacoes no formulario
    inputIgreja.value =  igrejaSalva;
    inputCidade.value = cidadeSalva;
    inputBairro.value = bairroSalvo;
    inputAbrev.value = abrevSalva;
    inputMinisterio.value = ministerioSalvo;
    inputTexto.value = textoSalvo;  
    formulario.style.opacity = '0';
    formulario.style.display = 'block';
    formulario.style.transition = 'opacity 0.5s, transform 0.5s';
    formulario.style.transform = 'translateY(-20px';   
    requestAnimationFrame(() => {
        formulario.style.opacity = '1';
        formulario.style.transform = 'translatey(0)';
    });
    mascara.style.opacity = '0';
    mascara.style.display = 'block';
    mascara.style.transition = 'opacity 0.4s, transform 0.4s';
    mascara.style.transform = 'translateY(-20px';   
    requestAnimationFrame(() => {
        mascara.style.opacity = '1';
        mascara.style.transform = 'translatey(0)';
    });
}
// FUNCAO PARA MOSTRAR O FORMULARIO DE CONFIGURACAO DE AUDIO
function formularioAudio(){
    //const mascara = document.getElementById('mascara');
    const muteSel = document.getElementById('muteSel');
    muteSel.style.opacity = '0';
    muteSel.style.display = 'block';
    muteSel.style.transition = 'opacity 0.5s, transform 0.5s';
    mascara.style.opacity = '0';
    mascara.style.display = 'block';
    mascara.style.transition = 'opacity 0.3s, transform 0.3s';
    muteSel.style.transform = 'translateY(-30px';   
        requestAnimationFrame(() => {
        muteSel.style.opacity = '1';
        muteSel.style.transform = 'translatey(0)';
    });
    mascara.style.transform = 'translate(0'; 
        requestAnimationFrame(() => {
        mascara.style.opacity = '1';
        mascara.style.transform = 'translatey(0)';
    });
    document.getElementById('cabecarioAudio').innerHTML ="<span style='float:left'>📢</span> CONFIGURAÇÂO DE ÁUDIO"; 
    document.getElementById('confirmeAudio').innerText = '💾 Salvar' ;
}
// FUNCAO DO MODAL ESCURO QUE MOSTRA OS CREDITOS
function formularioCredito(){
    //const mascara = document.getElementById('mascara');
    const credito = document.getElementById('credito');
    credito.style.opacity = '0';
    credito.style.display = 'block';
    credito.style.transition = 'opacity 0.5s, transform 0.5s';
    credito.style.transform = 'translateY(-20px';   
    requestAnimationFrame(() => {
        credito.style.opacity = '1';
        credito.style.transform = 'translatey(0)';
    });
    mascara.style.opacity = '0';
    mascara.style.display = 'block';
    mascara.style.transition = 'opacity 0.4s, transform 0.4s';
    mascara.style.transform = 'translateY(-20px';   
    requestAnimationFrame(() => {
        mascara.style.opacity = '1';
        mascara.style.transform = 'translatey(0)';
    });
}
// FUNCAO QUE SUAVISA QUANDO MOSTRA OS MODAIS
function modalHistorico(){
    //const mascara = document.getElementById('mascara');
    const form = document.getElementById('modalHistorico');  
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    mascara.style.opacity = '0';
    mascara.style.display = 'block';
    mascara.style.transition = 'opacity 0.3s, transform 0.3s';
    form.style.transform = 'translateY(-30px';   
        requestAnimationFrame(() => {
        form.style.opacity = '1';
        form.style.transform = 'translatey(0)';
    });
    mascara.style.transform = 'translate(0'; 
        requestAnimationFrame(() => {
        mascara.style.opacity = '1';
        mascara.style.transform = 'translatey(0)';
    });
}

// LIMPA AS INFORMACOES DO FORMULARIO TROCAR O TITULO, NO LOCAL STORAGE
function limparDados() {
    modalHistorico();
    cabecario.innerHTML ="<span style='float:left'>🗑️</span> LIMPAR NOME E CIDADE";
    confirme.style.display = 'block'; 
    confirme.innerText = '✅ Limpar';
    modal.innerHTML = "⚠️ <span style='color:red;font-weight:bold'>ATENÇÃO:<br><br></span>Clique em <span class='confirm'><b>LIMPAR</b></span><br><br>Para confirmar que quer apagar<br><br>O nome e a cidade salva";
    confirme.onclick = () => {
        localStorage.removeItem('nomeIgreja');
        localStorage.removeItem('nomeCidade');
        localStorage.removeItem('nomeAbrev');
        localStorage.removeItem('nomeBairro');
        localStorage.removeItem('nomeMinisterio');
        localStorage.removeItem('nomeTexto');
        inputIgreja.value = '';
        inputCidade.value = '';
        inputAbrev.value = '';
        inputBairro.value = '';
        inputMinisterio.value = '';
        inputTexto.value = '';
        divIgreja.textContent = 'Nome';
        divCidade.textContent = 'Cidade - UF';
        mostrarErro('🗑️ Dados apagados', true);
        fechar();
    }
}
// Carrega ao abrir a página
// SALVA TAMBEM COM ENTER AS INFORMACOES DO FORMULARIO DE TROCAR O TITULO
inputCidade.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')
        salvarInformacao();
});
inputAbrev.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') 
        salvarInformacao();
});
inputBairro.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')
        salvarInformacao();
});
inputMinisterio.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')
        salvarInformacao();
});
inputTexto.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')
        salvarInformacao();
});
inputIgreja.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')
     salvarInformacao();
});

/* ===== FUNCOES QUE CARREGAM AO ATUALIZAR A PAGINA ===== */
carregarDados();
renderizarCadastrados();
renderizarLista();
renderizarEspera();
atualizarContador();
atualizarContadorCadastrados();

// ===== MUDA A LOGO CLICANDO NELA =====
// ARRAI COM OS NOMES DOS LOGOS
var logos = ['logo/logo1.jpg','logo/logo2.jpg','logo/logo3.jpg','logo/logo4.jpg','logo/logo5.jpg','logo/logo6.jpg','logo/logo7.jpg','logo/logo8.jpg','logo/logo9.jpg','logo/logo10.jpg','logo/logo11.jpg','logo/logo12.jpg','logo/logo13.jpg','logo/logo14.jpg','logo/logo15.jpg','logo/logo16.jpg','logo/logo17.jpg','logo/logo18.jpg','logo/logo19.jpg','logo/logo20.jpg'];
var logoAtualIndex = 0;

// FUNCAO RESPONSAVEL PARA TROCAR O LOGO AO CLICAR NELE
function trocarLogo() {
    logoAtualIndex = (logoAtualIndex + 1) % logos.length;
    document.getElementById('logoSorteada').src = logos[logoAtualIndex];
}

// ===== MUDA A LOGO QUANDO ATUALIZA A PAGINA =====        
window.onload = function() {
    logoAtualIndex = Math.floor(Math.random() * logos.length);
    document.getElementById('logoSorteada').src = logos[logoAtualIndex];
}