import * as React from "react";
import HelmetSEO from "./src/global/HelmetSEO";
import EstilosGlobales from "./src/global/EstilosGlobales";
import {URlProvider} from "./src/context/ContextoURL";

export const wrapPageElement = ({element, props}) => {
	return (
		<URlProvider {...props}>
			<HelmetSEO />
			<EstilosGlobales />
			{element}
		</URlProvider>
	);
};
