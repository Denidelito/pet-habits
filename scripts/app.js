'use strict'

let habits = [];
const HABITS_KEY = 'HABITS_KEY';


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
        return `Привычки с id ${activeHabit} не существует`;
    }

    for (habit of habits) {
        const existed = document.querySelector(`menu-habit-${habit.id}`);

        console.log(habit);
    }
}

function rerender(activeHabbitsId) {
    const activeHabit = habits.find(habit => habit.id === activeHabbitsId);

    renderMenu(activeHabit);
}


/* init */
(() => {
    loadData();
    rerender(0);
})();