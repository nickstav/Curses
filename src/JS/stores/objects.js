import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    items: [],
    textNewLine: 'indented'
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function saveObjectToStore(object) {
    update(store => {
      return {
        ...store,
        items: [...store.items, object] 
      };
    });
  }

  function eraseObjectFromStore(object) {
    update(store => {
      return {
        ...store,
        items: store.items.filter(item => item != object)
      };
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