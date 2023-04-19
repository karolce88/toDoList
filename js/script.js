let todoInput // miejsce gdzie user wpisuje tresc zadania
let errorInfo // info o braku zadań / konieczności wpisania tekstu
let addBtn // przycisk ADD - doddaje nowe elementy do listy
let ulList // lista zadań, tagi Ul
// let newTodo // nowo dodane li, nowe zadanie --> zmienną zadeklarowałem w funkcji addNewTodo i przesłałem jako argument do funkcji createToolsArea

let popup // popup
let popupInfo // tekst w popupie, jak sie doda pusty tekst
let todoToEdit // edytowalny todo
let popupInput // input w popupie
let popupAddBtn // przycisk "zatwierdz" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

const main = () => {
	// funkcja bedzie wywoływała wszystkie funkcje
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	// funkcja bedzie pobierała wszystkie elementy
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	// nadajemy nasłuchiwanie
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePupup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck) // nasłuchiwanie czy przy wpisywaniu danych w inputa zostal wcisniete enter. Jeżeli tak, to odpala się funkcja
}

/*
FUNKCJA AddNewTask:
1. tworzy nowy element li
2. dodaje element do ul listy
3. funkcja odpala na click przycisk ADD
4. przechwytuje treść z inputa i umieszcza go w nowo utorzonym li
5. funkcja nie doda do listy pustego 'todo'
*/

const addNewTodo = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li') // tworzymy zmienną newTodo
		newTodo.textContent = todoInput.value
		createToolsArea(newTodo) // uruhomienie funkcji wraz z przekazaniem do niej parametru, zmiennej z wpisanymi od uzytkownika danymi
		ulList.append(newTodo)
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania'
	}
}

const createToolsArea = newTodo => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel) // dodawanie calego panelu ktory jest stworzyony w tej funkcji, do zmiennej newTodo. czyli wszystkie elementy divy wraz z ich klasami dodadzą się automatycznie do zmiennej.

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn) // dodanie do diva stworzonych elementow html jako jego dzieci
}

const checkClick = e => {
	if (e.target.classList.contains('complete')) {
		e.target.closest('li').classList.toggle('completed') // dodanie do najbliższego rodzica "li" klasy completed
		e.target.classList.toggle('completed') // dodanie do targetowanego elemetnu klasy completed
	} else if (e.target.classList.contains('edit')) {
		editTodo(e)
	} else if (e.target.classList.contains('delete')) {
		deleteTodo(e)
	}
}

const editTodo = ePrzekazany => {
	todoToEdit = ePrzekazany.target.closest('li') // po kliknięciu w edit zwraca najblizsze li.

	// console.log(todoToEdit.firstChild); - po kliknięciu to zwraca nam treść li które klikamy
	popupInput.value = todoToEdit.firstChild.textContent // przypisuje powyższą treść do inputa
	popup.style.display = 'flex'

	popupInfo.textContent = '' // czyszczenie info o tym ze trzeba podac jakas tresc, po tym gdy sie kliknie na anuluj to nie ma byc widoczna.
}

const closePupup = () => {
	popup.style.display = 'none'
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść'
	}
}

const deleteTodo = ePrzekazany => {
	ePrzekazany.target.closest('li').remove() // usuwanie elementów przyciskiem X

	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	}
}

const enterKeyCheck = e => { // funkcja odpalająca dodanie todosa, czyli odpalenie funkcji addNewTodo() po kliknięciu enter
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)
