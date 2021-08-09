const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (...relativePath) => path.resolve(appDirectory, ...relativePath);

module.exports = {
    dist: resolvePath("dist"),
    entryFile: resolvePath("src", "index.ts"),
    tsConfig: resolvePath("tsconfig.json"),
};
