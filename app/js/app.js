import Choices from 'choices.js'
import VanillaCalendar from 'vanilla-calendar-pro'
import { Fancybox } from "@fancyapps/ui"
import Swiper from 'swiper'
import { Manipulation, Navigation, Pagination } from 'swiper/modules'

document.addEventListener('DOMContentLoaded', () => {

	const backButton = document.querySelector('#backButton')

	if (backButton) {
		backButton.addEventListener('click', function () {
			history.back()
		})
	}



	function createPrevIcon() {
		const span = document.createElement('span')
		span.className = 'icon'

		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/icons/swiper-arrow-prev.svg#svg-swiper-arrow-prev')

		svg.appendChild(use)
		span.appendChild(svg)

		return span
	}

	function createNextIcon() {
		const span = document.createElement('span')
		span.className = 'icon'

		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/icons/swiper-arrow-next.svg#svg-swiper-arrow-next')

		svg.appendChild(use)
		span.appendChild(svg)

		return span
	}

	const bannerSwiperClass = document.querySelectorAll('.swiper-banner')
	const articleSwiperClass = document.querySelectorAll('.swiper-article')
	const infrastructureSwiperClass = document.querySelectorAll('.swiper-infrastructure')
	const skipassSwiperClass = document.querySelectorAll('.swiper-skipass')
	const allNavigationNext = document.querySelectorAll('.swiper-button-next')
	const allNavigationPrev = document.querySelectorAll('.swiper-button-prev')

	bannerSwiperClass?.forEach((element) => {
		const swiperElement = element.querySelector('.swiper')
		const navigationNext = element.querySelector('.swiper-button-next')
		const navigationPrev = element.querySelector('.swiper-button-prev')
		const pagination = element.querySelector('.swiper-pagination')

		new Swiper(swiperElement, {
			modules: [Navigation, Pagination],
			spaceBetween: 24,

			pagination: {
				el: pagination,
				clickable: true,
			},

			navigation: {
				nextEl: navigationNext,
				prevEl: navigationPrev,
			},
		})
	})

	articleSwiperClass?.forEach((element) => {
		const swiperElement = element.querySelector('.swiper')

		new Swiper(swiperElement, {
			slidesPerView: 'auto',
			spaceBetween: 32,
			observeSlideChildren: true,

			breakpoints: {
				0: {
					slidesPerView: 'auto',
					spaceBetween: 16
				},
				992: {
					slidesPerView: 'auto',
					spaceBetween: 32,
				}
			}
		})
	})

	infrastructureSwiperClass?.forEach((element) => {
		const swiperElement = element.querySelector('.swiper')
		const pagination = element.querySelector('.swiper-pagination')

		new Swiper(swiperElement, {
			modules: [Pagination],
			spaceBetween: 24,

			pagination: {
				el: pagination,
				clickable: true,
			},
		})
	})

	skipassSwiperClass?.forEach((element) => {
		const swiperElement = element.querySelector('.swiper')
		const navigationNext = element.querySelector('.swiper-button-next')
		const navigationPrev = element.querySelector('.swiper-button-prev')
		const pagination = element.querySelector('.swiper-pagination')

		const swiperInstance = new Swiper(swiperElement, {
			modules: [Manipulation, Navigation, Pagination],
			spaceBetween: 24,

			pagination: {
				el: pagination,
				clickable: true,
			},

			navigation: {
				nextEl: navigationNext,
				prevEl: navigationPrev,
			},
		})

		element.querySelectorAll('.swiper-slide-remove').forEach((button) => {
			button.addEventListener('click', (event) => {
				const slide = button.closest('.swiper-slide')
				if (slide) {
					slide.classList.add('swiper-slide-fade-out')

					setTimeout(() => {
						const index = Array.from(swiperInstance.slides).indexOf(slide)
						if (index !== -1) {
							swiperInstance.removeSlide(index)

							if (swiperInstance.slides.length === 0) {
								swiperInstance.destroy(true, true)
								element.remove()
							}
						}
					}, 400)
				}
			})
		})
	})

	allNavigationNext.forEach(button => {
		const icon = createNextIcon()
		button.appendChild(icon)
	})

	allNavigationPrev.forEach(button => {
		const icon = createPrevIcon()
		button.appendChild(icon)
	})



	Fancybox.bind("[data-fancybox]", {
		groupAttr: "data-fancybox",
		groupAll: false,
		autoFocus: false,
	})



	function restrictInputToHex() {
		const formControlID = document.querySelectorAll('.form-control-id')

		if (formControlID.length > 0) {
			formControlID.forEach(function (input) {
				input.addEventListener('input', function () {
					const value = this.value.replace(/[^0-9A-Fa-f]/g, '')
					this.value = value

					if (!value) {
						this.classList.add('is-invalid')
						this.parentElement.classList.add('is-invalid')
					} else {
						this.classList.remove('is-invalid')
						this.parentElement.classList.remove('is-invalid')
					}
				})
			})
		}
	}

	function handleFormControlReset() {
		const formControlResets = document.querySelectorAll('.form-control-reset')

		if (formControlResets.length > 0) {
			formControlResets.forEach(function (formControlReset) {
				const textarea = formControlReset.querySelector('textarea')
				const input = formControlReset.querySelector('input')
				const btnReset = formControlReset.querySelector('.btn-reset')
				const btnReveal = formControlReset.querySelector('.btn-reveal')
				const form = formControlReset.closest('.needs-validation')
				const btnSubmit = form.querySelector('.btn-disabled[type="submit"]')
				const inputs = form.querySelectorAll('input:required')
				const selects = form.querySelectorAll('select:required')

				if (input) {
					input.addEventListener('input', function () {
						if (input.value.trim() !== '') {
							formControlReset.classList.add('is-show')
						} else {
							formControlReset.classList.remove('is-show')
						}

						if (checkAllInputsFilled()) {
							if (btnSubmit) {
								btnSubmit.removeAttribute('disabled')
							}
						} else {
							if (btnSubmit) {
								btnSubmit.setAttribute('disabled', 'disabled')
							}
						}
					})
				}

				if (textarea) {
					textarea.addEventListener('input', function () {
						if (textarea.value.trim() !== '') {
							formControlReset.classList.add('is-show')
						} else {
							formControlReset.classList.remove('is-show')
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
								input.type = 'text'
							} else {
								input.type = 'password'
							}
						}
					})
				}

				if (btnReset) {
					btnReset.addEventListener('click', function () {
						if (input) {
							input.value = ''
						}
						if (textarea) {
							textarea.value = ''
						}
						formControlReset.classList.remove('is-show')

						if (checkAllInputsFilled()) {
							if (btnSubmit) {
								btnSubmit.removeAttribute('disabled')
							}
						} else {
							if (btnSubmit) {
								btnSubmit.setAttribute('disabled', 'disabled')
							}
						}
					})
				}

				function checkAllInputsFilled() {
					let allFieldsFilled = true
					inputs.forEach(input => {
						if (input.value.trim() === '') {
							allFieldsFilled = false
						}
					})
					selects.forEach(select => {
						if (select.value.trim() === '') {
							allFieldsFilled = false
						}
					})
					return allFieldsFilled
				}
			})
		}
	}

	function allowNumbersOnly() {
		const formControlNumbers = document.querySelectorAll('.form-control-numbers')

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

					if (!/^\d{1,}$/.test(numbersOnly)) {
						this.classList.add('is-invalid')
						this.parentElement.classList.add('is-invalid')
					} else {
						this.classList.remove('is-invalid')
						this.parentElement.classList.remove('is-invalid')
					}
				})
			})
		}
	}

	restrictInputToHex()
	handleFormControlReset()
	allowNumbersOnly()

	const formsValidation = document.querySelectorAll('.needs-validation')

	if (formsValidation.length > 0) {
		Array.from(formsValidation).forEach(form => {
			const btnSubmit = form.querySelector('.btn-disabled[type="submit"]')
			const inputs = form.querySelectorAll('input:required')
			const selects = form.querySelectorAll('select:required')

			function checkAllInputsFilled() {
				let allFieldsFilled = true
				inputs.forEach(input => {
					if (input.value.trim() === '') {
						allFieldsFilled = false
					}
				})
				selects.forEach(select => {
					if (select.value.trim() === '') {
						allFieldsFilled = false
					}
				})
				return allFieldsFilled
			}

			form.addEventListener('submit', event => {
				inputs.forEach(input => {
					if (input.value.trim() === '') {
						input.classList.add('is-invalid')
						input.parentElement.classList.add('is-invalid')
					}
				})

				selects.forEach(select => {
					if (select.value.trim() === '') {
						select.parentElement.parentElement.classList.add('is-invalid')
						select.parentElement.parentElement.parentElement.classList.add('is-invalid')
					}
				})

				if (!form.checkValidity() || !checkAllInputsFilled()) {
					event.preventDefault()
					event.stopPropagation()
				}
			})

			inputs.forEach(input => {
				input.addEventListener('input', function () {
					if (this.value.trim() === '') {
						this.classList.add('is-invalid')
						this.parentElement.classList.add('is-invalid')
					} else {
						this.classList.remove('is-invalid')
						this.parentElement.classList.remove('is-invalid')
					}

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled')
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled')
						}
					}
				})
			})

			selects.forEach(select => {
				select.addEventListener('change', function () {
					if (this.value.trim() === '') {
						this.parentElement.parentElement.classList.add('is-invalid')
						this.parentElement.parentElement.parentElement.classList.add('is-invalid')
					} else {
						this.parentElement.parentElement.classList.remove('is-invalid')
						this.parentElement.parentElement.parentElement.classList.remove('is-invalid')
					}

					if (checkAllInputsFilled()) {
						if (btnSubmit) {
							btnSubmit.removeAttribute('disabled')
						}
					} else {
						if (btnSubmit) {
							btnSubmit.setAttribute('disabled', 'disabled')
						}
					}
				})
			})
		})
	}



	let selectedDates = []
	const tableFilters = document.querySelectorAll('[data-filter]')
	const noResultsBlock = document.querySelector('[data-filter-result]')
	const btnMore = document.querySelector('[data-filter-more]')

	function applyAllFilters() {
		const selectedFilters = Array.from(document.querySelectorAll('[data-filter-action]'))
			.flatMap(group => {
				const checkboxValue = group.querySelector('input[type="checkbox"]:checked')?.id
				const activeButtonId = group.querySelector('button.active')?.id
				return [checkboxValue, activeButtonId].filter(Boolean)
			})

		let visibleCount = 0

		tableFilters.forEach(function (row) {
			const dataLoadingMore = row.getAttribute('data-loading-more')
			const rowFilters = row.dataset.filter.split(' ')
			const calendarDay = row.getAttribute('data-filter-day')
			const isVisible = selectedFilters.every(filter => rowFilters.includes(filter))
			const isDateMatch = selectedDates.length === 0 || selectedDates.includes(calendarDay)
			const parentSwiperSlide = row.closest('.swiper-slide')

			const toggleVisibility = (shouldShow) => {
				if (shouldShow) {
					parentSwiperSlide ? parentSwiperSlide.classList.remove('d-none') : null
					row.classList.remove('d-none')
					visibleCount++
				} else {
					parentSwiperSlide ? parentSwiperSlide.classList.add('d-none') : null
					row.classList.add('d-none')
				}
			}

			if (!dataLoadingMore) {
				toggleVisibility(isVisible && isDateMatch)
			} else if (dataLoadingMore === 'false') {
				if (selectedDates.length === 0) {
					toggleVisibility(false)
					btnMore.classList.remove('d-none')

					if (!isVisible) {
						btnMore.classList.add('d-none')
					}
				} else if (selectedDates.includes(calendarDay)) {
					toggleVisibility(true)
					toggleVisibility(isVisible)
				} else if (!selectedDates.includes(calendarDay)) {
					toggleVisibility(false)
					btnMore.classList.add('d-none')
				}
			} else if (dataLoadingMore === 'true') {
				toggleVisibility(isVisible && isDateMatch)
			}
		})

		if (visibleCount === 0) {
			noResultsBlock?.classList.remove('d-none')
			tableFilters.length > 0 ? btnMore?.classList.add('d-none') : null
		} else {
			noResultsBlock?.classList.add('d-none')
		}

		articleSwiperClass?.forEach((element) => {
			const swiperInstance = element.querySelector('.swiper').swiper

			swiperInstance ? swiperInstance.update() : null
		})
	}

	document.querySelectorAll('[data-filter-action]').forEach(function (filtersGroup) {
		// Для checkbox
		filtersGroup.addEventListener('change', function (event) {
			const checkbox = event.target
			if (checkbox.type === 'checkbox' && checkbox.checked) {
				filtersGroup.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
					if (cb !== checkbox) {
						cb.checked = false
					}
				})
			}
			applyAllFilters()
		})

		// Для кнопок
		filtersGroup.addEventListener('click', function (event) {
			const button = event.target.closest('button')
			if (button) {
				filtersGroup.querySelectorAll('button').forEach(btn => btn.classList.remove('active'))
				button.classList.add('active')
				applyAllFilters()
			}
		})
	})

	applyAllFilters()

	btnMore?.addEventListener('click', () => {
		const hiddenCards = document.querySelectorAll('[data-loading-more="false"]')

		if (hiddenCards.length === 0) {
			btnMore.classList.add('d-none')
			return
		}

		const spinner = btnMore.querySelector('.spinner-border')
		spinner.classList.remove('d-none')

		let shownCount = 0

		setTimeout(() => {
			for (const card of hiddenCards) {
				if (tableFilters.length > 0) {
					const rowFilters = card.dataset.filter.split(' ')
					const isVisible = Array.from(document.querySelectorAll('[data-filter-action]'))
						.map(group => group.querySelector('input[type="checkbox"]:checked')?.value)
						.filter(Boolean)
						.every(filter => rowFilters.includes(filter))

					const calendarDay = card.getAttribute('data-filter-day')
					const isDateMatch = selectedDates.length === 0 || selectedDates.includes(calendarDay)

					if (isVisible && isDateMatch) {
						card.classList.remove('d-none')
						card.setAttribute('data-loading-more', 'true')
						shownCount++
					}
				} else {
					card.classList.remove('d-none')
					card.setAttribute('data-loading-more', 'true')
					shownCount++
				}

				if (shownCount >= 4) {
					break
				}
			}

			if (hiddenCards.length === 0 || shownCount === hiddenCards.length) {
				btnMore.classList.add('d-none')
			}

			spinner.classList.add('d-none')
		}, 1000)
	})



	const jsFormSelects = document.querySelectorAll('.js-form-select')

	const selectConfig = {
		allowHTML: true,
		placeholder: true,
		searchEnabled: false,
		shouldSort: false,
		itemSelectText: '',
	}

	jsFormSelects.forEach((select) => {
		new Choices(select, selectConfig)
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



	const successSignUpModalId = 'successSignUp'
	const successSignUpModal = document.querySelector(`#${successSignUpModalId}`)

	if (successSignUpModal && !localStorage.getItem(successSignUpModalId)) {
		const bootstrapModal = new bootstrap.Modal(successSignUpModal)
		bootstrapModal.show()

		localStorage.setItem(successSignUpModalId, 'true')
	}



	function draggable() {
		const draggableZones = document.querySelectorAll('.draggable-zone')
		let draggedItem = null
		let draggedHandle = null
		let draggableZone = null
		let touchStartX, touchStartY
		let touchStartTime = 0
		const holdDuration = 1000

		draggableZones.forEach(zone => {
			const draggableItems = zone.querySelectorAll('.draggable')

			draggableItems.forEach((item, index) => {
				const draggableHandle = item.querySelector('.draggable-handle')

				draggableHandle.setAttribute('draggable', 'true')

				draggableHandle.addEventListener('dragstart', dragStart)
				draggableHandle.addEventListener('dragend', dragEnd)

				draggableHandle.addEventListener('touchstart', touchStart)

				item.addEventListener('dragover', dragOver)
				item.addEventListener('dragleave', dragLeave)
				item.addEventListener('drop', drop)
				item.setAttribute('data-position', index + 1)
			})
		})

		function dragStart(event) {
			event.dataTransfer.setData('text/html', event.target.outerHTML)
			event.dataTransfer.setData('text/plain', 'dragged')
			draggedItem = event.target.closest('.draggable')
			draggedItem.classList.add('dragging')
		}

		function dragEnd(event) {
			draggedItem.classList.remove('dragging')
			draggedItem = null
		}

		function dragOver(event) {
			event.preventDefault()

			const target = event.target.closest('.draggable')

			if (draggedItem && draggedItem !== target) {
				target.classList.add('dragover')
			}
		}

		function dragLeave(event) {
			const target = event.target.closest('.draggable')

			if (draggedItem && draggedItem !== target) {
				target.classList.remove('dragover')
			}
		}

		function drop(event) {
			event.preventDefault()

			const dragged = event.dataTransfer.getData('text/plain')
			const draggableZone = draggedItem.closest('.draggable-zone')
			if (dragged === 'dragged') {
				const target = event.target.closest('.draggable')

				if (draggedItem && draggedItem !== target) {
					const temp = document.createElement('div')
					draggedItem.parentNode.insertBefore(temp, draggedItem)
					target.parentNode.insertBefore(draggedItem, target)
					temp.parentNode.insertBefore(target, temp)
					temp.parentNode.removeChild(temp)

					const draggableItems = draggableZone.querySelectorAll('.draggable')
					draggableItems.forEach((item, index) => {
						item.setAttribute('data-position', index + 1)
					})
				}
			}

			const draggableItems = draggableZone.querySelectorAll('.draggable')
			draggableItems.forEach(item => {
				item.classList.remove('dragover')
			})
		}

		function touchStart(event) {
			touchStartX = event.touches[0].clientX
			touchStartY = event.touches[0].clientY
			draggedItem = event.target.closest('.draggable')
			draggedHandle = draggedItem.querySelector('.draggable-handle')
			draggableZone = draggedItem.closest('.draggable-zone')
			touchStartTime = Date.now()
			draggedHandle.draggable = false

			setTimeout(() => {
				if (draggedItem && Date.now() - touchStartTime >= holdDuration) {

					draggedItem.classList.add('dragging')
					event.target.addEventListener('touchmove', touchMove)
					document.documentElement.style.overflow = 'hidden'
				}
			}, holdDuration)

			event.target.addEventListener('touchend', touchEnd)
		}

		function touchMove(event) {
			event.preventDefault()

			const touch = event.touches[0]
			const offsetX = touch.clientX - touchStartX
			const offsetY = touch.clientY - touchStartY

			draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`
			draggedItem.style.pointerEvents = 'none'
			draggedItem.style.position = 'relative'
			draggedItem.style.zIndex = '1'

			const target = document.elementFromPoint(touch.clientX, touch.clientY)

			const draggableItems = draggableZone.querySelectorAll('.draggable')
			draggableItems.forEach(item => {
				item.classList.remove('dragover')
			})

			const targetDraggable = target.closest('.draggable')
			if (targetDraggable && targetDraggable !== draggedItem) {
				targetDraggable.classList.add('dragover')
			}
		}

		function touchEnd(event) {
			event.target.removeEventListener('touchmove', touchMove)
			event.target.removeEventListener('touchend', touchEnd)

			draggedItem.classList.remove('dragging')
			draggedItem.style = ''
			document.documentElement.style = ''

			const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
			const targetDraggable = target.closest('.draggable')

			if (draggedItem && targetDraggable && draggedItem !== targetDraggable) {
				const draggableItems = draggableZone.querySelectorAll('.draggable')
				const draggedIndex = Array.from(draggableItems).indexOf(draggedItem)
				const targetIndex = Array.from(draggableItems).indexOf(targetDraggable)

				if (draggedIndex > targetIndex) {
					draggableZone.insertBefore(draggedItem, targetDraggable)
				} else {
					draggableZone.insertBefore(draggedItem, targetDraggable.nextSibling)
				}

				const updatedDraggableItems = draggableZone.querySelectorAll('.draggable')
				updatedDraggableItems.forEach((item, index) => {
					item.setAttribute('data-position', index + 1)
				})
			}

			const draggableItems = draggableZone.querySelectorAll('.draggable')
			draggableItems.forEach(item => {
				item.classList.remove('dragover')
			})

			draggedHandle.draggable = true
			draggedItem = null
			draggableZone = null
		}
	}

	draggable()



	const handleResponsiveMove = () => {
		document.querySelectorAll('[data-move-target]').forEach((element) => {
			const targetSelector = element.dataset.moveTarget
			const breakpoint = parseInt(element.dataset.moveBreakpoint, 10)
			const originalParent = element.parentElement
			const target = document.querySelector(`#${targetSelector}`)

			if (!element.dataset.originalParent) {
				element.dataset.originalParent = originalParent.id
			}

			const currentParent = element.parentElement

			if (window.innerWidth <= breakpoint) {
				if (currentParent !== target) {
					target.appendChild(element)
				}
			} else {
				const original = document.querySelector(`#${element.dataset.originalParent}`)
				if (currentParent !== original) {
					original.appendChild(element)
				}
			}
		})
	}

	window.addEventListener('resize', handleResponsiveMove)

	handleResponsiveMove()




	if (document.getElementById('map')) {
		ymaps.ready(() => {
			init()
		})
	}

	function init() {
		const myMap = new ymaps.Map("map", {
			center: [53.391736, 50.183302],
			zoom: 15,
			controls: []
		})

		const geoObjects = [
			new ymaps.Placemark([53.395533, 50.187212], {
				hintContent: "«Верхняя площадка»",
				balloonContent: "Здесь находится парковка"
			}, {
				preset: 'islands#blueParkingIcon'
			}),
			new ymaps.Placemark([53.389641, 50.172764], {
				hintContent: "«Нижняя площадка»",
				balloonContent: "Здесь находится парковка"
			}, {
				preset: 'islands#blueParkingIcon'
			})
		]

		const clusterer = new ymaps.Clusterer({
			preset: 'islands#blueClusterIcons',
			groupByCoordinates: false,
			clusterDisableClickZoom: false,
			clusterHideIconOnBalloonOpen: false,
			geoObjectHideIconOnBalloonOpen: false
		})

		clusterer.add(geoObjects)
		myMap.geoObjects.add(clusterer)

		window.addEventListener('resize', () => {
			myMap.container.fitToViewport()
		})
	}



	const calendarPopups = {
		'2024-11-13': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-11-14': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-11-15': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-11-22': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-11-24': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-12-11': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-12-12': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-12-13': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-12-20': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2024-12-22': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2025-01-15': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2025-01-16': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2025-01-17': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2025-01-23': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
		'2025-01-25': {
			modifier: 'vanilla-calendar-day__btn_secondary',
		},
	}

	const multipleTemplate = `
		<div class="vanilla-calendar-controls">
			<#ArrowPrev />
			<#ArrowNext />
		</div>
		<div class="vanilla-calendar-grid">
			<#Multiple>
				<div class="vanilla-calendar-column">
					<div class="vanilla-calendar-header">
						<div class="vanilla-calendar-header__content">
							<#Month />
							<#Year />
						</div>
					</div>
					<div class="vanilla-calendar-wrapper">
						<#WeekNumbers />
						<div class="vanilla-calendar-content">
							<#Week />
							<#Days />
						</div>
					</div>
				</div>
			<#/Multiple>
		</div>
		<#ControlTime />
	`

	function resetArrowVisibility(element, CSSClass) {
		element.querySelectorAll(`.${CSSClass}`)?.forEach(calendarArrow => {
			calendarArrow.style.visibility = ''
		})
	}

	function addArrowIcons(calendar, nextIcon, prevIcon) {
		const nextArrow = calendar.HTMLElement.querySelector(`.${calendar.CSSClasses.arrowNext}`)
		const prevArrow = calendar.HTMLElement.querySelector(`.${calendar.CSSClasses.arrowPrev}`)

		if (nextArrow && prevArrow) {
			nextArrow.appendChild(nextIcon)
			prevArrow.appendChild(prevIcon)
		}
	}

	const updateCalendarMonths = (calendar) => {
		const screenWidth = window.innerWidth

		if (screenWidth < 1200) {
			calendar.months = 2
		} else {
			calendar.months = 3
		}

		calendar.update()
		const prevIcon = createPrevIcon()
		const nextIcon = createNextIcon()
		addArrowIcons(calendar, nextIcon, prevIcon)
		resetArrowVisibility(calendar.HTMLElement, calendar.CSSClasses.arrow)
	}

	document.querySelectorAll('[data-calendar-quarter]').forEach((calendarQuarter) => {
		const prevIcon = createPrevIcon()
		const nextIcon = createNextIcon()
		const calendar = new VanillaCalendar(calendarQuarter, {
			type: 'multiple',
			DOMTemplates: {
				multiple: multipleTemplate
			},
			months: 3,
			settings: {
				lang: 'ru-RU',
				visibility: {
					theme: 'light',
					today: false,
					daysOutside: false,
				},
				selection: {
					month: false,
					year: false,
				},
			},
			actions: {
				clickArrow(e, self) {
					resetArrowVisibility(self.HTMLElement, self.CSSClasses.arrow)
				},
				clickDay(e, self) {
					const isEvent = e.target.closest('.vanilla-calendar-day__btn_secondary')
					selectedDates = isEvent ? self.selectedDates.join(',') : ''
					isEvent ? null : self.selectedDates = []

					applyAllFilters()
				},
			},
			popups: calendarPopups,
		})

		calendar.init()

		resetArrowVisibility(calendar.HTMLElement, calendar.CSSClasses.arrow)
		addArrowIcons(calendar, nextIcon, prevIcon)
		updateCalendarMonths(calendar)
		window.addEventListener('resize', () => updateCalendarMonths(calendar))
	})



	const gridButton = document.getElementById('articles-grid')
	const rowButton = document.getElementById('articles-row')
	const articlesContainer = document.querySelector('.events-articles')

	const updateView = (activeButton) => {
		// Если кнопка уже активна, выходим из функции
		if (activeButton.classList.contains('active')) return

		gridButton.classList.remove('active')
		rowButton.classList.remove('active')

		activeButton.classList.add('active')

		articlesContainer.classList.add('is-invisible')

		setTimeout(() => {
			if (activeButton.id === 'articles-row') {
				articlesContainer.classList.add('is-row')
			} else {
				articlesContainer.classList.remove('is-row')
			}
		}, 310)

		setTimeout(() => {
			articlesContainer.classList.remove('is-invisible')
		}, 320)
	}

	const initializeView = () => {
		if (gridButton.classList.contains('active')) {
			articlesContainer.classList.remove('is-row')
		} else if (rowButton.classList.contains('active')) {
			articlesContainer.classList.add('is-row')
		}
	}

	if (gridButton && rowButton && articlesContainer) {
		initializeView()

		gridButton.addEventListener('click', () => updateView(gridButton))
		rowButton.addEventListener('click', () => updateView(rowButton))
	}



	const checkboxItems = document.querySelectorAll('[data-item-checkbox]')

	checkboxItems?.forEach((element) => {
		const checkbox = element.querySelector('input[type="checkbox"]')

		const toggleActiveClass = () => {
			if (checkbox.checked) {
				element.classList.add('active')
			} else {
				element.classList.remove('active')
			}
		}

		toggleActiveClass()

		checkbox.addEventListener('change', toggleActiveClass)
	})



	const shortProductElement = document.querySelector('[data-short-product]')

	if (shortProductElement) {
		const updateHeightVariable = () => document.documentElement.style.setProperty('--short-product-height', `${Math.round(shortProductElement.getBoundingClientRect().height)}px`)

		updateHeightVariable()
		window.addEventListener('resize', updateHeightVariable)
	}


})