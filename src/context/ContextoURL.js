import * as React from "react";
import { useState, useEffect, createContext } from "react";

const ContextoURL = createContext("http://monknow.dev/en");

const URlProvider = (props) =>{
    const [URL, setURL] = useState("http://monknow.dev/en");

    useEffect(()=>{

        setURL(props.location);
    }, [props.location]);

    return(
        <ContextoURL.Provider value={URL}>
            {props.children}
        </ContextoURL.Provider>
    )
}

export default ContextoURL;
export {URlProvider};