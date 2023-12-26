// import bootstrap from 'bootstrap'
import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {

	function handleFormControlReset() {
		const formControlResets = document.querySelectorAll('.form-control-reset')

		if (formControlResets.length > 0) {
			formControlResets.forEach(function (formControlReset) {
				const input = formControlReset.querySelector('input')
				const btnReset = formControlReset.querySelector('.btn-reset')

				input.addEventListener('input', function () {
					if (input.value.trim() !== '') {
						formControlReset.classList.add('is-show')
					} else {
						formControlReset.classList.remove('is-show')
					}
				});

				btnReset.addEventListener('click', function () {
					input.value = ''
					formControlReset.classList.remove('is-show')
				});
			});
		}
	}

	function allowNumbersOnly() {
		const formControlNumbers = document.querySelectorAll('.form-control-numbers');

		if (formControlNumbers.length > 0) {
			formControlNumbers.forEach(function (input) {
				input.addEventListener('input', function (event) {
					const value = event.target.value
					const numbersOnly = value.replace(/\D/g, '')
					event.target.value = numbersOnly

					const formControlReset = input.closest('.form-control-reset')
					if (formControlReset) {
						const resetInput = formControlReset.querySelector('input')
						if (resetInput.value.trim() === '') {
							formControlReset.classList.remove('is-show')
						}
					}
				})
			})
		}
	}

	handleFormControlReset();
	allowNumbersOnly();



	const filtersInput = document.querySelector('.filters');
	const tableFilters = document.querySelectorAll('[data-filter]');

	if (filtersInput && tableFilters.length > 0) {
		function applyFilters() {
			const checkedCheckbox = filtersInput.querySelector('input[type="checkbox"]:checked');

			tableFilters.forEach(function (row) {
				const rowFilters = row.dataset.filter.split(' ');
				const isVisible = !checkedCheckbox || rowFilters.includes(checkedCheckbox.value);

				if (isVisible) {
					row.classList.remove('is-hidden');
				} else {
					row.classList.add('is-hidden');
				}
			});
		}

		filtersInput.addEventListener('change', function (event) {
			const checkbox = event.target;

			if (checkbox.type === 'checkbox' && checkbox.checked) {
				filtersInput.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
					if (checkbox !== event.target) {
						checkbox.checked = false;
					}
				});
			}

			applyFilters();
		});

		applyFilters();
	}



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



	const tabOverflow = document.querySelector('#tabOverflow')
	const signinTab = document.querySelector('#signin-tab')
	const tabPaneCard = document.querySelector('#signin-tab-card')
	const hiddenClass = 'd-none'

	if (tabOverflow && signinTab && tabPaneCard) {
		tabOverflow.addEventListener('show.bs.tab', handleTabOverflow)
		signinTab.addEventListener('shown.bs.tab', handleSigninTab)
		handleSigninTab()
	}

	function handleTabOverflow(event) {
		if (event.target.id === 'signin-tab' && signinTab.classList.contains('active')) {
			// tabPaneCard.classList.remove(showClass)
			tabPaneCard.classList.add(hiddenClass)
		} else {
			tabPaneCard.classList.remove(hiddenClass)
			// tabPaneCard.classList.add(showClass)
		}
	}

	function handleSigninTab() {
		if (signinTab.classList.contains('active')) {
			// tabPaneCard.classList.remove(showClass)
			tabPaneCard.classList.add(hiddenClass)
		} else {
			tabPaneCard.classList.remove(hiddenClass)
			// tabPaneCard.classList.add(showClass)
		}
	}



	const successSignUpModalId = 'successSignUp';
	const successSignUpModal = document.querySelector(`#${successSignUpModalId}`);

	if (successSignUpModal && !localStorage.getItem(successSignUpModalId)) {
		const bootstrapModal = new bootstrap.Modal(successSignUpModal);
		bootstrapModal.show();

		localStorage.setItem(successSignUpModalId, 'true');
	}


})
