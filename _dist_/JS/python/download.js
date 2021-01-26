import { get } from '../../../web_modules/svelte/store.js';
import { projectStore } from '../stores/project.js';

export function downloadPyFile() {
    let script = get(projectStore).pythonScript;

    // create a pseudo link element to create a download path for the script file
    const psuedoDownloadLink = document.createElement('a');
    // create a file blob using the python script
    const file = new Blob([script], {type: 'text/plain'});
    
    // create a link to download the file and "click" the link to commence
    psuedoDownloadLink.href= URL.createObjectURL(file);
    psuedoDownloadLink.download = 'script.py';
    psuedoDownloadLink.click();
  
    // tell the DOM that we no longer need to reference the link element & remove it
    URL.revokeObjectURL(psuedoDownloadLink.href);
    psuedoDownloadLink.remove();
}