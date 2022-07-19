// Основные НОДы
let $game = document.querySelector('#game')
const $container = document.querySelector('#container')
const $header = document.querySelector('#header')
const $scoreBox = document.querySelector('#score-box')
const $bestBox = document.querySelector('#best-box')
const $menuList = document.querySelector('#menu-list')
const $menu = document.querySelector('#menu')
const $settings = document.querySelectorAll('#settings > div')
const $title = document.querySelector('#title')
const $about = document.querySelector('#about')
const $stn = document.querySelector('#settings')
const $lang = document.querySelectorAll('#lang > div')
const $speed = document.querySelectorAll('#speed > div')
const $field = document.querySelectorAll('#field > div')
const $arrow = document.querySelector('#arrow')
const $exit = document.querySelector('#exit')
const $warning = document.querySelector('#warning')
const $wBody = document.querySelector('#w-body')
const $wText = document.querySelector('#w-text')
const $wAnsvers = document.querySelectorAll('#w-body .ansvers > div')

// Прослушка событий
document.addEventListener('keydown', move)
$menuList.addEventListener('touchstart', menuClick)
document.addEventListener('click', menuClick)
$stn.addEventListener('click', setClick)
$arrow.addEventListener('click', back)
$exit.addEventListener('click', exit)
$warning.addEventListener('click', confirmExit)

function menuClick(event) {
	if (event.target.dataset.btn === 'settings') {
		$menuList.style.transition = '0.75s'
		$menuList.style.filter = 'opacity(0)'
		$title.style.top = '-5%'
		$stn.style.display = 'block'
		setTimeout(() => {
			$menuList.style.display = 'none'
			$settings.forEach(e => (e.style.display = 'flex'))
			$settings.forEach(e => (e.style.transition = '1s'))
			$settings.forEach(e => (e.style.transform = 'translateX(0px)'))
			$settings.forEach(e => (e.style.filter = 'opacity(1)'))
			$arrow.style = '--ar: 120vmin!important'
			$arrow.style.display = 'flex'
		}, 500)
	}
	if (event.target.dataset.btn === 'play') {
		$menu.style.transition = '1.5s'
		$menu.style.transform = 'scale(0)'
		new Promise(res => {
			setTimeout(() => {
				$menu.style.display = 'none'
				$container.style.display = 'flex'
				$game = document.querySelector('#game')
				$game.innerHTML = ''
				info = []
				for (let i = 0; i < $field.length; i++) {
					if ($field[i].classList.contains('active')) {
						size = +$field[i].dataset.field
					}
				}
				gameSize = $game.offsetWidth
				cellSize = Math.floor((gameSize * 0.98) / size)
				margin = ((gameSize - cellSize * size) / size) * (size / 1.6)
				score = 0
				$scoreBox.textContent = '0'
				if (size === 4) {
					$game.style = `--br:60px`
					$bestBox.textContent = +localStorage.getItem('bestScore4') > 0 ? +localStorage.getItem('bestScore4') : 0
				}
				if (size === 6) {
					$game.style = `--br:45px`
					$bestBox.textContent = +localStorage.getItem('bestScore6') > 0 ? +localStorage.getItem('bestScore6') : 0
				}
				if (size === 8) {
					$game.style = `--br:30px`
					$bestBox.textContent = +localStorage.getItem('bestScore8') > 0 ? +localStorage.getItem('bestScore8') : 0
				}
				$bestBox.style = `--b:'Best ${size}x${size}: '`
				res()
			}, 1500)
		}).then(() => {
			Box.create()
			Box.create()
			$menu.style.transform = 'scale(1)'
		}, 2000)
	}

	if (event.target.dataset.btn === 'about') {
		$menuList.style.transition = '0.75s'
		$menuList.style.filter = 'opacity(0)'
		$arrow.style = '--ar: 111vmin!important'
		$arrow.style.display = 'flex'
		$title.style.top = '0%'
		setTimeout(() => {
			$about.style.display = 'flex'
			$about.style.filter = 'opacity(1)'
			$about.style.transform = 'translateX(0px)'
			$menuList.style.display = 'none'
			$stn.style.display = 'block'
			$settings[0].style.display = 'flex'
			$settings[0].style.transform = 'translateX(0px)'
			$settings[0].style.filter = 'opacity(1)'
		}, 500)
	}

	if (event.target.dataset.btn === 'settings' || event.target.dataset.btn === 'about') {
		event.target.style.transition = '1s'
		event.target.style.transform = 'translateY(700px)'
		setTimeout(() => {
			event.target.style.transform = 'translateY(0px)'
		}, 1000)
	}
}

