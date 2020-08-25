export function importMe(secretRequest) {
	if(secretRequest === 'gimme my favorite color !') {
		return Promise.resolve({color: 'crimson'});
	}
	return Promise.resolve({color: 'red'});
}
