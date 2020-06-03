const fs = require("fs");
const { parseString } = require("xml2js");

const dir = "./scripts/icons/svg";

const camelCase = str => {
    const name = str
        .split("-")
        .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1));

    return name.charAt(0).toLowerCase() + name.slice(1);
};

const files = fs.readdirSync(dir);
const icons = files.map(x => ({
    variable: camelCase(x.slice(0, -4)),
    file: `${dir}/${x}`,
}));

const duplicates = {};
icons.forEach(({ variable, file }) => {
    if (!duplicates[variable]) {
        duplicates[variable] = file;
    } else {
        throw new Error(`Duplicate icon found named "${variable}" in ${file} and ${duplicates[variable]}`);
    }
});

let paths = "\nexport default {\n";
let names = "export const icons = [\n";
let types = "export type IconType =\n";

icons.forEach(({ variable, file }) => {
    const data = fs.readFileSync(file, "utf-8");
    let path = "";

    parseString(data, (err, result) => {
        if (err) {
            return new Error(err);
        }

        if (!result.svg.path) {
            throw new Error("Icon does not have a path children");
        }

        if (result.svg.path.length > 1) {
            throw new Error("Icon has more than one path");
        }

        path = result.svg.path[0].$.d;
    });

    paths +=   `${variable}: "${path}",\n`;
    names +=   `"${variable}",\n`;
    types +=   `| "${variable}"\n`;
});

paths += "}";
names += "];";
types = types.slice(0, -1) + ";";

fs.writeFileSync("./src/components/Icon/svgs.ts", paths);
fs.writeFileSync("./src/variables/icons.ts", names);
fs.writeFileSync("./src/typings/icons.ts", types);