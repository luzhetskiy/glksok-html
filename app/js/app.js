// import bootstrap from 'bootstrap'
import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {

	function restrictInputToHex() {
		const formControlID = document.querySelectorAll('.form-control-id');

		if (formControlID.length > 0) {
			formControlID.forEach(function (input) {
				input.addEventListener('input', function () {
					const value = this.value.replace(/[^0-9A-Fa-f]/g, '');
					this.value = value;

					if (!value) {
						this.classList.add('is-invalid');
						this.parentElement.classList.add('is-invalid');
					} else {
						this.classList.remove('is-invalid');
						this.parentElement.classList.remove('is-invalid');
					}
				});
			});
		}
	}

	function handleFormControlReset() {
		const formControlResets = document.querySelectorAll('.form-control-reset');

		if (formControlResets.length > 0) {
			formControlResets.forEach(function (formControlReset) {
				const input = formControlReset.querySelector('input');
				const btnReset = formControlReset.querySelector('.btn-reset');
				const form = formControlReset.closest('.needs-validation');
				const btnSubmit = form.querySelector('.btn-disabled[type="submit"]');
				const inputs = form.querySelectorAll('input:required');
				const selects = form.querySelectorAll('select:required');

				input.addEventListener('input', function () {
					if (input.value.trim() !== '') {
						formControlReset.classList.add('is-show');
					} else {
						formControlReset.classList.remove('is-show');
					}

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled');
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled');
						}
					}
				});

				btnReset.addEventListener('click', function () {
					input.value = '';
					formControlReset.classList.remove('is-show');

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled');
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled');
						}
					}
				});

				function checkAllInputsFilled() {
					let allFieldsFilled = true;
					inputs.forEach(input => {
						if (input.value.trim() === '') {
							allFieldsFilled = false;
						}
					});
					selects.forEach(select => {
						if (select.value.trim() === '') {
							allFieldsFilled = false;
						}
					});
					return allFieldsFilled;
				}
			});
		}
	}

	function allowNumbersOnly() {
		const formControlNumbers = document.querySelectorAll('.form-control-numbers');

		if (formControlNumbers.length > 0) {
			formControlNumbers.forEach(function (input) {
				input.addEventListener('input', function (event) {
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

					if (!/^\d{1,}$/.test(numbersOnly)) {
						this.classList.add('is-invalid');
						this.parentElement.classList.add('is-invalid');
					} else {
						this.classList.remove('is-invalid');
						this.parentElement.classList.remove('is-invalid');
					}
				});
			});
		}
	}

	restrictInputToHex();
	handleFormControlReset();
	allowNumbersOnly();

	const formsValidation = document.querySelectorAll('.needs-validation');

	if (formsValidation.length > 0) {
		Array.from(formsValidation).forEach(form => {
			const btnSubmit = form.querySelector('.btn-disabled[type="submit"]');
			const inputs = form.querySelectorAll('input:required');
			const selects = form.querySelectorAll('select:required');

			function checkAllInputsFilled() {
				let allFieldsFilled = true;
				inputs.forEach(input => {
					if (input.value.trim() === '') {
						allFieldsFilled = false;
					}
				});
				selects.forEach(select => {
					if (select.value.trim() === '') {
						allFieldsFilled = false;
					}
				});
				return allFieldsFilled;
			}

			form.addEventListener('submit', event => {
				inputs.forEach(input => {
					if (input.value.trim() === '') {
						input.classList.add('is-invalid');
						input.parentElement.classList.add('is-invalid');
					}
				});

				selects.forEach(select => {
					if (select.value.trim() === '') {
						select.parentElement.parentElement.classList.add('is-invalid');
						select.parentElement.parentElement.parentElement.classList.add('is-invalid');
					}
				});

				if (!form.checkValidity() || !checkAllInputsFilled()) {
					event.preventDefault();
					event.stopPropagation();
				}
			});

			inputs.forEach(input => {
				input.addEventListener('input', function () {
					if (this.value.trim() === '') {
						this.classList.add('is-invalid');
						this.parentElement.classList.add('is-invalid');
					} else {
						this.classList.remove('is-invalid');
						this.parentElement.classList.remove('is-invalid');
					}

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled');
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled');
						}
					}
				});
			});

			selects.forEach(select => {
				select.addEventListener('change', function () {
					if (this.value.trim() === '') {
						this.parentElement.parentElement.classList.add('is-invalid');
						this.parentElement.parentElement.parentElement.classList.add('is-invalid');
					} else {
						this.parentElement.parentElement.classList.remove('is-invalid');
						this.parentElement.parentElement.parentElement.classList.remove('is-invalid');
					}

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled');
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled');
						}
					}
				});
			});
		});
	}



	const filtersInput = document.querySelector('.filters')
	const tableFilters = document.querySelectorAll('[data-filter]')

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
