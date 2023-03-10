// 1. **Виправити помилку з видаленням завдання**
// Наразі у програми є проблема з видаленням окремих елементів, якщо у списку є завдання з однаковими текстами. 
// Наприклад, у вас є наступний список завдань:
    
//     *Поїсти
//     Поспати
//     Сходити в зал
//     Поїсти
//     Поспати
//     Сходити в офіс
//     Поїсти
//     Поспати
//     Піти додому*
    
//     Якщо юзер видалить друге завдання 'Поїсти' (яке йде після 'Сходити в зал'), 
// то на сторінці все видалиться коректно, проте у локалСТораджі видаляться всі завдання 'Поїсти'.
//     Зробіть так, аби функціонал видалення працював коректно - 
// тобто аби при видалені на сторінці з локалСтораджу видалявся саме той елемент який видалив юзер, а не якісь ще крім нього.
//     Для цього можете використати кастомні атрибути 
// ([https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset]
//(https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)) 
//і/або індекс елементу і методи масивів та приведення до масивів
    
// 2. **Додати можливість оновлювати окреме завдання**
    
//     Зробіть так аби юзер крім видалення окремого елементу мав ще й можливість редагувати текст окремого завдання.
//     Для цього можете додати іконку з олівцем поруч з іконкою для видалення.
//     Приклад елементу:
    
//     ```
//      <i class="fa fa-edit"></i>
//     ```
    
//     Для самого функціоналу можете використати вбудоване діалогове вікно 
// ([https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt]
// (https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)) 
// а також індекс елементу і методи масивів та приведення до масивів
    
// 3. **Додати всій сторінці стилів**
    
//     Додайте сторінці візуальної унікальності через css класи
    
// 4. **Розмістити на гітхаб-сторінці**
// Зробіть так аби був доступ до сторінки через інтернет для всіх охочих






// оголошуємо змінні з якими будемо працювати

const form = document.querySelector('.create-task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('.filter-input');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('.task-input');


// CRUD
// оновити якусь таску


// побачити всі таски +
document.addEventListener('DOMContentLoaded', loadTasks);
form.addEventListener('submit', createTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', removeAllTasks);
filter.addEventListener('keyup', filterItems);
taskList.addEventListener('click', editTask);

function loadTasks() {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}

	// для кожної задачі яка є
	tasks.forEach(function(task) {
		// створюємо елемент списку
		const li = document.createElement('li');
		// додаємо йому класс
		li.className = 'colection-item';
		// всередині цього елементу списку створюємо текстову ноду з описом завдання
		li.appendChild(document.createTextNode(task));

		const editElement = document.createElement('span');
		editElement.className = 'edit-item';
		editElement.innerHTML = '<i class="fa fa-edit"></i>';
		li.appendChild(editElement);

		const deleteElement = document.createElement('span');
		deleteElement.className = 'delete-item';
		deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(deleteElement);

		// запихуємо цей елемент списку в список
		taskList.appendChild(li);
	})
}




// створити таску +
function createTask(event) {

	// якщо значення в інпуті порожнє  - то не додаємо нове завдання і не даємо виконатись дефолтній поведінці
	if(taskInput.value.trim() === '') {
		event.preventDefault();
		return null;
	}

	// створюємо елемент списку
	let li = document.createElement('li');
	// додаємо йому класс
	li.className = 'colection-item';
	// li.addEventListener('dblclick', editTask);
	// всередині цього елементу списку створюємо текстову ноду з описом завдання
	li.appendChild(document.createTextNode(taskInput.value));

		const editElement = document.createElement('span');
		editElement.className = 'edit-item';
		editElement.innerHTML = '<i class="fa fa-edit"></i>';
		li.appendChild(editElement);

		const deleteElement = document.createElement('span');
		deleteElement.className = 'delete-item';
		deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(deleteElement);


	// запихуємо цей елемент списку в список
	taskList.appendChild(li);

	
	// викликаємо функцію яка буде додавати завдання до ЛокалСтораджа
	storeTaskInLocalStorage(taskInput.value);

	// очищуємо вміст інпуту для створення завдання
	taskInput.value = '';

	// блокуємо дефолтну поведінку сабміта
	event.preventDefault();
}

function storeTaskInLocalStorage(task) {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}

	// додаємо до списку нове завдання
	tasks.push(task);

	// зберігаємо список завданнь в ЛокалСТорадж
	localStorage.setItem('tasks', JSON.stringify(tasks));
}



// редагувати якусь конкретну таску
function editTask(event){
	console.log("Edit Task...");
	// let li = document.createElement('li');
	let iconEditContainter = event.target.parentElement;

	 if(iconEditContainter.classList.contains('edit-item') ) {
  		const item = iconEditContainter.parentElement;
  		console.log(item);
  		item.setAttribute('contenteditable', true);
		document.onkeypress = function(event) {
  			if (event.key == 'Enter') {
  				event.preventDefault();
				item.removeAttribute('contenteditable');
				console.log(item);	
    		}		
		editTaskFromLocalStorage(item.textContent);
    	}
    }
}



