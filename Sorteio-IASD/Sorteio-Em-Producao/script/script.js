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
let presetAtual = localStorage.getItem('cte_preset_atual')|| 'familia';
let preset = '';let presete = '';let controleLista = 1;let sorteando = false;
let msg ='';let texto_historico = '';let texto_historico_acumulativo = '';
let confirmeHistorico = '';let erroHistorico = '';let texto_limpa_historico = '';
let modal_limpa_historico = '';let erroHistApagado = '';let nomeHistorico = '';
let textoHistPermanente = '';let sorteioHistPermanente = '';let ganhadorHistPermanente = '';
let participaramHistPermanente = '';let cabecarioHistPermanente ='';let vazio = '';
let confirmar = "";let atencao = "";let excluirNome = "";let paraConfirmar = "";
let segundaConfirmacao = "";let cabecarioPreset = ""; let cabecarioPermanente = "";
let cabecarioImagem = "";let cabecarioImagem2 = "";let cabecarioExcluirCadastro = "";
let cabecarioImportarTudo = "";let cabecarioReiniciar = "";let cabecarioExportAtual = "";
let cabecarioReportar = "";let modalExportAtual = ""; let ouClick = ""; let trocaMinisterio = "";         
let cabecarioLimparTudo = "";
let cabecarioLimparCadastrados = "";
let modalLimparCadastrados = "";
let modalLimparTudo = "";let modalReiniciar = ""; let modalReiniciar2 = "";
let cabecarioLimparDados = ""; let modalLimparDados = ""; let but_baixarImagem = "";

let erroImagem = "";let sorteioImagem = "";
let ganhadorImagem = "";let erroNum = "";let erroNum2 = "";let erroNum3 = "";let confirma = "";
let numeroAdicionado = "";let numeroAdicionado2 = "";let numeroAdicionado3 = "";let numeroAdicionado4 = "";
let numeroAdicionado5 = "";let numeroAdicionado6 = "";let numeroAdicionado7 = "";
let erroNumSequencia2 = "";let erroNumSequencia3 = "";let erroNumSequencia4 = "";let erroNumSequencia5 = "";
let erroNumSequencia6 = "";let erroNomeImportado = "";let gerarNumSequencia = "";
let gerarNumSequencia3 = "";let gerarNumSequencia4 = "";let cabecarioNumSequencia = "";
let travaInputNum = "";let travaInputNum2 = "";let travaInputNum3 = "";let travaInputNum4 = "";
let travaInputNum5 = "";let travaInputNum6 = "";let travaInputNum7 = "";let travaInputNome = "";
let travaInputBusca = "";let erroCPF = "";let erroCPF2 = "";let erroCPF3 = "";let erroImportar = "";
let erroLimpaTudo = "";let erroImportar2 = "";let erroListaRetornada = "";let msgTodosSorteados = "";
let erroImportarHist = "";let nomeCadastrado = "";let excluirNomeSorteio = "";let modalImagem = "";
let exportList = "";let cadastroList = "";let cadastroList2 = "";let subscrever = "";let nenhum = "";
let nomesDisponiveis = "";let ndisponiveis = "";let modalReportar = ""; let  modalReportar2 = "";
let modalExportPermanente = ""; let cabecarioExportPermanente = ""; let gerandoPre = "";
somPalmas.volume = 0.3;somTambor.volume = 0.3;somPrato.volume = 0.3; let confere = "";

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
    // Verifica se o botao escolhido tem alguma sessao no historico permanente
    const chaveSessoes = PRESETS[presetAtual].sessoes;
    const sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
    // habilita ou noa o botao de limpar preset, ao mudar de preset
   if(sessoes.length === 0){
        document.getElementById('limpaTodosPresets').classList.add('desativa');
    }else{
        document.getElementById('limpaTodosPresets').classList.remove('desativa');
    }
    renderizarCadastrados();
    renderizarLista();
    renderizarEspera();
    atualizarContador();
    atualizarContadorCadastrados();
    atualizarBotaoImportar();
}

// Linguagem
const LANG = {
    pt: {
        // ***** Form para trocar o titulo e a linguagem
        trocaTitulo: "<img src='flags/br.png' alt='bandeira brasil' width='20' height='15'><span class='trTitulo'> Trocar o Título </span>",
        nomeIgreja: "⛪ Nome",
        nomeIgrejaAbrev: "🛕 Abreviação",
        bairro: "🏙️ Bairro",
        cidadeIgreja: "🏥 Cidade",
        textoIgreja: "📌 Texto",
        ministerioIgreja: "🎸 Ministério",
        idioma: "<img src='flags/br.png' alt='bandeira brasil' width='20' height='15'> Idioma",
        sMusica: "Silenciar a Música",
        sPrato: "Silenciar o Prato",
        sPalmas: "Silenciar as Palmas",
        sTudo: "Silenciar Tudo",
        escMusica: "ESCOLHA A MÚSICA DE FUNDO",
        sVolume: "Volume:",
        // placeholder
        nome_placeholder: "Digite o nome",
        nome_Abrevplaceholder: "Digite o nome abreviado",
        bairro_placeholder: "Digite o bairro",
        cidade_placeholder: "Digite a cidade - UF",
        texto_placeholder: "Digite o texto",
        ministerio_placeholder: "Digite o ministério",
        maxCpf: "11",
        // title
        btn_trocar_title: "Troca o título",
        btn_limpar_title: "Apaga as informações",
        btn_apagar_title: "Limpa o formulário",
        // button
        btn_trocar: "🔄 TROCA",
        btn_limparIgreja:"🗑️ APAGA",
        btn_apagaIgreja:"🗑️ LIMPA",
        // ***** Tela  principal
        numAleatorio:"Números Aleatórios:",
        numSequencia: "Gerar Sequência de Numéros:",
        configSort: "Configurações do Sorteio:",
        aleatorioPlace: "Ex: 123,12,474,08",
        sequenciPlace: "Ex: 50 ou 10,30",
        sorteioConfig: "Sorteio:",
        piscadaConfig: "Piscadas:",

        velLento: "Lento (5s)",
        velNormal: "Normal (3s)",
        velRapido: "Rápido (1.5s)",
        velInstant: "Instantâneo (0.5s)",

        pisLento: "Muito Lento (1.2s)",
        pisNormal: "Normal (0.8s)",
        pisRapido: "Rápido (0.4s)",
        pisMRapido: "Muito Rápido (0.2s)",
        pisStrobo: "Strobo (0.05s)",

        btn_addNum: "&#128287 ADICIONAR NÚMEROS",
        btAleatorio: "Adiciona números aleatórios",
        btn_gerarSeq: "🎱 GERAR SEQUÊNCIA",
        btnAudio:"🔊 Áudio",
        musicaStop: "Parar",

        limpaCampoAleatorio: "Limpa números aleatórios",
        textNumAleatorio: "💡 Digite números separados por vírgula",
        title_sequencia: "Adiciona números sequenciais",
        text_sequencial:"💡 Digite '50' = 1 a 50 | '10,30' = 10 a 30 | só uma vírgula",
        titleSequence: "Limpa sequência de números",
        titleAudio: "Mostra configuração de áudio",
        creditoForm: " Crédito",
        // listas
        listaCadastrados: "Lista de Cadastrados:",
        listaParticipante: "Lista de Participantes:",
        // placeholder Numero ou CPF
        cadNumCpf: "Número ou CPF",

        title_limpaCpf: "Limpa Número ou CPF",
        title_cad: "Cadastra números e CPF",
        btnLimpaPesquisa: "Limpa Pesquisar",
        title_hist: "Mostra o Histórico Acumulado",
        title_histAtual: "Mostra o Histórico Atual",
        title_histPerm: "Mostra o Histórico Permanente",
        title_reiniciar: "Limpa o Histórioco Acumulado, o Histórico Atual e reinicia a Lista de Participantes",
        title_limpar: "Limpa o Histórioco Acumulado, o Histórico Atual e a Lista de Participantes",
        title_importar: "Importa o Histórico Atual para o Histórico Permanente",
        title_salvar: "Salvar uma imagem do sorteado",
        title_presets: "Presets que salvam no Histórico Permanente",
        title_limpaPresets: "Limpa presets separadamente no Histórico Permanente",
        title_salvaTudo: "Salva todos os nomes e os resultados em Json",
        title_backup: "Recupera o arquivo salvo em JSON",

        placeCadNome: "Digite um nome e aperte Enter...",
        placePesquisa: "Pesquisar",

        btnCad: "5️⃣ CAD",
        btn_espera: "ESPERA",
        btn_volta: "VOLTAR",
        btn_sortear: "SORTEAR",
        btn_atual: "ATUAL",
        btn_reiniciar: "REINICIAR",
        btn_limpar: "LIMPAR",
        btn_importar: "IMPORTAR",
        btn_salvar: "SALVAR",
        btn_salvaTudo: "TUDO",
        btn_imagem: "Imagem",
        btn_limpaImagem: "Limpa a imagem carregada",
        btn_carregaImagem: "Carrega uma imagem de rodapé",

        field_largura_imagem: "Largura da Imagem",
        field_estreito: "Estreito",
        field_largo: "Largo",

        // Form branco
        btn_fechar: "❌ Fechar",

        teste: "teste"
    },
    en: {
        trocaTitulo: "<img src='flags/us.png' alt='bandeira brasil' width='20' height='15'><span class='trTitulo'> Change the Title </span>",
        nomeIgreja: "⛪ Name",
        nomeIgrejaAbrev: "🛕 Abreviation",
        bairro: "🏙️ Neighborhood",
        cidadeIgreja: "🏥 City",
        textoIgreja: "📌 Text",
        ministerioIgreja: "🎸 Ministry",
        idioma: "<img src='flags/us.png' alt='bandeira usa' width='20' height='15'> Language",
        sMusica: "Mute music",
        sPrato: "Mute the cymbal",
        sPalmas: "Mute applause",
        sTudo: "Mute all",
        escMusica: "Choose the Music",
        sVolume: "Volume:",

        nome_placeholder: "Enter the name",
        nome_Abrevplaceholder: "Enter the abbreviated name",
        bairro_placeholder: "Enter the neighborhood",
        cidade_placeholder: "Enter the city - state",
        texto_placeholder: "Enter the text",
        ministerio_placeholder: "Enter the ministry",
        
        btn_trocar_title: "Change the title",
        btn_limpar_title: "Deletes the information",
        btn_apagar_title: "Clears the form",
        
        btn_trocar: "🔄 CHANGE",
        btn_limparIgreja:"🗑️ ERASE",
        btn_apagaIgreja:"🗑️ CLEAN",
        
        // Layout principal
        numAleatorio:"Random Numbers:",
        numSequencia: "Generate Number Sequence:",
        configSort: "Draw Settings:",
        aleatorioPlace: "Ex: 123,12,474,08",
        sequenciPlace: "Ex: 50 or 10,30",
        sorteioConfig: "Draw:",
        piscadaConfig: "Blinks:",

        velLento: "Slow (5s)",
        velNormal: "Normal (3s)",
        velRapido: "Fast (1.5s)",
        velInstant: "Instant (0.5s)",

        pisLento: "Very Slow (1.2s)",
        pisNormal: "Normal (0.8s)",
        pisRapido: "Fast (0.4s)",
        pisMRapido: "Very Fast (0.2s)",
        pisStrobo: "Instant (0.05s)",

        btn_addNum: "&#128287 ADD NUMBERS",
        btAleatorio: "Adds random numbers",
        btn_gerarSeq: "🎱 GENERATE SEQUENCE",
        btnAudio:"🔊 Audio",
        musicaStop: "Stop",

        limpaCampoAleatorio: "Clears random numbers",
        textNumAleatorio: "💡 Enter numbers separated by commas",
        title_sequencia: "Adds sequential numbers",
        text_sequencial:"💡 Enter '50' = 1 to 50 | '10,30' = 10 to 30 | Only one comma",
        titleSequence: "Clears number sequence",
        titleAudio: "Show audio configuration",
        creditoForm: " Credit",
        //
        listaCadastrados: "List of Registered Users:",
        listaParticipante: "List of Participants:",
        cadNumCpf: "Number or SSN",
        title_limpaCpf: "Clears Number or SSN",
        title_cad: "Register numbers and SSN",
        btnLimpaPesquisa: "Clear search",
        title_hist: "Show the Accumulated History",
        title_histAtual: "Show Current History",
        title_histPerm: "Show Permanent History",
        title_reiniciar: "Clear Accumulated History, Current History and reset the Participants List",
        title_limpar: "Clear Accumulated History, Current History and the Participants List",
        title_importar: "Import Current History to Permanent History",
        title_salvar: "Save an image of the winner",
        title_presets: "Presets that save to Permanent History",
        title_limpaPresets: "Clear presets separately in Permanent History",
        title_salvaTudo: "Save all names and results in Json",
        title_backup: "Load the saved JSON file",

        placeCadNome: "Type a name and press Enter...",
        placePesquisa: "Search",

        btnCad: "5️⃣ REG",
        btn_espera: "WAIT",
        btn_volta: "RETURN",
        btn_sortear: "DRAW",
        btn_atual: "CURRE.",
        btn_reiniciar: "RESTART",
        btn_limpar: "CLEAN",
        btn_importar: "IMPORT",
        btn_salvar: "SAVE",
        btn_salvaTudo: "ALL",
        btn_imagem: "Image",
        btn_limpaImagem: "Clear uploaded image",
        btn_carregaImagem: "Upload a footer image",

        field_largura_imagem: "Image width",
        field_estreito: "Narrow",
        field_largo: "Wide",

        // Form branco
        btn_fechar: "❌ Close",
      
        teste: "test" 
    },
    es: {
        trocaTitulo: "<img src='flags/es.png' alt='bandeira brasil' width='20' height='15'><span class='trTitulo'> Cambia el Título </span>",
        nomeIgreja: "⛪ Nombre",
        nomeIgrejaAbrev: "🛕 Abreviatura",
        bairro: "🏙️ Vecindario",
        cidadeIgreja: "🏥 Ciudad",
        textoIgreja: "📌 Texto",
        ministerioIgreja: "🎸 Ministerio",
        idioma: "<img src='flags/es.png' alt='bandeira espanha' width='20' height='15'> Idioma",
        sMusica: "Silenciar la música",
        sPrato: "Silenciar el platillo",
        sPalmas: "Silenciar los aplausos",
        sTudo: "Silenciar todo",
        escMusica: "Elegir la Música",
        sVolume: "Volumen:",

        nome_placeholder: "Ingrese el nombre",
        nome_Abrevplaceholder: "Ingrese el nombre abreviado",
        bairro_placeholder: "Ingrese el vecindario",
        cidade_placeholder: "Ingrese la ciudad - el estado",
        texto_placeholder: "Ingrese el texto",
        ministerio_placeholder: "Ingrese el ministerio",
        
        btn_trocar_title: "Cambiar el título",
        btn_limpar_title: "Elimina las información",
        btn_apagar_title: "Borra el formulario",

        btn_trocar: "🔄 CAMBIAR",
        btn_limparIgreja: "🗑️ BORRAR",
        btn_apagaIgreja: "🗑️ LIMPIO",
        numAleatorio: "Números Aleatorios:",
        numSequencia: "Generar Secuencia Numérica:",
        configSort: "Configuración del Sorteo:",
        aleatorioPlace: "Ej: 123,12,474,08",
        sequenciPlace: "Ej: 50 o 10,30",
        sorteioConfig: "Sorteo:",
        piscadaConfig: "Parpadeos:",

        velLento: "Lento (5s)",
        velNormal: "Normal (3s)",
        velRapido: "Rápido (1.5s)",
        velInstant: "Instantáneo (0.5s)",

        pisLento: "Muy Lento (1.2s)",
        pisNormal: "Normal (0.8s)",
        pisRapido: "Rápido (0.4s)",
        pisMRapido: "Muy Rápido (0.2s)",
        pisStrobo: "Instantáneo (0.05s)",

        btn_addNum: "&#128287 SUMAR NÚMEROS",
        btAleatorio: "Añade números aleatorios",
        btn_gerarSeq: "🎱 GENERAR SECUENCIA",
        btnAudio:"🔊 Audio",
        musicaStop: "Detener",

        limpaCampoAleatorio: "Borra números aleatorios",
        textNumAleatorio: "💡 Ingrese números separados por comas",
        title_sequencia: "Añade números secuenciales",
        text_sequencial:"💡 Ingrese '50' = 1 al 50 | '10,30' = 10 al 30 | solo una coma",
        titleSequence: "Borra la secuencia numerica",
        titleAudio: "Mostrar configuración de audio",
        creditoForm: " Crédito",
        listaCadastrados: "Lista de Usuarios Registrados:",
        listaParticipante: "Lista de Participantes:",
        cadNumCpf: "Número o NIF",
        title_limpaCpf: "Borra Número o NIF",
        title_cad: "Inscribe números y NIF",
        btnLimpaPesquisa: "Borrar búsqueda",
        title_hist: "Mostrar el Histórico Acumulado",
        title_histAtual: "Muestrar el Historial Actual",
        title_histPerm: "Muestrar el Historial Permanente",
        title_reiniciar: "Limpiar Historial Acumulado, Historial Actual y reiniciar la Lista de Participantes",
        title_limpar:"Limpiar Historial Acumulado, Historial Actual y la Lista de Participantes",
        title_importar: "Importar Historial Actual al Historial Permanente",
        title_salvar: "Guardar una imagen del sorteado",
        title_presets: "Presets que guardan en el Historial Permanente",
        title_limpaPresets: "Limpiar presets por separado en el Historial Permanente",
        title_salvaTudo: "Guardar todos los nombres y los resultados en Json",
        title_backup: "Recuperar el archivo guardado en JSON",

        placeCadNome: "Escribe um nombre y pulsa Intro...",
        placePesquisa: "Buscar",

        btnCad: "5️⃣ INS",
        btn_espera: "ESPERA",
        btn_volta: "VOLVER",
        btn_sortear: "SUERTE",
        btn_atual: "ACTUAL",
        btn_reiniciar: "REANUDAR",
        btn_limpar: "LIMPIAR",
        btn_importar: "IMPORTAR",
        btn_salvar: "GUARDAR",
        btn_salvaTudo: "TODO",
        btn_imagem: "Imagen",
        btn_limpaImagem: "Limpiar imagen cargada",
        btn_carregaImagem: "Carga una imagen de pie de página",

        field_largura_imagem: "Ancho de la Imagen",
        field_estreito: "Estrecho",
        field_largo: "Ancho",

        // Form branco
        btn_fechar: "❌ Cerrar",
       
        teste: "teste"
    }
}


