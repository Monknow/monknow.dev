import axios from "axios";

const traerDatos = async (url) => {
    return await axios
        .get(url)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
            return err.response;
        });
};

export default traerDatos;