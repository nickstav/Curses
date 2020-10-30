import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

export class CanvasItem {
    constructor(location) {
        this.context = get(cursesCanvas).context;
        this.type = null;
        this.position = location;
        this.selected = false;
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.font = "15px Consolas";
    }

    select() {
        this.selected = !this.selected;
    }
}