#!/usr/bin/env node

function main() {
  const { RADROOTS_ENV } = process.env;

  if (!RADROOTS_ENV || !(typeof RADROOTS_ENV === "string")) {
    const message = `[radroots] Error. Environment Variable. !RADROOTS_ENV`;
    console.log(message);
  }
}

main();