// Configura com o idioma abaixo ao abrir o app, caso não tenha configurado nenhum ainda
let idiomaAtual = localStorage.getItem('sistema_lang') || 'en';
//let idiomaAtual = localStorage.getItem('sistema_lang') || 'pt';

// Funcao que aplica o idioma escolhido
function aplicarIdioma(lang) {
    idiomaAtual = lang;
    localStorage.setItem('sistema_lang', lang); // 3. SALVA NO LOCALSTORAGE
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const chave = el.getAttribute('data-i18n');
        if (LANG[lang][chave]) {
            // Se for input/placeholder usa placeholder, se não usa innerText
            if (el.tagName === 'INPUT' && el.placeholder) {
                el.placeholder = LANG[lang][chave];
            } else if(el.tagName === 'BUTTON' && el.title){
                el.title = LANG[lang][chave];
            } else {
               // el.innerText = LANG[lang][chave];
                el.innerHTML = LANG[lang][chave];
            }
        }
    });
    // 4. Atualiza o select pra ficar marcado
    document.getElementById('seletorIdioma').value = lang;
    document.documentElement.lang = lang; // Bom pra acessibilidade
}

// 5. EVENTO: Quando troca o select
document.getElementById('seletorIdioma').addEventListener('change', (e) => {
    aplicarIdioma(e.target.value);
    atualizarContadorCadastrados();
    atualizarContadorEspera();
    atualizarBotaoImportar();
    mudarIdioma();
    credito();
    if(listaEspera.length > 0){
        document.getElementById("butVoltar").click();
    }
    document.getElementById("inputNumero").value = '';
});

// 6. AO CARREGAR A PÁGINA: Aplica o idioma salvo
document.addEventListener('DOMContentLoaded', () => {
    aplicarIdioma(idiomaAtual);
    mudarIdioma();
});

