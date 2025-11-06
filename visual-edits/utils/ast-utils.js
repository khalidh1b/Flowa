"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapContext = exports.getSemanticName = exports.extractLiteralValue = exports.findVariableDeclarations = void 0;
const estree_walker_1 = require("estree-walker");

// Extracts literal values from AST nodes
const extractLiteralValue = (node) => {
    if (!node)
        return undefined;
    
    switch (node.type) {
        case 'StringLiteral':
            return node.value;
        case 'NumericLiteral':
            return node.value;
        case 'BooleanLiteral':
            return node.value;
        case 'ObjectExpression':
            const obj = {};
            for (const prop of node.properties) {
                if (prop.type === 'ObjectProperty' && !prop.computed) {
                    const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
                    obj[key] = extractLiteralValue(prop.value);
                }
            }
            return obj;
        case 'ArrayExpression':
            return node.elements.map((el) => extractLiteralValue(el));
        default:
            return undefined;
    }
};
exports.extractLiteralValue = extractLiteralValue;

// Finds all variable declarations in the AST
const findVariableDeclarations = (ast) => {
    const variables = new Map();
    
    (0, estree_walker_1.walk)(ast, {
        enter(node) {
            var _a;

            // Handle const/let/var declarations
            if (node.type === 'VariableDeclaration') {
                for (const declarator of node.declarations) {
                    if (declarator.id.type === 'Identifier' && declarator.init) {
                        const varName = declarator.id.name;
                        const value = extractLiteralValue(declarator.init);
                        variables.set(varName, {
                            name: varName,
                            type: Array.isArray(value) ? 'array' : typeof value === 'object' ? 'object' : 'primitive',
                            value,
                            arrayItems: Array.isArray(value) ? value : undefined,
                            loc: (_a = declarator.loc) === null || _a === void 0 ? void 0 : _a.start
                        });
                    }
                }
            }
        }
    });
    
    return variables;
};
exports.findVariableDeclarations = findVariableDeclarations;

// Gets semantic name from JSX element
const getSemanticName = (node, mapContext, imageAliases) => {
    const getName = () => {
        if (node.name.type === 'JSXIdentifier')
            return node.name.name;
        if (node.name.type === 'JSXMemberExpression')
            return `${node.name.object.name}.${node.name.property.name}`;
        return null;
    };
    
    const tagName = getName();
    if (!tagName)
        return null;
    
    // For Next.js Image components, always return 'img' so the name is a valid HTML tag.
    if (imageAliases.has(tagName)) {
        return 'img';
    }
    
    return tagName;
};
exports.getSemanticName = getSemanticName;

// Finds map context for a given node
const getMapContext = (node, variables) => {
    var _a, _b, _c, _d, _e, _f, _g;
    
    // Walk up the tree to find if this JSX element is inside a map call
    let current = node;
    let depth = 0;
    const maxDepth = 10;
    
    while (current && depth < maxDepth) {
        if (current.type === 'CallExpression' &&
            ((_a = current.callee) === null || _a === void 0 ? void 0 : _a.type) === 'MemberExpression' &&
            ((_c = (_b = current.callee) === null || _b === void 0 ? void 0 : _b.property) === null || _c === void 0 ? void 0 : _c.name) === 'map') {
            
            // Found a .map() call, check if it's on a known array
            const arrayName = (_d = current.callee.object) === null || _d === void 0 ? void 0 : _d.name;
            const mapCallback = (_e = current.arguments) === null || _e === void 0 ? void 0 : _e[0];
            
            if (arrayName && (mapCallback === null || mapCallback === void 0 ? void 0 : mapCallback.type) === 'ArrowFunctionExpression') {
                const itemParam = (_f = mapCallback.params) === null || _f === void 0 ? void 0 : _f[0];
                const indexParam = (_g = mapCallback.params) === null || _g === void 0 ? void 0 : _g[1];
                
                if ((itemParam === null || itemParam === void 0 ? void 0 : itemParam.type) === 'Identifier') {
                    const varInfo = variables.get(arrayName);
                    return {
                        arrayName,
                        itemVarName: itemParam.name,
                        arrayItems: varInfo === null || varInfo === void 0 ? void 0 : varInfo.arrayItems,
                        arrayLoc: varInfo === null || varInfo === void 0 ? void 0 : varInfo.loc,
                        indexVarName: (indexParam === null || indexParam === void 0 ? void 0 : indexParam.type) === 'Identifier' ? indexParam.name : undefined
                    };
                }
            }
        }
        current = current.parent;
        depth++;
    }
    
    return null;
};
exports.getMapContext = getMapContext;