exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;

  let fuentesRedirects = [
    { inicio: `/`, destino: `/en` },
    { inicio: `/blog`, destino: `/en/blog` },
    { inicio: `/thanks`, destino: `/en/thanks` },
    { inicio: `/portafolio`, destino: `/en/portfolio` },
    { inicio: `/404`, destino: `/en/404` },
  ];

  fuentesRedirects.forEach(({ inicio, destino }) => {
    createRedirect({
      fromPath: inicio,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: destino,
    });
  });
};
