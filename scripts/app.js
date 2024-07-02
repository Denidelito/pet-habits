'use strict'
const HABITS_KEY = 'HABITS_KEY';


let habits = [];
const page = {
    menu: document.querySelector('.menu__list'),
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
function renderMenu(activeHabit) {
    if (!activeHabit) {
        console.error(`Привычки не существует`);
        return
    }

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
                renderMenu(habit);
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

function rerender(activeHabitsId) {
    const activeHabit = habits.find(habit => habit.id === activeHabitsId);

    renderMenu(activeHabit);
}


/* init */
(() => {
    loadData();
    rerender(1);
})();