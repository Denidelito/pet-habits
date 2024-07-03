'use strict'
const HABITS_KEY = 'HABITS_KEY';


let habits = [];
const page = {
    menu: document.querySelector('.menu__list'),
    header: {
        title: document.querySelector('.content__title'),
        progressLine: document.querySelector('.progress__line'),
        progressPercent: document.querySelector('.progress__percent')
    },
    body:  {
        tasksList: document.querySelector('.tasks__list'),
        taskAdd: document.querySelector('.task__list-add')
    }
}

/* utils */
function loadData () {
 const habitsString = localStorage.getItem(HABITS_KEY);
 const habitsArray = JSON.parse(habitsString);

 if (Array.isArray(habitsArray)) {
     habits = habitsArray;
 }
}

function saveData() {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}


/* render */
function rerenderMenu(activeHabit) {
    for (const habit of habits) {
        const existed = document.querySelector(`[menu-habit-id="${habit.id}"]`);

        if (!existed)  {
            const element  = document.createElement('button');

            element.setAttribute('menu-habit-id', habit.id);
            element.classList.add('menu__item');
            element.innerHTML = `<img src="./images/icon-${habit.icon}.svg" alt="Иконка ${habit.name}">`;

            if (habit.id === activeHabit.id) {
                element.classList.add('menu__item_active');
            }

            element.addEventListener('click',  ()  =>  {
                rerender(habit.id)
            });

            page.menu.appendChild(element);

            continue;
        }

        if (habit.id === activeHabit.id) {
            existed.classList.add('menu__item_active');
        } else  {
            existed.classList.remove('menu__item_active');
        }
    }
}

function rerenderHead(activeHabit) {
    const currentPercent = activeHabit.days.length / activeHabit.target > 1 ? 100 : activeHabit.days.length / activeHabit.target * 100;
    const header = page.header

    header.title.innerHTML  = activeHabit.name;
    header.progressPercent.innerHTML = `${currentPercent.toFixed(0)}%`;
    header.progressLine.style.width = `${currentPercent.toFixed(0)}%`;
}

function rerenderBody(activeHabit) {
    rerenderTask(activeHabit);
}

function rerenderTask(habit) {
    const habitDays = habit.days;

    if (habitDays.length === 0)  {
        return
    }

    page.body.tasksList.innerHTML  = '';

    for  (let habitIndex = habitDays.length; habitIndex > 0; habitIndex--) {
        const habitDay = habitDays[habitIndex - 1];

        const taskTemplate = document.createElement('div');
        const taskDay = document.createElement('div');
        const taskComment = document.createElement('div');
        const taskDelete = document.createElement('button');

        taskTemplate.classList.add('task');
        taskDay.classList.add('task__day');
        taskDay.innerText = `День ${habitDays.indexOf(habitDay) + 1}`;
        taskComment.classList.add('task__comment');
        taskComment.innerText = habitDay.comments;
        taskDelete.classList.add('task__delete');
        taskDelete.innerHTML = `<img width="24" height="24" src="./images/icon-delete.svg" alt="Удаление дня">`;

        page.body.tasksList.appendChild(taskTemplate);
        taskTemplate.appendChild(taskDay);
        taskTemplate.appendChild(taskComment);
        taskTemplate.appendChild(taskDelete);

        taskDelete.addEventListener('click',  ()  =>   {
            habitDays.splice(habitIndex  -  1, 1);
            saveData();

            rerenderTask(habit);
            rerenderAddTask(habit);
            rerenderHead(habit);
        });
    }
}

function rerenderAddTask(habit) {
    const taskDay = page.body.taskAdd.querySelector('.task__day');

    taskDay.innerText  = `День ${habit.days.length + 1}`;
}

function addTask(activeHabit) {
    const habitDays  = activeHabit.days;
    const formInput = page.body.taskAdd.querySelector('input');
    const formButton = page.body.taskAdd.querySelector('.task__button');


    formButton.addEventListener('click',  ()  =>    {
        if (!formInput.value)   {
            return
        }

        habitDays.push({
          comments: formInput.value,
        })

        saveData();

        formInput.value  = '';

        rerenderHead(activeHabit);
        rerenderAddTask(activeHabit);
        rerenderBody(activeHabit);
    })
}

function rerender(activeHabitsId) {
    const activeHabit = habits.find(habit => habit.id === activeHabitsId);

    if (!activeHabit) {
        console.error(`Привычки не существует`);
        return
    }

    rerenderMenu(activeHabit);
    rerenderHead(activeHabit);
    rerenderBody(activeHabit);
    rerenderAddTask(activeHabit);

    addTask(activeHabit);
}


/* init */
(() => {
    loadData();
    rerender(1);
})();