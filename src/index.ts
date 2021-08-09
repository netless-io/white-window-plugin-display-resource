import { PluginContext, Plugin } from "@netless/window-manager";
import { PluginComponent } from "./containers/DisplayContainer";

export const displayResourceKind = "white-window-plugin-display-resource";

export const displayResource: Plugin = {
    kind: displayResourceKind,
    wrapper: PluginComponent,
    options: {
        width: 1000,
        height: 800,
        minwidth: 600,
        enableView: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup: (_context: PluginContext) => {},
};
