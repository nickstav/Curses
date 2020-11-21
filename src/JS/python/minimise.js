import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

export function hideScript() {
    let scriptShowing = get(cursesCanvas).showPythonScript;
    if (scriptShowing) {
        cursesCanvas.toggleShowPythonScript();
    }
}