import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const items = [];

function setUpStore() {

  const { subscribe, set, update } = writable(items);

  function saveObjectToStore(object) {
    update(items => {
      return [...items, object]
    });
  }

  function eraseObjectFromStore(object) {
    update(items => {
      return items.filter(item => item != object)
    });
  }

  return {
	  subscribe,
    set,
    saveObjectToStore,
    eraseObjectFromStore
	};

}

export const canvasObjects = setUpStore();