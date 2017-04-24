function pulisciSpan() {
  try {
    var noText = document.createTextNode("");
    var noText2 = document.createTextNode("");
    nodoErrPrimo.replaceChild(noText, nodoErrPrimo.firstChild);
    nodoErrSecondo.replaceChild(noText2, nodoErrSecondo.firstChild);
    nodoErrPrimo.style.opacity = "0";
    nodoErrPrimo.style.zIndex = "-1";
    nodoErrSecondo.style.opacity = "0";
    nodoErrSecondo.style.zIndex = "-1";
  } catch(e) {
    alert( "pulisciSpan: "  + e );
  }
}

function amanuense(nodo, e) {
  try {
    var myText = document.createTextNode(e);
    nodo.replaceChild(myText, nodo.firstChild);
    // fai comparire il nodo
    nodo.style.opacity = "1";
    nodo.style.zIndex = "2";
  } catch(e) {
    alert("amanuense: " + e);
  }
}

function aggiornaContatore() {
  try {
    var nuovoNumero = document.createTextNode(numCapsule); // preparo il nuovo numero
    nodoConta.replaceChild(nuovoNumero, nodoConta.firstChild); // lo scambio con il vecchio
  } catch(e) {
    alert("aggiornaContatore: " + e);
  }
}

function addebita(nCaffe, cUtente) {
  if(!(cUtente in utenti)) { // se utente non esiste già
    utenti[cUtente] = nCaffe;
  } else { // se utente esiste già
    utenti[cUtente] = Number(utenti[cUtente]) + Number(nCaffe); // gli sommo i nuovi caffè
  }
}
// gestori di eventi
function gestoreCapsule() {
  try {
    // pulizia di primavera
    pulisciSpan();
    // input validation
    if((nodoNumeroCapsule.value < 1)||(nodoNumeroCapsule.value == "")) {
      amanuense(nodoErrPrimo, "Numero di capsule non valido!");
      return;
    }
    // imposta il numero di capsule
    numCapsule += Number(nodoNumeroCapsule.value);
    aggiornaContatore();
  } catch(e) {
    alert( "gestoreCapsule " + e );
  }
}
function gestoreEroga() {
  try {
    pulisciSpan();
    // input validation
    if(numeroCapsule == undefined) {
      amanuense(nodoErrSecondo, "Devi prima inserire delle capsule!");
      return;
    }
    if((nodoNumeroCaffe.value > numCapsule)||(nodoNumeroCapsule.value < 1)||(nodoNumeroCapsule.value == "")) {
      amanuense(nodoErrSecondo, "Numero di caffè non valido!")
      return;
    }
    if(codiceUtente.value == "") {
      amanuense(nodoErrSecondo, "Devi specificare un utente!")
      return;
    }
    // consumo le capsule, addebito i caffè
    numCapsule -= Number(nodoNumeroCaffe.value);
    addebita(nodoNumeroCaffe.value, codiceUtente.value);
    aggiornaContatore();
  } catch(e) {
    alert( "gestoreEroga " + e );
  }
}
function gestoreSpesa() {
  try {
    if(nodoRapportoUtente.value in utenti) { // se l'utente esiste
      nodoSpesaTot.value = utenti[nodoRapportoUtente.value];
    } else { // se l'utente non esiste
      nodoSpesaTot.value = "0";
    }
  } catch(e) {
    alert( "gestoreSpesa " + e );
  }
}
// dichiarazione nodi
var nodoNumeroCapsule;
var nodoInsCapsule;
var nodoNumeroCaffe;
var nodoCodiceUtente;
var nodoErogaCaffe;
var nodoRapportoUtente;
var nodoEseguiRapporto;
var nodoSpesaTot;
var nodoConta; // contatore di capsule visivo
// variabili javascript
var numCapsule = 0; // numero di capsule nella macchina
var utenti = []; // lista utenti
// span errori
var nodoErrPrimo;
var nodoErrSecondo;

function gestoreLoad() {
  try {
    // assegnamento variabile-nodo
    nodoNumeroCapsule = document.getElementById("numeroCapsule");
    nodoInsCapsule = document.getElementById("insCapsule");
    nodoNumeroCaffe = document.getElementById("numeroCaffe");
    nodoCodiceUtente = document.getElementById("codiceUtente");
    nodoErogaCaffe = document.getElementById("erogaCaffe");
    nodoRapportoUtente = document.getElementById("rapportoUtente");
    nodoEseguiRapporto = document.getElementById("eseguiRapporto");
    nodoSpesaTot = document.getElementById("spesaTot");
    nodoConta = document.getElementById("conta");
    nodoErrPrimo = document.getElementById("errPrimo");
    nodoErrSecondo = document.getElementById("errSecondo");
    // assegnamento variabile-evento-funzione
    nodoInsCapsule.onclick = gestoreCapsule;
    nodoErogaCaffe.onclick = gestoreEroga;
    nodoEseguiRapporto.onclick = gestoreSpesa;
    nodoErrPrimo.onclick = pulisciSpan;
    nodoErrSecondo.onclick = pulisciSpan;
    // pulizia dei campi
    nodoNumeroCapsule.value = "";
    nodoNumeroCaffe.value = "";
    nodoCodiceUtente.value = "";
    nodoRapportoUtente.value = "";
    nodoSpesaTot.value = "";

    // D I A L O G O
    var nodoTestoConta = document.createTextNode("0");
    nodoConta.appendChild(nodoTestoConta);
    var nodoTestoPrimo = document.createTextNode("");
    nodoErrPrimo.appendChild(nodoTestoPrimo);
    var nodoTestoSecondo = document.createTextNode("");
    nodoErrSecondo.appendChild(nodoTestoSecondo);

  } catch(e) {
    alert( "gestoreLoad " + e );
  }
}
window.onload = gestoreLoad;
