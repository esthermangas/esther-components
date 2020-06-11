// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const colors = {
    estherGreen: "#19a172",
    cadetBlue: "#5F9EA0",
    peach: "#d98e6f",
    tomato: "#E34954",
    sky: "#1991FF",
    pineapple: "#D9D86F",
    dark: "#282828",
    white: "#fffcf9",

};

let variables = ":root {\n";
let types = "export type ColorType =\n";
let names = "export const colors = {\n";

for (const [name, color] of Object.entries(colors)) {
    variables +=`   --${name}: ${color};\n`;
    types +=`| "${name}"\n`;
    names +=`   ${name}: "${color}",\n`;
}

variables += "}\n";
names += "}\n\n";
types = types.slice(0, -1) + ";";

fs.writeFileSync("./src/styles/colors.css", variables);
fs.writeFileSync("./src/typings/colors.ts", types);
fs.writeFileSync("./src/variables/colors.ts", names);