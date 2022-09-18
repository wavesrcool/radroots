import { RadrootsAsyncPromiseCatch } from "./RadrootsAsyncPromiseCatch";

describe(`test RadrootsAsyncPromiseCatch.spec`, () => {
  const test = "RadrootsAsyncPromiseCatch.spec";
  it(`run ${test}`, async () => {
    const e = new Error(test);
    const collapse = await RadrootsAsyncPromiseCatch(e, test);
    expect(!!collapse === true).toBeTruthy();
  });
});
