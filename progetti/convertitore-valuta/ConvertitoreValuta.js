
function creaCookie(nome, valore, scadenza) {
	if ( scadenza == undefined || isNaN(scadenza) ) {
		return nome + " = " + valore;
	}
	var data = new Date();
	var scadenzaMillisecondi = scadenza * 24 * 60 * 60 * 1000;
	var dataOdierna = data.getTime();
	var dataFutura = dataOdierna + scadenzaMillisecondi;
	data.setTime(dataFutura);
	return nome + " = " + valore + "; expires = " + data.toGMTString();
}
function estraiCookie(nome, stringa) {
	var coppie = stringa.split(";");
	var i = 0;
	while ( ( i < coppie.length ) && ( coppie[i].trim().indexOf(nome) !=0 ) ) {
		i++;
	}
	if ( i < coppie.length ) {
		var l = nome.length;
		var s = coppie[i].trim();
		return s.substr(l + 1, s.length - 1);
	} else {
		return undefined;
	}
}

function scriviMessaggio(nodo, messaggio) {
	var nodoTesto = document.createTextNode(messaggio);
	nodo.replaceChild(nodoTesto, nodo.firstChild);
}
function gestoreImposta() {
	try {
		// Clear error messages
		scriviMessaggio(nodoMessaggioImposta, "");
		scriviMessaggio(nodoMessaggioConverti, "");
		// Input validation
		var valuta = nodoValuta.value; // checking valuta
		if (valuta.length != 3) {
			alert("la valuta non \u00E8 valida");
			return;
		}
		if (nodoFattore.value == "") {
			alert("il fattore di conversione \u00E8 vuoto");
			return;
		}
		var fattore = Number(nodoFattore.value);
		if (isNaN(fattore)) {
			alert(nodoF.value + " non \u00E8 un numero");
			return;
		}
		if (fattore <=0) {
			alert("il fattore di conversione non \u00E8 valido");
			return;
		}
		// if inputs are valid, assing
		valutaCorrente = valuta;
		fattoreCorrente = fattore;
		document.cookie = creaCookie("valuta", valutaCorrente);
		document.cookie = creaCookie("fattore", fattoreCorrente);
		nodoImporto.value = "";
		nodoRisultato.value = "";

	} catch (e) {
		alert("gestoreImposta " + e );
	}
}
function gestoreConverti() {
	try {
		// Global variables validation
		if ( (valutaCorrente == undefined) && (fattoreCorrente == undefined) ) {
			alert( "valuta e fattore non sono definiti!" );
			return;
		}
		// Input validation
		if ( nodoImporto.value == "" ) {
			alert( "l'importo \u00E8 vuoto!" );
			return;
		}
		var importo = Number(nodoImporto.value);
		if ( isNaN(importo) ) {
			alert( nodoImporto.value + " non \u00E8 un numero!" );
			return;
		}
		if ( importo <=0 ) {
			alert( "l'importo non \u00E8 valido" );
			return;
		}
		// If inputs are valid, calculate result
		nodoRisultato.value = valutaCorrente + " " + fattoreCorrente * importo;

	} catch (e) {
		alert("gestoreConverti " + e );
	}
}

// My interactive nodes
var nodoValuta;
var nodoFattore;
var nodoImposta;
var nodoImporto;
var nodoConverti;
var nodoRisultato;
var nodoMessaggioImposta;
var nodoMessaggioConverti;
var valutaCorrente; // stato convertitore
var fattoreCorrente;

function gestoreLoad() { // appena carica la pagina:
	try {
		var valuta = estraiCookie("valuta", document.cookie);
		if ( valuta != undefined ) {
			nodoValuta.value = valuta;
			valutaCorrente = valuta;
		}
		var fattore = estraiCookie("fattore", document.cookie);
		if( fattore != undefined ) {
			nodoFattore.value = fattore;
			fattoreCorrente = fattore;
		}
		// node assignment
		nodoValuta = document.getElementById("valuta");
		nodoFattore = document.getElementById("fattore");
		nodoImposta = document.getElementById("imposta");
		nodoImporto = document.getElementById("importo");
		nodoConverti = document.getElementById("converti");
		nodoRisultato = document.getElementById("risultato");
		nodoMessaggioImposta = document.getElementById("messaggioImposta");
		nodoMessaggioConverti = document.getElementById("messaggioConverti");
		// clearing text fields
		nodoValuta.value = "";
		nodoFattore.value = "";
		nodoImporto.value = "";
		nodoRisultato.value = "";
		nodoImposta.onclick = gestoreImposta; // quando clicco su Imposta devo lanciare la funzione gestoreImposta.
		nodoConverti.onclick = gestoreConverti; // mentre quando clicco su Converti devo lanciare gestoreConverti.
		var nodoTesto1 = document.createTextNode("");
		nodoMessaggioImposta.appendChild(nodoTesto1);
		var nodoTesto2 = document.createTextNode("");
		nodoMessaggioConverti.appendChild(nodoTesto2);
	} catch (e) {
		alert("gestoreLoad " + e );
	}
}
window.onload = gestoreLoad; // quando la pagina carica avvia il gestoreLoad().
