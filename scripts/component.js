const fs = require("fs");

const arg = process.argv[2];
const name = arg.charAt(0).toUpperCase() + arg.slice(1);
const dir = `./src/components/${name}`;

if (fs.existsSync(dir)) {
    throw new Error(`Component named '${name}' already exists.`);
}

const react = `import * as React from "react";
import { FC } from "react";

import styles from "./${name}.module.css";
import classNames from "classnames";

export interface ${name}Props {}

const ${name}: FC<${name}Props> = Props => {
  const {  } = Props;

  const classes = classNames();

  return ();
}

${name}.defaultProps = {}

export default ${name};`;

const story = `import { Meta, Preview, Props } from "@storybook/addon-docs/blocks";
import ${name} from "./${name}.tsx";

<Meta title="${name}" />

# ${name}

<Props of={${name}} />
`;

const exportStatement = `export { default as ${name} } from "./components/${name}/${name}";`;

const test = `import * as React from "react";
import ${name}, { ${name}Props } from "./${name}";
import { render } from "@testing-library/react";

const render${name} = (props: ${name}Props) => {
  const { getBy* } = render(<${name} {...props} />);
  return getBy*();
};

it("can be rendered", () => {
  const { queryBy* } = render(<${name} />);
  expect(queryBy*()).toBeInTheDocument();
});
`;

fs.mkdirSync(`${dir}/`);
fs.writeFileSync(`${dir}/${name}.tsx`, react);
fs.writeFileSync(`${dir}/${name}.module.css`, "");
fs.writeFileSync(`${dir}/${name}.story.mdx`, story);
fs.writeFileSync(`${dir}/${name}.test.tsx`, test);
fs.appendFileSync("./src/index.tsx", exportStatement);

console.log(`Component '${name}' generated and included to the export file!`);

return 0;