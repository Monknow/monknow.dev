import * as React from "react";
import { createContext } from "react";

const ContextoURL = createContext({href: "http://monknow.dev/en", pathname: "en"});

const URlProvider = (props) =>{
    return(
        <ContextoURL.Provider value={props.location}>
            {props.children}
        </ContextoURL.Provider>
    )
}

export default ContextoURL;
export {URlProvider};