// FUNCAO QUE MUDA A LINGUAGEM DOS FORMULARIOS BRANCOS
function mudarIdioma(){
    if(idiomaAtual === 'pt'){
        atencao = '<span style="color:red;font-weight:bold">ATENÇÃO!</span>';
        
        but_baixarImagem = "Salvar";

        cabecarioPreset = "APAGAR HISTÓRICO";
        cabecarioPermanente = "APAGAR PERMANENTE";
        cabecarioAddNumero = "ADICIONAR NÚMEROS";
        cabecarioImagem = "CONFIRMAR MINISTÉRIO";
        cabecarioImagem2 = "SALVAR IMAGEM";
        cabecarioExcluirCadastro = "EXCLUIR DO CADASTRO";
        cabecarioHistPermanente = "HISTÓRICO GERAL";
        cabecarioImportarTudo ="IMPORTAR BACKUP";
        cabecarioNumSequencia = "GERAR NÚMEROS";
        cabecarioLimparTudo = "LIMPAR TUDO";
        cabecarioLimparCadastrados = "LIMPAR CADASTRADOS";
        cabecarioReportar = "REPORTAR O SORTEIO";
        cabecarioReiniciar = "REINICIAR O SORTEIO";
        cabecarioExportPermanente = "EXPORTAR HISTÓRICO PERMANENTE";
        cabecarioExportAtual = "EXPORTAR HISTÓRICO ATUAL";
        cabecarioLimparDados = "LIMPAR NOME E CIDADE";
        cadastroList = "cadastrados";
        cadastroList2 = "Cadastrados:";
        confere = "Confere se está tudo certo.";
        confirmeHistorico = 'EXPORTAR'; 
        confirmar = "CONFIRMAR";
        confirma = 'Clique em <span class="confirm"><b>CONFIRMAR</b></span>';

        dataImagem = new Date().toLocaleString('pt-BR');
        ndisponiveis = "disponíveis";
        // muda o tamanho do campo para digitar o CPF na linguagem portugues Brasil
        document.getElementById("inputNumero").maxLength = 11;
        document.getElementById("checkNIF").style.display = 'none';
        document.getElementById("spanNIF").style.display = 'none';
        document.getElementById("avisoFim").innerHTML = '⚠️ Todos os nomes já foram sorteados.';

        erroHistorico = "Nenhum sorteio foi realizado.";  
        erroHistApagado = "Histórico apagado.";
        erroNum = "Digite algum número.";
        erroNum2 = "Número inválido.";
        erroNum3 = "Todos os números já estão na lista.";
        erroNumSequencia2 = "Só pode ter 1 vírgula. Ex: 10,30";
        erroNumSequencia3 = "Formato inválido. Digite como no Exemplo: 10,30";
        erroNumSequencia4 = "Primeiro número deve ser menor que o segundo.";
        erroNumSequencia5 = "Intervalo muito grande. ";
        erroNumSequencia6 = "Máximo 2000 números.";
        erroNomeImportado = " importado com sucesso.";
        erroCPF = "Complete o CPF para validar.";
        erroCPF2 = "CPF válido.";
        erroCPF3 = "CPF inválido - verifique os números.";
        erroImportar = "Importado com sucesso. Recarregando...";
        erroImportar2 = "Arquivo JSON inválido";
        erroImportarHist = "Não há nada para importar.";
        erroLimpaTudo = "Não há nada para limpar.";
        erroImagem = "Deve sortear alguém antes de salvar.";
        excluirNome = "Para excluir o nome abaixo.";
        excluirNomeSorteio = "Também será removido do sorteio,<br><br>se estiver participando";
        erroListaRetornada = "Lista retornada com sucesso.";
        exportList = "Exportados:";

        ganhadorImagem = "GANHADOR";
        ganhadorHistPermanente = "Ganhadores";
        gerarNumSequencia = "Clique em <span class='confirm'><b>CONFIRMAR</b></span>";
        gerarNumSequencia3 = "Para gerar 1 número.<br>";
        gerarNumSequencia4 = "Para gerar";
        gerandoPre = "Gerando pré-visualização...";
        
        msgTodosSorteados = "Todos os nomes foram sorteados.";
        modalImagem = "Clique em <span class='confirm'><b>CONFIRMAR</b></span><br><br>Para salvar a imagem de:<br><br> <span style='color:darkblue;font-weight:bold;'>";
        modalFoto = "Clique em <span class='confirm'><b>CONFIRMAR</b></span><br><br>Se ministério e o texto estiverem coreto.<br><br>Ministério: <span style='color: #0655aa;font-weight:bold;'>";
        modal_limpa_historico = "Para excluir o Histórico abaixo.";
        modalLimparTudo = "Para limpar a Lista de Participantes.<br><br>O Histórico Acumulado e o Histórico Atual,<br><br><b><span style='color: #0655aa;'>SERÃO APAGADOS</span></b>.<br><br>O Histórico Permanente <b><span style='color: #0655aa;'>NÃO SERÁ APAGADO</span></b>.";
        modalLimparCadastrados = "Para limpar a Lista de Cadastrados.";
        modalReportar = "Para salvar o sorteio ";
        modalReportar2 = " no Histórico Permanente.<br><br>O Histórico Atual <b><span style='color: #0655aa;'>SERÁ APAGADO</span></b>."
        modalReiniciar = "Para reiniciar o sorteio ";
        modalReiniciar2 = "A sessão atual será salva no Histórico Permanente.<br><br>O Histórico Atual <b><span style='color: #0655aa;'>SERÁ APAGADO</span></b>.";
        modalExportPermanente = "Para exportar o Histórico Permanente no formato TXT.";
        modalExportAtual = "Para exportar o Histórico Atual no formato TXT.";
        modalLimparDados = "Para apagar o nome e a cidade salva.";

        nomeHistorico = "Histórico";
        nomeCadastrado = "Já está cadastrado.";
        nomesDisponiveis = "nomes";
        numeroAdicionado = "Será adicionado 1 número.";
        numeroAdicionado2 = "Serão adicionados ";
        numeroAdicionado3 = "números.";
        numeroAdicionado4 = "O número abaixo:";
        numeroAdicionado5 = "já está participando e será ignorado.";
        numeroAdicionado6 = "Os números abaixo:";
        numeroAdicionado7 = "Já estão participando e serão ignorados.";
        nenhum = "nenhum.";

        ouClick = "Ou clique em: ";

        participaramHistPermanente = "Participaram do sorteio:";
        paraConfirmar = 'Para confirmar exclusão de:<br><br><b><span style="color: #0655aa;">TODO</span></b> Histórico Permanente de ';
        previsualizar = "PRÉ-VISUALIZAÇÃO";

        segundaConfirmacao = 'Essa segunda confirmação<br><br><b><span style="color: #0655aa;">NÃO PODERÁ SER DESFEITA</span></b>.';
        sorteioHistPermanente = "Sorteio";
        sorteioImagem = "º SORTEADO"; 
        subscrever = "Vai sobrescrever tudo.<br><br>Exportado em: ";

        texto = "Texto: ";
        texto_historico_acumulativo = "<span style='float:left'>📜</span> HISTÓRICO ACUMULADO";
        texto_limpa_historico = "<span style='float:left'>📜</span> HISTÓRICO ATUAL";
        textoHistPermanente = " vazio. Importe ou reinicie um sorteio para salvar a primeira sessão.";
        texto_historico ="<span style='float:left'>📜</span> HISTÓRICO ATUAL <button onclick='limparHistorico()' class='but-limpar' >🗑️ Limpar</button>";
        travaInputNum = "Não pode digitar zero depois da vírgula.";
        travaInputNum2 = "Não é permitido iniciar com zero, vírgula ou espaço.";
        travaInputNum3 = "Apenas números e vírgula nesse campo.";
        travaInputNum4 = "Digite um número antes da digitar a próxima vírgula.";
        travaInputNum5 = "Não é mais permitido digitar vírgula.";
        travaInputNum6 = "Digite a vírgula para continuar.";
        travaInputNum7 = "Apenas número nesse campo.";
        travaInputNome = "Digite um nome primeiro, depois dê Enter.";
        travaInputBusca = "Nenhum nome encontrado ";
        trocaMinisterio = "Corrigir";
        
        vazio = " vazio. Reinicie um sorteio para salvar a primeira sessão."; 
    }else if(idiomaAtual === 'en'){
        atencao = '<span style="color:red;font-weight:bold">ATTENTION:</span>';
        
        but_baixarImagem = "Save";
        
        cabecarioPreset = "DELETE HISTORY";
        cabecarioPermanente = "DELETE PERMANENT";
        cabecarioAddNumero = "ADD NUMBERS";
        cabecarioImagem = "CONFIRM MINISTRY";
        cabecarioImagem2 = "SAVE IMAGE";
        cabecarioExcluirCadastro = "DELETE ACCOUNT";
        cabecarioHistPermanente = "PERMANENT GENERAL HISTORY";
        cabecarioImportarTudo ="IMPORT BACKUP";
        cabecarioNumSequencia = "GENERATE NUMBERS";
        cabecarioLimparTudo = "CLEAR ALL";
        cabecarioLimparCadastrados = "CLEAR REGISTERED";
        cabecarioReportar = "REPORT DRAW";
        cabecarioReiniciar = "RESTART THE DRAW";
        cabecarioExportPermanente = "EXPORT PERMANENT HISTORY";
        cabecarioExportAtual = "EXPORT CURRENT HISTORY";
        cabecarioLimparDados = "CLEAR NAME AND CITY";
        cadastroList = "registered";
        confere = "Check if everything is correct.";
        confirmeHistorico = 'EXPORT';
        confirmar = "CONFIRM";
        confirma = 'Click to <span class="confirm"><b>CONFIRM</b></span>';

        dataImagem = new Date().toLocaleString('en-US');
        ndisponiveis = "available";
        // muda o tamanho do campo para digitar o SSN na linguagem ingles USA
        document.getElementById("inputNumero").maxLength = 9;
        document.getElementById("checkNIF").style.display = 'none';
        document.getElementById("spanNIF").style.display = 'none';
        document.getElementById("avisoFim").innerHTML = '⚠️ All names have been drawn.';

        erroHistorico = "No raffle has been held.";
        erroHistApagado = "History deleted.";
        erroNum = "Enter a number.";
        erroNum2 = "Invalid number.";
        erroNum3 = "All numbers are already on the list.";
        erroNumSequencia2 = "Only 1 comma is allowed. Ex: 10,30";
        erroNumSequencia3 = "Invalid format. Enter as in the example: 10,30";
        erroNumSequencia4 = "The first number must be less than the second.";
        erroNumSequencia5 = "Range too large. ";
        erroNumSequencia6 = "Maximum 2000 numbers.";
        erroNomeImportado = " imported successfully.";
        erroCPF = "Complete the SSN to validate.";
        erroCPF2 = "Valid SSN.";
        erroCPF3 = "Invalid SSN - please check the numbers.";
        erroImportar = "Imported successfully. Reloading...";
        erroImportar2 = "Invalid JSON file";
        erroImportarHist = "There is nothing to import.";
        erroLimpaTudo = "There is nothing to clear.";
        erroImagem = "You must draw someone before saving.";
        excluirNome = "To remove the name below.";
        excluirNomeSorteio = "It will also be removed from the raffle,<br><br>if it is participating.";
        erroListaRetornada = "List retrieved successfully.";
        exportList = "Exported:";

        ganhadorImagem = "WINNER";
        ganhadorHistPermanente = "Winners";
        gerarNumSequencia = "Click to <span class='confirm'><b>CONFIRM</b></span>";
        gerarNumSequencia3 = "To generate 1 number.";
        gerarNumSequencia4 = "To generate";
        gerandoPre = "Generating preview...";

        msgTodosSorteados = "All names have been drawn.";
        modalImagem = "To save image:<br><br> <span style='color:darkblue;font-weight:bold;'>";
        modalFoto = "Click on <span class='confirm'><b>CONFIRMAR</b></span><br><br>If the ministry and the text are correct.<br><br>Ministry: <span style='color: #0655aa;font-weight:bold;'>";
        //modalFoto = "Clique em <span class='confirm'><b>CONFIRMAR</b></span><br><br>Se ministério e o texto estiverem coreto.<br><br>Ministério: <span style='color: #0655aa;font-weight:bold;'>";
        modal_limpa_historico = "To remove the History below.";
        modalLimparTudo = "To clear the Participants List.<br><br>The Accumulated History and the Current History,<br><br><b><span style='color: #0655aa;'>WILL BE DELETED</span></b>.<br><br>The Permanent History <b><span style='color: #0655aa;'>WILL NOT BE DELETED</span></b>.";
        modalLimparCadastrados = "To clear the Registered List.";
        modalReportar = "To save the draw ";
        modalReportar2 = " in the Permanent History.<br><br>The Current History <b><span style='color: #0655aa;'>WILL BE DELETED</span></b>."
        modalReiniciar = "To restart the draw ";
        modalReiniciar2 = "The current session will be saved to Permanent History.<br><br>The Current History <b><span style='color: #0655aa;'>WILL BE DELETED</span></b>.";
        modalExportPermanente = "To export the Permenet History in TXT format.";
        modalExportAtual = "To export the Current History in TXT format.";
        modalLimparDados = "To delete the saved name and city.";

        nomeHistorico = "History";
        nomeCadastrado = "Already registered.";
        nomesDisponiveis = "names";
        numeroAdicionado = "1 number will be added.";
        numeroAdicionado2 = "numbers will be added.";
        numeroAdicionado3 = "numbers";
        numeroAdicionado4 = "The number below:";
        numeroAdicionado5 = "is already participating and will be ignored.";
        numeroAdicionado6 = "The numbers below:";
        numeroAdicionado7 = "are already participating and will be ignored.";

        ouClick = "Or click on: ";

        participaramHistPermanente = "Participated in the draw:";
        paraConfirmar = 'To delete:<br><br><b><span style="color: #0655aa;">ALL</span></b> Permanent History';
        previsualizar = "PREVIEW";

        segundaConfirmacao = 'This second confirmation<br><br><b><span style="color: #0655aa;">CANNOT BE UNDONE.</span></b>';
        sorteioHistPermanente = "Draw";
        // conserta com a funcao para mostrar nd st
        sorteioImagem = "st DRAWN";
        subscrever = "";

        texto = "Text: ";
        texto_historico_acumulativo = "<span style='float:left'>📜</span> ACCUMULATED HISTORY";
        texto_limpa_historico = "<span style='float:left'>📜</span> CURRENT HISTORY";
        textoHistPermanente = " is empty. Import or start a new draw to save the first session.";
        texto_historico ="<span style='float:left'>📜</span> CURRENT HISTORY <button onclick='limparHistorico()' class='but-limpar' >🗑️ Clear</button>";
        travaInputNum = "You cannot enter zero after the comma.";
        travaInputNum2 = "It is not allowed to start with zero, comma or space.";
        travaInputNum3 = "Number and comma only in this field.";
        travaInputNum4 = "Enter a number before typing the next comma.";
        travaInputNum5 = "It is no longer allowed to type a comma.";
        travaInputNum6 = "Type a comma to continue.";
        travaInputNum7 = "Number only in this field.";
        travaInputNome = "Enter a name first, then press Enter.";
        travaInputBusca = "No name found ";
        trocaMinisterio = "Correct";
    
        vazio = " is empty. Start a new draw to save the first session.";
    }else{
        atencao = '<span style="color:red;font-weight:bold">ATENCIÓN:</span>';
        
        but_baixarImagem = "Guardar";
    
        cabecarioPreset = "BORRAR HISTORIAL";
        cabecarioPermanente = "BORRAR PERMANENTE";
        cabecarioAddNumero = "AGREGAR NÚMEROS";
        cabecarioImagem = "CONFIRMAR MINISTERIO";
        cabecarioImagem2 = "GUARDAR IMAGEN";
        cabecarioExcluirCadastro = "ELIMINAR DEL REGISTRO";
        cabecarioHistPermanente = "HISTORIAL GENERAL PERMANENTE";
        cabecarioImportarTudo ="IMPORTAR BACKUP";
        cabecarioNumSequencia = "GENERAR NÚMEROS";
        cabecarioLimparTudo = "LIMPIAR TODO";
        cabecarioLimparCadastrados = "LIMPIAR REGISTRADOS";
        cabecarioReportar = "REPORTAR EL SORTEO";
        cabecarioReiniciar = "REINICIAR EL SORTEO";
        cabecarioExportPermanente = "EXPORTAR HISTORIAL PERMANENTE";
        cabecarioExportAtual = "EXPORTAR HISTORIAL ACTUAL";
        cabecarioLimparDados = "BORRAR NOMBRE Y CIUDAD";
        cadastroList = "registrados";
        cadastroList2 = "Registrados:";
        confere = "Comprueba si todo está correcto.";
        confirmeHistorico = 'EXPORTAR'; 
        confirmar = "CONFIRMAR";
        confirma = 'Haz clic en <span class="confirm"><b>CONFIRMAR</b></span>';

        dataImagem = new Date().toLocaleString('es-ES');
        ndisponiveis = "disponible";
        // muda o tamanho do campo para digitar o NIF na linguagem espanhol ES
        document.getElementById("inputNumero").maxLength = 9;
        document.getElementById("checkNIF").style.display = 'inline-block';
        document.getElementById("spanNIF").style.display = 'inline-block';
        document.getElementById("avisoFim").innerHTML = '⚠️ Todos los nombres han sido sorteados.';

        erroHistorico = "No se ha realizado ningún sorteo.";  
        erroHistApagado = "Historial eliminado.";
        erroNum = "Escribe algún número.";
        erroNum2 = "Número inválido.";
        erroNum3 = "Todos los números ya están en la lista.";
        erroNumSequencia2 = "Solo se permite 1 coma. Ex: 10,30";
        erroNumSequencia3 = "Formato inválido. Ingrese como en el ejemplo: 10,30";
        erroNumSequencia4 = "El primer número debe ser menor que el segundo.";
        erroNumSequencia5 = "Intervalo demasiado grande. ";
        erroNumSequencia6 = "Máximo 2000 números.";
        erroNomeImportado = " importado con éxito.";
        erroCPF = "Completa el NIF para validar.";
        erroCPF2 = "NIF válido.";
        erroCPF3 = "NIF inválido - verificar los números.";
        erroImportar = "Importado con éxito. Recargando...";
        erroImportar2 = "Archivo JSON no válido";
        erroImportarHist = "No hay nada para importar.";
        erroLimpaTudo = "No hay nada para limpiar.";
        erroImagem = "Debes sortear a alguien antes de guardar.";
        excluirNome = "Para borrar el nombre de abajo.";
        excluirNomeSorteio = "También se eliminará del sorteo,<br><br>se está participando.";
        erroListaRetornada = "Lista obtenida con éxito.";
        exportList = "Exportados:";

        ganhadorImagem = "GANADOR";
        ganhadorHistPermanente = "Ganadores";
        gerarNumSequencia = "Haz clic en <span class='confirm'><b>GENERAR</b></span>";
        gerarNumSequencia3 = "Para generar 1 número.";
        gerarNumSequencia4 = "Para generar";
        gerandoPre = "Generando vista previa...";
        
        msgTodosSorteados = "Todos los nombres han sido sorteados.";
        modalImagem = "Haz clic en <span class='confirm'><b>CONFIRMAR</b></span><br><br>Para guardar la imagen de:<br><br> <span style='color:darkblue;font-weight:bold;'>";
        modalFoto = "Haz clic en <span class='confirm'><b>CONFIRMAR</b></span><br><br>Si el ministerio y el texto están correctos.<br><br>Ministerio: <span style='color: #0655aa;font-weight:bold;'>";
        //modalFoto = "Clique em <span class='confirm'><b>CONFIRMAR</b></span><br><br>Se ministério e o texto estiverem coreto.<br><br>Ministério: <span style='color: #0655aa;font-weight:bold;'>";
        modal_limpa_historico = "Para borrar el Historial de abajo.";
        modalLimparTudo = "Para limpiar la Lista de Participantes.<br><br>El Historial Acumulado y el Historial Actual,<br><br><b><span style='color: #0655aa;'>SE BORRARÁN</span></b>.<br><br>El Historial Permanente <b><span style='color: #0655aa;'>NO SE BORRARÁ</span></b>.";
        modalLimparCadastrados = "Para limpiar la Lista de Registrados.";
        modalReportar = "Para guardar el sorteo ";
        modalReportar2 = " en el Historial Permanente.<br><br>El Historial Actual <b><span style='color: #0655aa;'>SE BORRARÁ</span></b>."
        modalReiniciar = "Para reinicar el sorteo ";
        modalReiniciar2 = "La sesión actual se guardará en el Historial Permanente.<br><br>El Historial Actual <b><span style='color: #0655aa;'>SE BORRARÁ</span></b>.";
        modalExportPermanente = "Para exportar el Historial Permanente en formato TXT.";
        modalExportAtual = "Para exportar el Historial Actual en formato TXT.";
        modalLimparDados = "Para eliminar el nombre y la ciudad gardados.";

        nomeHistorico = "Historial";
        nomeCadastrado = "ya está registrado.";
        nomesDisponiveis = "nombres";
        numeroAdicionado = "Se agregará 1 número.";
        numeroAdicionado2 = "Se agregarán ";
        numeroAdicionado3 = "números.";
        numeroAdicionado4 = "El número de abajo:";
        numeroAdicionado5 = "ya está participando y será ignorado.";
        numeroAdicionado6 = "Los números de abajo:";
        numeroAdicionado7 = "ya están participando y serán ignorados.";
        nenhum = "ningún.";

        ouClick = "O haz clic en: ";

        participaramHistPermanente = "Participaron en el sorteo:";
        paraConfirmar = 'Para confirmar la eliminación de:<br><br><b><span style="color: #0655aa;">TODO</span></b> el Historial Permanente de ';
        previsualizar = "VISTA PREVIA";

        segundaConfirmacao = 'Essa segunda confirmación<br><br><b><span style="color: #0655aa;">NO PODRÁ DESHACER</span></b>.';
        sorteioHistPermanente = "Sorteo";
        sorteioImagem = "º SORTEADO";
        subscrever = "Esto sobrescribirá todo.<br><br>Exportando en: ";

        texto = "Texto: ";
        texto_historico_acumulativo = "<span style='float:left'>📜</span> HISTORIAL ACUMULADO";
        texto_limpa_historico = "<span style='float:left'>📜</span> HISTORIAL ACTUAL";
        textoHistPermanente = " vacío. Importa o reinicia un sorteo para guardar la primera sesión.";
        texto_historico ="<span style='float:left'>📜</span> HISTORIAL ACTUAL <button onclick='limparHistorico()' class='but-limpar' >🗑️ Limpiar</button>";
        travaInputNum = "No puedes ingresar cero después de la coma.";
        travaInputNum2 = "No está permitido comenzar con cero, coma o espacio.";
        travaInputNum3 = "Solo número y coma en este campo.";
        travaInputNum4 = "Ingresa un número antes de escribir la siguiente coma.";
        travaInputNum5 = "Ya no está permitido escribir una coma.";
        travaInputNum6 = "Escribe una coma para continuar.";
        travaInputNum7 = "Solo número en este campo.";
        travaInputNome = "Ingrese un nombre primero, luego presiona Enter.";
        travaInputBusca = "No se encontró ningún nombre ";
        trocaMinisterio = "Corregir";
       
        vazio = " vacío. Reinicia un sorteo para guardar la primera sesión.";
    }
    atualizarContador();
}

