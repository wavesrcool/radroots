import { CollapseRadrootsLibraryAsyncCatch } from "..";

describe(`test RadrootsLoggingCollapseRadrootsLibraryAsyncCatch.spec`, () => {
  const test = "RadrootsLoggingCollapseRadrootsLibraryAsyncCatch.spec";
  it(`run ${test}`, async () => {
    const e = new Error("test");
    const collapse = await CollapseRadrootsLibraryAsyncCatch(e, test);
    expect(collapse === true).toBeTruthy();
  });
});
