import * as React from "react";
import EstilosGlobales from "./src/context/EstilosGlobales";
import {URlProvider} from "./src/context/ContextoURL";

export const wrapPageElement = ({element, props}) => {
	return (
		<URlProvider {...props}>
			<EstilosGlobales />
			{element}
		</URlProvider>
	);
};
