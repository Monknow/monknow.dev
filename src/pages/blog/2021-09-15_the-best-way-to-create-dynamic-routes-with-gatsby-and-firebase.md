---
en:
  fecha: 2021-09-15T00:30:18.646Z
  slug: The best way to create dynamic routes with Gatsby and Firebase
  titulo: The best way to create dynamic routes with Gatsby and Firebase
  subtitulo: Gatsby + Firebase = ❤
  descripcionImagen: Gatsby + Firebase = ❤
  portada: /assets/fondo-compartir-app-clima.png
  cuerpo: >-
    # Introduction


    While working on a social media project using Gatsby, I needed a way to authenticate users, save their information, and create a custom link in which you could read their data, so I decided to use Firebase's database for the job.


    Gatsby is a Static Site Generator for React, meaning that it converts the data from external sources into HTML-based webpages to avoid server-side processing when accessing a website.


    On the other side, Firebase is a development platform for web and mobile apps created by Google. It has several products, like Cloud Storage, Machine Learning, and Hosting, but we will focus on Firebase's Firestore. According to [Firebase](https://firebase.google.com/docs/firestore), Firestore is "a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud."


    ## The problem with Gatsby and Firebase


    In most cases, you can easily add external data to your Gatsby project with a plugin from the [Gatsby Plugin Library](https://www.gatsbyjs.com/plugins), then generate your static files, and redeploy your page to see the changes. However, in my case, I needed to create pages on demand based on new users. I could do this by listening to a change in my database and then rebuild and redeploy my Gatsby project. But as you may notice, this process is problematic in terms of performance since building and deploying Gatsby over and over is computationally expensive and time-consuming.


    ## What can I do?


    To achieve our previous goals, we will be using Gatsby's  [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) to create a Client Only Route and access the parameters from its URL to fetch each user's data from Firestore. It sounds cumbersome at first, but it is a surprisingly straightforward approach.


    # The gist


    ## 1. Start a new Gatsby Project


    To begin, you will need to initialize a new [Gatsby project](https://www.gatsbyjs.com/docs/quick-start/) with the following command:


    ```sh

    $ npm init gatsby 

    ```


    Then follow the prompts to choose your preferred CMS, styling tools, and additional features, and once finished, go to the new directory:


    ```sh

    $ cd my-gatsby-site

    ```


    Lastly, start the local development server with the command:


    ```sh

    $ npm run develop

    ```


    Great! Now you can navigate to [localhost:8000](http://localhost:8000/user/amazing) and see your Gatsby site.


    ![Gatsby Home Page](/assets/gatsby-site.png "Gatsby Home Page")


    ## 2. Create a Firebase Project


    The next step is to [add a new firebase project](https://firebase.google.com/docs/web/setup) in the [Firebase Console](https://console.firebase.google.com/) 


    ![Add project on Firebase Console](/assets/firebase-add-project.png "Add project")


    After clicking on "Add project" and adding a name, Firebase will create your new project and redirect you to the project overview. There you can access the project settings and register a new web app.


    ![Add App on Firebase Settings](/assets/firebase-add-app.png "Add App")


    After giving it a name, Firebase will give you your app configuration, which will look like this:


    ```javascript

    const firebaseConfig =  {
        apiKey:  "API_KEY",
        authDomain:  "AUTH_DOMAIN.firebaseapp.com",
        projectId:  "gatsby-firebase-example",
        storageBucket:  "STORAGEBUCKET.appspot.com",
        messagingSenderId:  "MESSAGING_SENDE_RID",
        appId:  "APP:web:ID" 
    };

    ```


    Then you can [add Firestore](https://firebase.google.com/docs/firestore/quickstart) to your project in "Test mode"


    ![Adding Firestore on Firebase ](/assets/firebase-create-database.png "Add Firestore")


    To make this tutorial simpler, we will manually create some data on Firestore to read it later from Gatsby. We will create a collection called "users" and a document called "awesome_dev" with a "name" and "id" field :


    ![Adding Sample Data to Firestore](/assets/firebase-create-data.png "Add Data")


    Back to your Gatsby code, install Firebase in your project's root:


    ```sh

    $ npm install firebase@9.0.2  --save

    ```


    ## 3. Create a Client Only Route


    Once Firebase is installed, go to your ./src/pages and create a /user directory with a file inside called \[id].js . In Gatsby, the square braces around a page file path mark any dynamic segments of the URL that you can access inside your components.


    Note: after creating a new page file, you may need to restart the development server.


    Inside the \[id].js file, create a simple component with an id prop:


    ```jsx

    // ./src/pages/user/[id].js


    import * as React from "react";

        const UserPage = ({id}) => {
    			return <h1>{id}</h1>
    		};
    export default UserPage; 

    ```


    And if we go to [localhost:8000/user/amazing](http://localhost:8000/user/amazing) you will see the following:


    ![Localhost displaying "Amazing"](/assets/client-only-route.png "Showing Client Only Route")


    Now you can use the URL id to access data from Firestore! 


    ## 4. Access Firestore data


    Firstly, you will need to initialize your [Firebase App](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize) inside Gatsby:


    ```jsx

    // ./src/pages/user/[id].js


    import { initializeApp } from 'firebase/app';


    // Your web app's Firebase configuration

    const firebaseConfig =  {
    	//... 
    };


    // Initialize Firebase

    const app = initializeApp(firebaseConfig);


    const UserPage = ({id}) => {
    	return <h1>{id}</h1>;


    	
    };


    export default UserPage;

    ```


    Note: you would preferably initialize your app inside a context, and then add it to your [wrapRootElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement) function to execute it on all pages.


    Then import firestore from firebase and create a reference to your users collection:


    ```jsx

    // ./src/pages/user/[id].js


    import * as React from "react";

    import { initializeApp } from "firebase/app";

    import { getFirestore, collection } from "firebase/firestore";



    // Your web app's Firebase configuration

    const firebaseConfig =  {
    	//... 
    };


    // Initialize Firebase

    const app = initializeApp(firebaseConfig);


    const UserPage = ({id}) => {
    	const db = getFirestore();
    	const usersRef = collection(db, "users");


    	return <h1>{id}</h1>;
    };


    export default UserPage;

    ```


    Now we need to create a query for the users' collection that looks for a user with the same id as the URL id. To achieve this, we will be importing the query module from Firestore with a couple more functions. Then we will execute the query inside a useEffect.


    ```jsx

    // ./src/pages/user/[id].js


    import * as React from "react";

    import {useEffect} from "react";

    import {initializeApp} from "firebase/app";

    import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";


    // Your web app's Firebase configuration

    const firebaseConfig =  {
    	//... 
    };


    // Initialize Firebase

    const app = initializeApp(firebaseConfig);


    const UserPage = ({id}) => {

    	const db = getFirestore();
    	const usersRef = collection(db, "users");

    	useEffect(() => {
    		const queryUser = async () => {

    			const usersQuery = query(usersRef, where("id", "==", id));
    			const usersQuerySnap = await getDocs(usersQuery);

    			usersQuerySnap.forEach((user) => {});
    		};

    		queryUser();

    		// eslint-disable-next-line react-hooks/exhaustive-deps
    	}, []);

    	return <h1>{id}</h1>;
    };


    export default UserPage;

    ```


    Note: you will need to iterate the query snap since it normally queries several documents. Since the id is supposedly unique, it will query just one.


    Now we can create a state that will have the user data, and then conditional render it to your website!


    ```jsx

    // ./src/pages/user/[id].js


    import * as React from "react";

    import {useEffect, useState} from "react";

    import {initializeApp} from "firebase/app";

    import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";


    // Your web app's Firebase configuration

    const firebaseConfig = {
    	/...
    };


    // Initialize Firebase

    const app = initializeApp(firebaseConfig);


    const UserPage = ({id}) => {
    	const [userData, setUserData] = useState(null);

    	const db = getFirestore();
    	const usersRef = collection(db, "users");

    	useEffect(() => {
    		const queryUser = async () => {
    			const usersQuery = query(usersRef, where("id", "==", id));

    			const usersQuerySnap = await getDocs(usersQuery);

    			usersQuerySnap.forEach((user) => {
    				setUserData(user.data());
    			});
    		};

    		queryUser();

    		// eslint-disable-next-line react-hooks/exhaustive-deps
    	}, []);

    	return <div>{userData ? 
    		<h1>Hello {userData.name}</h1> : 
    		<h1>Loading...</h1>}</div>;
    };


    export default UserPage; 

    ```


    Ta-da! Now if we go to [localhost:8000/user/uniqueId123](http://localhost:8000/user/uniqueId123) we will see awesome_dev's name pop up on the screen.


    ![Locahost displaying "Hello John Doe" ](/assets/final-result.png "Final Result")


    # Conclusion


    I hope you can find this approach as helpful as it was to me. As you can see, it's pretty straightforward and readable, so you can focus more on the content of your app and not the frustrating technicalities. Until the next time!
es:
  fecha: 2021-09-15T00:30:18.646Z
  slug: The best way to create dynamic routes with Gatsby and Firebase
  titulo: La mejor manera de crear rutas dinamicas con Gatsby y Firebase
  subtitulo: Firebase + Gatsby = ❤
  descripcionImagen: Firebase + Gatsby = ❤
  portada: /assets/hnet.com-image.png
  cuerpo: >-
    # Introducción


    Mientras estaba trabajando en un proyecto de Gatsby, necesitaba una manera de registrar usuarios, guardar su información y crear un link personalizado desde el cual se pudiera leer sus datos, así que decidí utilizar la base de datos de Firebase para lograrlo.

    Gatsby es un Generador de Sitios Estáticos para React, es decir que convierte los datos de fuentes externas a páginas basadas en HTML para evitar el procesamiento del lado del servidor cada vez que se quiera acceder a la página web.

    Por otro lado, Firebase es una plataforma de desarrollo para aplicaciones web y móviles creada por Google. Tiene muchos productos, como Cloud Storage, Machine Learning y Hosting, pero nos vamos a enfocar en la base de datos de Firebase: Firestore. Según [Firebase](https://firebase.google.com/docs/firestore?hl=es), Firestore es “es una base de datos flexible y escalable para el desarrollo en servidores, dispositivos móviles y la Web desde Firebase y Google Cloud.”


    ## El Problema con Gatsby y Firebase


    La mayoría de las veces, tú puedes añadir datos externos a tu página de Gatsby con un plugin de la [Libreria de Plugings de Gatsby](https://www.gatsbyjs.com/plugins), después generas los archivos estaticos, y despliegas tu página para ver los cambios realizados. Sin embargo, en mi caso, necesitaba crear páginas cada vez que un nuevo usuario se registraba. Se podría lograr esto al “escuchar” por un cambio en mi base de datos y después desplegar nuevamente mi página de Gatsby, pero como te puedes dar cuenta, eso sería problemático en términos de rendimiento, ya que preparar el despliegue y desplegar una y otra vez es computacionalmente costoso y una pérdida de tiempo


    ## ¿Qué se puede hacer?


    Para lograr nuestras metas anteriores, vamos a utilizar la API [File System Route](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) de Gatsby para crear rutas sólo en el cliente, y acceder a la URL para obtener ciertos parametros los cuales nos permitiran cargar los datos del usuario desde Firestore.


    To achieve our previous goals, we will be using Gatsby's [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) to create a Client Only Route and access the parameters from its URL to fetch each user's data from Firestore. Suena engorroso al principio, pero es un enfoque sorprendentemente sencillo.


    # Al punto


    ## 1. Iniciar un nuevo proyecto Gatsby


    Para comenzar, tenemos que inicializar un nuevo [proyecto de Gatsby](https://www.gatsbyjs.com/docs/quick-start/) con el siguiente comando


    ```sh

    $ npm init gatsby

    ```


    Luego, sigue las indicaciones para elegir tu CMS preferido, herramientas de estilo y funciones adicionales, y una vez que hayas terminado, ve al directorio recién creado.


    ```sh

    $ cd my-gatsby-site

    ```


    Por último, inicia el servidor de desarrollo local con el comando:


    ```sh

    $ npm run develop

    ```


    ¡Excelente! Ahora puedes navegar a \[localhost: 8000] (http: // localhost: 8000 / user / amazing) y ver tu sitio.


    ![Home de Sitio creado por Gatsby](/assets/gatsby-site.png "Sitio Gatsby")


    ## 2.Crea un proyecto de Firebase


    El siguiente paso es [agregar un nuevo proyecto de Firebase](https://firebase.google.com/docs/web/setup) en la [Consola de Firebase](https://console.firebase.google.com/)


    ![Consola de Firebase. Añadir Proyecto](/assets/firebase-add-project.png "Añadir Proyecto")


    Después de hacer clic en "Agregar proyecto" y agregar un nombre, Firebase creará tu nuevo proyecto y te redireccionará a la descripción general del mismo. Allí puede acceder a la configuración del proyecto y registrar una nueva aplicación web.


    ![Configuracion de Firebase. Añadir App](/assets/firebase-add-app.png "Añadir App")



    Después de darle un nombre, Firebase le dará la configuración de su aplicación, que se verá así:


    ```javascript

    const firebaseConfig = {

    apiKey: "API_KEY",

    authDomain: "AUTH_DOMAIN.firebaseapp.com",

    projectId: "gatsby-firebase-example",

    storageBucket: "STORAGEBUCKET.appspot.com",

    messagingSenderId: "MESSAGING_SENDE_RID",

    appId: "APP:web:ID"

    };

    ```


    Luego, puedes [agregar Firestore](https://firebase.google.com/docs/firestore/quickstart) a tu proyecto en "Modo de prueba"


    ![Consola de Firebase. Añadir Firestore](/assets/firebase-create-database.png "Añadir Firestore")


    Para simplificar este tutorial, crearemos manualmente algunos datos en Firestore para leerlos más tarde desde Gatsby. Crearemos una colección llamada "usuarios" y un documento llamado "awesome_dev" con un campo de "name" e "id":


    ![Firestore. Añadir Datos de muestra](/assets/firebase-create-data.png " Añadir Datos de Muestra")


    De vuelta a tu código de Gatsby, instala Firebase en la raíz de tu proyecto:


    ```sh

    $ npm install firebase@9.0.2 --save

    ```


    ## 3. Crear una ruta sólo para el cliente


    Una vez que Firebase esté instalado, vaya a tu directorio ./src/pages y crea un directorio /user con un archivo dentro llamado \[id] .js. En Gatsby, los corchetes alrededor de la ruta de un archivo de página marcan cualquier segmento dinámico de la URL al que puedes acceder dentro de tus componentes.


    Nota: después de crear un nuevo archivo de página, es posible que deba reiniciar el servidor de desarrollo

    Dentro del archivo \[id] .js, cree un componente simple con una propiedad de id:


    ```jsx

    // ./src/pages/user/[id].js
     
    import * as React from "react";
     
    const UserPage = ({id}) => {
                return <h1>{id}</h1>
            };
    export default UserPage;

    ```


    Y si vas a [localhost:8000/user/amazing](http://localhost:8000/user/amazing) verás lo siguiente:


    ![Localhost. Pantalla mostrando texto "Amazing"](/assets/client-only-route.png "Ruta de Cliente")


    ¡Ahora puede usar la ID del URL para acceder a los datos de Firestore!


    ## 4. Acceder a los datos de Firestore


    En primer lugar, debes inicializar tu [Aplicación de Firebase](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize) dentro de Gatsby:


    ```jsx

    // ./src/pages/user/[id].js
     
    import { initializeApp } from 'firebase/app';
     
    // Your web app's Firebase configuration

    const firebaseConfig = {
        //...
    };
     
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
     
    const UserPage = ({id}) => {
        return <h1>{id}</h1>;


        
    };
     
    export default UserPage;

    ```


    Nota: preferiblemente inicializarías tu aplicación dentro de un contexto de React y luego lo agregarías a tu función [wrapRootElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement) para ejecutarlo en todas tus páginas.


    Luego, importa firestore desde firebase y cree una referencia a su colección de usuarios:


    ```jsx

    // ./src/pages/user/[id].js
     
    import * as React from "react";

    import { initializeApp } from "firebase/app";

    import { getFirestore, collection } from "firebase/firestore";
     


     
    // Your web app's Firebase configuration

    const firebaseConfig = {
        //...
    };
     
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
     
    const UserPage = ({id}) => {
        const db = getFirestore();
        const usersRef = collection(db, "users");
     
     
        return <h1>{id}</h1>;
    };
     
    export default UserPage;

    ```


    Ahora necesitamos crear una consulta para la colección de usuarios que busque un usuario con el mismo id que el id de la URL. Para lograr esto, importamos el módulo query de Firestore con un par de funciones más. Luego ejecutaremos la consulta dentro de un useEffect.


    ```jsx

    // ./src/pages/user/[id].js
     
    import * as React from "react";

    import {useEffect} from "react";

    import {initializeApp} from "firebase/app";

    import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
     
    // Your web app's Firebase configuration

    const firebaseConfig = {
        //...
    };
     
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
     
    const UserPage = ({id}) => {
     
        const db = getFirestore();
        const usersRef = collection(db, "users");
     
        useEffect(() => {
            const queryUser = async () => {
     
                const usersQuery = query(usersRef, where("id", "==", id));
                const usersQuerySnap = await getDocs(usersQuery);
     
                usersQuerySnap.forEach((user) => {});
            };
     
            queryUser();
     
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
     
        return <h1>{id}</h1>;
    };
     
    export default UserPage;

    ```


    Nota: debes iterar el complemento de consulta, ya que normalmente este consulta varios documentos. Dado que la identificación es supuestamente única, solo traerá una.


    ¡Ahora puedes crear un estado de React que tendrá los datos del usuario y luego lo puedes renderizar condicionalmente en tu sitio web!


    ```jsx

    // ./src/pages/user/[id].js
     
    import * as React from "react";

    import {useEffect, useState} from "react";

    import {initializeApp} from "firebase/app";

    import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
     
    // Your web app's Firebase configuration

    const firebaseConfig = {
        /...
    };
     
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
     
    const UserPage = ({id}) => {
        const [userData, setUserData] = useState(null);
     
        const db = getFirestore();
        const usersRef = collection(db, "users");
     
        useEffect(() => {
            const queryUser = async () => {
                const usersQuery = query(usersRef, where("id", "==", id));
     
                const usersQuerySnap = await getDocs(usersQuery);
     
                usersQuerySnap.forEach((user) => {
                    setUserData(user.data());
                });
            };
     
            queryUser();
     
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
     
        return <div>{userData ?
            <h1>Hello {userData.name}</h1> :
            <h1>Loading...</h1>}</div>;
    };
     
    export default UserPage;

    ```


    ¡Ta-da! Ahora, si vamos a[localhost:8000/user/uniqueId123](http://localhost:8000/user/uniqueId123) veremos el nombre de awesome_dev aparecer en la pantalla.


    ![Localhost. Pantalla mostrando "Hello John Doe"](/assets/final-result.png "Resultado Final")


    # Conclusión


    Espero que puedas encontrar este enfoque tan útil como lo fue para mí. Como puedes ver, es bastante sencillo y legible, por lo que puedes concentrarte más en el contenido de tu aplicación y no en los frustrantes detalles técnicos. ¡Hasta la próxima vez!
---