function setClick(event) {
	if (event.target.dataset.lang) {
		$lang[0].classList.remove('active')
		$lang[1].classList.remove('active')
		event.target.classList.add('active')
		lang = event.target.dataset.lang
		setLanguage(lang)
	}

	if (event.target.dataset.speed) {
		$speed[0].classList.remove('active')
		$speed[1].classList.remove('active')
		$speed[2].classList.remove('active')
		event.target.classList.add('active')
		speed = +event.target.dataset.speed
	}

	if (event.target.dataset.field) {
		$field[0].classList.remove('active')
		$field[1].classList.remove('active')
		$field[2].classList.remove('active')
		event.target.classList.add('active')
		size = +event.target.dataset.field
	}

	if (event.target.dataset.reset === 'res') {
		exit()
	}
}

function back() {
	$settings.forEach(e => (e.style.transition = '1s'))
	$settings.forEach(e => (e.style.transform = 'translateX(1500px)'))
	$settings.forEach(e => (e.style.filter = 'opacity(0)'))
	$about.style.transform = 'translateX(1500px)'
	$about.style.filter = 'opacity(0)'
	$title.style.top = '10%'
	setTimeout(() => {
		$settings.forEach(e => (e.style.display = 'none'))
		$about.style.display = 'none'
		$menuList.style.display = 'flex'
		$menuList.style.filter = 'opacity(1)'
		$stn.style.display = 'none'
	}, 500)
	$arrow.style.display = 'none'
}

function exit() {
	$warning.style.display = 'flex'
	$warning.style.background = 'rgba(0, 0, 0, 0.75)'
	setTimeout(() => {
		$wBody.style.transform = 'scale(1)'
		$wText.innerHTML = `Are you sure want to continue? <br/>All your current progress will be lose`
		$wAnsvers[0].textContent = 'Yes'
		$wAnsvers[1].textContent = 'No'
		$wAnsvers[0].style.fontSize = '120px'
		$wAnsvers[1].style.fontSize = '120px'
	}, 0)
}

function confirmExit(event) {
	if (event.target.dataset.ans === 'no') {
		$wBody.style.transform = 'scale(0)'
		$warning.style.background = 'rgba(0, 0, 0, 0)'
		setTimeout(() => {
			$warning.style.display = 'none'
		}, 1000)
	}
	if (event.target.dataset.ans === 'yes' && info.length > 0) {
		$menu.style.display = 'flex'
		$container.style.display = 'none'
		$warning.style.display = 'none'
	}

	if (event.target.dataset.ans === 'yes' && $settings[0].style.display === 'flex') {
		localStorage.clear()
		$wBody.style.transform = 'scale(0)'
		$warning.style.background = 'rgba(0, 0, 0, 0)'
		setTimeout(() => {
			$warning.style.display = 'none'
		}, 1000)
	}

	if (event.target.dataset.ans === 'yes' && event.target.textContent.toLowerCase() === 'menu') {
		$menu.style.display = 'flex'
		$container.style.display = 'none'
		$warning.style.display = 'none'
	}

	if (event.target.dataset.ans === 'no' && event.target.textContent.toLowerCase() === 'again') {
		$wBody.style.transform = 'scale(0)'
		$warning.style.background = 'rgba(0, 0, 0, 0)'
		document.querySelector('#game').innerHTML = ''
		$scoreBox.textContent = '0'
		info = []
		score = 0
		setTimeout(() => {
			$warning.style.display = 'none'
			Box.create()
			Box.create()
		}, 1000)
	}
}

// Основные переменные, необходимые для работы
let size = 4
let gameSize
let cellSize
let margin
let counter = 0
let score = 0
let oldScore = 0
let lang = 'eng'
let speed = 0.5
let info = []

$game.style = `--bg:(${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px, 20px 20px, 20px 20px)`
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

// Конструктор ячеек и их методов
class Box {
	constructor(value = 0, col, row) {
		const box = document.createElement('div')
		box.classList.add('box')
		box.style = `--t:${speed}s; --fs:${20 / size}vmin`
		box.style.width = box.style.height = `${92 / size}%`
		box.textContent = value
		$game.insertAdjacentElement('beforeend', box)

		this.el = box
		this.value = value
		this.col = col
		this.row = row
		this.counter = ++counter
		info.push(this)
	}

	set setRow(row) {
		this.row = row
		this.el.style.top = `${(this.row - 1) * cellSize + margin}px`
	}