// видалити якусь конкретну таску
function removeTask(event) {
	let iconContainter = event.target.parentElement;
	// якщо ми клікнули по хрестику  - тоді
	if(iconContainter.classList.contains('delete-item') ) {  
		// пересвідчемось чи юзер справді хоче видалити цей елемент
		if(confirm('Ви впевнені що хочете видали саме це завдання?')){
			// видаляємо цей елемент списку, в якому знаходиться хрестик
			//deleteElement.parentElement.remove();
			iconContainter.parentElement.remove();

			// викликаємо функцію яка буде видаляти завдання з ЛокалСтораджа
			removeTaskFromLocalStorage(iconContainter.parentElement);
		}
	}
}

// також індекс елементу і методи масивів та приведення до масивів

function editTaskFromLocalStorage(task) {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}
	

		for (let i = 0; i < tasks.length; i++) {
			 if(tasks[i] === task) {
			 		if (tasks[i] === null){
			 		task[i].join(' ').split(' ');
			 	}
			 	console.log(task);
				tasks.splice(i, 1, task);
				console.log(tasks.splice(i, 1, task));
			}
		}
		console.log(tasks);
		localStorage.setItem('tasks', JSON.stringify(tasks));
}




// function editTaskFromLocalStorage(task) {
// 	// оголошуємо змінну яка буде використовуватись для списку завдань
// 	let tasks;

// 	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
// 	if(localStorage.getItem('tasks') !== null) {
// 		// якщо вони там є - витягуємо їх і присвоюємо змінній
// 		tasks = JSON.parse(localStorage.getItem('tasks'));
// 	} else {
// 		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
// 		tasks = [];
// 	}
// 		// for (let index = 0; index < tasks.length; index ++){
// 		// 	if(tasks[index] === item) {
// 		// 		console.log(tasks[index] );
// 		// 		tasks.splice(index, 1, item.value);
// 		// 		console.log(tasks);
// 		// 	}
// 		// }
// 		tasks.forEach(function(tasks, task) {
// 			// index = tasks.indexOf(task);
// 			// console.log(index);
// 			// if(tasks[index] === item) {
// 			// 	console.log(tasks[index] );
// 			// 	tasks.splice(index, 1, item);
// 			// 	console.log(tasks);
// 			// }
// 			if (tasks.indexOf(task) === -1){
// 				tasks.push(task);
// 				console.log(tasks);

// 				}else {
// 					console.log(tasks);

// 				}
// 				localStorage.setItem('tasks', JSON.stringify(task));

// 		})
// 		console.log(tasks);
// }



//видалити завдання
function removeTaskFromLocalStorage(taskItemAsHTMLElement) {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}
console.log('all tasks now',tasks);

	tasks.forEach(function(task) {
		// if(taskItemAsHTMLElement.textContent === task) 
		if(taskItemAsHTMLElement.textContent === task){
			//let i = tasks.length;
			for (let i = 0; i < tasks.length; i++) {			
			tasks.splice(i, 1);
			console.log('tasks after splice',tasks);
			break;
		}

	}
})

		console.log('tasks after all work',tasks);
		localStorage.setItem('tasks', JSON.stringify(tasks));
}



// function removeTaskFromLocalStorage(taskItemAsHTMLElement) {
// 	// оголошуємо змінну яка буде використовуватись для списку завдань
// 	let tasks;

// 	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
// 	if(localStorage.getItem('tasks') !== null) {
// 		// якщо вони там є - витягуємо їх і присвоюємо змінній
// 		tasks = JSON.parse(localStorage.getItem('tasks'));
// 	} else {
// 		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
// 		tasks = [];
// 	}

// 	tasks.forEach(function(task) {
// 		let index = tasks.indexOf(task);
// 		if(taskItemAsHTMLElement.textContent === task || taskItemAsHTMLElement.textContent === null) {			
// 			tasks.splice(index, 1);
// 		}
// 	})
// 	console.log(tasks);
// 	localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// видалити всі таски
function removeAllTasks() {
	if(confirm('Ви впевнені що хочете видали всі завдання?')){
		// видаляємо весь контент всередині списку
		taskList.innerHTML = '';
		// видалити всі елементи з ЛокалСтораджа
		removeAllTasksFromLocalStorage();
	}
}

function removeAllTasksFromLocalStorage() {
	// 
	localStorage.clear();
}

//фільтрація
function filterItems(event) {
	// оголосимо змінну яка буде в себе приймати значення по якому юзер фільтрує
	const filterQuery = event.target.value.toLowerCase();
	// знайти всі елементи завдань на сторінці
	document.querySelectorAll('.colection-item').forEach(function(taskHTMLElement){
		// знаходимо текст всередині li
		const taskText = taskHTMLElement.firstChild.textContent.toLowerCase();
		// якщо пошукова строка є в складі тексту з ls
		if(taskText.includes(filterQuery)) {
			// показуємо цей елемент списку
			taskHTMLElement.style.display = 'block';
		} else { // якщо немає
			// не показуємо цей елемент списку
			taskHTMLElement.style.display = 'none';
		}
	})
}