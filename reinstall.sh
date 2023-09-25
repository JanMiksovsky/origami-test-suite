rm -rf node_modules
rm package-lock.json
npm install

# npm link @graphorigami/types @graphorigami/core @graphorigami/origami

# Effectively do `npm link` without doing that, since it has the undesirable
# side effect of removing the origami package dependencies like yaml.
# For some reason, if we don't remove the existing folders first, the symbolic
# links won't get created (or will get overwritten by some unfinished process).
rm -rf node_modules/@graphorigami/types
rm -rf node_modules/@graphorigami/core
rm -rf node_modules/@graphorigami/origami
ln -s ~/Source/GraphOrigami/origami/packages/types node_modules/@graphorigami/types
ln -s ~/Source/GraphOrigami/origami/packages/core node_modules/@graphorigami/core
ln -s ~/Source/GraphOrigami/origami/packages/origami node_modules/@graphorigami/origami
