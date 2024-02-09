// import bootstrap from 'bootstrap'
import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {

	const backButton = document.querySelector('#backButton');

	if (backButton) {
		backButton.addEventListener('click', function () {
			history.back();
		});
	}

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
				const textarea = formControlReset.querySelector('textarea');
				const input = formControlReset.querySelector('input');
				const btnReset = formControlReset.querySelector('.btn-reset');
				const btnReveal = formControlReset.querySelector('.btn-reveal');
				const form = formControlReset.closest('.needs-validation');
				const btnSubmit = form.querySelector('.btn-disabled[type="submit"]');
				const inputs = form.querySelectorAll('input:required');
				const selects = form.querySelectorAll('select:required');

				if (input) {
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
				}

				if (textarea) {
					textarea.addEventListener('input', function () {
						if (textarea.value.trim() !== '') {
							formControlReset.classList.add('is-show');
						} else {
							formControlReset.classList.remove('is-show');
						}
					})
				}

				if (btnReveal) {
					btnReveal.addEventListener('click', function () {
						btnReveal.classList.toggle('is-show')

						if (!input) {
							return
						} else {
							if (btnReveal.classList.contains('is-show')) {
								input.type = 'text';
							} else {
								input.type = 'password';
							}
						}
					})
				}

				if (btnReset) {
					btnReset.addEventListener('click', function () {
						if (input) {
							input.value = '';
						}
						if (textarea) {
							textarea.value = '';
						}
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
				}

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
		allowHTML: true,
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



	function draggable() {
		const draggableZones = document.querySelectorAll('.draggable-zone');
		let draggedItem = null;
		let draggedHandle = null;
		let draggableZone = null;
		let touchStartX, touchStartY;
		let touchStartTime = 0;
		const holdDuration = 1000;

		draggableZones.forEach(zone => {
			const draggableItems = zone.querySelectorAll('.draggable');

			draggableItems.forEach((item, index) => {
				const draggableHandle = item.querySelector('.draggable-handle');

				draggableHandle.setAttribute('draggable', 'true');

				draggableHandle.addEventListener('dragstart', dragStart);
				draggableHandle.addEventListener('dragend', dragEnd);

				draggableHandle.addEventListener('touchstart', touchStart);

				item.addEventListener('dragover', dragOver);
				item.addEventListener('dragleave', dragLeave);
				item.addEventListener('drop', drop);
				item.setAttribute('data-position', index + 1);
			});
		});

		function dragStart(event) {
			event.dataTransfer.setData('text/html', event.target.outerHTML);
			event.dataTransfer.setData('text/plain', 'dragged');
			draggedItem = event.target.closest('.draggable');
			draggedItem.classList.add('dragging');
		}

		function dragEnd(event) {
			draggedItem.classList.remove('dragging');
			draggedItem = null;
		}

		function dragOver(event) {
			event.preventDefault();

			const target = event.target.closest('.draggable');

			if (draggedItem && draggedItem !== target) {
				target.classList.add('dragover');
			}
		}

		function dragLeave(event) {
			const target = event.target.closest('.draggable');

			if (draggedItem && draggedItem !== target) {
				target.classList.remove('dragover');
			}
		}

		function drop(event) {
			event.preventDefault();

			const dragged = event.dataTransfer.getData('text/plain');
			const draggableZone = draggedItem.closest('.draggable-zone');
			if (dragged === 'dragged') {
				const target = event.target.closest('.draggable');

				if (draggedItem && draggedItem !== target) {
					const temp = document.createElement('div');
					draggedItem.parentNode.insertBefore(temp, draggedItem);
					target.parentNode.insertBefore(draggedItem, target);
					temp.parentNode.insertBefore(target, temp);
					temp.parentNode.removeChild(temp);

					const draggableItems = draggableZone.querySelectorAll('.draggable');
					draggableItems.forEach((item, index) => {
						item.setAttribute('data-position', index + 1);
					});
				}
			}

			const draggableItems = draggableZone.querySelectorAll('.draggable');
			draggableItems.forEach(item => {
				item.classList.remove('dragover');
			});
		}

		function touchStart(event) {
			touchStartX = event.touches[0].clientX;
			touchStartY = event.touches[0].clientY;
			draggedItem = event.target.closest('.draggable');
			draggedHandle = draggedItem.querySelector('.draggable-handle');
			draggableZone = draggedItem.closest('.draggable-zone');
			touchStartTime = Date.now();
			draggedHandle.draggable = false;

			setTimeout(() => {
				if (draggedItem && Date.now() - touchStartTime >= holdDuration) {

					draggedItem.classList.add('dragging');
					event.target.addEventListener('touchmove', touchMove);
					document.documentElement.style.overflow = 'hidden';
				}
			}, holdDuration);
			
			event.target.addEventListener('touchend', touchEnd);
		}

		function touchMove(event) {
			event.preventDefault();

			const touch = event.touches[0];
			const offsetX = touch.clientX - touchStartX;
			const offsetY = touch.clientY - touchStartY;

			draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			draggedItem.style.pointerEvents = 'none';
			draggedItem.style.position = 'relative';
			draggedItem.style.zIndex = '1';

			const target = document.elementFromPoint(touch.clientX, touch.clientY);

			const draggableItems = draggableZone.querySelectorAll('.draggable');
			draggableItems.forEach(item => {
				item.classList.remove('dragover');
			});

			const targetDraggable = target.closest('.draggable');
			if (targetDraggable && targetDraggable !== draggedItem) {
				targetDraggable.classList.add('dragover');
			}
		}

		function touchEnd(event) {
			event.target.removeEventListener('touchmove', touchMove);
			event.target.removeEventListener('touchend', touchEnd);
			
			draggedItem.classList.remove('dragging');
			draggedItem.style = '';
			document.documentElement.style = '';

			const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
			const targetDraggable = target.closest('.draggable');

			if (draggedItem && targetDraggable && draggedItem !== targetDraggable) {
				const draggableItems = draggableZone.querySelectorAll('.draggable');
				const draggedIndex = Array.from(draggableItems).indexOf(draggedItem);
				const targetIndex = Array.from(draggableItems).indexOf(targetDraggable);

				if (draggedIndex > targetIndex) {
					draggableZone.insertBefore(draggedItem, targetDraggable);
				} else {
					draggableZone.insertBefore(draggedItem, targetDraggable.nextSibling);
				}

				const updatedDraggableItems = draggableZone.querySelectorAll('.draggable');
				updatedDraggableItems.forEach((item, index) => {
					item.setAttribute('data-position', index + 1);
				});
			}

			const draggableItems = draggableZone.querySelectorAll('.draggable');
			draggableItems.forEach(item => {
				item.classList.remove('dragover');
			});

			draggedHandle.draggable = true;
			draggedItem = null;
			draggableZone = null;
		}
	}

	draggable();



})
