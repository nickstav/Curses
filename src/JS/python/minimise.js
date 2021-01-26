import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';

export function hideScript() {
    let scriptShowing = get(projectStore).showPythonScript;
    if (scriptShowing) {
        projectStore.toggleShowPythonScript();
    }
}