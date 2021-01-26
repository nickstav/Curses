import { get } from '../../../web_modules/svelte/store.js';
import { projectStore } from '../stores/project.js';

export function hideScript() {
    let scriptShowing = get(projectStore).showPythonScript;
    if (scriptShowing) {
        projectStore.toggleShowPythonScript();
    }
}