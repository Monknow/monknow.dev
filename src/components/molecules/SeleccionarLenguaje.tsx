import * as React from "react";
import {LinkInterno} from "../atoms/LinkInterno";
import {useContext} from "react";
import {ContextoURL} from "../../context/ContextoURL";
import styled from "styled-components";

const SeleccionarLenguajeEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SeleccionarLenguaje = () => {
	const {pathname} = useContext(ContextoURL);

	const regexUbicacionLenguajes = /\/e(s|n)(\/|)/;
	const ubicacionPaginaSinLenguaje = pathname.replace(regexUbicacionLenguajes, "");

	return (
		<SeleccionarLenguajeEstilizado>
			<LinkInterno noLocalizado to={`/es/${ubicacionPaginaSinLenguaje}`}>
				Español
			</LinkInterno>
			<LinkInterno noLocalizado to={`/en/${ubicacionPaginaSinLenguaje}`}>
				English
			</LinkInterno>
		</SeleccionarLenguajeEstilizado>
	);
};
