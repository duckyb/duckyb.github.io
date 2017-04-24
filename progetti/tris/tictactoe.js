// TODO: • Far funzionare gli eventi su Firefox
function aggPunti(player) {
  if (player == 'tic') {
    var icona = document.createElement('img');
    icona.src = 'img/tic.png';
    icona.style.width = '30px';
    icona.style.height = '30px';
    icona.style.display = 'inline-block';
    nodoPunteggio.appendChild(icona);
  }
  if (player == 'tac') {
    var icona = document.createElement('img');
    icona.src = 'img/tac.png';
    icona.style.width = '30px';
    icona.style.height = '30px';
    icona.style.display = 'inline-block';
    nodoPunteggio.appendChild(icona);
  }
}
function reset() {
  turno = 0;
  matrice = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  nodoCella00.children[0].style.opacity = '0';
  nodoCella00.children[1].style.opacity = '0';
  nodoCella00.classList.remove('active');
  nodoCella01.children[0].style.opacity = '0';
  nodoCella01.children[1].style.opacity = '0';
  nodoCella01.classList.remove('active');
  nodoCella02.children[0].style.opacity = '0';
  nodoCella02.children[1].style.opacity = '0';
  nodoCella02.classList.remove('active');
  nodoCella10.children[0].style.opacity = '0';
  nodoCella10.children[1].style.opacity = '0';
  nodoCella10.classList.remove('active');
  nodoCella11.children[0].style.opacity = '0';
  nodoCella11.children[1].style.opacity = '0';
  nodoCella11.classList.remove('active');
  nodoCella12.children[0].style.opacity = '0';
  nodoCella12.children[1].style.opacity = '0';
  nodoCella12.classList.remove('active');
  nodoCella20.children[0].style.opacity = '0';
  nodoCella20.children[1].style.opacity = '0';
  nodoCella20.classList.remove('active');
  nodoCella21.children[0].style.opacity = '0';
  nodoCella21.children[1].style.opacity = '0';
  nodoCella21.classList.remove('active');
  nodoCella22.children[0].style.opacity = '0';
  nodoCella22.children[1].style.opacity = '0';
  nodoCella22.classList.remove('active');
}
function inPausa() {
  nodoPausa.classList.add('vittoria');
  nodoPausa.style.opacity = .9;
  nodoPausa.style.zIndex = 2;
}
function scriviMessaggio(nodo, e) {
  try {
    var myText = document.createTextNode(e);
    nodo.replaceChild(myText, nodo.firstChild);
  } catch(e) {
    alert("scriviMessaggio: " + e);
  }
}
function semplifica(id) {
  try {
    colonna = id.charAt(5);
    riga = id.charAt(6);
    if (turnoDI() == "tic") {
      matrice[riga][colonna] = 2;
    } else {
      matrice[riga][colonna] = 1;
    }
  } catch(e) {
    alert("semplifica: " + e);
  }
}
function condizioneVittoria() {
  var vittoria = false;
  for (var i = 0; i < 3; i++) {
    if (turno == 8) {
      scriviMessaggio(nodoMessP, 'Pareggio');
      conclusione();
      inPausa();
      return;
    }
    if (((matrice[i][0]==matrice[i][1])&&(matrice[i][1]==matrice[i][2]))&&(matrice[i][0]!=0)) {
      if(turnoDI()=='tic') {
        scriviMessaggio(nodoMessP, 'Ha vinto: X');
        aggPunti('tic');
      }
      if(turnoDI()=='tac') {
        scriviMessaggio(nodoMessP, 'Ha vinto: O');
        aggPunti('tac');
      }
      conclusione();
      inPausa();
      return;
    }
    if (((matrice[0][i]==matrice[1][i])&&(matrice[1][i]==matrice[2][i]))&&(matrice[0][i]!=0)) {
      if(turnoDI()=='tic') {
        scriviMessaggio(nodoMessP, 'Ha vinto: X');
        aggPunti('tic');
      }
      if(turnoDI()=='tac') {
        scriviMessaggio(nodoMessP, 'Ha vinto: O');
        aggPunti('tac');
      }
      conclusione();
      inPausa();
      return;
    }
  }
  if ((((matrice[0][0]==matrice[1][1])&&(matrice[1][1]==matrice[2][2]))||((matrice[0][2]==matrice[1][1])&&(matrice[1][1]==matrice[2][0]))) && (matrice[1][1]!=0)) {
    if(turnoDI()=='tic') {
      scriviMessaggio(nodoMessP, 'Ha vinto: X');
      aggPunti('tic');
    }
    if(turnoDI()=='tac') {
      scriviMessaggio(nodoMessP, 'Ha vinto: O');
      aggPunti('tac');
    }
    conclusione();
    inPausa();
    return;
  }
}
function turnoDI() {
  if (turno%2==0) {
    return "tic";
  } else {
    return "tac";
  }
}
function conclusione() {
  nodoCella00.classList.add('active');
  nodoCella01.classList.add('active');
  nodoCella02.classList.add('active');
  nodoCella10.classList.add('active');
  nodoCella11.classList.add('active');
  nodoCella12.classList.add('active');
  nodoCella20.classList.add('active');
  nodoCella21.classList.add('active');
  nodoCella22.classList.add('active');
}

