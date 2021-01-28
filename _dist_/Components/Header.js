/* src\Components\Header.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_style,
	space
} from "../../web_modules/svelte/internal.js";

import { projectStore } from "../JS/stores/project.js";

function create_fragment(ctx) {
	let header;
	let h1;
	let t1;
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			header = element("header");
			h1 = element("h1");
			h1.textContent = "ORISON";
			t1 = space();
			button = element("button");
			button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class=" p-2 hover:p-1" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="#fafafa"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
			attr(h1, "class", "text-2xl text-header-font tracking-widest font-bold ml-4");
			attr(button, "id", "infoButton");
			attr(button, "title", "app info");
			attr(button, "class", "h-10 w-10 bg-cover text-xs rounded-md mr-4");
			set_style(button, "outline", "none");
			attr(header, "class", "bg-header w-full h-12 text-gray700 flex justify-between items-center border-b border-header-border select-none");
		},
		m(target, anchor) {
			insert(target, header, anchor);
			append(header, h1);
			append(header, t1);
			append(header, button);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[0]);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(header);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self) {
	const click_handler = () => {
		projectStore.toggleSplash();
	};

	return [click_handler];
}

class Header extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Header;