	set setCol(col) {
		this.col = col
		this.el.style.left = `${(this.col - 1) * cellSize + margin}px`
	}

	set setValue(val) {
		this.value = val
		this.el.textContent = val > 0 ? val : ''
		this.el.style.transform = 'scale(1.1)'
		setTimeout(() => {
			this.el.style.transform = 'scale(1)'
		}, 500)

		if (this.value === 2048) {
			this.el.style.background = 'olive'
		} else if (this.value === 1024) {
			this.el.style.background = 'olivedrab'
		} else if (this.value === 512) {
			this.el.style.background = 'coral'
		} else if (this.value === 256) {
			this.el.style.background = 'chocolate'
		} else if (this.value === 128) {
			this.el.style.background = 'peru'
		} else if (this.value === 64) {
			this.el.style.background = 'darkorange'
		} else if (this.value === 32) {
			this.el.style.background = 'orange'
		} else if (this.value === 16) {
			this.el.style.background = 'goldenrod'
		} else if (this.value === 8) {
			this.el.style.background = 'gold'
		}
	}

	delete() {
		this.el.style.zIndex = 0
		this.el.style.filter = 'opacity(0)'
		score += this.value * 2
		$scoreBox.textContent = score
		if (+localStorage.getItem('bestScore4') < score && size === 4) {
			localStorage.setItem('bestScore4', score.toString())
			$bestBox.textContent = score
		}
		if (+localStorage.getItem('bestScore6') < score && size === 6) {
			localStorage.setItem('bestScore6', score.toString())
			$bestBox.textContent = score
		}
		if (+localStorage.getItem('bestScore8') < score && size === 8) {
			localStorage.setItem('bestScore8', score.toString())
			$bestBox.textContent = score
		}
		floatScore()
		setTimeout(() => {
			this.el.remove()
		}, 750)
		const index = info.findIndex(el => el.counter === this.counter)
		info.splice(index, 1)
	}

	static create() {
		const availablePositions = []

		for (let i = 1; i < size + 1; i++) {
			for (let j = 1; j < size + 1; j++) {
				availablePositions.push([i, j])
			}
		}

		for (let i = 0; i < info.length; i++) {
			for (let j = 0; j < availablePositions.length; j++) {
				if ([info[i].row, info[i].col].join() === availablePositions[j].join()) {
					availablePositions.splice(j, 1)
				}
			}
		}

		const position = availablePositions[getRandom(0, availablePositions.length)]
		const b = new Box(Math.random() > 0.85 ? 4 : 2, position[0], position[1])
		b.setRow = position[0]
		b.setCol = position[1]
		b.el.style.filter = 'opacity(0)'
		b.el.style.transform = 'scale(0)'
		setTimeout(() => {
			b.el.style.filter = 'opacity(1)'
			b.el.style.transform = 'scale(1)'
		}, 150)
		return b
	}

	static moveLeft(row) {
		const currentRow = []
		new Promise(res => {
			for (let i = 0; i < info.length; i++) {
				if (info[i].row === row) {
					currentRow.push(info[i])
				}
			}
			res()
		}).then(() => {
			return new Promise(res => {
				const sortedRow = currentRow.sort(function (a, b) {
					if (b.col > a.col) {
						return -1
					}
				})
				for (let i = 0; i < currentRow.length; i++) {
					if (sortedRow[i].col > 1) {
						sortedRow[i].setCol = sortedRow[i].col -= 1
					}
				}
				for (let i = 1; i < currentRow.length; i++) {
					if (sortedRow[i].col === sortedRow[i - 1].col && sortedRow[i].value === sortedRow[i - 1].value) {
						sortedRow[i - 1].setValue = sortedRow[i - 1].value *= 2
						sortedRow[i].delete()
						sortedRow.splice(i, 1)
						res()
						break
					}
					if (sortedRow[i].col === sortedRow[i - 1].col) {
						sortedRow[i].setCol = sortedRow[i].col += 1
					}
				}
			})
		})
	}