// gestori di eventi
function gestoreAnteprima() {
  try {
    if(this.classList.contains("active")) {
      return;
    }
    if(turnoDI() == "tic") {
      this.children[0].style.opacity = ".2";
    } else {
      this.children[1].style.opacity = ".2";
    }
  } catch(e) {
    alert( "gestoreAnteprima " + e );
  }
}
function gestoreRimuovi() {
  try {
    if(this.classList.contains("active")) {
      return;
    }
    if(turnoDI() == "tic") {
      this.children[0].style.opacity = "0";
    } else {
      this.children[1].style.opacity = "0";
    }
  } catch(e) {
    alert( "gestoreRimuovi " + e );
  }
}
function gestorePosiziona() {
  try {
    if(this.classList.contains("active")) {
      return;
    }
    if(turnoDI() == "tic") {
      this.children[0].style.transitionDuration = '500ms';
      this.children[0].style.opacity = "1";
    } else {
      this.children[1].style.transitionDuration = '500ms';
      this.children[1].style.opacity = "1";
    }
    this.classList.add("active");
    var id = this.getAttribute('id');
    semplifica(id);
    condizioneVittoria();
    turno++;
  } catch(e) {
    alert( "gestorePosizionaTic " + e );
  }
}
function gestoreRiprendi() {
  try {
    if(this.classList.contains('vittoria')) {
      reset();
    }
    this.style.opacity = 0;
    this.style.zIndex = -2;
  } catch(e) {
    alert( "gestoreRiprendi " + e );
  }
}
// dichiarazione nodi
var nodoCella11, nodoCella12, nodoCella13,
    nodoCella21, nodoCella22, nodoCella23,
    nodoCella31, nodoCella32, nodoCella33;
var nodoPunteggio;
var nodoPausa;
var nodoMessP;
var turno = 0, // var di stato
    matrice = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
function gestoreLoad() {
  try {
    // assegnamento variabile-nodo
    nodoCella00 = document.getElementById('cella00');
    nodoCella01 = document.getElementById('cella01');
    nodoCella02 = document.getElementById('cella02');
    nodoCella10 = document.getElementById('cella10');
    nodoCella11 = document.getElementById('cella11');
    nodoCella12 = document.getElementById('cella12');
    nodoCella20 = document.getElementById('cella20');
    nodoCella21 = document.getElementById('cella21');
    nodoCella22 = document.getElementById('cella22');

    nodoPausa = document.getElementById('pausa');
    nodoMessP = document.getElementById('messP')
    nodoPunteggio = document.getElementById('punteggio');
    // assegnamento variabile-evento-funzione
    nodoCella00.onmouseover = gestoreAnteprima;
    nodoCella01.onmouseover = gestoreAnteprima;
    nodoCella02.onmouseover = gestoreAnteprima;
    nodoCella10.onmouseover = gestoreAnteprima;
    nodoCella11.onmouseover = gestoreAnteprima;
    nodoCella12.onmouseover = gestoreAnteprima;
    nodoCella20.onmouseover = gestoreAnteprima;
    nodoCella21.onmouseover = gestoreAnteprima;
    nodoCella22.onmouseover = gestoreAnteprima;

    nodoCella00.onmouseout = gestoreRimuovi;
    nodoCella01.onmouseout = gestoreRimuovi;
    nodoCella02.onmouseout = gestoreRimuovi;
    nodoCella10.onmouseout = gestoreRimuovi;
    nodoCella11.onmouseout = gestoreRimuovi;
    nodoCella12.onmouseout = gestoreRimuovi;
    nodoCella20.onmouseout = gestoreRimuovi;
    nodoCella21.onmouseout = gestoreRimuovi;
    nodoCella22.onmouseout = gestoreRimuovi;

    nodoCella00.onclick = gestorePosiziona;
    nodoCella01.onclick = gestorePosiziona;
    nodoCella02.onclick = gestorePosiziona;
    nodoCella10.onclick = gestorePosiziona;
    nodoCella11.onclick = gestorePosiziona;
    nodoCella12.onclick = gestorePosiziona;
    nodoCella20.onclick = gestorePosiziona;
    nodoCella21.onclick = gestorePosiziona;
    nodoCella22.onclick = gestorePosiziona;

    nodoPausa.onclick = gestoreRiprendi;
    // dialogo
    var nodoTesto1 = document.createTextNode('Cronologia Vittorie: ');
    nodoPunteggio.replaceChild(nodoTesto1, nodoPunteggio.firstChild);
    var nodoTestoP = document.createTextNode('Fai click per iniziare');
    nodoMessP.appendChild(nodoTestoP, nodoMessP.firstChild);
  } catch(e) {
    alert( "gestoreLoad " + e );
  }
}
window.onload = gestoreLoad;