// FUNCAO PARA VER O HISTORICO ATUAL, O MAIS VOLATIL DOS TRES
function verHistoricoAtual() {
    if (historicoAtual.length === 0) {
        // mostra o erro do form
        mostrarErro(`⚠️ ${erroHistorico}`);
        return;
    }
    let texto = '';
    historicoAtual.forEach(item => {
        //let colocacao = item.ordem;
        let sufixo = getSufixoIngles(item.ordem);
        if(idiomaAtual === 'en'){
            let dataModificada = `${item.data}`;
            let [data, hora] = dataModificada.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada = dataOblj.toLocaleString('en-US');       
             texto += `${dataModificada} - 🏆 ${item.nome} - ${item.ordem}${sufixo}<br>`;
        }else{
             texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
        }
    });
    // mostra as informacoes do form
    cabecario.innerHTML = `${texto_historico}`;
    confirme.innerText = `📄 ${confirmeHistorico}`;
    modal.innerHTML = `${texto}<br>`;
    confirme.style.display = 'block';
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
        mostrarErro(`⚠️ ${erroHistorico}`);
        return;
    }
    let texto = '';
    historico.forEach(item => {
        //let colocacao = item.ordem;
        let sufixo = getSufixoIngles(item.ordem);
        if(idiomaAtual === 'en'){
            let dataModificada = `${item.data}`;
            let [data, hora] = dataModificada.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada = dataOblj.toLocaleString('en-US'); 
            texto += `${dataModificada} - 🏆 ${item.nome} - ${item.ordem}${sufixo}<br>`;
        }else{
            texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
        }

       // texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º\n`;
    });
    cabecario.innerHTML = `${texto_historico_acumulativo}`; 
    confirme.innerText = `📄 ${confirmeHistorico}`;                                                 
    modal.innerHTML = `${texto}`;
    confirme.style.display = 'block';
    modalHistorico();
    // METODO PARA SUBSTITUIR O BOTAO CONFIRM NATIVO DO JAVASCRIPT
    // Se clicar no botao exportar, chama a funcao para exportar as informacoes
    confirme.onclick = () => {
        exportarResutHistorico();
    }
}

// FUNCAO PARA LIMPAR O HISTORICO ATUAL
function limparHistorico() {
    if (historicoAtual.length === 0) {
        mostrarErro(`⚠️ ${erroHistorico}`);
        return;
    }
    let texto = '';
    historicoAtual.forEach(item => {
        //let colocacao = item.ordem;
        let sufixo = getSufixoIngles(item.ordem);
        if(idiomaAtual === 'en'){
            let dataModificada = `${item.data}`;
            let [data, hora] = dataModificada.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada = dataOblj.toLocaleString('en-US');
             texto += `${dataModificada} - 🏆 ${item.nome} - ${item.ordem}${sufixo}<br>`;
        }else{
             texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
        };
        //texto += `${item.data} - 🏆 ${item.nome} - ${item.ordem}º<br>`;
    });
    cabecario.innerHTML = `${texto_limpa_historico}<br>`; 
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modal_limpa_historico}<br><br>${texto}`;
    confirme.innerHTML = `<img class='eraser' src='eraser.png'> &nbsp&nbsp&nbsp ${confirmar}`;
    confirme.style.display = 'block';
    modalHistorico();
    // METODO PARA SUBSTITUIR O BOTAO CONFIRM NATIVO DO JAVASCRIPT
    // Se clicar no botao exportar, chama a funcao para exportar as informacoes
    confirme.onclick = () => {
        historicoAtual = [];
        localStorage.setItem('cte_historicoAtual', JSON.stringify([]));
        mostrarErro(`⚠️ ${erroHistApagado}`);
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
    let texto = '';
    let sessao = '';
    if(sessoes.length === 0){
        mostrarErro(`⚠️ ${nomeHistorico} ${presete} ${textoHistPermanente}`);
        return;
    }
    if(idiomaAtual === 'pt'){
        if(sessoes.length > 1){
            sessao = 'sessões';
        }else{
            sessao = 'sessão';
        }
    }else if(idiomaAtual === 'en'){
        if(sessoes.length > 1){
            sessao = 'sessions';
        }else{
            sessao = 'session';
        }
    }else{
        if(sessoes.length > 1){
            sessao = 'sesiones';
        }else{
            sessao = 'sesión';
        }
    }
    sorteioHistPermanente ;
    ganhadorHistPermanente ;
    participaramHistPermanente ;
    cabecario.innerHTML = `<span style='float:left'>📜</span> ${cabecarioHistPermanente}`;
    confirme.innerText = `📄 ${confirmeHistorico}`;
    sessoes.forEach((sessao, index) => {
        let dataModificada = `${sessao.data}`;
        let [data, hora] = dataModificada.split(', ');
        let [dia, mes, ano] = data.split('/');
        let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
        dataModificada = dataOblj.toLocaleString('en-US');
        texto += ` ${sorteioHistPermanente} - ${dataModificada}<br>`;
        texto += `<span style='color:darkblue;'>- - - - - - - 👑 ${ganhadorHistPermanente} 👑 - - - - - - -</span><br>`;
        if (sessao.ganhadores.length > 0){
            sessao.ganhadores.forEach(g => {
                let sufixo = getSufixoIngles(g);
                if(idiomaAtual === 'en'){
                    texto += `🏆 ${g}${sufixo}<br>`;
                }else{
                    texto += `🏆 ${g}º<br>`;
                }
            });
        }else{
            texto += `Nenhum sorteado<br>`;
        }
        texto += `───────────────────────────────────────<br>`;
        if(sessao.participantes.length > 0) {
            texto += `😎 ${participaramHistPermanente} <br>`;
            texto += `${sessao.participantes.join(', ')}.<br>`;
        }
        if (index < sessoes.length - 1){
             texto += `<span style='color:red;'>═══════════════════════════════════════</span><br>`;
        }
    });
    modal.style.height = '210px';
    modal.innerHTML = `───────────────────────────────────────<br>
                        ${nomeHistorico} - ${presete} - Total: ${sessoes.length} ${sessao}<br>
                       ───────────────────────────────────────<br>
                        ${sessao}${texto}`;
    confirme.style.display = 'block';
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
        mostrarErro(`⚠️ ${nomeHistorico} ${presete} ${vazio}`);
        return;
    }
    // Abre o historico branco
    cabecario.innerHTML = `<span style='float:left'>🗑️</span> ${cabecarioPreset}`;
    if(idiomaAtual === 'en'){
        modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${paraConfirmar} ${presete} History.`;
    }else{
        modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${paraConfirmar} ${presete}.`;
    }
    confirme.innerHTML = `✅ ${confirmar}`;
    confirme.style.display = 'block';
    modalHistorico();
    // Primeira confirmacao para limpar o historico permanente
    confirme.onclick = () => {
        if (sessoes.length === 0) {
            mostrarErro(`⚠️ ${nomeHistorico} ${presete} ${vazio}`);
            return;
        }
        if(idiomaAtual === 'pt'){
            if(sessoes.length > 1){
                sessao = ' sessões serão apagadas.';
            }else{
                sessao = ' sessão será apagada.';
            }
        }else if(idiomaAtual === 'en'){
            if(sessoes.length > 1){
                sessao = ' sessions will be deleted.';
            }else{
                sessao = ' session will be deleted.';
            }
        }else{
            if(sessoes.length > 1){
                sessao = ' sesiones serán eliminadas.';
            }else{
                sessao = ' sesión será eliminada.';
            }
        }
        cabecario.innerHTML =`<span style='float:left'>🗑️</span> ${cabecarioPermanente}`;
        confirme.innerHTML = `<img class='eraser' src='eraser.png'> &nbsp&nbsp&nbsp ${confirmar}`;
        if(idiomaAtual === 'en'){
            modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${paraConfirmar}${presete} History.<br><br>${segundaConfirmacao}<br><br>${sessoes.length} ${sessao}`;
        }else{
            modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${paraConfirmar}${presete}.<br><br>${segundaConfirmacao}<br><br>${sessoes.length} ${sessao}`;
        }
        confirme.onclick = () => {
            localStorage.removeItem(chaveSessoes);
            mostrarErro(`⚠️ Histórico ${presete} apagado.`);
            // Ao apagar o historico permanente, desabilita o botao LP
            document.getElementById('limpaTodosPresets').classList.add('desativa');
            fechar();
        }
    }
}

// Variavel de musica de fundo do sorteio
const MUSICAS = {
  1: 'audio/musica1.mp3',
  2: 'audio/musica2.mp3',
  3: 'audio/musica3.mp3',
  4: 'audio/musica4.mp3',
  5: 'audio/musica5.mp3',
  6: 'audio/musica6.mp3',
  7: 'audio/musica7.mp3',
  8: 'audio/musica8.mp3',
  9: 'audio/musica9.mp3',
  10: 'audio/musica10.mp3',
  11: 'audio/musica11.mp3',
  12: 'audio/musica12.mp3',
  13: 'audio/musica13.mp3',
  14: 'audio/musica14.mp3',
  15: 'audio/musica15.mp3'
};

let audioAtual = null;

// Funcao que seleciona a musica quando escolhe o botao
function tocarMusica(id){
    if(audioAtual){
        audioAtual.pause();
        audioAtual.currenTime - 0;
    }
    const caminho = MUSICAS[id];
    if(!caminho) return;

    audioAtual = new Audio(caminho);
    /*audioAtual.volume = 0.5;*/
    audioAtual.volume = document.getElementById('volumeMusica').value;
    audioAtual.loop = true;

    audioAtual.play().catch(err => {
        console.error("erro ao tocar:", err);
        alert("nao consegui tocar " + caminho);
    })
}

// Funcao que silencia a musica de funco do sorteio
function silenciar(){
    if(audioAtual){
        audioAtual.pause();
    }
}

// Funcao que altera o volume da musica de fundo do sorteio
function setVolume(valor){
    if (audioAtual){
        audioAtual.volume = valor;
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

const botoesMusica = document.querySelectorAll('.btn-musica');

// Função pra remover a classe de todos os botoes
function limparSelecao() {
    botoesMusica.forEach(btn => {
    btn.classList.remove('selecionado');
    btn.disabled = false;
});
}

// Adiciona a classe selecionado ao botao clicado
botoesMusica.forEach(botao => {
  botao.addEventListener('click', () => {
    limparSelecao();
    // 2. Marca esse botão como selecionado
    botao.classList.add('selecionado');
    botao.disabled = true;
  });
});


const radioLarguraImg = document.getElementById('radioLarguraImg');

// Carrega a imagem na div quando for escolhida
const logoInputImagem = document.getElementById('logoInput');
logoInputImagem.addEventListener('change', function(){
   logInput();
})

// Funcao que verifica se tem imagem no input file muda a classe do botao confirmar para avisar
function logInput(){
    const logoInputImagem = document.getElementById('logoInput');
    const arquivo = logoInputImagem.files[0];
    const previewDiv = document.getElementById('imgSalva');
    if(arquivo){
        const reader = new FileReader();
        reader.onload = function(e){
            previewDiv.style.display = 'block';
            previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 50px;max-height: 30px;">`;
        }
        reader.readAsDataURL(arquivo);
        radioLarguraImg.style.display = 'block';
        confirme.style.color = '#4446ad';
        confirme.style.borderColor = '#4b44ad'; 
        confirme.classList.add('imagemCarregada');
        setTimeout(() =>{
            confirme.classList.remove('imagemCarregada');
        }, 2000);
        
    }else{
        radioLarguraImg.style.display = 'none';
        confirme.style.color = '#ff0044';
        confirme.style.borderColor = '#ff0044'; 
        confirme.classList.add('botaoAlerta');
        previewDiv.style.display = 'none';
        previewDiv.innerHTML = '';

        setTimeout(() =>{
            confirme.classList.remove('botaoAlerta');
        }, 2000);

    }
};

let larguraLogo = '300';
document.querySelectorAll('input[name="tamanhoLogo"]').forEach(radio =>{
    radio.addEventListener('change', (e) => {
        larguraLogo = parseInt(e.target.value);
    })
})


