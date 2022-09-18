#!/usr/bin/env node

import { appendFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";
import glob from "glob";

export const collectExports = (
  src: string,
  callback: (err: Error | null, matches: string[]) => void
) => {
  glob(`${src}/**/*`, callback);
};

type TypeScopes = "@radroots";
type TypePackages = "library" | "dev" | "async";
type TypePackagesMap = {
  package: TypePackages;
  license: TypeLicenses;
  root: string;
}[];
type TypeLicenses = "MIT" | "UNLICENSED";

const scopes: TypeScopes[] = ["@radroots"];
const packages: TypePackages[] = ["library", "dev", "async"];

const packagesMap: TypePackagesMap = [
  {
    package: "library",
    license: "MIT",
    root: "RadrootsLibrary",
  },
  {
    package: "async",
    license: "MIT",
    root: "RadrootsAsync",
  },
  { package: "dev", license: "MIT", root: "" },
];

const argv = yargs.options({
  scope: {
    alias: "s",
    choices: scopes,
    //default: scopeDefault,
  },
  package: {
    alias: "p",
    choices: packages,
    // default: packageDefault,
  },
}).argv;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { s, p } = argv as any;

let foundScope: TypeScopes;
let foundPackage: TypePackages;

let message: string;

const scopeFilter = scopes.filter((sc) => sc === s);
if (!scopeFilter || !(scopeFilter.length === 1)) {
  message = `[@radroots/dev]: Error. Incorrect argument for scope.`;
  throw new Error(message);
} else {
  foundScope = scopeFilter[0];
}

const packageFilter = packages.filter((pk) => pk === p);
if (!packageFilter || !(packageFilter.length === 1)) {
  message = `[@radroots/dev]: Error. Incorrect argument for package.`;
  throw new Error(message);
} else {
  foundPackage = packageFilter[0];
}

if (!foundScope) {
  message = `[@radroots/dev]: Error. Scope not found.`;
  throw new Error(message);
}

if (!foundPackage) {
  message = `[@radroots/dev]: Error. Package not found.`;
  throw new Error(message);
}

let root: string | undefined;
let license: TypeLicenses | undefined;

packagesMap.map((m) => {
  if (foundPackage === m.package) {
    root = m.root;
    license = m.license;
  }
});

if (!root) {
  const message = `[@radroots/dev]: Error. Root unidentified for package.${
    foundPackage === "dev"
      ? ` (intentional: collect on @radroots/dev remains unsupported)`
      : ""
  }`;
  throw new Error(message);
}

if (!license) {
  message = `[@radroots/dev]: Error. License unidentified for package.`;
  throw new Error(message);
}

// @radroots/library
const RadrootsLibraryFunctions = `${root}Functions`;
const RadrootsLibraryFunctionsFigure = `TypesFigures${root}Functions`;
const RadrootsLibraryFunctionsResolve = `TypesResolve${root}Functions`;
const RadrootsLibraryTypes = `${root}Types`;
const RadrootsLibraryReference = `${root}Reference`;

// @radroots/library
const RadrootsAsync = `${root}`;

collectExports("src", (err, matches) => {
  if (err) {
    console.log(`[radroots-ci-collect-exports] Error. ${err}`);
  } else {
    const writefile = "src/index.ts";

    const date = new Date();
    const day = `${date.getDate()}`;
    const month = `${date.getMonth()}`;
    const year = date.getFullYear();

    writeFileSync(
      writefile,
      `/**
 * * Radroots Documentation
 *
 * @collection ${foundScope}/${foundPackage}
 * @created ${month} ${day} ${year}
 *
 */
`
    );

    type TypeWritableExport = { exportName: string; exportAs: string };
    let writableExportsList: TypeWritableExport[];

    let exportMapPrimary: TypeWritableExport;

    matches.map((l) => {
      const line = String(l);
      const filename = line.split("/").pop() || "";
      const relativeLine = line.replace("src/", "./");

      let writable: string;
      if (relativeLine.includes(".tsx")) {
        writable = relativeLine.replace(".tsx", "");
      } else {
        writable = relativeLine.replace(".ts", "");
      }

      const split = writable.split("/");
      const name = split.pop() || "";

      if (
        filename === "index.ts" ||
        filename.includes(".test") ||
        filename.includes(".spec") ||
        !(filename.includes(".ts") || filename.includes(".tsx"))
      ) {
        return;
      }

      //
      //
      // @radroots/library - functions
      if (
        name.slice(0, RadrootsLibraryFunctions.length) ===
        RadrootsLibraryFunctions
      ) {
        const exportName = name;
        const exportAs = name.slice(RadrootsLibraryFunctions.length);
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      //
      //
      // @radroots/library - functions figures
      if (
        name.slice(0, RadrootsLibraryFunctionsFigure.length) ===
        RadrootsLibraryFunctionsFigure
      ) {
        const exportName = name;
        const exportAs = `Figures${name.slice(
          RadrootsLibraryFunctionsFigure.length
        )}`;
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      //
      //
      // @radroots/library - functions resolve
      if (
        name.slice(0, RadrootsLibraryFunctionsResolve.length) ===
        RadrootsLibraryFunctionsResolve
      ) {
        const exportName = name;
        const exportAs = `Resolve${name.slice(
          RadrootsLibraryFunctionsResolve.length
        )}`;
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      //
      //
      // @radroots/library - types
      if (name.slice(0, RadrootsLibraryTypes.length) === RadrootsLibraryTypes) {
        const exportName = name;
        const exportAs = `Types${name.slice(RadrootsLibraryTypes.length)}`;
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      //
      //
      // @radroots/library - reference
      if (
        name.slice(0, RadrootsLibraryReference.length) ===
        RadrootsLibraryReference
      ) {
        const exportName = name;
        const exportAs = `Reference${name.slice(
          RadrootsLibraryReference.length
        )}`;
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      //
      //
      // @radroots/async - collapse
      if (name.slice(0, RadrootsAsync.length) === RadrootsAsync) {
        const exportName = name;
        const exportAs = name.slice(RadrootsAsync.length);
        exportMapPrimary = { exportName, exportAs };
        writableExportsList = [exportMapPrimary];
      }

      writableExportsList.map((e) => {
        const libraryExport = `export { ${e.exportName} as ${e.exportAs} } from "${writable}";`;
        appendFileSync(writefile, `${libraryExport}\n`);
        return;
      });
      return;
    });
    console.log(`[radroots-ci-collect-exports] Finished.`);
  }
});
