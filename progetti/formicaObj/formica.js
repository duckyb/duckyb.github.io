function Formica() {
	this.x = Math.trunc(Math.random()*100);
	this.y = Math.trunc(Math.random()*100);
	this.colore;
	this.direzione = 'up';
	this.contagocce;
	this.velocita;

	this.nascita = function() {
		this.coloreQui(); // salva il colore
		this.coloraCella(this.colore); // compari sulla mappa
		this.movimento(); // inizia a muoverti
	}
	this.coloreQui = function() {
		this.contagocce = nodoMappa.rows[this.y].cells[this.x].style.backgroundColor;
	}
	this.movimento = function() {
		if (this.contagocce == this.colore) {
			this.coloraCella('white');
			this.rotazione('orario');
			this.avanzaCella();
		} else if (this.contagocce != this.colore) {
			this.coloraCella(this.colore);
			this.rotazione('antiorario');
			this.avanzaCella();
		}
		setTimeout(this.movimento.bind(this), this.velocita);
	}
	this.rotazione = function(senso) {
		if (senso == 'orario') {
			switch (this.direzione) {
				case 'up':
					this.direzione = 'right';
					break;
				case 'right':
					this.direzione = 'down';
					break;
				case 'down':
					this.direzione = 'left';
					break;
				case 'left':
					this.direzione = 'up';
					break;
			}
		} else if (senso == 'antiorario') {
			switch (this.direzione) {
				case 'up':
					this.direzione = 'left';
					break;
				case 'left':
					this.direzione = 'down';
					break;
				case 'down':
					this.direzione = 'right';
					break;
				case 'right':
					this.direzione = 'up';
					break;
			}
		}
	}
	this.coloraCella = function(colore) {
		nodoMappa.rows[this.y].cells[this.x].style.backgroundColor = colore;
	}
	this.avanzaCella = function() {
		switch (this.direzione) {
			case 'up':
				this.y--;
				break;
			case 'down':
				this.y++;
				break;
			case 'left':
				this.x--;
				break;
			case 'right':
				this.x++;
				break;
		}
		// se arriva al bordo va a capo
		if (this.y < 0) {
			this.y = 99;
		} else if (this.y > 99) {
			this.y = 0;
		}
		if (this.x < 0) {
			this.x = 99;
		} else if (this.x > 99) {
			this.x = 0;
		}
		this.coloreQui();
		this.coloraCella(this.colore);
	}
}
