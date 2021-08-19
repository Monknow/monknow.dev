import * as React from "react";
import { URlProvider } from "./src/context/ContextoURL";

export const wrapPageElement = ({ element, props }) => {

    return <URlProvider {...props}>{element}</URlProvider>;
};
