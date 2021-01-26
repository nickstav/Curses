import { get } from '../../../web_modules/svelte/store.js';
import { projectStore } from '../stores/project.js';

// copy the python script to the clipboard when requested
export function copyTextToClipboard() {
    let script = get(projectStore).pythonScript;

    const pseudoElement = document.createElement('textarea');
    pseudoElement.value = script;

    document.body.appendChild(pseudoElement);
    pseudoElement.select();
    document.execCommand('copy');
    document.body.removeChild(pseudoElement);

    alert('Script copied to the clipboard')
}

