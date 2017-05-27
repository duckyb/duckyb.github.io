function gestoreClickAvanti() {
  try {
    if (automatico) {
      return;
    }
    cambiaFoto(+1);
  } catch (e) {
    alert("gestoreClickAvanti " + e);
  }
}

function gestoreClickIndietro() {
  try {
    if (automatico) {
      return;
    }
    cambiaFoto(-1);
  } catch (e) {
    alert("gestoreClickIndietro " + e);
  }
}

function cambiaFoto(x) {
  indiceFoto += x;
  if (indiceFoto == NUMERO_FOTO) {
    indiceFoto = 0;
  }
  if (indiceFoto < 0) {
    indiceFoto = NUMERO_FOTO - 1;
  }
  nodoFoto.setAttribute("src", galleria[indiceFoto]);
}

function gestoreClickStartStop() {
  try {
    if (automatico) {
      nodoStartStop.value = "Start";
      automatico = false;
    } else {
      nodoStartStop.value = "Stop";
      automatico = true;
      cambiaFotoInAutomatico();
    }
  } catch (e) {
    alert("gestoreClickStartStop " + e);
  }
}

function cambiaFotoInAutomatico() {
  if (automatico) {
    cambiaFoto(+1);
    setTimeout(cambiaFotoInAutomatico, RITARDO);
  }
}

const NUMERO_FOTO = 4;
const RITARDO = 2000;
var galleria;
var indiceFoto;
var automatico;
var nodoAvanti;
var nodoIndietro;
var nodoStartStop;
var nodoFoto;

function gestoreLoad() {
  try {
    nodoAvanti = document.getElementById("avanti");
    nodoIndietro = document.getElementById("indietro");
    nodoStartStop = document.getElementById("startStop");
    nodoFoto = document.getElementById("foto");
    nodoAvanti.onclick = gestoreClickAvanti;
    nodoIndietro.onclick = gestoreClickIndietro;
    nodoStartStop.onclick = gestoreClickStartStop;

    nodoStartStop.value = "Start";
    automatico = false;
    galleria = [];
    for (var i = 0; i < NUMERO_FOTO; i++) {
      var nomeFoto = "foto" + i + ".png";
      galleria.push(nomeFoto);
    }
    indiceFoto = 0;
    cambiaFoto(0);
  } catch (e) {
    alert("gestoreLoad " + e);
  }
}
window.onload = gestoreLoad;
