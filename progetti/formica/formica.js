function creaMondo () {
  for (var i = 0; i < NUMERO_RIGHE; i++) {
    var nodoRiga = document.createElement("tr");
    nodoMondo.appendChild(nodoRiga);
    for (var j = 0; j < NUMERO_COLONNE; j++) {
      var nodoCella = document.createElement("td");
      nodoRiga.appendChild(nodoCella);
    }
  }
}
// gestori di eventi
function random (k) {
  return Math.trunc(Math.random() * k);
}
function coloraMondo(colore) {
  for (var i = 0; i < nodoMondo.children.length; i++) {
    var nodoRiga = nodoMondo.children[i];
    for (var j = 0; j < nodoRiga.children.length; j++) {
      var nodoCella = nodoRiga.children[j];
      nodoCella.style.backgroundColor = colore;
    }
  }
}
function ruota(senso) {
  if (senso == 'orario') {
    switch (direzione) {
      case 'up':
        direzione = 'right';
        break;
      case 'right':
        direzione = 'down';
        break;
      case 'down':
        direzione = 'left';
        break;
      case 'left':
        direzione = 'up';
        break;
    }
  } else if (senso == 'antiorario') {
    switch (direzione) {
      case 'up':
        direzione = 'left';
        break;
      case 'left':
        direzione = 'down';
        break;
      case 'down':
        direzione = 'right';
        break;
      case 'right':
        direzione = 'up';
        break;
    }
  }
}
function passo() {
  var nuovaFormica = {x : formica.x, y : formica.y};
  switch (direzione) {
    case 'up':
      nuovaFormica.y--;
      break;
    case 'down':
      nuovaFormica.y++;
      break;
    case 'right':
      nuovaFormica.x++;
      break;
    case 'left':
      nuovaFormica.x--;
      break;
  }
  // la terra non è piatta
  if (nuovaFormica.y < 0) {
    nuovaFormica.y += 100;
  } else if (nuovaFormica.y > 99) {
    nuovaFormica.y -= 100;
  }
  if (nuovaFormica.x < 0) {
    nuovaFormica.x += 100;
  } else if (nuovaFormica.x > 99) {
    nuovaFormica.x -= 100;
  }
  colorpicker = coloreDi(nuovaFormica);
  cambiaColore(nuovaFormica, COLORE_FORMICA);
  formica.x = nuovaFormica.x;
  formica.y = nuovaFormica.y;
}
function muoviFormica() {
  switch (colorpicker) {
    case 'white':{
      cambiaColore(formica, 'black');
      ruota('antiorario');
      passo();
      break;
    }
    case 'black':{
      cambiaColore(formica, 'white');
      ruota('orario');
      passo();
      break;
    }
  }
  contastep++;
  scrivimess(nodoStep, 'Step: '+contastep);
  ripeti = setTimeout(muoviFormica, RITARDO);
}
function scrivimess(nodo, e) {
  try {
    var myText = document.createTextNode(e);
    nodo.replaceChild(myText, nodo.firstChild);
  } catch(e) {
    alert("scrivimess: " + e);
  }
}
function cambiaColore(posizione, colore) {
  nodoMondo.rows[posizione.y].cells[posizione.x].style.backgroundColor = colore;
}
function coloreDi(posizione) {
  var colore = nodoMondo.rows[posizione.y].cells[posizione.x].style.backgroundColor;
  return colore;
}
function nascita() {
    if (moto) {
      return;
    }
    moto = true;
    var coordX = random(NUMERO_COLONNE);
    var coordY = random(NUMERO_RIGHE);
    formica = {x: coordX, y: coordY};
    colorpicker = coloreDi(formica); // salva il colore dove era la formica
    cambiaColore(formica, COLORE_FORMICA);
    muoviFormica(true);
}
function gestoreClickTasto() {
  try {
    if (moto) {
      this.value = 'Riprendi';
      moto = false;
      window.clearTimeout(ripeti);
    } else {
      this.value = 'Ferma';
      moto = true;
      ripeti = setTimeout(muoviFormica, RITARDO);
    }
  } catch(e) {
    alert( "gestoreClickTasto " + e );
  }
}
// dichiarazione nodi
var nodoMondo;
var nodoInizia;
var nodoStep;
// variabili globali
var formica;
var direzione;
var moto = false;
var colorpicker;
var direzione = 'left';
var ripeti;
var contastep = 0;
// costanti
const NUMERO_RIGHE = 100; // la dimensione del mondo
const NUMERO_COLONNE = 100;
const COLORE_FORMICA = 'red';
const RITARDO = 10;

function gestoreLoad() {
  try {
    // assegnamento variabile-nodo
    nodoMondo = document.getElementById('mondo');
    nodoInizia = document.getElementById('inizia');
    nodoStep = document.getElementById('steps');
    // assegnamento variabile-evento-funzione
    nodoInizia.onclick = gestoreClickTasto;
    var nodoTesto = document.createTextNode('Step: '+contastep);
    nodoStep.appendChild(nodoTesto);
    creaMondo();
    coloraMondo('white');

    nascita();
    // coloraMondo('cyan');
  } catch(e) {
    alert( "gestoreLoad " + e );
  }
}
window.onload = gestoreLoad;
