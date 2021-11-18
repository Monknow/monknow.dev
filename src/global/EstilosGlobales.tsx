import {createGlobalStyle} from "styled-components";
import "../assets/fonts/fonts.css";

export const EstilosGlobales = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
        font-family: "Open Sans Regular", sans-serif;
        font-size: clamp(12px, 4vw, 16px);
    }
`;
