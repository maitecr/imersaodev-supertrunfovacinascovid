var vacinaModerna = {
  nome: "Moderna",
  imagem:"https://s2.glbimg.com/0lPyNqrvb126B-f50aDCQ-lH2c0=/0x0:3064x2032/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2021/i/K/JgisE4QeuAH7sKAFwb5w/f6d565e8bd5141389ec3a187b72c21cd-ab1e4.jpg",
  atributos:{
   EFICÁCIA: 95,
   CUSTO: 37,
   TEMPERATURA: -20
}
}
var vacinaPfizer = {
  nome: "Pfizer",
  imagem: "https://www.tnh1.com.br/fileadmin/user_upload/tnh1/2021/01/25/Vacina_Pfizer_BioNTech.jpg",
  atributos:{
   EFICÁCIA: 95,
   CUSTO: 20,
   TEMPERATURA: -70
}
}
var vacinaSputnikV = {
nome: "Sputnik V",
imagem: "https://medias.cnnbrasil.com.br/insumos-para-a-vacina-sputnik.jpeg?format=JPEG&image=https://mediastorage.cnnbrasil.com.br/IMAGES/00/00/03/31055_23209A03EDB25EBD.jpeg&width=804&height=869&resize=CROP",
atributos:{
   EFICÁCIA: 92,
   CUSTO: 10,
   TEMPERATURA: -18
}
}
var vacinaOxfordAstraZeneca = {
  nome: "Astra Zeneca",
  imagem: "https://conteudo.imguol.com.br/c/noticias/4d/2021/03/13/13mar2021---enfermeira-pega-frasco-da-vacina-da-astrazeneca-1615646474052_v2_450x450.jpg",
  atributos:{
   EFICÁCIA: 91,
   CUSTO: 5,
   TEMPERATURA: 8
}
}
var vacinaNovaVax = {
  nome: "Nova Vax",
  imagem: "https://static.dw.com/image/56075005_401.jpg",
  atributos:{
   EFICÁCIA: 89,
   CUSTO: 18,
   TEMPERATURA: 8
}
}
var vacinaBBIBPCorV = {
  nome: "BBIBP-CorV",
  imagem: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Sinopharm_COVID-19_vaccine_%282021%29_K_%28cropped%29.jpeg",
  atributos:{
   EFICÁCIA: 79,
   CUSTO: 36,
   TEMPERATURA: 8
}
}
var vacinaCoronaVac = {
  nome: "CoronaVac",
  imagem: "https://static.poder360.com.br/2021/03/coronavac-868x644.jpg",
  atributos:{
   EFICÁCIA: 78,
   CUSTO: 36,
   TEMPERATURA: 8   
}
}
var vacinaJanssen = {
  nome: "Johnson&Johnson",
  imagem: "https://static.poder360.com.br/2021/03/vacina-janssen.jpg",
  atributos:{
   EFICÁCIA: 85,
   CUSTO: 20,
   TEMPERATURA: 8
}
}

var cartaMaquina
var cartaJogador
var cartas = [vacinaJanssen, vacinaCoronaVac, vacinaBBIBPCorV, vacinaNovaVax, vacinaOxfordAstraZeneca, vacinaSputnikV, vacinaPfizer, vacinaModerna]

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas() 

function atualizaQuantidadeDeCartas() {
  var divQuantidadeDeCartas = document.getElementById('quantidade-cartas')
  var html = "Quantidade de cartas no jogo: " + cartas.length
  
  divQuantidadeDeCartas.innerHTML = html
}

function atualizaPlacar(){
 var divPlacar = document.getElementById('placar')
 var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"
 
 divPlacar.innerHTML = html
}

function sortearCarta(){
  var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
  cartaMaquina = cartas[numeroCartaMaquina]
  cartas.splice(numeroCartaMaquina, 1)
  
  var numeroCartaJogador = parseInt(Math.random() * cartas.length)
  cartaJogador = cartas[numeroCartaJogador]
  cartas.splice(numeroCartaJogador, 1)
  
  document.getElementById('btnSortear').disabled = true
  document.getElementById('btnJogar').disabled = false
  
  exibeCartaJogador()
  
}

function exibeCartaJogador(){
  var divCartaJogador = document.getElementById("carta-jogador")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaJogador.style.backgroundImage=`url(${cartaJogador.imagem})`
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
  var opcoesTexto =  ""
  
   for (var atributo in cartaJogador.atributos){
    opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
 }
  
  var html = "<div id'opcoes' class='carta-status'>"
  
  divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
  var radioAtributo = document.getElementsByName('atributo')
  for (var i = 0; i < radioAtributo.length; i++){
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value
    }
  }
}

function jogar() {
   var divResultado = document.getElementById("resultado")
   var atributoSelecionado = obtemAtributoSelecionado()
 
   if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
      htmlResultado = '<p class="resultado-final">Venceu</p>'
      pontosJogador++
   } else if(cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
      htmlResultado = '<p class="resultado-final">Perdeu</p>'
      pontosMaquina++
   } else {
      htmlResultado = '<p class="resultado-final">Empatou</p>'
   }
  
  if (cartas.length == 0) {
      alert("Fim de Jogo")  
      if (pontosJogador > pontosMaquina) {
          htmlResultado = '<p class="resultado-final">Venceu</p>'
      } else if (pontosMaquina > pontosJogador) {
          htmlResultado = '<p class="resultado-final">Perdeu</p>'
      } else {
          htmlResultado = '<p class="resultado-final">Empatou</p>'
      }  
  } else {
      document.getElementById('btnProximaRodada').disable = false
}
  
  divResultado.innerHTML = htmlResultado
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = false
  
  atualizaPlacar()
  exibeCartaMaquina()
  atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina(){
var divCartaMaquina = document.getElementById("carta-maquina")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaMaquina.style.backgroundImage=`url(${cartaMaquina.imagem})`
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
  var opcoesTexto =  ""
  
   for (var atributo in cartaMaquina.atributos){
    opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
 }
  
  var html = "<div id'opcoes' class='carta-status'>"
  
  divCartaMaquina.innerHTML = moldura+nome+html+opcoesTexto+'</div>'    
  }

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" classa="carta"></div>`
  
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""
}