// FUNCAO QUE SALVA A IMAGEM DO GANHADOR EM FORMATO MARCA PAGINA
function salvarImagem() {
    if (!ultimoGanhador) {
        mostrarErro(`⚠️ ${erroImagem}`);
        return;
    }
    confirme.style.color = '#4446ad';
    confirme.style.borderColor = '#4b44ad'; 
    document.getElementById('butImagem').style.display = 'none';
    document.getElementById('radioLarguraImg').style.display = 'none';
    document.getElementById('butSemImagem').style.display = 'none';
    const minFoto = localStorage.getItem('nomeMinisterio') || 'Ministéreio de Oração';
    const textFoto = localStorage.getItem('nomeTexto') || 'O Senhor te abeçõe e te guarde';
    cabecario.innerHTML = `<span style='float:left'>📸</span> ${cabecarioImagem}`;
    modal.innerHTML = `<br>${modalFoto}${minFoto}</span>.<br><br>${texto} <span style='color: #0655aa;font-weight:bold;'>${textFoto}</span>.<br><br>${ouClick}<button onclick="document.getElementById('modalHistorico').style.display = 'none';formulario();" class='but btn-overlay' >✏️ ${trocaMinisterio}</button>`;
    confirme.innerText = `✅ ${confirmar}`;
    confirme.style.display = 'block';
    modalHistorico();
    confirme.onclick = () => {
       logInput();
        document.getElementById('butImagem').style.display = 'block';
        document.getElementById('butSemImagem').style.display = 'block';
        cabecario.innerHTML = `<span style='float:left'>📸</span> ${cabecarioImagem2}`;
        modal.innerHTML = `<br>${modalImagem}${ultimoGanhador}</span>`;
        // confirma o ministerio
        confirme.onclick = () => {
            //atualizarPreview();
            logInput();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const minFoto = localStorage.getItem('nomeMinisterio') || 'Ministério de Oração';
            const textFoto = localStorage.getItem('nomeTexto') || 'O Senhor te abençoe e te guarde';

            cabecario.innerHTML = `<span style='float:left'>📸</span> ${cabecarioImagem}`;
            modal.innerHTML = `<br>${gerandoPre}`;
            confirme.style.display = 'none';
            // confirma o nome do ganhador
            confirme.onclick = () => {
                logInput();

                // 1. CRIA CANVAS TEMPORARIO PRA MEDIR
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const larguraCanvas = 591;
                const centroX = larguraCanvas / 2;
                const maxWidthTexto = 450;//500;
                const espacamentoExtra = 25;
                const subirBloco = 40;
                let y = 30;

                // 2. MEDE TUDO PRA CALCULAR ALTURA
                ctx.font = '38px Arial';
                const alturaMin = 50;

                ctx.font = '38px Arial';// era 28
                const infoBencao = quebraTextoMedir(ctx, textFoto, maxWidthTexto, 40);

                ctx.font = 'bold 55px Arial';
                const alturaTitulo = 70;

                ctx.font = '150px Arial';
                const alturaTrofeu = 180;

                ctx.font = 'bold 80px Arial';
                const infoNome = quebraTextoMedir(ctx, ultimoGanhador, maxWidthTexto, 95);

                ctx.font = 'bold 45px Arial';
                const alturaOrdem = 60;

                ctx.font = '35px Arial';
                const alturaData = 50;

                ctx.font = '28px Arial';
                const alturaRodape = 40;
                const alturaLogo = 140;

                let alturaTotal = y + alturaMin + 20
                                    + infoBencao.alturaTotal + 40 + espacamentoExtra
                                    + alturaTitulo + 40 + espacamentoExtra
                                    + alturaTrofeu + 40 + espacamentoExtra
                                    + infoNome.alturaTotal + 40 + espacamentoExtra - subirBloco
                                    + alturaOrdem + 30 + espacamentoExtra
                                    + alturaData + 30 + espacamentoExtra
                                    + alturaLogo + 20 + espacamentoExtra
                                    + alturaRodape + 30;

                // 3. LIMITE DE SEGURANÇA
                const MAX_ALTURA = 3600;// era 3000
                if(alturaTotal > MAX_ALTURA) {
                    mostrarErro(`⚠️ Erro: Conteúdo muito grande: ${Math.round(alturaTotal)}px. Reduza o texto.`);
                    return;
                }

                // 4. DEFINE TAMANHO REAL DO CANVAS
                canvas.width = larguraCanvas;
                canvas.height = alturaTotal;

                // 5. DESENHA TUDO DE NOVO COM O Y ANDANDO
                y = 30;

                // Fundo
                const grad = ctx.createLinearGradient(0, 0, 0, alturaTotal);
                grad.addColorStop(0, '#6a6d81ff'); grad.addColorStop(0.5, '#444b74ff'); grad.addColorStop(1, '#0a0e27');
                ctx.fillStyle = grad; ctx.fillRect(0, 0, larguraCanvas, alturaTotal);

                // Borda
                ctx.strokeStyle = '#bdf5f5ff'; ctx.lineWidth = 6; ctx.shadowColor = '#bdf5f5ff'; ctx.shadowBlur = 20;
                ctx.strokeRect(15, 15, larguraCanvas - 30, alturaTotal - 30); ctx.shadowBlur = 0;

                // Ministerio
                ctx.font = '38px Arial'; ctx.fillStyle = '#a5f7d7ff'; ctx.textAlign = 'center';
                //ctx.fillText(minFoto, larguraCanvas/2, y + 38); y += alturaMin + 20;
                ctx.fillText(minFoto, centroX, y + 38); y += alturaMin + 20 + espacamentoExtra;

                // Bencao
                ctx.font = '28px Arial'; ctx.fillStyle = '#ffffff';
                //quebraTexto(ctx, textFoto, larguraCanvas/2, y, maxWidthTexto, 40); y += infoBencao.alturaTotal + 40;
                quebraTexto(ctx, textFoto, centroX, y, maxWidthTexto, 40); y += infoBencao.alturaTotal + 40 + espacamentoExtra - subirBloco;

                // Titulo
                ctx.font = 'bold 55px Arial'; ctx.shadowColor = '#ff00ff'; ctx.shadowBlur = 5;
                //ctx.fillText(`${ganhadorImagem}`, larguraCanvas/2, y + 55); y += alturaTitulo + 40;
                ctx.fillText(`${ganhadorImagem}`, centroX, y + 55); y += alturaTitulo + 40 + espacamentoExtra  - subirBloco;

                // Trofeu
                ctx.font = '150px Arial'; ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 25;
                //ctx.fillText('🏆', larguraCanvas/2, y + 150); y += alturaTrofeu + 40;
                ctx.fillText('🏆', centroX, y + 150); y += alturaTrofeu + 70 + espacamentoExtra;

                // Nome
                ctx.font = 'bold 80px Arial'; ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 5;
                //quebraTexto(ctx, ultimoGanhador, larguraCanvas/2, y, maxWidthTexto, 95); y += infoNome.alturaTotal + 40;
                quebraTexto(ctx, ultimoGanhador, centroX, y, maxWidthTexto, 95); y += infoNome.alturaTotal + 40 + espacamentoExtra ;

                // Ordem
                ctx.font = 'bold 45px Arial'; ctx.shadowBlur = 0;
                //ctx.fillText(`${nomesSorteados.length}${sorteioImagem}`, larguraCanvas/2, y + 45); y += alturaOrdem + 30;
                ctx.fillText(`${nomesSorteados.length}${sorteioImagem}`, centroX, y + 45); y += alturaOrdem + 30 + espacamentoExtra - subirBloco;

                // Data
                ctx.font = '35px Arial';
                // ctx.fillText(dataImagem, larguraCanvas/2, y + 35); y += alturaData + 30;
                ctx.fillText(dataImagem, centroX, y + 35); y += alturaData + 30 + espacamentoExtra;

                // Logo
                const logoInput = document.getElementById('logoInput');
                const file = logoInput.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const logo = new Image();
                        logo.onload = function() {
                        // const larguraLogo = 140;
                            const posX = (larguraCanvas / 2) - (larguraLogo / 2);
                            ctx.drawImage(logo, posX, y, larguraLogo, alturaLogo);
                            y += alturaLogo + 20 + espacamentoExtra;
                            desenharRodape();
                        }
                        logo.src = event.target.result;
                    }
                    reader.readAsDataURL(file);
                } else {
                    y += 20;
                    desenharRodape();
                }
                function desenharRodape() {
                    const nomeSorteio = abrevFoto + ' ' + bairroFoto + ' - ' + cidadeFoto;
                    ctx.font = '28px Arial'; ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.fillText(nomeSorteio, centroX, y + 28);
                    mostrarPreview(canvas); // 6. MOSTRA PREVIEW
                }
            }
        confirme.click(); // já inicia o processo
        }
    }
}

// MOSTRA A IMAGEM NO MODAL ANTES DE BAIXAR
function mostrarPreview(canvas) {
    document.getElementById('butImagem').style.display = 'none';
    document.getElementById('radioLarguraImg').style.display = 'none';
    document.getElementById('butSemImagem').style.display = 'none';
    confirme.classList.remove('imagemCarregada');
    confirme.classList.remove('botaoAlerta');
    const imgPreview = canvas.toDataURL('image/png');

    cabecario.innerHTML = `<span style='float:left'>👁️</span> ${previsualizar}`;
    modal.innerHTML = `<p>${confere}</p><img src="${imgPreview}" style="max-width:100%; height:auto; border:2px solid #4446ad; border-radius:10px; margin:10px 0;">`;
    confirme.innerHTML = `✅ ${but_baixarImagem}`;
    confirme.style.display = 'inline-block';
    confirme.onclick = () => baixarImagem(canvas);

    let btnCancelar = document.getElementById('btnCancelarPreview');
    if(!btnCancelar){
        btnCancelar = document.createElement('button');
        btnCancelar.id = 'btnCancelarPreview';
        btnCancelar.style.marginLeft = '10px';
        confirme.parentNode.appendChild(btnCancelar);
    }
    btnCancelar.style.display = 'inline-block';
    btnCancelar.onclick = fechar;
}

