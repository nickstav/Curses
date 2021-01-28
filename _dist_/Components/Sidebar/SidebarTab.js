import './SidebarTab.css.proxy.js';
/* src\Components\Sidebar\SidebarTab.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_style,
	space,
	svg_element,
	toggle_class
} from "../../../web_modules/svelte/internal.js";

import { projectStore } from "../../JS/stores/project.js";

import {
	sidebarActiveColour,
	sidebarPassiveColour,
	iconActiveColour,
	iconPassiveColour
} from "../../JS/constants/colours.js";

function create_fragment(ctx) {
	let div;
	let button0;
	let svg0;
	let path0;
	let t;
	let button1;
	let svg1;
	let path1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button0 = element("button");
			svg0 = svg_element("svg");
			path0 = svg_element("path");
			t = space();
			button1 = element("button");
			svg1 = svg_element("svg");
			path1 = svg_element("path");
			attr(path0, "stroke-linecap", "round");
			attr(path0, "stroke-linejoin", "round");
			attr(path0, "stroke-width", "2");
			attr(path0, "d", "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4");
			attr(svg0, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg0, "class", "p-3 hover:p-2");
			attr(svg0, "width", "100%");
			attr(svg0, "height", "100%");
			attr(svg0, "fill", "none");
			attr(svg0, "viewBox", "0 0 24 24");
			attr(svg0, "stroke", /*toolsIconCol*/ ctx[1]);
			attr(button0, "aria-label", "tools sidebar button");
			set_style(button0, "background-color", "var(--toolsColour)");
			set_style(button0, "outline", "none");
			attr(button0, "class", "flex flex-1 justify-center items-center svelte-piwp9r");
			toggle_class(button0, "selected", /*$projectStore*/ ctx[4].showSidebar === true);
			attr(path1, "stroke-linecap", "round");
			attr(path1, "stroke-linejoin", "round");
			attr(path1, "stroke-width", "2");
			attr(path1, "d", "M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3");
			attr(svg1, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg1, "class", "p-3 hover:p-2");
			attr(svg1, "width", "100%");
			attr(svg1, "height", "100%");
			attr(svg1, "fill", "none");
			attr(svg1, "viewBox", "0 0 24 24");
			attr(svg1, "stroke", /*exportIconCol*/ ctx[3]);
			attr(button1, "aria-label", "export sidebar button");
			set_style(button1, "background-color", "var(--exportColour)");
			set_style(button1, "outline", "none");
			attr(button1, "class", "flex flex-1 justify-center items-center svelte-piwp9r");
			toggle_class(button1, "selected", /*$projectStore*/ ctx[4].showSidebar === false);
			attr(div, "id", "sidebarTab");
			set_style(div, "--toolsColour", /*toolsBGCol*/ ctx[0]);
			set_style(div, "--exportColour", /*exportBGCol*/ ctx[2]);
			attr(div, "class", "w-full h-12 flex flex-row text-xs border-l border-header-border");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(button0, svg0);
			append(svg0, path0);
			append(div, t);
			append(div, button1);
			append(button1, svg1);
			append(svg1, path1);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*showToolsSideBar*/ ctx[5]),
					listen(button1, "click", /*showExportSideBar*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*toolsIconCol*/ 2) {
				attr(svg0, "stroke", /*toolsIconCol*/ ctx[1]);
			}

			if (dirty & /*$projectStore*/ 16) {
				toggle_class(button0, "selected", /*$projectStore*/ ctx[4].showSidebar === true);
			}

			if (dirty & /*exportIconCol*/ 8) {
				attr(svg1, "stroke", /*exportIconCol*/ ctx[3]);
			}

			if (dirty & /*$projectStore*/ 16) {
				toggle_class(button1, "selected", /*$projectStore*/ ctx[4].showSidebar === false);
			}

			if (dirty & /*toolsBGCol*/ 1) {
				set_style(div, "--toolsColour", /*toolsBGCol*/ ctx[0]);
			}

			if (dirty & /*exportBGCol*/ 4) {
				set_style(div, "--exportColour", /*exportBGCol*/ ctx[2]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $projectStore;
	component_subscribe($$self, projectStore, $$value => $$invalidate(4, $projectStore = $$value));
	let toolsBGCol = sidebarActiveColour;
	let toolsIconCol = iconActiveColour;
	let exportBGCol = sidebarPassiveColour;
	let exportIconCol = iconPassiveColour;

	function showToolsSideBar() {
		if ($projectStore.showSidebar === false) {
			projectStore.toggleSidebar();
			$$invalidate(0, toolsBGCol = sidebarActiveColour);
			$$invalidate(1, toolsIconCol = iconActiveColour);
			$$invalidate(2, exportBGCol = sidebarPassiveColour);
			$$invalidate(3, exportIconCol = iconPassiveColour);
		}
	}

	function showExportSideBar() {
		if ($projectStore.showSidebar === true) {
			projectStore.toggleSidebar();
			$$invalidate(2, exportBGCol = sidebarActiveColour);
			$$invalidate(3, exportIconCol = iconActiveColour);
			$$invalidate(0, toolsBGCol = sidebarPassiveColour);
			$$invalidate(1, toolsIconCol = iconPassiveColour);
		}
	}

	return [
		toolsBGCol,
		toolsIconCol,
		exportBGCol,
		exportIconCol,
		$projectStore,
		showToolsSideBar,
		showExportSideBar
	];
}

class SidebarTab extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default SidebarTab;