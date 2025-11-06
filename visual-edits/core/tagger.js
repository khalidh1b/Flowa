"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJSXElements = exports.collectImageAliases = exports.addParentReferences = void 0;
const estree_walker_1 = require("estree-walker");
const ast_utils_js_1 = require("../utils/ast-utils");
const filters_js_1 = require("../utils/filters");

// Adds parent references to AST nodes for upward traversal
const addParentReferences = (ast) => {
    (0, estree_walker_1.walk)(ast, {
        enter(node, parent) {
            if (parent && !Object.prototype.hasOwnProperty.call(node, 'parent')) {
                Object.defineProperty(node, 'parent', { value: parent, enumerable: false });
            }
        }
    });
};
exports.addParentReferences = addParentReferences;

// Collects local identifiers that reference `next/image`
const collectImageAliases = (ast) => {
    const imageAliases = new Set();
    
    (0, estree_walker_1.walk)(ast, {
        enter(node) {
            if (node.type === 'ImportDeclaration' &&
                node.source.value === 'next/image') {
                for (const spec of node.specifiers) {
                    imageAliases.add(spec.local.name);
                }
            }
        },
    });
    
    return imageAliases;
};
exports.collectImageAliases = collectImageAliases;

// Generates orchards ID for a JSX element
const generateOrchardsId = (rel, node, mapContext, variables) => {
    const { line, column } = node.loc.start;
    let orchardsId = `${rel}:${line}:${column}`;
    
    // Enhance the ID with context if we have map information
    if (mapContext) {
        orchardsId += `@${mapContext.arrayName}`;
    }
    
    // Append referenced variable locations for simple identifier references in props
    var _a;
    (_a = node.attributes) === null || _a === void 0 ? void 0 : _a.forEach((attr) => {
        var _a, _b;
        if (attr.type === 'JSXAttribute' &&
            ((_a = attr.value) === null || _a === void 0 ? void 0 : _a.type) === 'JSXExpressionContainer' &&
            ((_b = attr.value.expression) === null || _b === void 0 ? void 0 : _b.type) === 'Identifier') {
            const refName = attr.value.expression.name;
            const varInfo = variables.get(refName);
            if (varInfo) {
                orchardsId += `@${refName}`;
            }
        }
    });
    
    return orchardsId;
};

// Processes JSX elements and injects attributes
const processJSXElements = (ast, ms, rel, variables, imageAliases) => {
    let mutated = false;
    
    (0, estree_walker_1.walk)(ast, {
        enter(node) {
            if (node.type !== 'JSXOpeningElement')
                return;
            
            const mapContext = (0, ast_utils_js_1.getMapContext)(node, variables);
            const semanticName = (0, ast_utils_js_1.getSemanticName)(node, mapContext, imageAliases);
            
            if (!semanticName ||
                ['Fragment', 'React.Fragment'].includes(semanticName) ||
                (!(0, filters_js_1.isNextImageAlias)(imageAliases, semanticName.split('-')[0]) &&
                    !(0, filters_js_1.shouldTag)(semanticName)))
                return;
            
            const orchardsId = generateOrchardsId(rel, node, mapContext, variables);
            
            // If inside a map context and we have an index variable, inject data-map-index
            if (mapContext === null || mapContext === void 0 ? void 0 : mapContext.indexVarName) {
                ms.appendLeft(node.name.end, ` data-map-index={${mapContext.indexVarName}}`);
            }
            
            ms.appendLeft(node.name.end, ` data-orchards-id="${orchardsId}" data-orchards-name="${semanticName}"`);
            mutated = true;
        },
    });
    
    return mutated;
};
exports.processJSXElements = processJSXElements;