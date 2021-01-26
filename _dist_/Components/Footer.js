/* src\Components\Footer.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../web_modules/svelte/internal.js";

function create_fragment(ctx) {
	let footer;

	return {
		c() {
			footer = element("footer");

			footer.innerHTML = `<p class="text-xs font-semibold text-gray-700">Feel free to leave any comments / suggestions or buy me a coffee here 😀: 
        <a href="https://ko-fi.com/nickstav" rel="noopener" target="_blank" class="text-xs underline hover:text-header">ko-fi.com/nickstav</a></p>`;

			attr(footer, "class", "flex h-8 w-full justify-center items-center bg-footer border-t border-footer-border");
		},
		m(target, anchor) {
			insert(target, footer, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(footer);
		}
	};
}

class Footer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Footer;