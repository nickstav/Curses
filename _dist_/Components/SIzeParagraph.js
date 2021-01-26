/* src\Components\SIzeParagraph.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "../../web_modules/svelte/internal.js";

import { checkUserInput } from "../JS/stores/grid.js";
import { projectStore } from "../JS/stores/project.js";
import { minDimensions, maxDimensions } from "../JS/constants/canvasSize.js";

function create_if_block_1(ctx) {
	let div;
	let p;

	return {
		c() {
			div = element("div");
			p = element("p");
			p.textContent = `Note: minimum canvas size is ${minDimensions.width}x${minDimensions.height}`;
			attr(p, "id", "minSizingNote");
			attr(p, "class", "text-xs font-bold text-gray-700");
			attr(div, "id", "minSizingHolder");
			attr(div, "class", "w-full h-10");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (15:0) {#if $checkUserInput.aboveMax}
function create_if_block(ctx) {
	let div;
	let p;

	return {
		c() {
			div = element("div");
			p = element("p");
			p.textContent = `Note: maximum canvas size is ${maxDimensions.width}x${maxDimensions.height}`;
			attr(p, "id", "maxSizingNote");
			attr(p, "class", "text-xs font-bold text-gray-700");
			attr(div, "id", "maxSizingHolder");
			attr(div, "class", "w-full h-10");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let if_block0 = /*$checkUserInput*/ ctx[0].belowMin && create_if_block_1(ctx);
	let if_block1 = /*$checkUserInput*/ ctx[0].aboveMax && create_if_block(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*$checkUserInput*/ ctx[0].belowMin) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*$checkUserInput*/ ctx[0].aboveMax) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $checkUserInput;
	component_subscribe($$self, checkUserInput, $$value => $$invalidate(0, $checkUserInput = $$value));
	return [$checkUserInput];
}

class SIzeParagraph extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default SIzeParagraph;