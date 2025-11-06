"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;

// Export the main loader
var component_tagger_loader_js_1 = require("./component-tagger-loader");
Object.defineProperty(exports, "default", { enumerable: true, get: function() { return component_tagger_loader_js_1.default; } });

// Export utilities for testing or external use
var ast_utils_js_1 = require("./utils/ast-utils");
Object.defineProperty(exports, "extractLiteralValue", { enumerable: true, get: function() { return ast_utils_js_1.extractLiteralValue; } });
Object.defineProperty(exports, "findVariableDeclarations", { enumerable: true, get: function() { return ast_utils_js_1.findVariableDeclarations; } });
Object.defineProperty(exports, "getSemanticName", { enumerable: true, get: function() { return ast_utils_js_1.getSemanticName; } });
Object.defineProperty(exports, "getMapContext", { enumerable: true, get: function() { return ast_utils_js_1.getMapContext; } });

// Export filter utilities
var filters_js_1 = require("./utils/filters");
Object.defineProperty(exports, "shouldTag", { enumerable: true, get: function() { return filters_js_1.shouldTag; } });
Object.defineProperty(exports, "isNextImageAlias", { enumerable: true, get: function() { return filters_js_1.isNextImageAlias; } });

// Export core tagging functions
var tagger_js_1 = require("./core/tagger");
Object.defineProperty(exports, "addParentReferences", { enumerable: true, get: function() { return tagger_js_1.addParentReferences; } });
Object.defineProperty(exports, "collectImageAliases", { enumerable: true, get: function() { return tagger_js_1.collectImageAliases; } });
Object.defineProperty(exports, "processJSXElements", { enumerable: true, get: function() { return tagger_js_1.processJSXElements; } });

// Export constants
var blacklist_elements_js_1 = require("./constants/blacklist-elements");
Object.defineProperty(exports, "threeFiberElems", { enumerable: true, get: function() { return blacklist_elements_js_1.threeFiberElems; } });
Object.defineProperty(exports, "dreiElems", { enumerable: true, get: function() { return blacklist_elements_js_1.dreiElems; } });