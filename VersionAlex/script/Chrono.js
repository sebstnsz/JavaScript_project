class Chrono {
	constructor() {
		this.tic=0;
		this.sec=0;
	}
	increment() {
		this.tic++;
		if(this.tic%60 == 0) this.sec++;
	}
}