	static moveRight(row) {
		const currentRow = []
		new Promise(res => {
			for (let i = 0; i < info.length; i++) {
				if (info[i].row === row) {
					currentRow.push(info[i])
				}
			}
			res()
		}).then(() => {
			return new Promise(res => {
				const sortedRow = currentRow.sort(function (a, b) {
					if (b.col < a.col) {
						return -1
					}
				})
				for (let i = 0; i < currentRow.length; i++) {
					if (sortedRow[i].col < size) {
						sortedRow[i].setCol = sortedRow[i].col += 1
					}
				}
				for (let i = 1; i < currentRow.length; i++) {
					if (sortedRow[i].col === sortedRow[i - 1].col && sortedRow[i].value === sortedRow[i - 1].value) {
						sortedRow[i - 1].setValue = sortedRow[i - 1].value *= 2
						sortedRow[i].delete()
						sortedRow.splice(i, 1)
						res()
						break
					}
					if (sortedRow[i].col === sortedRow[i - 1].col) {
						sortedRow[i].setCol = sortedRow[i].col -= 1
					}
				}
			})
		})
	}

	static moveUp(col) {
		const currentCol = []
		new Promise(res => {
			for (let i = 0; i < info.length; i++) {
				if (info[i].col === col) {
					currentCol.push(info[i])
				}
			}
			res()
		}).then(() => {
			return new Promise(res => {
				const sortedCol = currentCol.sort(function (a, b) {
					if (b.row > a.row) {
						return -1
					}
				})
				for (let i = 0; i < currentCol.length; i++) {
					if (sortedCol[i].row > 1) {
						sortedCol[i].setRow = sortedCol[i].row -= 1
					}
				}
				for (let i = 1; i < currentCol.length; i++) {
					if (sortedCol[i].row === sortedCol[i - 1].row && sortedCol[i].value === sortedCol[i - 1].value) {
						sortedCol[i - 1].setValue = sortedCol[i - 1].value *= 2
						sortedCol[i].delete()
						sortedCol.splice(i, 1)
						res()
						break
					}
					if (sortedCol[i].row === sortedCol[i - 1].row) {
						sortedCol[i].setRow = sortedCol[i].row += 1
					}
				}
			})
		})
	}

	static moveDown(col) {
		const currentCol = []
		new Promise(res => {
			for (let i = 0; i < info.length; i++) {
				if (info[i].col === col) {
					currentCol.push(info[i])
				}
			}
			res()
		}).then(() => {
			return new Promise(res => {
				const sortedCol = currentCol.sort(function (a, b) {
					if (b.row < a.row) {
						return -1
					}
				})
				for (let i = 0; i < currentCol.length; i++) {
					if (sortedCol[i].row < size) {
						sortedCol[i].setRow = sortedCol[i].row += 1
					}
				}
				for (let i = 1; i < currentCol.length; i++) {
					if (sortedCol[i].row === sortedCol[i - 1].row && sortedCol[i].value === sortedCol[i - 1].value) {
						sortedCol[i - 1].setValue = sortedCol[i - 1].value *= 2
						sortedCol[i].delete()
						sortedCol.splice(i, 1)
						res()
						break
					}
					if (sortedCol[i].row === sortedCol[i - 1].row) {
						sortedCol[i].setRow = sortedCol[i].row -= 1
					}
				}
			})
		})
	}
}

// Управление с клавиатуры
function move(event) {
	if (event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 'ц' || event.key.toLowerCase() === 'arrowup') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveUp(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}
	if (event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'ы' || event.key.toLowerCase() === 'arrowdown') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveDown(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}
	if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'ф' || event.key.toLowerCase() === 'arrowleft') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveLeft(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}
	if (event.key.toLowerCase() === 'd' || event.key.toLowerCase() === 'в' || event.key.toLowerCase() === 'arrowright') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveRight(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}
}

// Всплавающие очки после успешного хода
function floatScore() {
	const item = document.createElement('span')
	$scoreBox.insertAdjacentElement('afterbegin', item)
	item.textContent = `+${score - oldScore}`
	item.classList.add('float-score')

	setTimeout(() => {
		item.style.transform = `translate(${Math.random() > 0.5 ? '-' : '+'}${getRandom(0, 50)}px, -${getRandom(50, 100)}px)`
		item.style.filter = 'opacity(0)'
	}, 0)

	setTimeout(() => {
		item.remove()
	}, 7000)
}

// Проверка на изменение положение ячеек
let start = []
let end = []
function startPosition() {
	start = []
	for (let i = 0; i < info.length; i++) {
		start.push([info[i].row, info[i].col])
	}
}
function endPosition() {
	end = []
	for (let i = 0; i < info.length; i++) {
		end.push([info[i].row, info[i].col])
	}
}