// SÓ BAIXA QUANDO CLICAR
function baixarImagem(canvas) {
    const link = document.createElement('a');
    link.download = `🏆 marca-pagina-${ultimoGanhador.replace(/\s/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png', 0.9); // 0.9 = qualidade jpeg
    link.click();
    fechar();
    document.getElementById('btnCancelarPreview').style.display = 'none';
}

// FUNÇÃO QUE MEDE E QUEBRA TEXTO
function quebraTextoMedir(ctx, texto, maxWidth, lineHeight){
  const palavras = texto.split(' ');
  const linhas = [];
  let linhaAtual = '';
  for(let i = 0; i < palavras.length; i++){
    const testeLinha = linhaAtual + palavras[i] + ' ';
    if(ctx.measureText(testeLinha).width > maxWidth && i > 0){
      linhas.push(linhaAtual.trim()); linhaAtual = palavras[i] + ' ';
    } else { linhaAtual = testeLinha; }
  }
  linhas.push(linhaAtual.trim());
  return { totalLinhas: linhas.length, alturaTotal: linhas.length * lineHeight };
}

// FUNÇÃO QUE DESENHA O TEXTO QUEBRADO
function quebraTexto(ctx, texto, x, y, maxWidth, lineHeight){
  const palavras = texto.split(' ');
  let linhaAtual = ''; let linhaY = y;
  for(let i = 0; i < palavras.length; i++){
    const testeLinha = linhaAtual + palavras[i] + ' ';
    if(ctx.measureText(testeLinha).width > maxWidth && i > 0){
      ctx.fillText(linhaAtual.trim(), x, linhaY); linhaAtual = palavras[i] + ' '; linhaY += lineHeight;
    } else { linhaAtual = testeLinha; }
  }
  ctx.fillText(linhaAtual.trim(), x, linhaY);
}

// FUNCAO QUE FORMATA O NOME NA LISTA DE CADASTRADOS
function formatarNome(nome) {
    return nome.toLowerCase().split(' ').map(palavra => {
        if (palavra.length === 0) return palavra;
        const excecoes = ['de', 'da', 'do', 'das', 'dos', 'e','del', 'los', 'las','las', 'van', 'von', 'of', 'lo', 'la', 'di'];
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
        // Maximo 2000 numeros.
        mostrarErro(`⚠️ ${erroNum}`);
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
        // Número inválido.
        mostrarErro(`⚠️ ${erroNum2}`);
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
        mostrarErro(`⚠️  Inválidos: ${invalidos.join(', ')}`);
        return;
    }
    if (novosNumeros.length === 0) {
        // Todos os números já estão na lista.
        mostrarErro(`⚠️ ${erroNum3}`);
        return;
    }
    let msg = '';
    msg +=`<br>${confirma}<br>`;
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
            msg += `<br>${numeroAdicionado}<br><br><span class='input-numeros2'>${novosNumeros.join()}</span><br>`;
        }else{
            if(idiomaAtual === 'en'){
                 msg += `<br>${novosNumeros.length} ${numeroAdicionado2}<br> <input type='text' class='input-numeros2' value='${novosNumeros.join(', ')}'>`;
            }else{
            // Se não houve duplicados, e novosNumeros tem mais de um numero, mostra a informacao por aqui
                msg += `<br>${numeroAdicionado2} ${novosNumeros.length} ${numeroAdicionado3}<br><input type='text' class='input-numeros2' value='${novosNumeros.join(', ')}'>`;
            }
        }
    }
    if (duplicados.length > 0) {
        if (duplicados.length === 1) {
            msg += `<br><br>${numeroAdicionado4}<br><br><span class='input-numeros2'>${duplicados.join()}</span><br><br>${numeroAdicionado5}`;
        }else{
            msg += `<br><br>${numeroAdicionado6}<input type='text' class='input-numeros2' value='${duplicados.join(', ')}'><br>${numeroAdicionado7}`;
        }
    }
    cabecario.innerHTML = `<span style='float:left'>🎱</span> ${cabecarioAddNumero}`;
    confirme.style.display = 'block';
    confirme.innerText = `✅ ${confirmar}`;
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
         // Digite algum número.
        mostrarErro(`⚠️ ${erroNum}`);
        return;
    }
    const virgulas = (valor.match(/,/g) || []).length;
    if (virgulas > 1) {
        // Só pode ter 1 vírgula. Ex: 10,30
        mostrarErro(`⚠️ ${erroNumSequencia2}`);
        return;
    }
    let numerosGerados = [];
    if (valor.includes(',')) {
        const partes = valor.split(',').map(p => parseInt(p.trim()));
        if (partes.length!== 2 || isNaN(partes[0]) || isNaN(partes[1])) {
            // Formato inválido. Digite como no Exemplo: 10,30
            mostrarErro(`⚠️ ${erroNumSequencia3}`);
            return;
        }
        const [inicio, fim] = partes;
        const intervaloTotal = fim - inicio + 1;
        if (inicio >= fim) {
            // Primeiro número deve ser menor que o segundo.
            mostrarErro(`⚠️ ${erroNumSequencia4}`);
            return;
        }
        
        if (fim - inicio > 2000) {
            // Intervalo demasiado grande. Maximo 2000 numeros.
            mostrarErro(`⚠️ ${erroNumSequencia5} ${erroNumSequencia6}`);
            return;
        }
        
        // Maximo 2000 numeros.
        if (intervaloTotal  > 2000) {
            mostrarErro(`⚠️ ${erroNumSequencia6}`);
            return;
        }

        if (inicio < 1) {
            // Digite algum número.
            mostrarErro(`⚠️ ${erroNum}`);
            return;
        }
        for (let i = inicio; i <= fim; i++) {
            numerosGerados.push(i.toString());
        }
    } else {
        const maximo = parseInt(valor);
        if (isNaN(maximo) || maximo < 1) {
             // Digite algum número.
            mostrarErro(`⚠️ ${erroNum}`);
            return;
        }
        if (maximo > 2000) {
            // Maximo 2000 numeros.
            mostrarErro(`⚠️ ${erroNumSequencia6}`);
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
        mostrarErro(`⚠️ ${erroNum3}`);
        inputNumeros.value = '';
        return;
    }
    let msg = '';
    msg += `<br>${gerarNumSequencia}`;
    if( novosNumeros.length === 1){
        msg += `<br><br>${gerarNumSequencia3}<br><br><span class='input-numeros2'>${novosNumeros}</span><br><br>`;
    }else{
        msg += `<br><br>${gerarNumSequencia4} ${novosNumeros.length} ${numeroAdicionado3}<br><input type='text' class='input-numeros2' value='${novosNumeros}'><br><br>`;
    }
    if (duplicados.length > 0) {
         if (duplicados.length === 1){
            msg += `${duplicados.length} ${numeroAdicionado5}<br><br><span class='input-numeros2'>${duplicados.join(', ')}</span>`;
         }else{
            msg += `${duplicados.length} ${numeroAdicionado7}<br><input type='text' class='input-numeros2' value='${duplicados.join(', ')}'>`;
         }
    }
    cabecario.innerHTML =`<span style='float:left'>🎱</span> ${cabecarioNumSequencia}`;
    confirme.style.display = 'block';
    confirme.innerText = `✅ ${confirmar}`;
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
    document.getElementById('butImagem').style.display = 'none';
    document.getElementById('radioLarguraImg').style.display = 'none';
    document.getElementById('butSemImagem').style.display = 'none';
    const form = document.getElementById('modalHistorico');
    const formCredito = document.getElementById('credito');
    const formulario = document.getElementById('formulario');
    const muteSel = document.getElementById('muteSel');   
    confirme.style.color = '#4446ad';
    confirme.style.borderColor = '#4b44ad';
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
            document.getElementById('imgSalva').style.display = 'none';
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
        travaInput(input, `⚠️ ${travaInputNum}`);
        return false;
    }
});

// FORMATA O CAMPO GERAR SEQUENCIA DE NUMEROS, 2/2
function limitarVirgula(input){
    // Nao aceita iniciar com zero ou virgula
    if(input.value.length === 1 && (input.value === '0' ||  input.value === ',' ||  input.value === ' ') ){
        travaInput(input, `⚠️ ${travaInputNum2}`);
        input.value = '';
        return false;
    }
    // So deixa passar se for numero ou virgula
    input.addEventListener('beforeinput', e => {
         if(e.data && !/^[0-9,]$/.test(e.data)){
            travaInput(input, `⚠️ ${travaInputNum3}`);
            return false;
        }
    })
    // segunda validacao apenas numeros e virgula no campo
    let valor = input.value.replace(/[^0-9,]/g, '');
    // inicio para inpedir digitar a virgula duas vezes no campo
    let partes = valor.split(',');
    if(partes.length > 2){
        valor = partes[0]+ ',' +partes.slice(1).join('');
        travaInput(input, `⚠️ ${travaInputNum5}`);
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
            travaInput(input, `⚠️ ${ultimoNumero} já existe.`);
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
        travaInput(input, `⚠️ ${travaInputNum2}`);
        return false;
    }
    // So numeros ou virgula
    if(!/^[0-9,]$/.test(tecla)){
        e.preventDefault();
        travaInput(input, `⚠️ ${travaInputNum3}`);
        return false;
    }
    // Trava o teclado se for digitado zero logo apos a virgula
    if(tecla === '0' && /,\s*$/.test(antesCursor)){
        e.preventDefault();
        travaInput(input, `⚠️ ${travaInputNum}`);
        return false; 
    }
    // Trava o teclado se for digitado duas vírgulas seguidas, 
    // pede para digitar um numero antes da proxima virgula
    if(tecla === ','){
        const blocos = antesCursor.split(',');
        const ultimoBloco = blocos[blocos.length - 1].replace(/\D/g, '');
        if(ultimoBloco.length === 0){
            e.preventDefault();
            travaInput(input, `⚠️ ${travaInputNum4}`);
            return false;
        }
    }
    // Trava o teclado no quinto numero e pede pra digitar a virgula para continuar
    if(/^[0-9]$/.test(tecla)){
        const blocos = antesCursor.split(',');
        const ultimoBloco = blocos[blocos.length - 1].replace(/\D/g, '');
        if(ultimoBloco.length >=5){
            e.preventDefault();
            travaInput(input, `⚠️ ${travaInputNum6}`);
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

// FUNCAO QUE VALIDA O SSN SE O IDIOMA ESTIVER EM INGLES
function validarSSN(ssn) {
  ssn = ssn.replace(/\D/g, '');
  if (ssn.length!== 9) return false;
  // Regras básicas do SSN
  let area = ssn.slice(0,3);
  let grupo = ssn.slice(3,5);
  let serie = ssn.slice(5,9);

  if(area === "000" || area === 666 || parseInt(area) >= 900) return false;
  if(grupo ==="00") return false;
  if(serie === "0000") return false;
  if(/^(\d)\1{8}$/.test(ssn)) return false;
  if (/^000|^666|^9/.test(ssn)) return false; // não pode começar assim
  return true;
}

// const com o padrao NIF espanhol, que é usada para validar adicionar automaticamente a letra do NIF
const LETRASNIF = "TRWAGMYFPDXBNJZSQVHLCKE";

// FUNCAO QUE VALIDA O NIF SE O IDIOMA ESTIVER EM ESPANHOL
function validarNIF(nif) {
    // variavel com as litras no padrao NIF ES
    let numNIF = nif.slice(0,8);
    let letraDigitada = nif[8];

    if(!/^\d{8}$/.test(numNIF)) return false;

    let resto = 0;
    for(let i = 0; i < numNIF.length; i++){
        resto = (resto * 10 + parseInt(numNIF[i], 10)) % 23;
    }

    //let LetraCorreta = LETRASNIF[resto];
    return letraDigitada === LETRASNIF[resto];

}

// Funcao que calcula a letra do NIF
function calcularLetra(numNIF){
    let resto = 0;
   for(let i = 0; i < numNIF.length; i++){
        resto = (resto * 10 + parseInt(numNIF[i], 10)) % 23;
    }
    return LETRASNIF[resto];
}

// FUNCAO QUE VALIDA O CPF SE O IDIOMA ESTIVER EM PORTUGUES
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

// AO CLICAR NO CAMPO DE CADASTRO DE NUMEROS E CPF, SSN E NIF, LIMPA O CAMPO DE CADASTRO DE NOMES
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

// FORMATA O CAMPO QUE ADICIONA NUMEROS E VALIDA SSN, NIF E CPF PARA A LISTA DE CADASTRADOS
inputNumero.addEventListener('input', function(e) {
    
    if(idiomaAtual === 'pt'){
        if(!/^\d+$/.test(inputNumero.value)){
            // Mostra a mensagem de erro de CPF invalido
            travaInput(inputNumero, `⚠️ ${travaInputNum7}`);
        }
        // Impede digitar letras no campo, apenas numeros
        inputNumero.value = inputNumero.value.replace(/[^0-9\s]/g, '');
    }

    // valida o campo NIF quando a linguagem for espanhol
    if(idiomaAtual === 'es'){
        let numeros = inputNumero.value.replace(/[^0-9\s]/g, '');
        // transforma a letra para maiuscula
        let valorNIF = e.target.value.toUpperCase();
        let primeiros8 = valorNIF.slice(0, 8);
        let nono = valorNIF[8] || "";

        if(/[A-Z]/.test(primeiros8)){
             travaInput(inputNumero, `⚠️ Apenas numeros nos primeiros 8 caracteres`);
        }
        if(/\d/.test(nono)){
             travaInput(inputNumero, `⚠️ Apenas letras nesse ultimo caractere`);
        }
        // impede digitar letras nos primeiros 8 digitos
        let numerosNIF = valorNIF.slice(0,8).replace(/\D/g, '');
       
     
        // impede digitar numero no ultimo digito
        let letraNIF =  valorNIF.slice(8,9).replace(/[^A-Z]/g, '');
        // pega o valor completo para verificar
        inputNumero.value = numerosNIF + letraNIF;

        // Chama a funcao, calcula e mostra a letra automaticamente 
        // caso nao queira qua a letra apoareca, so comentar o bloco de codigo abaixo
        
        let checkNIF = document.getElementById('checkNIF');
        if(checkNIF.checked === true){
            if(numeros.length === 8){
                let letraCerta = calcularLetra(numeros);
                valorNIF = numeros + letraCerta;
                e.target.value = valorNIF;
            }
        }
        
    }

     
    // Esconde o botao CAD se digitar mais de 5 numeros
    if(inputNumero.value.length > 5){
    document.getElementById('cadastrarNumero').style.visibility = 'hidden';
    inputNumero.classList.remove('cpf-ok');
    // Envia a mensagem para continuar digitando o CPF, mesmo sem o botao CAD
    mostrarErro(`⚠️ ${erroCPF}`);
    }else{
        document.getElementById('cadastrarNumero').style.visibility = 'visible';
    }

    // AQUI COMECA A VALIDAR OS DOCUMENTOS SSN NIF E CPF
   
    // ***** SSN
    if(inputNumero.value.length === 9 && idiomaAtual === 'en'){
        if (validarSSN(inputNumero.value)) {
            mostrarErro(`✅ ${erroCPF2}`); 
                document.getElementById('cadastrarNumero').style.visibility = 'visible';
                inputNumero.classList.add('cpf-ok');
        } else {
            inputNumero.classList.remove('cpf-ok');
            document.getElementById('cadastrarNumero').style.visibility = 'hidden';
            travaInput(inputNumero, `⚠️ ${erroCPF3}`);
        } 
    
    // ***** NIF
    }else if(inputNumero.value.length === 9 && idiomaAtual === 'es'){
        if (validarNIF(inputNumero.value)) {
            mostrarErro(`✅ ${erroCPF2}`); 
                document.getElementById('cadastrarNumero').style.visibility = 'visible';
                inputNumero.classList.add('cpf-ok');
        } else {
            inputNumero.classList.remove('cpf-ok');
            document.getElementById('cadastrarNumero').style.visibility = 'hidden';
            travaInput(inputNumero, `⚠️ ${erroCPF3}`);
        }  
    
    // ***** CPF
    }else  if(inputNumero.value.length === 11 && idiomaAtual === 'pt'){
        // Quando chega a 11 numeros digitados, valida automaticamente o CPF digitado para liberar o botao CAD
        if (validarCPF(inputNumero.value)) { 
            mostrarErro(`✅ ${erroCPF2}`); 
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
            travaInput(inputNumero, `⚠️ ${erroCPF3}`);
        }  
    }
    // Impede digitar espaco no campo, apenas numeros
    inputNumero.value = inputNumero.value.replace(/\s{1,}/g, '');
});

// CHAMA A FUNCAO 'ADICIONARCADASTRADO()', AO DAR ENTER NO CADASTRO DE NOMES
inputCadastrado.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if(inputCadastrado.value === '') {
            travaInput(inputCadastrado, `⚠️ ${travaInputNome}`);
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
        if(num.length < 11 && idiomaAtual === 'pt'){
            // Retira os zeros a esquerda dos numeros que nao sao CPF
            num = num.replace(/^0+/, '');
            if(!num){
                inputNumero.value = '';
                mostrarErro(`⚠️ ${erroNum2}`);
            }
        }
        // Variavel 'nome' recebe o valor numerico enviado
        nome = num;  
    };
    // Nao permite cadastrar uma sequecia de mais de 5 numeros que nao seja um CPF
    // Se 'nome' contiver apenas numeros, e se tem entre 6 e 10 numeros, entra aqui
    if((/^\d+$/.test(nome)) && idiomaAtual === 'pt' && nome.length >5 && nome.length < 11){
        // Retorna falso e envia a mensagem
        mostrarErro(`⚠️ ${erroNum2}`);
        return;
    }
    // Desabilita o botao Enter se clicar nele, com o campo em branco
    if (nome === '') return;
    nome = formatarNome(nome);
    // Pesquisa o nome no array cadastrados, se encontrar um nome igual, 
    // atribui o nome para variavel jaExiste
    const jaExiste = cadastrados.find(n => n.toLowerCase() === nome.toLowerCase());
    if (jaExiste) {
        if(idiomaAtual === 'pt'){
            // Se jaExiste tiver 11 caracteres entra aqui
            if(jaExiste.length === 11){
                // Verifica se tem apenas numeros na variavel jaExiste
                if(/^\d+$/.test(jaExiste)) {
                    travaInput(document.getElementById('inputNumero'), `⚠️ ${nomeCadastrado}`);
                    return;
                // Se tem 11 caracteres porem tem letras, entra aqui
                }else{
                    travaInput(document.getElementById('inputCadastrado'), `⚠️ ${nomeCadastrado}`);
                    return;
                }
            // Se tem mais ou menos de 11 caracteres, entra aqui
            }else{
                // Se tem somente numeros entra aqui
                if(/^\d+$/.test(jaExiste)) {
                    travaInput(document.getElementById('inputNumero'), `⚠️ ${nomeCadastrado}`);
                    return;
                // Se tem letras, entra aqui
                }else{
                    travaInput(document.getElementById('inputCadastrado'), `⚠️ ${nomeCadastrado}`);
                    return;
                }  
            } 
        }else if(idiomaAtual === 'en'){
             if(jaExiste.length === 9){
                travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" This name is already registered.`);
                return;
            // Se tem mais ou menos de 11 caracteres, entra aqui
            }else{
                // Se tem somente numeros entra aqui
                if(/^\d+$/.test(jaExiste)) {
                    travaInput(document.getElementById('inputNumero'), `⚠️ "${nome}" This number is already registered.`);
                    return;
                // Se tem letras, entra aqui
                }else{
                    travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" This name is already registered.`);
                    return;
                }  
            } 
        }else{
             if(jaExiste.length === 9){
                // Verifica se tem apenas numeros na variavel jaExiste
                if(/^\d+$/.test(jaExiste)) {
                    travaInput(document.getElementById('inputNumero'), `⚠️ "${nome}" Este NIF ya está registrado.`);
                    return;
                // Se tem 11 caracteres porem tem letras, entra aqui
                }else{
                    travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" Este nombre ya está registrado.`);
                    return;
                }
            // Se tem mais ou menos de 11 caracteres, entra aqui
            }else{
                // Se tem somente numeros entra aqui
                if(/^\d+$/.test(jaExiste)) {
                    travaInput(document.getElementById('inputNumero'), `⚠️ "${nome}" Este número ya está registrado.`);
                    return;
                // Se tem letras, entra aqui
                }else{
                    travaInput(document.getElementById('inputCadastrado'), `⚠️ "${nome}" Este nombre ya está registrado.`);
                    return;
                }  
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
        travaInput(inputPesq,`⚠️ ${travaInputBusca}"${termo}"`);
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
    mostrarErro(`✅ ${nomesParaImportar.length} ${erroNomeImportado}`);
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
    mostrarErro(`✅ ${erroListaRetornada}`);
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
        if(idiomaAtual === 'pt' && `${snapshot.length} > 0`){
            btnImportar.title="Retorna lista anterior";
        }else if(idiomaAtual === 'en' && `${snapshot.length} > 0`){
            btnImportar.title="Returns to the previous list";
        }else if(idiomaAtual === 'es' && `${snapshot.length} > 0`){
            btnImportar.title="Regresa a la lista anterior";
        }
        btnImportar.classList.add('retornar');
        return;
    }
    // Modo IMPORTAR
    const disponiveis = cadastrados.filter(nome =>!nomes.includes(nome));
    if(disponiveis.length === 0 || cadastrados.length === 0){
        btnImportar.disabled = true;
        if(idiomaAtual === 'pt'){
            btnImportar.innerHTML = '📥 Nada'; 
        }else if(idiomaAtual === 'en'){
            btnImportar.innerHTML = '📥 Nothing'; 
        }else{
            btnImportar.innerHTML = '📥 Nada'; 
        }
        btnImportar.title="Nada para Importar"; 
    }else{
        btnImportar.disabled = false;
        btnImportar.innerHTML = `<span style="position:relative;top:-3px"> 📥 </span>Imp (<span style="color:White"> ${disponiveis.length} </span> )`;
        btnImportar.classList.remove('retornar');
        btnImportar.classList.add('btn-limpar-tudo');
        if(idiomaAtual === 'pt'){
            btnImportar.title="Importar lista completa"; 
        }else if(idiomaAtual === 'en'){
            btnImportar.title="Import full list"; 
        }else if(idiomaAtual === 'es'){
            btnImportar.title="Importar lista completa"; 
        }
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
    mostrarErro(`✅ ${exportList} ${cadastrados.length} ${cadastroList} + ${Object.keys(dadosCompletos.presets).length} presets`);
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
                cabecario.innerHTML = `<span style='float:left'>📥</span> ${cabecarioImportarTudo}`;
                if(idiomaAtual === 'en'){
                    let dataModificada = `${dados.dataExportacao}`;
                    let [data, hora] = dataModificada.split(', ');
                    let [dia, mes, ano] = data.split('/');
                    let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
                    dataModificada = dataOblj.toLocaleString('en-US');              
                   // modal.innerHTML = `⚠️ ${atencao}<br><br>This will overwrite everything.<br><br>Exporting in: ${dataModificada}<br><br>Registered: ${dados.cadastrados?.length || 0}<br><br>Presets: ${Object.keys(dados.presets).join(', ') || 'none'}<br><br>${confirma}`;
                    modal.innerHTML = `⚠️ ${atencao}<br><br>This will overwrite everything.<br><br>Exporting in: ${dataModificada}<br><br>Registered: ${dados.cadastrados?.length || 0}<br><br>Presets: ${Object.keys(dados.presets).length || 'none.'}<br><br>${confirma}`;
                }else{
                    modal.innerHTML = `⚠️ ${atencao}<br><br>${subscrever}${dados.dataExportacao}<br><br>${cadastroList2} ${dados.cadastrados?.length || 0}<br><br>Presets: ${Object.keys(dados.presets).length || nenhum}<br><br>${confirma}`;
                }
                confirme.innerText = `✅ ${confirmar}`;
                confirme.style.display = 'block';
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
                    mostrarErro(`✅ ${erroImportar}`);
                    setTimeout(() => location.reload(), 1500);
                };
            } catch (err) {
                mostrarErro(`⚠️ ${erroImportar2}`);
            }
        };
        reader.readAsText(arquivo);
    };
    input.click();
}

