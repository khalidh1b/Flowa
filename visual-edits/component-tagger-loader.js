"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = componentTagger;

const parser_1 = require("@babel/parser");
const magic_string_1 = require("magic-string");
const path = require("path");

const ast_utils_js_1 = require("./utils/ast-utils");
const tagger_js_1 = require("./core/tagger");


// Component Tagger Loader
function componentTagger(src, map) {
    const done = this.async();
    
    try {
        // Skip processing for node_modules
        if (/node_modules/.test(this.resourcePath)) {
            return done(null, src, map);
        }
        
        // Parse the source code into an AST
        const ast = (0, parser_1.parse)(src, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });
        
        // Initialize MagicString for source code manipulation
        const ms = new magic_string_1.default(src);
        const rel = path.relative(process.cwd(), this.resourcePath);
        
        // Step 1: Add parent references to AST nodes for upward traversal
        (0, tagger_js_1.addParentReferences)(ast);
        
        // Step 2: Collect variable declarations for context analysis
        const variables = (0, ast_utils_js_1.findVariableDeclarations)(ast);
        
        // Step 3: Gather local identifiers that reference `next/image`
        const imageAliases = (0, tagger_js_1.collectImageAliases)(ast);
        
        // Step 4: Process JSX elements and inject attributes
        const mutated = (0, tagger_js_1.processJSXElements)(ast, ms, rel, variables, imageAliases);
        
        // If no mutations were made, return original source
        if (!mutated) {
            return done(null, src, map);
        }
        
        // Generate the modified source and source map
        const out = ms.toString();
        const outMap = ms.generateMap({ hires: true });
        
        // Turbopack expects the sourcemap as a JSON *string*
        done(null, out, JSON.stringify(outMap));
        
    } catch (err) {
        done(err);
    }
};