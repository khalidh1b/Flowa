"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldTag = exports.isNextImageAlias = void 0;
const blacklist_elements_js_1 = require("../constants/blacklist-elements");

// Checks if a name is an alias for Next.js Image component
const isNextImageAlias = (aliases, name) => aliases.has(name);
exports.isNextImageAlias = isNextImageAlias;


// Determines if a component should be tagged based on blacklist elements
const shouldTag = (name) => 
    !blacklist_elements_js_1.threeFiberElems.includes(name) && 
    !blacklist_elements_js_1.dreiElems.includes(name);
exports.shouldTag = shouldTag;