import * as React from "react";
import styled from "styled-components";

import Titulo from "./Titulo";
import Boton from "./Boton";

const ContactameEstilizado = styled.section`
    position: relative;
    top: 150px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    width: calc(95vw - 80px);

    margin: -150px auto 0px auto; /* Margén negativo para eliminar el espacio en blanco creado por el posicionamiento relativo*/
    border-radius: 12px;
    padding: 40px 20px 20px 20px;

    font-family: "Open Sans Regular";

    background-color: #141c3a;
    color: #fff;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

    const ContactameFormulario = styled.form`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;

        width: 94%;

        & p{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-flow: column;

            margin: 10px 0px;
        }

        & label{
            margin-bottom: 5px;

            font-size: 0.7em;

            color: #c0c0c0;
        }
    `;

        const CamposCortos = styled.div`
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-flow: row wrap;

            width: 100%;

            & p{
                width: clamp(250px, calc(50% - 20px), 500px);

                
                @media (max-width: 700px){
                    &{
                        width: 100%;
                    }
                }
                
            }

            & input{
                    height: 40px;
                    width: 100%;

                    border: 1px solid #a1a1a1;
                    border-radius: 4px;
                    outline: none;
                    padding-left: 8px;

                    font-family: "Open Sans Light";
                    font-size: 0.9em;

                    background-color: #141c3a;
                    color: #fff; 

                    &:focus{
                        border: 1px solid #fca311;
                    }
            }
        `;

            
            const ContactameMensaje = styled.p`
                width: 100%;

                & textarea{
                    width: 100%;
                    resize: vertical;

                    border: 1px solid #a1a1a1;
                    border-radius: 4px;
                    outline: none;
                    padding: 5px 0px 0px 8px;

                    font-family: "Open Sans Light";
                    font-size: 0.9em;

                    background-color: #141c3a;
                    color: #fff;

                    &:active, &:focus{
                        border: 1px solid #fca311;
                    }
                }
            `;

            const BotHoneyPot = styled.input`
                display:none;
            `;
                


const Contactame = () =>{
    return(
        <ContactameEstilizado id="contactame">
            <Titulo claro contenido="¿Cómo puedo ayudarte?"></Titulo>
            <ContactameFormulario action="https://formsubmit.io/send/8b76bd5b-4abf-4a18-b52c-df8caeda0157" method="POST">
            <input name="_redirect" type="hidden" id="name" value="http://localhost:8000/gracias"/>
            <CamposCortos>
                <p>
                <label htmlFor="campos-cortos__nombre--label">Nombre</label>
                <input type="text" name="name" id="campos-cortos__nombre--input" />
                </p>
                <p>
                <label htmlFor="campos-cortos__correo--label">Correo</label>
                <input type="email" name="email" id="campos-cortos__correo--input" />
                </p>
            </CamposCortos>
            <ContactameMensaje>
                <label htmlFor="formulario__mensaje--label">Mensaje</label>
                <textarea
                    name="mensaje"
                    id="formulario__mensaje--textarea"
                    cols="10"
                    rows="5"
                ></textarea>
            </ContactameMensaje>
            <BotHoneyPot type="text" name="_honey"/> {/* Bot Honey Pot */}
            <Boton type="submit" aria-label="Enviar mensaje" contenido="Enviar"></Boton>
            </ContactameFormulario>
        </ContactameEstilizado>
    )
}

export default Contactame;

