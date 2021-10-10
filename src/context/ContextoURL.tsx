import {PageProps} from "gatsby";
import * as React from "react";
import {createContext, FC} from "react";

export const ContextoURL = createContext({href: "http://monknow.dev/en", pathname: "en"});

export const URlProvider: FC<PageProps> = (props) => {
	return <ContextoURL.Provider value={props.location}>{props.children}</ContextoURL.Provider>;
};
