class MyItProfessional {
	constructor (name = '', ageOfWork = 0) {
		this.name = name;
		this.ageOfWork = ageOfWork;
	}

	get position() {
		return this.ageOfWork < 2 ? 'junior' : this.ageOfWork < 5 ? 'mid' : 'senior';
	}

	set position(value) {
		switch(value) {
			case 'junior':
				this.ageOfWork = 1;
			break;
			case 'mid':
				this.ageOfWork = 2;
			break;
			case 'senior':
				this.ageOfWork = 5;
			break;
			default:
				console.log('sorry, unknown position:', value);
		}
	}
}

const maurice = new MyItProfessional('Maurice', 10);

console.log(Object.keys(maurice));

