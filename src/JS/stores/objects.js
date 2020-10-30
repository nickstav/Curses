import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    items: [],
    textNewLine: 'indented'
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  return {
	  subscribe,
    set
	};

}

export const canvasObjects = setUpStore();