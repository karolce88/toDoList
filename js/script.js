let todoInput // miejsce gdzie user wpisuje tresc zadania
let errorInfo // info o braku zadań / konieczności wpisania tekstu
let addBtn // przycisk ADD - doddaje nowe elementy do listy
let ulList // lista zadań, tagi Ul
// let newTodo // nowo dodane li, nowe zadanie

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
}

const prepareDOMEvents = () => {
	// nadajemy nasłuchiwanie
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
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

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.classList.contains('complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.classList.contains('edit')) {
		console.log('edit');
	}  else if (e.target.classList.contains('delete')) {
		console.log('delete');
	}
}

document.addEventListener('DOMContentLoaded', main)
