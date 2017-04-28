function creaOpzioni(nodoSelect, opzioni) {
  for (var opzione in opzioni) {
    var nodoOpzione = document.createElement('option');
    var nodoTesto = document.createTextNode(opzione);
    nodoOpzione.appendChild(nodoTesto);
    nodoSelect.appendChild(nodoOpzione);
  }
}

function creaMappa(mappa) {
  for (var i = 0; i < ALTEZZAM; i++) {
    var nodoRiga = document.createElement('tr');
    for (var j = 0; j < LARGHEZZAM; j++) {
      var nodoCella = document.createElement('td');
      nodoCella.style.backgroundColor = 'white';
      nodoRiga.appendChild(nodoCella);
    }
    mappa.appendChild(nodoRiga);
  }
}

function gestoreClickAdd() {
  try {
    var f = new Formica();
    f.colore = nodoSltCol.options[nodoSltCol.selectedIndex].value;
		f.velocita = nodoSltVel.options[nodoSltVel.selectedIndex].value;
    f.nascita();
    formiche.push(f);
  } catch (e) {
    alert('gestoreClickAdd ' + e);
  }
}

var nodoMappa;
var nodoSltCol;
var nodoSltVel;
var formiche = [];
var i_form = 0;
var colori = {
  cyan: 'cyan',
  magenta: 'magenta',
  yellow: 'yellow',
  black: 'black',
  red: 'red',
  pink: 'pink'
};
var velocita = {
  1000: '1000',
  500: '500',
  100: '100',
  50: '50',
  10: '10',
  1: '1'
};
const LARGHEZZAM = 100;
const ALTEZZAM = 100;

function gestoreLoad() {
  try {
    nodoMappa = document.getElementById('mappa');
    nodoSltCol = document.getElementById('slt_col');
    nodoSltVel = document.getElementById('slt_vel');
    nodoBtnAdd = document.getElementById('btn_add');

    nodoBtnAdd.onclick = gestoreClickAdd;
    creaOpzioni(nodoSltCol, colori);
    creaOpzioni(nodoSltVel, velocita);
    creaMappa(nodoMappa);
  } catch (e) {
    alert('gestoreLoad ' + e);
  }
}
window.onload = gestoreLoad;