// FUNCAO RESPONSAVEL PARA EXCLUIR O NOME CADASTRADO
function deletarCadastro(index) {
    const nome = cadastrados[index];
    cabecario.innerHTML =`<span style='float:left'>🗑️</span> ${cabecarioExcluirCadastro}`;
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${excluirNome}<br><br><span style='color:darkred;font-size:20px;'><b>${nome}</b></span><br><br>${excluirNomeSorteio}`;
    confirme.innerHTML = `<img class='eraser' src='eraser.png'> &nbsp&nbsp&nbsp ${confirmar}`;
    confirme.style.display = 'block';
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
        if(idiomaAtual === 'pt'){
            mostrarErro(`⚠️ ${nome} já está participando.`); 
        }else if(idiomaAtual === 'en'){
            mostrarErro(`⚠️ ${nome} is already participating.`);
        }else{
            mostrarErro(`⚠️ ${nome} ya está participando.`);
        }
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

// FUNCAO QUE ATUALIZA A CONTAGEM NO RODAPE NA LISTA DE CADASTRADOS
function atualizarContadorCadastrados() {
    if(idiomaAtual === 'pt'){
        contarCadastrados.textContent = `${cadastrados.length} nomes | ${cadastrados.length - nomes.length} disponíveis`;
    }else if(idiomaAtual === 'en'){
        contarCadastrados.textContent = `${cadastrados.length} names | ${cadastrados.length - nomes.length} available`;
    }else{
        contarCadastrados.textContent = `${cadastrados.length} nombres | ${cadastrados.length - nomes.length} disponible`;
    }
}

// Funcao que atualiza o contador da Lista de Espera
function atualizarContadorEspera() {
    if(idiomaAtual === 'pt'){
        document.getElementById('contador').textContent = `${listaEspera.length} nomes`;
    }else if(idiomaAtual === 'en'){
        document.getElementById('contador').textContent = `${listaEspera.length} names`; 
    }else{
         document.getElementById('contador').textContent = `${listaEspera.length} nombres`;
    }  
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
    let dispon = '';
    let sorte = '';
    if(idiomaAtual === 'pt'){
        dispon = 'disponíveis';
        sorte = 'sorteados';
    }else if(idiomaAtual === 'en'){
        dispon = 'available'; 
        sorte = 'drawn';
    }else{
        dispon = 'disponibles'; 
        sorte = 'sorteados';
    }
    let texto = `${disponiveis.length} ${dispon}`;
    if (nomesSorteados.length > 0) texto += ` | ${nomesSorteados.length} ${sorte}`;
    contador.textContent = texto;
    if (disponiveis.length === 0 && nomesSorteados.length > 0) {
        btnSortear.disabled = true;
        if(idiomaAtual === 'pt'){
            btnSortear.textContent = '⚠️ LISTA ZERADA';
        }else  if(idiomaAtual === 'en'){
            btnSortear.textContent = '⚠️ CLEARED LIST';
        }else{
            btnSortear.textContent = '⚠️ LISTA DEPURADA';
        }
        avisoFim.classList.add('mostrar');
    } else if (disponiveis.length === 0) {
        btnSortear.disabled = true;
        if(idiomaAtual === 'pt'){
            btnSortear.textContent = '⚠️ SEM NOMES';
        }else  if(idiomaAtual === 'en'){
             btnSortear.textContent = '⚠️ NO NAMES';
        }else{
             btnSortear.textContent = '⚠️ SIN NOMBRES';
        }
        avisoFim.classList.remove('mostrar');
    } else {
        btnSortear.disabled = false;
        if(idiomaAtual === 'pt'){
            btnSortear.textContent = '🎲 SORTEAR';
        }else if(idiomaAtual === 'en'){
            btnSortear.textContent = '🎲 DRAW';
        }else{
            btnSortear.textContent = '🎲 SUERTE';
        }
        avisoFim.classList.remove('mostrar');
    }
}

// FUNCAO RESPONSAVEL PELO MODAL QUE INICIA O SORTEIO
function abrirSorteio() {
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    if (disponiveis.length === 0) return;
    overlaySorteio.classList.add('mostrar');
    if(idiomaAtual === 'pt'){
         nomeSorteadoOverlay.textContent = 'TUDO PRONTO';
    }else if(idiomaAtual === 'en'){
         nomeSorteadoOverlay.textContent = 'ALL SET';
    }else{
         nomeSorteadoOverlay.textContent = 'TODO LISTO';
    }
    nomeSorteadoOverlay.classList.remove('ganhador');
    barraProgressoOverlay.classList.remove('mostrar');
    atualizarStatusOverlay();
    btnProximo.disabled = false;
}

// FUNCAO QUE FECHA O MODAL DO SORTEIO E VOLTA PARA A TELA PRINCIPAL
function fecharSorteio() {
    overlaySorteio.classList.add('sair');
    sorteando = false;
    setTimeout(() => {
        overlaySorteio.classList.remove('mostrar');
        overlaySorteio.classList.remove('sair');
    }, 300);
}

// MOSTRA O ESTATUS DO SORTEIO NO MODAL DO SORTEIO, ABAIXO DOS BOTOES
function atualizarStatusOverlay() {
    const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
    if(idiomaAtual === 'pt'){
        statusOverlay.textContent = `${disponiveis.length} restantes | ${nomesSorteados.length} sorteados`;
    }else if(idiomaAtual === 'en'){
        statusOverlay.textContent = `${disponiveis.length} remaining | ${nomesSorteados.length} drawn`;
    }else{
        statusOverlay.textContent = `${disponiveis.length} restantes | ${nomesSorteados.length} sorteados`;
    }
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
                <button onclick="voltarDoEspera(${i})" class="btn-pausar" style="margin:0;">↻</button>
                <button onclick="excluirDaEspera(${i})" class="btn-deletar" >❌</button>
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
        if(idiomaAtual === 'en'){
            document.getElementById('tituloLista').innerText = 'Participant List :';
        }else{
            document.getElementById('tituloLista').innerText = 'Lista de Participantes :'; 
        }
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
        if(idiomaAtual === 'pt'){
            nomeSorteadoOverlay.textContent = '⚠️ LISTA ZERADA';
        }else if(idiomaAtual === 'en'){
            nomeSorteadoOverlay.textContent = '⚠️ LIST CLEARED';
        }else{
            nomeSorteadoOverlay.textContent = '⚠️ LISTA VACÍA';
        }
        nomeSorteadoOverlay.classList.remove('ganhador');
        statusOverlay.textContent = `${msgTodosSorteados}`;
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
        if(idiomaAtual === 'pt'){
            vazio.textContent = 'Clique nos nomes cadastrados ao lado';
        }else if(idiomaAtual === 'en'){
            vazio.textContent = 'Click on the registered names on the side';
        }else{
            vazio.textContent = 'Haz clic en los nombres registrados que aparecen a un lado';
        }
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
            let colocacao = ordem;
            let sufixo = getSufixoIngles(colocacao);
            if(idiomaAtual === 'en'){
                spanNome.innerHTML = `<span class='conta-participante'>${(index+1)}</span>&nbsp&nbsp&nbsp&nbsp${nome}&nbsp&nbsp&nbsp${ordem}${sufixo}`;
            }else{
                spanNome.innerHTML = `<span class='conta-participante'>${(index+1)}</span>&nbsp&nbsp&nbsp&nbsp${nome}&nbsp&nbsp&nbsp${ordem}º`;
            };
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
    if(idiomaAtual === 'en'){
        document.getElementById('tituloLista').innerText = 'Waitlist:';
    }else{
        document.getElementById('tituloLista').innerText = 'Lista de Espera:';
    } 
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
    if(idiomaAtual === 'en'){
        document.getElementById('tituloLista').innerText = 'List of Participants:';
    }else{
        document.getElementById('tituloLista').innerText = 'Lista de Participantes:';
    }
    document.getElementById('butSearch').style.visibility = 'visible';
    document.getElementById('butSearch').style.opacity = '1';
    renderizarLista();
    atualizarContador();   
}

// FUNCAO RESPONSAVEL PARA LIMPAR TUDO DA LISTA DE PARTICIPANTES
function limparTudo() {
    if(nomes.length === 0 && listaEspera.length === 0){
        mostrarErro(`⚠️ ${erroLimpaTudo}`);
        return;
    }
    cabecario.innerHTML =`<span style='float:left'>🗑️</span> ${cabecarioLimparTudo}`;
    confirme.innerHTML = `<img class='eraser' src='eraser.png'> &nbsp&nbsp&nbsp ${confirmar}`;
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modalLimparTudo}`;
    confirme.style.display = 'block';
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
        cabecario.innerHTML =`<span style='float:left'>🗑️</span> ${cabecarioLimparCadastrados}`;
        confirme.innerHTML = `<img class='eraser' src='eraser.png'> &nbsp&nbsp&nbsp ${confirmar}`;
        modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modalLimparCadastrados}`;
        confirme.style.display = 'block';
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
        mostrarErro(`⚠️ ${erroImportarHist}`);
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
    cabecario.innerHTML =`<span style='float:left'>🔄</span> ${cabecarioReportar}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modalReportar} <b><span style='color: #0655aa;'>${presete}</span></b> ${modalReportar2}`;
    confirme.style.display = 'block';
    modalHistorico();
    confirme.onclick = () => {     
    if(jaSorteouAlguem){
        const dataHora = new Date().toLocaleString('pt-BR');
        const naoSorteados = nomes.filter(n => !nomesSorteados.includes(n));
        const sessao = {
            id: Date.now().toString(),
            preset: presetAtual,
            data: dataHora,
            ganhadores: historicoAtual.map(h => `${h.nome} ${h.ordem}`),
            participantes: naoSorteados
        }; 
        const chaveSessoes = PRESETS[presetAtual].sessoes;
        let sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
        sessoes.unshift(sessao);
        localStorage.setItem(chaveSessoes, JSON.stringify(sessoes));
       }
        document.getElementById('limpaTodosPresets').classList.remove('desativado');
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
        mostrarErro('⚠️ Não há nada para reiniciar.');
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
    cabecario.innerHTML =`<span style='float:left'>🔄</span> ${cabecarioReiniciar}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modalReiniciar} <b><span style='color: #0655aa;'>${presete}</span></b><br><br>${modalReiniciar2}`;
    confirme.style.display = 'block';
    modalHistorico();
    confirme.onclick = () => {
        if(jaSorteouAlguem){
            const dataHora = new Date().toLocaleString('pt-BR');
            const naoSorteados = nomes.filter(n => !nomesSorteados.includes(n));
            const sessao = {
                id: Date.now().toString(),
                preset: presetAtual,
                data: dataHora,
                ganhadores: historico.map(h => `${h.nome} ${h.ordem}`),
                participantes: naoSorteados
            };        
            const chaveSessoes = PRESETS[presetAtual].sessoes;
            let sessoes = JSON.parse(localStorage.getItem(chaveSessoes) || '[]');
            sessoes.unshift(sessao);
            localStorage.setItem(chaveSessoes, JSON.stringify(sessoes));
        }      
        
        document.getElementById('limpaTodosPresets').classList.remove('desativado');
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

// Funcao que muda o sufixo para st nd rd th no ordem em ingles
function getSufixoIngles(input, ordem = null) {
    let numero;
    if (ordem!== null){
        numero = parseInt(ordem, 10);
    }else{
        const match = String(input).match(/(\d+)$/);
        if(!match)return '';
        numero = parseInt(match[1], 10);
    }

    const v = numero % 100; // pega os 2 últimos dígitos
    // Exceção: 11, 12, 13 sempre th
    if (v >= 11 && v <= 13) {
        return 'ᵗʰ';
    }
    
    // Senão olha só o último dígito
    const ultimo = numero % 10;
    if (ultimo === 1) return 'ˢᵗ';
    if (ultimo === 2) return 'ⁿᵈ';
    if (ultimo === 3) return 'ʳᵈ';
    return 'ᵗʰ';
}

// FUNCAO RESPONSAVEL PARA EXPORTAR TODO O HISTORICO PERMANENTE PARA O FORMATO TXT
function exportarPermanente(){
    const igrejaSalva = localStorage.getItem('nomeIgreja');
    const cidadeSalva = localStorage.getItem('nomeCidade');
    cabecario.innerHTML =`<span style='float:left'>📄</span> ${cabecarioExportPermanente}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${confirma}<br><br>${modalExportPermanente}`;
    confirme.style.display = 'block';
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
            mostrarErro(`⚠️ Histórico ${presete} ${vazio}`);
            return;
        }
        if(idiomaAtual === 'pt'){
            const dataExport = new Date().toLocaleString('pt-BR');
            let texto = `═══════════════════════════════════════\n`;
            texto += `RELATÓRIO HISTÓRICO GERAL:\n`;
            texto += `═══════════════════════════════════════\n`;
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
                        texto += `🏆 ${g}º\n`;
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
             const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `sorteio_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }else if(idiomaAtual === 'en'){
            const dataExport = new Date().toLocaleString('en-US');
            let dataModificada = `${dataInicio}`;
            let [data, hora] = dataModificada.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada = dataOblj.toLocaleString('en-US');
            let texto = `═══════════════════════════════════════\n`;
            texto += `GENERAL HISTORY REPORT:\n`;
            texto += `═══════════════════════════════════════\n`;
            texto += `DRAW:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            texto += `───────────────────────────────────────\nREPORT:\n`;
            texto += `Draw date: ${dataModificada}\n`;
            texto += `Exported on: ${dataExport}\n`;
            texto += `───────────────────────────────────────\n`;
            texto += `SUMMARY:\n`;
            texto += `History - ${presete} - Total: ${sessoes.length} sessions\n`;
            texto += `═══════════════════════════════════════\n\n`;
            sessoes.forEach((sessao, index) => {
                let dataModificada2 = `${sessao.data}`;
                let [data, hora] = dataModificada2.split(', ');
                let [dia, mes, ano] = data.split('/');
                let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
                dataModificada2 = dataOblj.toLocaleString('en-US');
                texto += `Draw - ${dataModificada2}\n`;
                texto += `- - - - - - -  Winners  - - - - - - -\n`;
                if (sessao.ganhadores.length > 0){
                    sessao.ganhadores.forEach(g => {
                    let sufixo = getSufixoIngles(g);
                        texto += `🏆 ${g}${sufixo}\n`;
                    });
                }else{
                    texto += `No Winner draw\n\n`;
                }
                texto += `───────────────────────────────────────\n`;
                if(sessao.participantes.length > 0) {
                    texto += `😎 Participated in the draw\n`;
                    texto += `${sessao.participantes.join(', ')}.\n`;
                }
                if (index < sessoes.length - 1){
                    texto += `═══════════════════════════════════════\n\n`;
                }
            });
            const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }else{
            const dataExport = new Date().toLocaleString('es-ES');
            let texto = `═══════════════════════════════════════\n`;
            texto += `INFORME DEL HISTORIAL GENERAL:\n`;
            texto += `═══════════════════════════════════════\n`;
            texto += `SORTEO:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            texto += `───────────────────────────────────────\nINFORME:\n`;
            texto += `Fecha del sorteio: ${dataInicio}\n`;
            texto += `Exportado en: ${dataExport}\n`;
            texto += `───────────────────────────────────────\n`;
            texto += `RESUMEN:\n`;
            texto += `Historial - ${presete} - Total: ${sessoes.length} sesiones\n`;
            texto += `═══════════════════════════════════════\n\n`;
            sessoes.forEach((sessao, index) => {
                texto += `Sorteo - ${sessao.data}\n`;
                texto += `- - - - - - -  Ganadores  - - - - - - -\n`;
                if (sessao.ganhadores.length > 0){
                    sessao.ganhadores.forEach(g => {
                        texto += `🏆 ${g}º\n`;
                    });
                }else{
                    texto += `Ningún ganador\n\n`;
                }
                texto += `───────────────────────────────────────\n`;
                if(sessao.participantes.length > 0) {
                    texto += `😎 Participaron en el sorteo\n`;
                    texto += `${sessao.participantes.join(', ')}.\n`;
                }
                if (index < sessoes.length - 1){
                    texto += `═══════════════════════════════════════\n\n`;
                }
            });
            const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        fechar();
    }
}

