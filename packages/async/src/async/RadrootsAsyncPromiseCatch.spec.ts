import { RadrootsAsyncPromiseCatch } from "./RadrootsAsyncPromiseCatch";

describe(`test RadrootsAsyncPromiseCatch.spec`, () => {
  const test = "RadrootsAsyncPromiseCatch.spec";
  it(`run ${test}`, async () => {
    const e = new Error(test);
    const collapse = await RadrootsAsyncPromiseCatch(e, test);
    expect(!!collapse === true).toBeTruthy();

    const e0 = undefined;
    const collapse0 = await RadrootsAsyncPromiseCatch(e0, test);
    expect(!!collapse0 === false).toBeTruthy();
  });
});
