function mostraPiatti() {
  // costruttore del ramo DOM
  console.log('mostraPiatti');
  var nuovaLista = document.createElement('ul');
  nodoRisultati.appendChild(nuovaLista);
  for (var i = 0; i < menoPiatti.length; i++) {
    console.log(menoPiatti[i].nome);
    var nuovoTesto = document.createTextNode(menoPiatti[i].nome);
    var nuovoItem = document.createElement('li');
    nuovoItem.appendChild(nuovoTesto);
    nuovaLista.appendChild(nuovoItem);
  }
}
function rimuoviFigli(nodo) {
  // Rimuove tutti i figli da un nodo
  console.log('rimuoviFigli');
  while (nodo.childNodes.length > 0) {
    nodo.removeChild(nodo.firstChild);
  }
}
function creaSelect(nodoSelect, opzioni) {
  // Genera dinamicamente il menu di selezione della categoria
  console.log('creaSelect');
  rimuoviFigli(nodoSelect);
  for (var opzione in opzioni) {
    var nodoOpzione = document.createElement('option');
    nodoOpzione.value = opzione;
    var nodoTesto = document.createTextNode(opzione);
    nodoOpzione.appendChild(nodoTesto);
    nodoSelect.appendChild(nodoOpzione);
  }
}
function calcolaTipologie() {
  // Crea un nuovo array di categorie senza ripetizioni
  console.log('calcolaTipologie');
  var categorie = {};
  for (var i = 0; i < piatti.length; i++) {
    var piatto = piatti[i];
    categorie[piatto.tipo] = true;
  }
  return categorie;
}
function aggiornaPiatti() {
  // Creazione di un nuovo array con solo i piatti interessati
  console.log('aggiornaPiatti');
  menoPiatti = [];
  for (var i = 0; i < piatti.length; i++) {
    if (piatti[i].tipo == nodoSelectCate.options[nodoSelectCate.selectedIndex].text) {
      menoPiatti.push(piatti[i]);
    }
  }
}
function gestoreChangeCate() {
  try {
    console.log('gestoreChangeCate');
    rimuoviFigli(nodoRisultati);
    aggiornaPiatti();
    mostraPiatti();
  } catch (e) {
    alert('gestoreChangeCate '+e);
  }
}

var nodoSelectCate;
var nodoRisultati;
var categorie;
var menoPiatti;

function gestoreLoad() {
  try {
    nodoSelectCate = document.getElementById('selectCate');
    nodoRisultati = document.getElementById('risultati');
    menoPiatti = [];
    categorie = calcolaTipologie();
    creaSelect(nodoSelectCate, categorie);
    nodoSelectCate.onchange = gestoreChangeCate;
    // nodoSelectDiff.onchange = gestoreChangeDiff;
  } catch (e) {
    alert('gestoreLoad '+e);
  }
}
window.onload = gestoreLoad;
