const html = document.querySelector('html')

const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause')
const imagemStartOuPause = document.querySelector('.app__card-primary-butto-icon')
const iniciarOuPausarbtn = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const playSom = new Audio('/sons/play.wav')
const pauseSom = new Audio('/sons/pause.mp3')
const finalSom = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

const tempoNaTela = document.querySelector('#timer')

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

// * Foco
focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarConteudo('foco')
    focoBtn.classList.add('active')
})

// * descanso Curto
curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarConteudo('descanso-curto')
    curtoBtn.classList.add('active')
})

// * descanso Longo
longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarConteudo('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarConteudo(conteudo) {
    
    mostrarTempo()

    imagemStartOuPause.setAttribute('src', `/imagens/play_arrow.png`)
    iniciarOuPausarbtn.textContent = 'Começar'
    zerar()

    botoes.forEach(function (conteudo) {
        conteudo.classList.remove('active')
    })
    html.setAttribute('data-contexto', conteudo)
    banner.setAttribute('src', `/imagens/${conteudo}.png`)
    switch (conteudo) {
        case 'foco':
            titulo.innerHTML =
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;

        case 'descanso-curto':
            titulo.innerHTML =
                `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;

        case 'descanso-longo':
            titulo.innerHTML =
                `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        finalSom.play()
        alert('Tempo finalizado')
        zerar()        
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        imagemStartOuPause.setAttribute('src', `/imagens/play_arrow.png`)
        iniciarOuPausarbtn.textContent = 'Começar'
        pauseSom.play()
        zerar()
        return
    }
    imagemStartOuPause.setAttribute('src', `/imagens/pause.png`)
    playSom.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarbtn.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() 