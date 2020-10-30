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

  return {
	  subscribe,
    set,
    saveObjectToStore
	};

}

export const canvasObjects = setUpStore();