import * as React from "react";
import { useState, useEffect, createContext } from "react";

const ContextoURL = createContext("");

const URlProvider = (props) =>{
    const [URL, setURL] = useState("http://localhost:8000/es");

    useEffect(()=>{

        setURL(props.location.href);
    }, [props.location.href]);

    return(
        <ContextoURL.Provider value={URL}>
            {props.children}
        </ContextoURL.Provider>
    )
}

export default ContextoURL;
export {URlProvider};