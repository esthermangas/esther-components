import { addons} from "@storybook/addons";
import { create } from "@storybook/theming/create";

const theme = create({
    base: "light",
    brandTitle: "Esther Components",
})

addons.setConfig({theme});
