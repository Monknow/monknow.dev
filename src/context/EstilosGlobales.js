import {createGlobalStyle} from "styled-components";
import "../assets/fonts/fonts.css";

const EstilosGlobales = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
        scroll-behavior: smooth;
        font-family: "Open Sans Regular", Sans-Serif;
        font-size: clamp(12px, 4vw, 16px);
    }
`;

export default EstilosGlobales;
