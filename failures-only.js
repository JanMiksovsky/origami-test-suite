export default async function* reporter(source) {
  let passed = 0;
  let failed = 0;

  for await (const event of source) {
    if (event.type === "test:pass") {
      passed++;
    } else if (event.type === "test:fail") {
      failed++;
      yield `failed: ${event.data.file}\n`;
    }
  }

  // const total = passed + failed;
  // if (failed > 0) {
  //   yield `${failed} failed, ${passed} passed, ${total} total\n`;
  // } else {
  //   yield `${total} tests passed\n`;
  // }
}
