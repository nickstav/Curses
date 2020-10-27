import { writable } from 'svelte/store';

// store to contain options for the progress bar tool appearance
const defaultValues = {
    numberOfBars: 10,
    bars: '▮',
    title: 'Progress',
    status: 'loading...'
}

function setUpStore() {

    const { subscribe, set } = writable(defaultValues);

    return {
        subscribe,
        set 
    }
}

export const progressBarAppearance = setUpStore();