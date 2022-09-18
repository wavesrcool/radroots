/**
 * * Radroots Documentation
 *
 * @created 09 16 2022
 * @collection logging asynchronous function
 * @notes [ ]
 *
 */
export const RadrootsLoggingCollapseRadrootsLibraryAsyncCatch = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  location: string
): Promise<boolean> => {
  try {
    console.log(`\n[radroots-logging] Location: ${location}.`);
    console.log(`[radroots-logging] Error: ${String(e)}.\n`);
    return true;
  } catch (err) {
    console.log(
      `[radroots] Error. RadrootsLoggingCollapseRadrootsLibraryAsyncCatch `,
      err
    );
    return false;
  }
};
