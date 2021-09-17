const path = require(`path`);

const slugify = (slugSucio) => {
	const slugSinEspacios = slugSucio.replace(/^\s+|\s+$/g, ""); // trim
	const slugSinMayusculas = slugSinEspacios.toLowerCase();

	// remove accents, swap ñ for n, etc
	let caracteresRaros = "ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;";
	let caracteresSlugy = "aaaaaeeeeeiiiiooooouuuunc------";

	let slugSinCaracteresRaros = slugSinMayusculas;

	Array.from(caracteresRaros).forEach((caracter, index) => {
		slugSinCaracteresRaros = slugSinCaracteresRaros.replace(
			new RegExp(caracteresRaros.charAt(index), "g"),
			caracteresSlugy.charAt(index)
		);
	});

	const slugLimpio = slugSinCaracteresRaros
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes

	return slugLimpio;
};

exports.createPages = ({graphql, actions}) => {
	const {createRedirect} = actions;

	let fuentesRedirects = [
		{inicio: `/`, destino: `/en`},
		{inicio: `/blog`, destino: `/en/blog`},
		{inicio: `/thanks`, destino: `/en/thanks`},
		{inicio: `/portafolio`, destino: `/en/portfolio`},
		{inicio: `/404`, destino: `/en/404`},
	];

	fuentesRedirects.forEach(({inicio, destino}) => {
		createRedirect({
			fromPath: inicio,
			isPermanent: true,
			redirectInBrowser: true,
			toPath: destino,
		});
	});

	const {createPage} = actions;
	const blogPostTemplate = path.resolve(`src/templates/blogPost.js`);
	// Query for markdown nodes to use in creating pages.
	// You can query for whatever data you want to create pages for e.g.
	// products, portfolio items, landing pages, etc.
	// Variables can be added as the second function parameter
	return graphql(
		`
			query loadPagesQuery($limit: Int!) {
				allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "blog"}}}, limit: $limit) {
					nodes {
						frontmatter {
							slug
						}
					}
				}
			}
		`,
		{limit: 1000}
	).then((result) => {
		if (result.errors) {
			throw result.errors;
		}

		// Create blog post pages.
		result.data.allMarkdownRemark.nodes.forEach((node) => {
			const slug = slugify(node.frontmatter.slug);
			createPage({
				// Path for this page — required
				path: `blog/${slug}`,
				component: blogPostTemplate,
				context: {
					slug: node.frontmatter.slug,
					// Add optional context data to be inserted
					// as props into the page component.
					//
					// The context data can also be used as
					// arguments to the page GraphQL query.
					//
					// The page "path" is always available as a GraphQL
					// argument.
				},
			});
		});
	});
};

exports.onCreateNode = async ({node, actions, getNode}) => {
	const {createNodeField} = actions;

	if (node.internal.type === "MarkdownRemark") {
		const parent = getNode(node.parent);
		const locale = parent.name.replace("index.", "") ?? "en";
		createNodeField({
			node,
			name: "locale",
			value: locale,
		});
	}
};
