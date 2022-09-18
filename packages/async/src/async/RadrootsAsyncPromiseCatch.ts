/**
 * * Radroots Documentation
 *
 * @created 09 16 2022
 * @collection async asynchronous function
 * @notes [ ]
 *
 */
export const RadrootsAsyncPromiseCatch = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  at?: string
): Promise<boolean> => {
  try {
    if (!error) {
      return false;
    }

    console.log(`[radroots-async] Error: ${String(error)}.\n`);
    console.log(`\n[radroots-async] At: ${at}.`);
    return true;
  } catch (err) {
    console.log(`[radroots] Error. RadrootsAsyncPromiseCatch `, err);
    return false;
  }
};
