// If the build output text looks normal, return undefined
export default function messages(text) {
  if (text === undefined) {
    return undefined;
  }
  const lines = text.split("\n");
  // Remove lines that start with `~/` or `> `, or are empty
  const meaningfulLines = lines.filter(
    (line) =>
      !line.startsWith("~/") && !line.startsWith("> ") && line.trim() !== "",
  );
  return meaningfulLines.length === 0 ? undefined : text;
}
