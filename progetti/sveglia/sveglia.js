function amanuense(nodo, e) {
  try {
    var myError = document.createTextNode(e);
    nodo.replaceChild(myError, nodo.firstChild);
  } catch(e) {
    alert("amanuense: " + e);
  }
}
// gestori di eventi
function gestoreOraCorrente() {
  try {
    // pulizie di primavera
    amanuense(nodoErrorCode, "");
    nodoOraImpostata.value = "";

    if ((nodoOraCorrente.value.length == 0) || (nodoMinCorrente.value.length == 0)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Riempi ENTRAMBI i campi!")
      return;
    }
    ore = nodoOraCorrente.value;
    min = nodoMinCorrente.value;
    if (isNaN(ore)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Le ore vanno da 0 a 23!");
      return;
    }
    if(ore<0 || ore>23) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Le ore vanno da 0 a 23!");
      return;
    } else if (ore.length == 1) {
      ore = '0' + ore;
    }
    if (isNaN(min)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "I minuti sono numeri!");
      return;
    }
    if(min<0 || min>59) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "I minuti vanno da 0 a 59!");
      return;
    } else if(min.length == 1) {
      min = '0' + min;
    }
    nodoEmoji.src = "img/dormi.svg";
    nodoOraImpostata.value = ore + ":" + min;
  } catch(e) {
    alert("gestoreOraCorrente "+ e );
  }
}

function gestoreSveglia() {
  try {
    // pulizie di primavera
    amanuense(nodoErrorCode, "");
    nodoSvegliaImpostata.value = "";

    var oraSv = nodoOraSveglia.value,
    minSv = nodoMinSveglia.value;

    if ((nodoOraSveglia.value.length == 0) || (nodoMinSveglia.value.length == 0)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Riempi ENTRAMBI i campi!");
      return;
    }
    if(isNaN(oraSv)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Le ore sono numeri!");
      return;
    }
    if(oraSv<0 || oraSv>23) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "Le ore vanno da 0 a 23!");
      return;
    } else if (oraSv.length == 1) {
      oraSv = '0' + oraSv;
    }
    if(isNaN(minSv)) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "I minuti sono numeri!");
      return;
    }
    if(minSv<0 || minSv>59) {
      nodoEmoji.src = "img/errore.svg";
      amanuense(nodoErrorCode, "I minuti vanno da 0 a 59!");
      return;
    } else if(minSv.length == 1) {
      minSv = '0' + minSv;
    }
    nodoEmoji.src = "img/dormi.svg";
    nodoSvegliaImpostata.value = oraSv + ":" + minSv;
  } catch(e) {
    alert("gestoreSveglia "+e);
  }
}

function gestoreAddMin() {
  try {
    // pulizia errori
    amanuense(nodoErrorCode, "");

    ore = Number(ore);
    min = Number(min);
    // input validation
    if(ore == undefined || min == undefined || isNaN(ore) || isNaN(min)) {
      amanuense(nodoErrorCode, "A cosa sto sommando?");
      nodoEmoji.src = "img/errore.svg";
      return;
    }
    switch (min) {
      case 59:
      min = "00";
      if (ore == 23) {
        ore == "00";
      } else {
        ore += 1;
      }
      break;
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
      if ( ore.length == 1 ) {
        ore = "0" + ore;
      }
      min = "0" + (min + 1);
      break;
      default:
      if ( ore.length == 1 ) {
        ore = "0" + ore;
      }
      min+=1;
    }
    nodoOraImpostata.value = ore + ":" + min;
    // suono la sveglia
    if (nodoOraImpostata.value == nodoSvegliaImpostata.value) {
      nodoEmoji.src = "img/sveglia.svg";
    }
  } catch(e) {
    alert("gestoreAddMin "+ e );
  }
}

// dichiarazione nodi
var nodoOraCorrente;
var nodoMinCorrente;
var nodoImpostaOra;     // BUTTON
var nodoOraSveglia;
var nodoMinSveglia;
var nodoImpostaSveglia; // BUTTON
var nodoOraImpostata;
var nodoSvegliaImpostata;
var nodoAddMin;         // BUTTON
var nodoEmoji;          // EMOJI
var ore;
var min;
var nodoErrorCode       // TESTO ERRORE

function gestoreLoad() {
  try {
    // assegnamento variabile-nodo
    nodoOraCorrente = document.getElementById("oraCorrente");
    nodoMinCorrente = document.getElementById("minCorrente");
    nodoImpostaOra = document.getElementById("impostaOra");
    nodoOraSveglia = document.getElementById("oraSveglia");
    nodoMinSveglia = document.getElementById("minSveglia");
    nodoImpostaSveglia = document.getElementById("impostaSveglia");
    nodoOraImpostata = document.getElementById("oraImpostata");
    nodoSvegliaImpostata = document.getElementById("svegliaImpostata");
    nodoAddMin = document.getElementById("addMin");
    nodoEmoji = document.getElementById("emoji");
    nodoErrorCode = document.getElementById("errorCode");
    nodoOraCorrente.value = "";
    nodoMinCorrente.value = "";
    nodoOraSveglia.value = "";
    nodoMinSveglia.value = "";
    nodoOraImpostata.value = "";
    nodoSvegliaImpostata.value = "";
    // assegnamento variabile-evento-funzione
    nodoImpostaOra.onclick = gestoreOraCorrente;
    nodoImpostaSveglia.onclick = gestoreSveglia;
    nodoAddMin.onclick = gestoreAddMin;
    // gestione degli errori
    var nodoTestoErr = document.createTextNode("");
    nodoErrorCode.appendChild(nodoTestoErr)
  } catch(e) {
    alert( "gestoreLoad " + e );
  }
}
window.onload = gestoreLoad;
