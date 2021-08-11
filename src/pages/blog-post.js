import * as React from "react";
import { StaticImage, GatsbyImage , getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import {styled, createGlobalStyle} from "styled-components";
import NavBar from "../components/NavBar";
import FooterPagina from "../components/FooterPagina"
import GaleriaBlog from "../components/GaleriaBlog"

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
      scroll-behavior: smooth;
    }
`


const BlogPost = () =>{

const data = useStaticQuery(graphql`
    query MyQuery {
        allStrapiCuadro(filter: {proyecto: {eq: false}}) {
        nodes {
            descripcion
            id
            proyecto
            subtitulo
            titulo
            url
            portada {
            url
            localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, aspectRatio: 1.77)
                }
            }
            }
        }
        }
    }
`);

    const cuadros =  data.allStrapiCuadro.nodes

    return(
        <div>
            <EstilosGlobal></EstilosGlobal>
            <NavBar></NavBar>
            <header>
                <h1>titulo</h1>
                <h2>subtitulo</h2>
            </header>
            <p><span>10/08/2021</span><span>5 minutos de lectura</span></p>
            <StaticImage src={"../images/android-chrome-512x512.png"} alt="Caca" placeholder="blurred"></StaticImage>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis ullamcorper est, a vestibulum tortor fermentum sit amet. Cras non eros eleifend, ullamcorper velit at, egestas est. Donec imperdiet iaculis mauris, sed semper enim. Integer tincidunt felis ac mi varius euismod. Suspendisse potenti. Integer eleifend mauris at tempus malesuada. Nullam sapien mauris, consectetur nec magna at, hendrerit rutrum elit. Proin pulvinar tempor felis, non semper magna placerat quis. Integer non orci faucibus, sodales nisi sit amet, molestie massa.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ornare ex at vulputate egestas. Aenean eget sagittis diam, vel aliquet diam. Maecenas sed molestie felis, ut tristique nisi. Sed sit amet accumsan leo. Ut ut ipsum feugiat, pharetra elit sed, consectetur elit. Quisque dignissim, dui non fermentum tincidunt, lacus urna posuere nibh, sit amet accumsan dolor velit vitae est. Aenean et sapien odio. Sed ullamcorper eu nunc ac pulvinar. Sed scelerisque mi sapien, at iaculis nunc laoreet in. Duis varius dui semper, egestas neque at, hendrerit erat. Nam ac fringilla turpis. Aliquam erat volutpat. Maecenas dapibus felis a mauris volutpat mattis. Phasellus efficitur, sem id fermentum finibus, augue justo hendrerit risus, eu dictum nunc libero ac leo.
                Aenean ante leo, aliquet vel turpis a, consectetur semper augue. Donec euismod risus vitae fermentum vestibulum. Aliquam condimentum eleifend enim id pellentesque. Quisque condimentum est arcu, et mollis erat maximus non. Curabitur maximus odio maximus purus tincidunt fringilla. Nam in egestas nulla. Cras lobortis leo at ipsum luctus, eget ullamcorper eros cursus.
                Phasellus semper mollis lorem. Aliquam congue ipsum a est tempor, viverra tincidunt ligula suscipit. Duis aliquet nunc dui, in consequat leo facilisis vitae. Mauris ultricies venenatis odio. Mauris id mauris elementum, sollicitudin quam quis, pharetra elit. Nam vulputate posuere tellus id blandit. Aenean commodo eget quam eget malesuada. Ut dapibus lobortis turpis, eu commodo turpis gravida eget. Etiam cursus varius ligula, placerat faucibus massa facilisis et. Integer vehicula posuere nulla malesuada gravida. Maecenas feugiat, sem sed tincidunt pharetra, nisi tortor convallis quam, et suscipit felis leo sit amet purus. Etiam a purus placerat, viverra ante ut, aliquet nibh. Integer laoreet ipsum metus, eu viverra ex bibendum ac.
                Nam dignissim ex arcu, ac mollis dolor dictum et. Donec interdum neque nulla, sed cursus mauris tincidunt sit amet. Pellentesque elementum posuere libero. Vivamus interdum sapien nulla, sit amet dignissim justo ultrices sed. Cras sit amet tortor ut est consectetur pulvinar sit amet vel risus. Vivamus scelerisque consectetur nisi a iaculis. Proin finibus, eros ut pellentesque placerat, nulla tellus finibus purus, eu dapibus elit mauris non nunc. Etiam maximus nunc nec ligula mollis, ac molestie tellus cursus. Sed eget commodo nisl, sed aliquam enim. Quisque eget massa tempus, ornare diam in, finibus nibh. Proin sit amet tempor ante. Quisque mollis est dui, vel egestas nunc rutrum a. Phasellus a maximus orci. Nam iaculis vulputate odio in facilisis. Praesent porttitor justo aliquam dolor porttitor euismod.
                Ut vitae magna scelerisque, convallis diam in, gravida diam. Morbi ac libero nulla. Sed ut tristique neque. Etiam viverra ac justo egestas dignissim. Phasellus ligula lorem, accumsan vel diam eu, condimentum facilisis nibh. Donec auctor volutpat ligula, et vulputate ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis id felis at mattis. Donec turpis dolor, vehicula ac eleifend et, sagittis in risus. Donec mollis vulputate nulla, non mattis elit dignissim ac. Nulla facilisi. Sed sed interdum sem. Quisque diam turpis, porta quis facilisis quis, euismod vel nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc sed porttitor arcu.
                Mauris ultricies sit amet metus ut maximus. Donec pellentesque pellentesque justo sit amet suscipit. Etiam id nisi ut justo tristique maximus facilisis malesuada justo. Proin ante elit, convallis vitae sapien non, facilisis ornare nisi. Nullam vestibulum at dui quis lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla eget nibh nec arcu viverra dapibus. Vestibulum et dictum nisl. Sed nisi dolor, pretium a metus nec, lacinia finibus mi. Nam porttitor volutpat nisi a dignissim. Maecenas sit amet purus quis justo venenatis molestie. Morbi rhoncus leo id lacinia fermentum.
                Curabitur vel ipsum vel nunc dignissim interdum eu quis eros. Fusce pulvinar tempus fringilla. Donec eget egestas orci, ut rhoncus nibh. Vestibulum mattis, justo nec luctus elementum, enim velit placerat nibh, at blandit neque magna at nulla. Proin varius placerat mi, vitae rutrum risus tincidunt eu. In ultrices orci vulputate, bibendum turpis vitae, pretium nibh. Etiam fermentum ullamcorper aliquam. Nunc a consequat massa, a imperdiet dui. Donec massa nibh, lobortis id vulputate pretium, dapibus non odio.
                Nunc blandit ultrices libero, ut vehicula mi accumsan eget. Fusce bibendum orci felis, eu gravida augue laoreet pharetra. Duis sed dolor sapien. Nunc vel nunc laoreet mi luctus posuere sed vel sem. Sed eu tellus ut lectus fermentum lacinia. Maecenas sit amet porttitor libero. Etiam lobortis sem massa, non hendrerit lorem dapibus sed. Quisque est orci, commodo et nulla nec, maximus tristique enim. Aliquam turpis libero, porta et orci ac, ultrices sollicitudin nisl. Phasellus maximus semper ipsum ac egestas. Nulla finibus condimentum volutpat. 
            </p>
            <GaleriaBlog titulo="Estas publicaciones te podrían gustar" subtitulo="">
                
            </GaleriaBlog>
            <FooterPagina atribucion="Imagen por Pexel" atribucionURL="https://pexels.com"></FooterPagina>
        </div>
    )
}

export default BlogPost; 