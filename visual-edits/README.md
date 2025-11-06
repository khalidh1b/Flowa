# Visual Edits Component Tagger

A modular webpack loader that injects data attributes into JSX elements for visual editing capabilities.

## Overview

This package provides a comprehensive solution for tagging React components with unique identifiers and semantic names, enabling advanced visual editing experiences. The loader processes JSX/TSX files and adds data attributes that can be used by visual editing tools.

## Features

- **Component Tagging**: Automatically tags JSX elements with unique IDs
- **Semantic Naming**: Preserves component names for better identification
- **Next.js Image Support**: Handles Next.js Image component aliases
- **Map Context Awareness**: Provides context for elements inside `.map()` calls
- **Three.js Filtering**: Excludes Three.js Fiber and Drei elements from tagging
- **Source Map Support**: Maintains source maps for debugging

## Architecture

The codebase has been refactored into a modular structure for better maintainability:

```
visual-edits/
├── component-tagger-loader.js    # Main webpack loader entry point
├── index.js                      # Module exports and API
├── constants/
│   └── blacklist-elements.js     # Three.js and Drei element blacklists
├── utils/
│   ├── ast-utils.js             # AST manipulation utilities
│   └── filters.js               # Component filtering logic
├── core/
│   └── tagger.js                # Core tagging functionality
└── README.md                    # This documentation
```

## Module Breakdown

### Main Loader (`component-tagger-loader.js`)
The primary webpack loader that orchestrates the tagging process. It:
- Parses source code into AST
- Coordinates the tagging workflow
- Handles error cases and source map generation

### Constants (`constants/blacklist-elements.js`)
Contains blacklist arrays for:
- `threeFiberElems`: Three.js Fiber elements to exclude
- `dreiElems`: Drei library elements to exclude

### Utilities

#### AST Utils (`utils/ast-utils.js`)
Core AST manipulation functions:
- `extractLiteralValue()`: Extracts literal values from AST nodes
- `findVariableDeclarations()`: Maps variable declarations
- `getSemanticName()`: Gets semantic names from JSX elements
- `getMapContext()`: Analyzes map context for elements

#### Filters (`utils/filters.js`)
Filtering logic:
- `shouldTag()`: Determines if components should be tagged
- `isNextImageAlias()`: Checks for Next.js Image aliases

### Core (`core/tagger.js`)
Main tagging logic:
- `addParentReferences()`: Adds parent references to AST nodes
- `collectImageAliases()`: Gathers Next.js Image component aliases
- `processJSXElements()`: Processes and tags JSX elements

## Usage

### As a Webpack Loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'visual-edits/component-tagger-loader',
          }
        ]
      }
    ]
  }
};
```

### Programmatic Usage

```javascript
import componentTagger from 'visual-edits';
import { shouldTag, extractLiteralValue } from 'visual-edits';

// Use the main loader
const result = componentTagger.call(loaderContext, sourceCode, sourceMap);

// Use individual utilities
const shouldTagComponent = shouldTag('div');
const literalValue = extractLiteralValue(astNode);
```

## Generated Attributes

The loader injects the following data attributes:

- `data-orchards-id`: Unique identifier based on file location and context
- `data-orchards-name`: Semantic component name
- `data-map-index`: Index parameter for elements inside map calls (when applicable)

Example output:
```jsx
<div data-orchards-id="src/components/Button.jsx:15:4" data-orchards-name="button">
  Click me
</div>

{items.map((item, index) => (
  <li 
    key={item.id}
    data-orchards-id="src/components/List.jsx:25:8@items" 
    data-orchards-name="li"
    data-map-index={index}
  >
    {item.name}
  </li>
))}
```

## To add new features:

1. **New Filters**: Add to `utils/filters.js`
2. **AST Operations**: Add to `utils/ast-utils.js`
3. **Core Logic**: Extend `core/tagger.js`
4. **Constants**: Add to `constants/blacklist-elements.js`

## Performance Considerations

- Skips processing of `node_modules` files automatically
- Uses efficient AST walking with early returns
- Maintains source maps for debugging
- Modular structure enables tree-shaking for unused features

## Compatibility

- Works with JSX and TSX files
- Compatible with Webpack and Turbopack
- Supports ES6+ syntax
- Maintains source map compatibility