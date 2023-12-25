// // Import vendor jQuery plugin example
import bootstrap from 'bootstrap'
import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {

	function handleFormControlReset() {
		const formControlResets = document.querySelectorAll('.form-control-reset');
	
		if (formControlResets.length > 0) {
			formControlResets.forEach(function(formControlReset) {
				const input = formControlReset.querySelector('input');
				const btnReset = formControlReset.querySelector('.btn-reset');
		
				input.addEventListener('input', function() {
					if (input.value.trim() !== '') {
						formControlReset.classList.add('is-show');
					} else {
						formControlReset.classList.remove('is-show');
					}
				});
		
				btnReset.addEventListener('click', function() {
					input.value = '';
					formControlReset.classList.remove('is-show');
				});
			});
		}
	}
	
	function allowNumbersOnly() {
		const formControlNumbers = document.querySelectorAll('.form-control-numbers');
	
		if (formControlNumbers.length > 0) {
			formControlNumbers.forEach(function(input) {
				input.addEventListener('input', function(event) {
					const value = event.target.value;
					const numbersOnly = value.replace(/\D/g, '');
					event.target.value = numbersOnly;
		
					const formControlReset = input.closest('.form-control-reset');
					if (formControlReset) {
						const resetInput = formControlReset.querySelector('input');
						if (resetInput.value.trim() === '') {
							formControlReset.classList.remove('is-show');
						}
					}
				});
			});
		}
	}
	
	handleFormControlReset();
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
