'use strict'
const HABITS_KEY = 'HABITS_KEY';


let habits = [];
const page = {
    menu: document.querySelector('.menu__list'),
    header: {
        title: document.querySelector('.content__title'),
        progressLine: document.querySelector('.progress__line'),
        progressPercent: document.querySelector('.progress__percent')
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
    header.progressPercent.innerHTML = `${currentPercent}%`;
    header.progressLine.style.width = `${currentPercent}%`;
}

function rerender(activeHabitsId) {
    const activeHabit = habits.find(habit => habit.id === activeHabitsId);

    if (!activeHabit) {
        console.error(`Привычки не существует`);
        return
    }

    rerenderMenu(activeHabit);
    rerenderHead(activeHabit);
}


/* init */
(() => {
    loadData();
    rerender(1);
})();