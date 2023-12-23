// // Import vendor jQuery plugin example
import bootstrap from 'bootstrap'
import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {

	function allowNumbersOnly() {
		const formControlNumbers = document.querySelectorAll('.form-control-numbers');
		
		if (formControlNumbers.length > 0) {
			formControlNumbers.forEach(function(input) {
				input.addEventListener('input', function(event) {
					const value = event.target.value;
					const numbersOnly = value.replace(/\D/g, '');
					event.target.value = numbersOnly;
				});
			});
		}
	}
	
	allowNumbersOnly();

	const jsFormSelects = document.querySelectorAll('.js-form-select');

	const selectConfig = {
		placeholder: true,
		searchEnabled: false,
		shouldSort: false,
		itemSelectText: '',
	}

	jsFormSelects.forEach((select) => {
		const choices = new Choices(select, selectConfig)
	})


})
