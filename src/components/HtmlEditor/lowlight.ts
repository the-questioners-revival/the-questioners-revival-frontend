import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// @ts-ignore
import { solidity } from 'highlightjs-solidity';
import { all, createLowlight } from 'lowlight';
import 'highlight.js/styles/tokyo-night-dark.css';
const lowlight = createLowlight(all);
lowlight.register('solidity', solidity);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

export default lowlight;
