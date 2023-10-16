import { Tree } from "@graphorigami/origami";

// Given a baseline tree and a current tree, return an object of `true` values
// for each key that has changed.
export default async function changed(baselineTreelike, currentTreelike) {
  const baseline = Tree.from(baselineTreelike);
  const current = Tree.from(currentTreelike);

  const result = {};
  for (const key of await baseline.keys()) {
    const baselineValue = await baseline.get(key);
    const currentValue = await current.get(key);

    if (
      Tree.isAsyncDictionary(baselineValue) &&
      Tree.isAsyncDictionary(currentValue)
    ) {
      const treeChanged = await changed(baselineValue, currentValue);
      if (Object.keys(treeChanged).length > 0) {
        result[key] = treeChanged;
      }
    } else if (baselineValue?.toString && currentValue?.toString) {
      const baselineText = baselineValue.toString().trim();
      const currentText = currentValue.toString().trim();
      if (baselineText !== currentText) {
        result[key] = true;
      }
    } else {
      result[key] = true;
    }
  }

  return result;
}
