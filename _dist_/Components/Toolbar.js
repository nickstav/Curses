/* src\Components\Toolbar.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	svg_element,
	transition_in,
	transition_out,
	xlink_attr
} from "../../web_modules/svelte/internal.js";

import ToolbarButton from "./ToolbarButton.js";
import { changeTool } from "../JS/items/selectTool.js";
import { tools } from "../JS/constants/toolsList.js";

function create_default_slot_4(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "fill", "currentColor");
			attr(svg, "viewBox", "0 0 16 16");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (15:4) <ToolbarButton label={'line (l)'} editCanvas={()=>{changeTool(tools.LINE)}}>
function create_default_slot_3(ctx) {
	let svg;
	let defs;
	let path;
	let g2;
	let g1;
	let g0;
	let use;

	return {
		c() {
			svg = svg_element("svg");
			defs = svg_element("defs");
			path = svg_element("path");
			g2 = svg_element("g");
			g1 = svg_element("g");
			g0 = svg_element("g");
			use = svg_element("use");
			attr(path, "d", "M511.51 44.12C516.69 38.39 525.53 37.95 531.26 43.13C536.83 48.17 543.18 53.92 548.75 58.96C554.47 64.14 554.91 72.98 549.73 78.7C457.04 181.14 188.35 478.09 95.66 580.53C90.48 586.25 81.64 586.69 75.91 581.51C70.34 576.47 63.99 570.73 58.42 565.68C52.7 560.5 52.25 551.66 57.43 545.94C150.13 443.5 418.82 146.55 511.51 44.12Z");
			attr(path, "id", "d3Cway8rNo");
			xlink_attr(use, "xlink:href", "#d3Cway8rNo");
			attr(use, "opacity", "1");
			attr(use, "fill", "currentColor");
			attr(use, "fill-opacity", "1");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 640 640");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, defs);
			append(defs, path);
			append(svg, g2);
			append(g2, g1);
			append(g1, g0);
			append(g0, use);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (26:4) <ToolbarButton label={'rectangle (r)'} editCanvas={()=>{changeTool(tools.RECTANGLE)}}>
function create_default_slot_2(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "fill", "currentColor");
			attr(svg, "viewBox", "0 0 16 16");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (32:4) <ToolbarButton label={'text (t)'} editCanvas={()=>{changeTool(tools.TEXT)}}>
function create_default_slot_1(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M2.244 13.081l.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "fill", "currentColor");
			attr(svg, "viewBox", "0 0 16 16");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (38:4) <ToolbarButton label={'progress bar (p)'} editCanvas={()=>{changeTool(tools.PROGRESS)}}>
function create_default_slot(ctx) {
	let svg;
	let defs;
	let path0;
	let path1;
	let path2;
	let g5;
	let g4;
	let g1;
	let use0;
	let g0;
	let use1;
	let g2;
	let use2;
	let g3;
	let use3;

	return {
		c() {
			svg = svg_element("svg");
			defs = svg_element("defs");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			g5 = svg_element("g");
			g4 = svg_element("g");
			g1 = svg_element("g");
			use0 = svg_element("use");
			g0 = svg_element("g");
			use1 = svg_element("use");
			g2 = svg_element("g");
			use2 = svg_element("use");
			g3 = svg_element("g");
			use3 = svg_element("use");
			attr(path0, "d", "M595.24 208.69C606.28 208.69 615.24 217.64 615.24 228.69C615.24 269.21 615.24 370.79 615.24 411.31C615.24 422.36 606.28 431.31 595.24 431.31C481.14 431.31 158.86 431.31 44.76 431.31C33.72 431.31 24.76 422.36 24.76 411.31C24.76 370.79 24.76 269.21 24.76 228.69C24.76 217.64 33.72 208.69 44.76 208.69C158.86 208.69 481.14 208.69 595.24 208.69Z");
			attr(path0, "id", "b3iYbB6rmW");
			attr(path1, "d", "M153.69 227.14C164.74 227.14 173.69 236.1 173.69 247.14C173.69 280.29 173.69 359.71 173.69 392.86C173.69 403.9 164.74 412.86 153.69 412.86C131.98 412.86 86.83 412.86 65.12 412.86C54.07 412.86 45.12 403.9 45.12 392.86C45.12 359.71 45.12 280.29 45.12 247.14C45.12 236.1 54.07 227.14 65.12 227.14C86.83 227.14 131.98 227.14 153.69 227.14Z");
			attr(path1, "id", "aYknP2osd");
			attr(path2, "d", "M293.81 227.14C304.86 227.14 313.81 236.1 313.81 247.14C313.81 280.29 313.81 359.71 313.81 392.86C313.81 403.9 304.86 412.86 293.81 412.86C272.1 412.86 226.95 412.86 205.24 412.86C194.19 412.86 185.24 403.9 185.24 392.86C185.24 359.71 185.24 280.29 185.24 247.14C185.24 236.1 194.19 227.14 205.24 227.14C226.95 227.14 272.1 227.14 293.81 227.14Z");
			attr(path2, "id", "b395LxMxtp");
			xlink_attr(use0, "xlink:href", "#b3iYbB6rmW");
			attr(use0, "opacity", "1");
			attr(use0, "fill-opacity", "0");
			xlink_attr(use1, "xlink:href", "#b3iYbB6rmW");
			attr(use1, "opacity", "1");
			attr(use1, "fill-opacity", "0");
			attr(use1, "stroke", "currentColor");
			attr(use1, "stroke-width", "24");
			attr(use1, "stroke-opacity", "1");
			xlink_attr(use2, "xlink:href", "#aYknP2osd");
			attr(use2, "opacity", "1");
			attr(use2, "fill-opacity", "1");
			xlink_attr(use3, "xlink:href", "#b395LxMxtp");
			attr(use3, "opacity", "1");
			attr(use3, "fill-opacity", "1");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 640 640");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, defs);
			append(defs, path0);
			append(defs, path1);
			append(defs, path2);
			append(svg, g5);
			append(g5, g4);
			append(g4, g1);
			append(g1, use0);
			append(g1, g0);
			append(g0, use1);
			append(g4, g2);
			append(g2, use2);
			append(g4, g3);
			append(g3, use3);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let toolbarbutton0;
	let t0;
	let toolbarbutton1;
	let t1;
	let toolbarbutton2;
	let t2;
	let toolbarbutton3;
	let t3;
	let toolbarbutton4;
	let current;

	toolbarbutton0 = new ToolbarButton({
			props: {
				label: "select (v)",
				editCanvas: /*func*/ ctx[0],
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	toolbarbutton1 = new ToolbarButton({
			props: {
				label: "line (l)",
				editCanvas: /*func_1*/ ctx[1],
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	toolbarbutton2 = new ToolbarButton({
			props: {
				label: "rectangle (r)",
				editCanvas: /*func_2*/ ctx[2],
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	toolbarbutton3 = new ToolbarButton({
			props: {
				label: "text (t)",
				editCanvas: /*func_3*/ ctx[3],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	toolbarbutton4 = new ToolbarButton({
			props: {
				label: "progress bar (p)",
				editCanvas: /*func_4*/ ctx[4],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div = element("div");
			create_component(toolbarbutton0.$$.fragment);
			t0 = space();
			create_component(toolbarbutton1.$$.fragment);
			t1 = space();
			create_component(toolbarbutton2.$$.fragment);
			t2 = space();
			create_component(toolbarbutton3.$$.fragment);
			t3 = space();
			create_component(toolbarbutton4.$$.fragment);
			attr(div, "id", "buttons");
			attr(div, "class", "flex flex-col h-full justify-start bg-toolbar border-r border-toolbar-border pt-4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(toolbarbutton0, div, null);
			append(div, t0);
			mount_component(toolbarbutton1, div, null);
			append(div, t1);
			mount_component(toolbarbutton2, div, null);
			append(div, t2);
			mount_component(toolbarbutton3, div, null);
			append(div, t3);
			mount_component(toolbarbutton4, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const toolbarbutton0_changes = {};

			if (dirty & /*$$scope*/ 32) {
				toolbarbutton0_changes.$$scope = { dirty, ctx };
			}

			toolbarbutton0.$set(toolbarbutton0_changes);
			const toolbarbutton1_changes = {};

			if (dirty & /*$$scope*/ 32) {
				toolbarbutton1_changes.$$scope = { dirty, ctx };
			}

			toolbarbutton1.$set(toolbarbutton1_changes);
			const toolbarbutton2_changes = {};

			if (dirty & /*$$scope*/ 32) {
				toolbarbutton2_changes.$$scope = { dirty, ctx };
			}

			toolbarbutton2.$set(toolbarbutton2_changes);
			const toolbarbutton3_changes = {};

			if (dirty & /*$$scope*/ 32) {
				toolbarbutton3_changes.$$scope = { dirty, ctx };
			}

			toolbarbutton3.$set(toolbarbutton3_changes);
			const toolbarbutton4_changes = {};

			if (dirty & /*$$scope*/ 32) {
				toolbarbutton4_changes.$$scope = { dirty, ctx };
			}

			toolbarbutton4.$set(toolbarbutton4_changes);
		},
		i(local) {
			if (current) return;
			transition_in(toolbarbutton0.$$.fragment, local);
			transition_in(toolbarbutton1.$$.fragment, local);
			transition_in(toolbarbutton2.$$.fragment, local);
			transition_in(toolbarbutton3.$$.fragment, local);
			transition_in(toolbarbutton4.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(toolbarbutton0.$$.fragment, local);
			transition_out(toolbarbutton1.$$.fragment, local);
			transition_out(toolbarbutton2.$$.fragment, local);
			transition_out(toolbarbutton3.$$.fragment, local);
			transition_out(toolbarbutton4.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(toolbarbutton0);
			destroy_component(toolbarbutton1);
			destroy_component(toolbarbutton2);
			destroy_component(toolbarbutton3);
			destroy_component(toolbarbutton4);
		}
	};
}

function instance($$self) {
	const func = () => {
		changeTool(tools.DRAG);
	};

	const func_1 = () => {
		changeTool(tools.LINE);
	};

	const func_2 = () => {
		changeTool(tools.RECTANGLE);
	};

	const func_3 = () => {
		changeTool(tools.TEXT);
	};

	const func_4 = () => {
		changeTool(tools.PROGRESS);
	};

	return [func, func_1, func_2, func_3, func_4];
}

class Toolbar extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Toolbar;