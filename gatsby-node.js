exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;

  let fuentesRedirects = [
    { inicio: `/`, destino: `/en` },
    { inicio: `/blog`, destino: `/en/blog` },
    { inicio: `/gracias`, destino: `/en/gracias` },
    { inicio: `/portafolio`, destino: `/en/portafolio` },
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