// Проверка возможности совершить ещё 1 ход
function checkEndGame() {
	for (let i = 0; i < 4; i++) {
		let r = info
			.filter(el => el.row == i + 1)
			.sort(function (a, b) {
				if (b.col > a.col) {
					return -1
				}
			})
		for (let i = 0; i < r.length - 1; i++) {
			if (r[i].value === r[i + 1].value) {
				return false
			}
		}
		let c = info
			.filter(el => el.col == i + 1)
			.sort(function (a, b) {
				if (b.row > a.row) {
					return -1
				}
			})
		for (let i = 0; i < r.length - 1; i++) {
			if (c[i].value === c[i + 1].value) {
				return false
			}
		}
	}
	return true
}

function loseGame() {
	$warning.style.display = 'flex'
	$warning.style.background = 'rgba(0, 0, 0, 0.75)'
	$wText.innerHTML = `You're lose :( <br> Score: ${score} <br> ${score === +$bestBox.textContent ? 'You reach new best! Congratulations!' : ''}`
	$wAnsvers[0].textContent = 'Menu'
	$wAnsvers[1].textContent = 'Again'
	$wAnsvers[0].style.fontSize = '92px'
	$wAnsvers[1].style.fontSize = '92px'
	setTimeout(() => {
		$wBody.style.transform = 'scale(1)'
	}, 0)
}

// Мобильное управление
let touchStartX = 0
let touchEndX = 0
let touchStartY = 0
let touchEndY = 0

$game.addEventListener('touchstart', e => {
	touchStartX = e.changedTouches[0].screenX
	touchStartY = e.changedTouches[0].screenY
	e.preventDefault()
})

$game.addEventListener('touchend', e => {
	touchEndX = e.changedTouches[0].screenX
	touchEndY = e.changedTouches[0].screenY
	checkDirection()
	e.preventDefault()
})

function checkDirection() {
	if (touchEndX < touchStartX && touchStartX - touchEndX > Math.abs(touchStartY - touchEndY)) {
		// Влево
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveLeft(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveLeft(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}

	if (touchEndX > touchStartX && touchEndX - touchStartX > Math.abs(touchStartY - touchEndY)) {
		// Вправо
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveRight(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveRight(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}

	if (touchEndY < touchStartY && touchStartY - touchEndY > touchStartX - touchEndX) {
		// Вверх
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveUp(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveUp(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}

	if (touchEndY > touchStartY && touchEndY - touchStartY > touchStartX - touchEndX) {
		// Вниз
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < size + 1; i++) {
				Box.moveDown(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < size + 1; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 5) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					if (size > 7) {
						for (let i = 1; i < size + 1; i++) {
							Box.moveDown(i)
						}
						res()
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === size ** 2) {
					checkEndGame() && loseGame()
				}
			})
		return
	}
}

function setLanguage(lng) {
	const menuItem = document.querySelectorAll('#menu-list > ul >li')
	const settingsMain = document.querySelectorAll('#settings > div > .main')
	const optionsSpeed = document.querySelectorAll('#speed > div')
	const arrow = document.querySelectorAll('#arrow > div')
	if (lng === 'ru') {
		menuItem[0].textContent = 'Играть'
		menuItem[1].textContent = 'Настройки'
		menuItem[2].textContent = 'О игре'
	} else {
		menuItem[0].textContent = 'Play'
		menuItem[1].textContent = 'Settings'
		menuItem[2].textContent = 'About'
	}

	if (lng === 'ru') {
		settingsMain[0].textContent = 'Язык: '
		settingsMain[1].textContent = 'Скорость анимации: '
		settingsMain[2].textContent = 'Размер игрового поля: '
		settingsMain[3].textContent = 'Сбросить сохранённые рекорды: '
	} else {
		settingsMain[0].textContent = 'Language: '
		settingsMain[1].textContent = 'Animation speed: '
		settingsMain[2].textContent = 'Game field size: '
		settingsMain[3].textContent = 'Reset all records: '
	}
	
	if (lng === 'ru') {
		optionsSpeed[0].textContent = 'Медленно'
		optionsSpeed[1].textContent = 'Нормально'
		optionsSpeed[2].textContent = 'Быстро'
	} else {
		optionsSpeed[0].textContent = 'Sloooow'
		optionsSpeed[1].textContent = 'Normal'
		optionsSpeed[2].textContent = 'Fast'
	}

	if (lng === 'ru') {
		arrow[0].textContent = 'В'
		arrow[1].textContent = 'З'
		arrow[2].textContent = 'А'
		arrow[3].textContent = 'Д'
	} else {
		arrow[0].textContent = 'B'
		arrow[1].textContent = 'A'
		arrow[2].textContent = 'C'
		arrow[3].textContent = 'K'
	}
}