// FUNCAO RESPONSAVEL PARA EXPORTAR O HISTORICO ATUAL PARA O FORMATO TXT
function exportarResultado() {
    if (nomes.length === 0) {
        mostrarErro(`⚠️ ${erroImportarHist}`);
        return;
    }
    const igrejaSalva = localStorage.getItem('nomeIgreja');
    const cidadeSalva = localStorage.getItem('nomeCidade');
    cabecario.innerHTML =`<span style='float:left'>📄</span> ${cabecarioExportAtual}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${confirma}<br><br>${modalExportAtual}`;
    confirme.style.display = 'block';
    modalHistorico();
    confirme.onclick = () => {
        if(idiomaAtual === 'pt'){
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('pt-BR');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `RELATÓRIO HISTÓRICO ATUAL:\n`;
            conteudo += `═══════════════════════════════════════\n`;
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
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `ÚLTIMO GANHADOR:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `═══════════════════════════════════════\n`;
                conteudo += `NESSA RODADA DO JOGO:\n`;
                conteudo += `═══════════════════════════════════════\n`;
                conteudo += `NOMES JÁ SORTEADOS (${historicoAtual.length}):\n`;
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
        }else if(idiomaAtual === 'en'){
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('en-US');
            let dataModificada2 = `${dataInicio}`;
            let [data, hora] = dataModificada2.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada2 = dataOblj.toLocaleString('en-US');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `CURRENT HISTORY REPORT:\n`;
            conteudo += `═══════════════════════════════════════\n`;
            conteudo += `DRAW:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `REPORT:\nDraw date: ${dataModificada2}\n`;
            conteudo += `Exported on: ${dataExport}\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `SUMMARY:\n`;
            conteudo += `Total participants: ${nomes.length}\n`;
            conteudo += `Already draw: ${nomesSorteados.length}\n`;
            conteudo += `Still available: ${disponiveis.length}\n`;
            if (ultimoGanhador) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `LAST WINNER:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `IN THIS ROUND OF THE GAME:\n`;
                conteudo += `NAMES ALREADY DRAW (${nomesSorteados.length}):\n`;
                historicoAtual.forEach(item => {
                    let sufixo = getSufixoIngles(item.ordem);
                    let dataModificada = `${item.data}`;
                    let [data, hora] = dataModificada.split(', ');
                    let [dia, mes, ano] = data.split('/');
                    let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
                    dataModificada = dataOblj.toLocaleString('en-US');          
                    conteudo += `${dataModificada} - 🏆 ${item.ordem}${sufixo} ${item.nome}\n`;
                });
            }
            if (disponiveis.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `😎 NOT DRAWN YET (${disponiveis.length}):\n`;
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
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }else{
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('es-ES');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `INFORME DEL HISTORIAL ACTUAL:\n`;
            conteudo += `═══════════════════════════════════════\n`;
            conteudo += `SORTEO:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `INFORME:\nFecha del sorteo: ${dataInicio}\n`;
            conteudo += `Exportado el: ${dataExport}\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `RESUMEN:\n`;
            conteudo += `Total de participantes: ${nomes.length}\n`;
            conteudo += `Ya fueron sorteados: ${nomesSorteados.length}\n`;
            conteudo += `Aún disponibles: ${disponiveis.length}\n`;
            if (ultimoGanhador) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `ÚLTIMO GANADOR:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `EN ESTA RONDA DEL JUEGO:\n`;
                conteudo += `NOMBRES YA SORTEADOS (${nomesSorteados.length}):\n`;
                historicoAtual.forEach(item => {
                    conteudo += `${item.data} - 🏆 ${item.ordem}º ${item.nome}\n`;
                });
            }
            if (disponiveis.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `😎 AÚN NO SORTEADOS (${disponiveis.length}):\n`;
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
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        fechar();
    }
}


// FUNCAO RESPONSAVEL PARA EXPORTAR O HISTORICO ACUMULADO PARA O FORMATO TXT
function exportarResutHistorico() {
    if (nomes.length === 0) {
        mostrarErro(`⚠️ ${erroImportarHist}`);
        return;
    }
    const igrejaSalva = localStorage.getItem('nomeIgreja');
    const cidadeSalva = localStorage.getItem('nomeCidade');
    cabecario.innerHTML =`<span style='float:left'>📄</span> ${cabecarioExportAtual}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${confirma}<br><br>${modalExportAtual}`;
    confirme.style.display = 'block';
    modalHistorico();
    confirme.onclick = () => {
        if(idiomaAtual === 'pt'){
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('pt-BR');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `RELATÓRIO HISTÓRICO ACUMULADO:\n`;
            conteudo += `═══════════════════════════════════════\n`;
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
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `ÚLTIMO GANHADOR:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `NOMES JÁ SORTEADOS (${historicoAtual.length}):\n`;
                historico.forEach(item => {
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
        }else if(idiomaAtual === 'en'){
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('en-US');
            let dataModificada2 = `${dataInicio}`;
            let [data, hora] = dataModificada2.split(', ');
            let [dia, mes, ano] = data.split('/');
            let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
            dataModificada2 = dataOblj.toLocaleString('en-US');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `ACCUMULATED HISTORY REPORT:\n`;
            conteudo += `═══════════════════════════════════════\n`;
            conteudo += `DRAW:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `REPORT:\nDraw date: ${dataModificada2}\n`;
            conteudo += `Exported on: ${dataExport}\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `SUMMARY:\n`;
            conteudo += `Total participants: ${nomes.length}\n`;
            conteudo += `Already draw: ${nomesSorteados.length}\n`;
            conteudo += `Still available: ${disponiveis.length}\n`;
            if (ultimoGanhador) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `LAST WINNER:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `NAMES ALREADY DRAW (${nomesSorteados.length}):\n`;
                historico.forEach(item => {
                    let sufixo = getSufixoIngles(item.ordem);
                    let dataModificada = `${item.data}`;
                    let [data, hora] = dataModificada.split(', ');
                    let [dia, mes, ano] = data.split('/');
                    let dataOblj = new Date(`${ano}-${mes}-${dia}T${hora}`);
                    dataModificada = dataOblj.toLocaleString('en-US');          
                    conteudo += `${dataModificada} - 🏆 ${item.ordem}${sufixo} ${item.nome}\n`;
                });
            }
            if (disponiveis.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `😎 NOT DRAWN YET (${disponiveis.length}):\n`;
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
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }else{
            const disponiveis = nomes.filter(n =>!nomesSorteados.includes(n));
            const dataExport = new Date().toLocaleString('es-ES');
            let conteudo = `═══════════════════════════════════════\n`;
            conteudo += `INFORME DEL HISTORIAL ACUMULADO:\n`;
            conteudo += `═══════════════════════════════════════\n`;
            conteudo += `SORTEO:\n${igrejaSalva}.\n${cidadeSalva}.\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `INFORME:\nFecha del sorteo: ${dataInicio}\n`;
            conteudo += `Exportado el: ${dataExport}\n`;
            conteudo += `───────────────────────────────────────\n`;
            conteudo += `RESUMEN:\n`;
            conteudo += `Total de participantes: ${nomes.length}\n`;
            conteudo += `Ya fueron sorteados: ${nomesSorteados.length}\n`;
            conteudo += `Aún disponibles: ${disponiveis.length}\n`;
            if (ultimoGanhador) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `ÚLTIMO GANADOR:\n`;
                conteudo += `>>> ${ultimoGanhador} 🏆 <<<\n`;
            }
            if (nomesSorteados.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `NOMBRES YA SORTEADOS (${nomesSorteados.length}):\n`;
                historico.forEach(item => {
                    conteudo += `${item.data} - 🏆 ${item.ordem}º ${item.nome}\n`;
                });
            }
            if (disponiveis.length > 0) {
                conteudo += `───────────────────────────────────────\n`;
                conteudo += `😎 AÚN NO SORTEADOS (${disponiveis.length}):\n`;
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
            link.download = `${sorteioHistPermanente}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        fechar();
    }
}

// FUNCAO QUE SERA CHAMADA PARA CARREGAR OS DADOS DO LOCAL STORAGE, AO ABRIR A PAGINA
function carregarDados() {
    const igrejaSalva = localStorage.getItem('nomeIgreja');
    const cidadeSalva = localStorage.getItem('nomeCidade');
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
            mostrarErro('⚠️ Preencha os campos nome e cidade.', false);
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
    if(idiomaAtual === 'pt'){
        document.getElementById('cabecarioAudio').innerHTML ="<span style='float:left'>📢</span> CONFIGURAÇÂO DE ÁUDIO"; 
        document.getElementById('confirmeAudio').innerText = '💾 Salvar' ;
    }else if(idiomaAtual === 'en'){
        document.getElementById('cabecarioAudio').innerHTML ="<span style='float:left'>📢</span> AUDIO SETTING"; 
        document.getElementById('confirmeAudio').innerText = '💾 Save' ;
    }else{
        document.getElementById('cabecarioAudio').innerHTML ="<span style='float:left'>📢</span> CONFIGURACIÓN DE AUDIO"; 
        document.getElementById('confirmeAudio').innerText = '💾 Guardar' ;
    }
}
// FUNCAO DO MODAL ESCURO QUE MOSTRA OS CREDITOS
function formularioCredito(){
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
    credito();
}
// FUNCAO QUE SUAVISA QUANDO MOSTRA OS MODAIS
function modalHistorico(){
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
    cabecario.innerHTML =`<span style='float:left'>🗑️</span> ${cabecarioLimparDados}`;
    confirme.innerHTML = `✅ ${confirmar}`;
    modal.innerHTML = `⚠️ ${atencao}<br><br>${confirma}<br><br>${modalLimparDados}`;
    confirme.style.display = 'block';
    confirme.onclick = () => {
        localStorage.removeItem('nomeIgreja');
        localStorage.removeItem('nomeCidade');
        localStorage.removeItem('nomeAbrev');
        localStorage.removeItem('nomeBairro');
        localStorage.removeItem('nomeMinisterio');
        localStorage.removeItem('nomeTexto');
        localStorage.removeItem('sistema_lang');
        inputIgreja.value = '';
        inputCidade.value = '';
        inputAbrev.value = '';
        inputBairro.value = '';
        inputMinisterio.value = '';
        inputTexto.value = '';
        divIgreja.textContent = '';
        divCidade.textContent = '';
        idiomaAtual = localStorage.getItem('sistema_lang') || 'en';
        aplicarIdioma(idiomaAtual);
        credito();
        mostrarErro('✅ Dados apagados', true);
        fechar();
    }
}

// Funcao que mostra o texto central no modal Creditos
function credito(){
    if(idiomaAtual === 'pt'){
        document.getElementById('textoCredito').innerHTML = 'Se o aplicativo lhe ajudou e voce puder me ajudar, eu serei muito grato. Qualquer valor me ajudará muito.<br><br>Meu Pix 60978813472 Jose Claudio X Brito.<br><br>🤝 Podemos ser amigos. Visite minhas redes sociais, clicando abaixo.<br><br></br>';
        document.getElementById('textoCreditoContato'). innerHTML = ' <center>📝 Contato, sugestão</center><br>';
    }else if(idiomaAtual === 'en'){
        document.getElementById('textoCredito').innerHTML = 'If the app helped you and you can help me, I would be very grateful. Any amount will help me a lot.<br><br>My Pix 60978813472 Jose Claudio X Brito.<br><br>🤝 We can be friends. Visit my social media by clicking below.<br><br></br>';
        document.getElementById('textoCreditoContato'). innerHTML = ' <center>📝 Contact, suggestion</center><br>';
    }else{
        document.getElementById('textoCredito').innerHTML = 'Si la aplicación te ayudó y puedes ayudarme, te estaré muy agradecido. Cualquier valor me ayudará mucho.<br><br>Mi Pix 60978813472 Jose Claudio X Brito.<br><br>🤝 Podemos ser amigos. Visita mis redes sociales, haciendo clic abajo.<br><br></br>';
        document.getElementById('textoCreditoContato'). innerHTML = ' <center>📝 Contacto, sugerencia</center><br>';
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
credito();

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