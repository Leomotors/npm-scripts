#!/usr/bin/env node

// * Config to $2

// @ts-check

process.env.TZ = process.argv[3] || "Asia/Bangkok";

const fs = require("fs");

var package_data = JSON.parse(fs.readFileSync("./package.json").toString());
const version = package_data.version;

function _addZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

const d = new Date();
const year = d.getFullYear();
const month = _addZero(d.getMonth() + 1);
const day = _addZero(d.getDate());
const hour = _addZero(d.getHours());
const min = _addZero(d.getMinutes());
const sec = _addZero(d.getSeconds());

var formattedDate = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

const targetPath = process.argv[2] || "src/config.g.ts";

const pkgInfoFile = `/* eslint-disable */
// prettier-ignore
export const Version = "${version}";
// prettier-ignore
export const BuildTime = "${formattedDate}";
`;

fs.writeFileSync(targetPath, pkgInfoFile);
console.log("\u001b[32m[configPackage.js] Config Success\n\u001b[0m");
