import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

// copy the python script to the clipboard when requested
export function copyTextToClipboard() {
    let script = get(cursesCanvas).pythonScript;

    const pseudoElement = document.createElement('textarea');
    pseudoElement.value = script;

    document.body.appendChild(pseudoElement);
    pseudoElement.select();
    document.execCommand('copy');
    document.body.removeChild(pseudoElement);

    alert('Script copied to the clipboard')
}

