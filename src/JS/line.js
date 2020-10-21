import { get } from 'svelte/store';
import { cursesCanvas } from './store.js';


export function drawLine() {
   let context = get(cursesCanvas).context;
   let startPosition = get(cursesCanvas).startPosition;
   let currentLocation = get(cursesCanvas).mousePosition;

   context.beginPath();
   context.moveTo(startPosition.x, startPosition.y);
   context.lineTo(currentLocation.x, currentLocation.y);
   context.lineWidth = 10;
   context.stroke();
}