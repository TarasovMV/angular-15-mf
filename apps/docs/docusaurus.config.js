// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Angular Mfe Docs',
	tagline: 'Документация по использованию Module Federation в Angular',
	url: 'https://mf-demo.m-tarasov.com',
	baseUrl: '/tutorial/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'TarasovMV', // Usually your GitHub org/user name.
	projectName: 'https://github.com/TarasovMV/angular-15-mf', // Usually your repo name.

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: 'https://github.com/TarasovMV/angular-15-mf',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'MF Docs',
				logo: {
					alt: 'My Site Logo',
					src: 'img/logo.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Documentation',
					},
					{
						href: 'https://github.com/TarasovMV/angular-15-mf',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Tutorial',
								to: 'docs/intro',
							},
						],
					},
					// {
					// 	title: 'Community',
					// 	items: [
					// 		{
					// 			label: 'Stack Overflow',
					// 			href: 'https://stackoverflow.com/questions/tagged/docusaurus',
					// 		},
					// 		{
					// 			label: 'Discord',
					// 			href: 'https://discordapp.com/invite/docusaurus',
					// 		},
					// 		{
					// 			label: 'Twitter',
					// 			href: 'https://twitter.com/docusaurus',
					// 		},
					// 	],
					// },
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/TarasovMV',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Maxim Tarasov`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
