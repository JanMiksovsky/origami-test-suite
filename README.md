# Origami test suite

This repository is used to verify that [Web Origami](https://weborigami.org) release candidates do not cause regressions.

_This project isn’t set up for other people to run yet. E.g., the project hard-codes paths to local copies of each project in the suite. I’m nevertheless publishing this so that people who want to have their projects included in this suite can understand how it works. When other people want to contribute to the Origami code base, I’ll need to invest time making this suite runnable on other people’s machines. –Jan_

The test suite works against a hard-coded list of representative Origami projects of different types. In effect, it turns these representative projects into site-scale Origami integration tests.

The test suite project relies on two local folders that are _not_ stored in git:

* A git-ignored `build` folder containing symbolic links to the `build` folders of all the individual test projects. This `build` folder therefore represent a giant tree of the output from the latest individual builds.
* A git-ignored `baseline` folder containing complete copies of all `build` folders from the _previous_ test suite build. This `baseline` folder is a giant tree of the expected output of all the individual builds.

The basic workflow is to compare the `baseline` and `build` trees until they match:

1. Build all the projects with `npm run build-all` using an Origami release candidate. This invokes the `npm run build` script in each test project, updating the individual folders linked to in the test suite’s `build` folder.
2. Test all the projects with `npm run test-all`. This invokes the [`dev:changes`](https://weborigami.org/builtins/dev/changes) Origami builtin to compare the older `baseline` folder with the newer aggregate `build` folder.
3. If the `test-all` script reveals _any_ file that has changed in the new build, diff the `baseline` vs `build` copies of that file to pinpoint what changed.
4. Investigate and identify the cause, then implement a possible fix in Origami. Alternatively, if the Origami language itself is changing, the fix may require updating the Origami source code for a test project.
5. Iterate until the `test-all` script shows no changes.

It’s common for the individual test projects (the sample sites) themselves to change over time. When this happens, the updated sample site is built and then its copy in the `baseline` folder is updated to reflect the project’s desired build output.

This project has proven _extremely_ useful in catching tricky bugs in release candidates; a tiny, puzzling text discrepancy in build output has often indicated a serious issue that might not otherwise have been caught for a long time.

## Test suite project guidelines

_If you’re interested in having your site included in this Origami test suite, [contact me](https://jan.miksovsky.com/contact) to have your project added._

To minimize the work required to run the test suite and to maximize its value as a quality control tool, it’s helpful if all projects in the test suite are built in a consistent way.

* Your project will be installed via `npm install`. If your project requires any special post-install commands, have those commands invoked automatically via a `postinstall` script. (This is good npm practice anyway.)
* The test suite will build your project by calling `npm run build`. You yourself can use other build tools (deno, bun), but it’s best if the project can also be built with `npm`.
* Your project’s build output folder must be called `build`.
* Your build script can call prebuild and postbuild scripts but shouldn’t rely on other manual processes being triggered before and after a build.
* Your project’s build should generate no errors or warnings.
* Avoid generating random output in your builds, as this adds persistent noise to testing. _If there’s a single page that has random output (one of my projects does) then I can get used to it. But that makes it harder to see real problems, and erodes the value of testing the project in the first place._
