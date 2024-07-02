'use strict'

let habbits = [];
const HABBITS_KEY = 'HABBITS_KEY';

function loadData () {
 const habbitsString = localStorage.getItem(HABBITS_KEY);
 const habbitsArray = JSON.parse(habbitsString);

 if (Array.isArray(habbitsArray)) {
     habbits = habbitsArray;
 }
}

function saveData() {
    localStorage.setItem(HABBITS_KEY, JSON.stringify(habbits));
}

(() => {
    loadData();
})();