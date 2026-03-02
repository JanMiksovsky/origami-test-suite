#!/bin/bash

# Run unit tests for all Origami artifacts

# Origami itself
node --test --test-reporter=./failures-only.js ~/Source/Origami/origami/**/test/**/*.test.js

# Extensions
node --test --test-reporter=./failures-only.js ~/Source/Origami/extensions/**/test/**/*.test.js

# Projector
node --test --test-reporter=./failures-only.js ~/Source/Origami/projector/test/**/*.test.js

# VS Code extension -- note `.mjs`
node --test --test-reporter=./failures-only.js ~/Source/Origami/origami-vscode-extension/test/**/*.test.mjs
