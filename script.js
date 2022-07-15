// Основные НОДы
const $game = document.querySelector('#game')
const $header = document.querySelector('#header')
const $scoreBox = document.querySelector('#score-box')
const $bestBox = document.querySelector('#best-box')

// Прослушка событий
document.addEventListener('keydown', move)

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}
// Основные переменные, необходимые для работы
let size = 4
let gameSize = $game.offsetWidth
let cellSize = gameSize / size
let margin = gameSize * 0.01
let counter = 0
let score = 0
let oldScore = 0
const info = []

class Box {
	constructor(size, value = 0, col, row) {
		const box = document.createElement('div')
		box.classList.add('box')
		box.style.width = box.style.height = `${23}%`
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
		this.el.style.transform = 'scale(1.A1)'
		setTimeout(() => {
			this.el.style.transform = 'scale(1)'
		}, 500)
		// if ((this.value = 8)) {
		// 	this.el.style.background = 'gold'
		// } else if ((this.value = 16)) {
		// 	this.el.style.background = 'goldenrod'
		// } else if ((this.value = 32)) {
		// 	this.el.style.background = 'orange'
		// } else if ((this.value = 64)) {
		// 	this.el.style.background = 'darkorange'
		// } else if ((this.value = 128)) {
		// 	this.el.style.background = 'peru'
		// } else if ((this.value = 256)) {
		// 	this.el.style.background = 'chocolate'
		// } else if ((this.value = 512)) {
		// 	this.el.style.background = 'coral'
		// } else if ((this.value = 1024)) {
		// 	this.el.style.background = 'olivedrab'
		// } else if ((this.value = 2048)) {
		// 	this.el.style.background = 'olive'
		// }

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
		floatScore()
		setTimeout(() => {
			this.el.remove()
		}, 750)
		const index = info.findIndex(el => el.counter === this.counter)
		info.splice(index, 1)
	}

	static create() {
		const availablePositions = []

		for (let i = 1; i < 5; i++) {
			for (let j = 1; j < 5; j++) {
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
		const b = new Box(cellSize, Math.random() > 0.75 ? 4 : 2, position[0], position[1])
		b.setRow = position[0]
		b.setCol = position[1]
		b.el.style.filter = 'opacity(0)'
		setTimeout(() => {
			b.el.style.filter = 'opacity(1)'
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
					if (sortedRow[i].col < 4) {
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
					if (sortedCol[i].row < 4) {
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

Box.create()
Box.create()

function move(event) {
	if (event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 'ц' || event.key.toLowerCase() === 'arrowup') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveUp(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}
	if (event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'ы' || event.key.toLowerCase() === 'arrowdown') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveDown(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}
	if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'ф' || event.key.toLowerCase() === 'arrowleft') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveLeft(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}
	if (event.key.toLowerCase() === 'd' || event.key.toLowerCase() === 'в' || event.key.toLowerCase() === 'arrowright') {
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveRight(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}
	if (event.key.toLowerCase() === ' ') {
		// Box.create()
		floatScore()
	}
}

// Всплавающие очки после успешного хода
function floatScore() {
	const item = document.createElement('span')
	$scoreBox.insertAdjacentElement('afterbegin', item)
	item.textContent = score - oldScore
	item.classList.add('float-score')

	setTimeout(() => {
		item.style.transform = `translate(${Math.random() > 0.5 ? '-' : '+'}${getRandom(0, 50)}px, -${getRandom(50, 100)}px)`
		item.style.filter = 'opacity(0)'
	}, 0)

	setTimeout(() => {
		item.remove()
	}, 3000)
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
				break
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
				break
			}
		}
	}
	return true
}

// Мобильное управление
let touchStartX = 0
let touchEndX = 0
let touchStartY = 0
let touchEndY = 0

document.addEventListener('touchstart', e => {
	touchStartX = e.changedTouches[0].screenX
	touchStartY = e.changedTouches[0].screenY
})

document.addEventListener('touchend', e => {
	touchEndX = e.changedTouches[0].screenX
	touchEndY = e.changedTouches[0].screenY
	checkDirection()
})

function checkDirection() {
	if (touchEndX < touchStartX && touchStartX - touchEndX > Math.abs(touchStartY - touchEndY)) {
		// Влево
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveLeft(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveLeft(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}

	if (touchEndX > touchStartX && touchEndX - touchStartX > Math.abs(touchStartY - touchEndY)) {
		// Вправо
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveRight(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveRight(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}

	if (touchEndY < touchStartY && touchStartY - touchEndY > touchStartX - touchEndX) {
		// Вверх
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveUp(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveUp(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}

	if (touchEndY > touchStartY && touchEndY - touchStartY > touchStartX - touchEndX) {
		// Вниз
		oldScore = score
		startPosition()
		new Promise(res => {
			for (let i = 1; i < 5; i++) {
				Box.moveDown(i)
			}
			res()
		})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				return new Promise(res => {
					for (let i = 1; i < 5; i++) {
						Box.moveDown(i)
					}
					res()
				})
			})
			.then(() => {
				endPosition()
				if (start.join() != end.join()) {
					Box.create()
				} else if (info.length === 16) {
					checkEndGame() && console.log('ТЫ ПРОИГРАВ')
				}
			})
	}
}
