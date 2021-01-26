/* src\Components\PrismJS.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	globals,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

const { document: document_1 } = globals;
import { onMount } from "../../web_modules/svelte.js";

function create_fragment(ctx) {
	let link0;
	let link1;
	let t0;
	let div;
	let pre;
	let code_1;
	let t1;
	let code_1_class_value;

	return {
		c() {
			link0 = element("link");
			link1 = element("link");
			t0 = space();
			div = element("div");
			pre = element("pre");
			code_1 = element("code");
			t1 = text(/*code*/ ctx[1]);
			attr(link0, "rel", "stylesheet");
			attr(link0, "href", "https://fonts.googleapis.com/css?family=Open+Sans:400,700");
			attr(link0, "type", "text/css");
			attr(link1, "rel", "stylesheet");
			attr(link1, "href", "https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css");
			attr(code_1, "class", code_1_class_value = "language-" + /*language*/ ctx[0]);
			attr(div, "class", "w3-container");
		},
		m(target, anchor) {
			append(document_1.head, link0);
			append(document_1.head, link1);
			insert(target, t0, anchor);
			insert(target, div, anchor);
			append(div, pre);
			append(pre, code_1);
			append(code_1, t1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*code*/ 2) set_data(t1, /*code*/ ctx[1]);

			if (dirty & /*language*/ 1 && code_1_class_value !== (code_1_class_value = "language-" + /*language*/ ctx[0])) {
				attr(code_1, "class", code_1_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			detach(link0);
			detach(link1);
			if (detaching) detach(t0);
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { language } = $$props;
	let { code } = $$props;

	onMount(() => {
		let script = document.createElement("script");
		script.src = "https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism.js";
		document.head.append(script);

		script.onload = function () {
			let langJS = false;
			let lang_script;
			let lang_module;

			// This switch statement, evaluates what language is being used, if one of a key language is being used, it will
			// load the proper Prisim support tool, like Python requires "prism-python.js" to modify the raw code so that
			// Prisim can render it properly.
			switch (language) {
				case "json":
					lang_module = "https://prismjs.com/components/prism-json.js";
					langJS = true;
					break;
				case "python":
					lang_module = "https://prismjs.com/components/prism-python.js";
					langJS = true;
					break;
			}

			if (langJS == true) {
				lang_script = document.createElement("script");
				lang_script.src = lang_module;
				lang_script.async = true;
				document.head.append(lang_script);

				lang_script.onload = () => {
					Prism.highlightAll();
				};
			} else {
				Prism.highlightAll();
			}
		};
	});

	$$self.$$set = $$props => {
		if ("language" in $$props) $$invalidate(0, language = $$props.language);
		if ("code" in $$props) $$invalidate(1, code = $$props.code);
	};

	return [language, code];
}

class PrismJS extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { language: 0, code: 1 });
	}
}

export default PrismJS;