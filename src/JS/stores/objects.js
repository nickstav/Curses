import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    items: [],
    textNewLine: 'indented'
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function saveObjectToStore(objectInfo) {
    update(objects => {
      return {
        ...objects,
        items: [...items, objectInfo] 
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