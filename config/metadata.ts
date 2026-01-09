import { siteConfig } from './site';

export type metadataConf = typeof metadataConf;

const metadataConf = {
	// title: {
	//   default: siteConfig.name,
	//   template: `%s - ${siteConfig.name}`,
	// },
	// description: siteConfig.description,
	// keywords: ["Telegram", "Statistics"],
	// // authors: [
	// // 	{
	// // 		name: 'DimDimich',
	// // 		url: 'https://t.me/xDimDimichx',
	// // 	},
	// // 	{
	// // 		name: 'MadFox',
	// // 		url: 'https://t.me/XMadFox',
	// // 	},
	// // ],
	// creator: "team12",
	// openGraph: {
	//   type: "website",
	//   locale: "ru_RU",
	//   url: siteConfig.url,
	//   title: siteConfig.name,
	//   description: siteConfig.description,
	//   siteName: siteConfig.name,
	//   images: [siteConfig.ogImage],
	// },
	// twitter: {
	//   card: "summary_large_image",
	//   title: siteConfig.name,
	//   description: siteConfig.description,
	//   images: [siteConfig.ogImage],
	//   creator: "@team12",
	// },
	// icons: {
	//   icon: [
	//     {
	//       rel: "icon",
	//       type: "image/icon",
	//       media: "(prefers-color-scheme: light)",
	//       url: "/favicon.ico",
	//     },
	//     {
	//       rel: "icon",
	//       type: "image/icon",
	//       media: "(prefers-color-scheme: dark)",
	//       url: "/favicon-dark.ico",
	//     },
	//   ],
	//   shortcut:
	//     process.env.NODE_ENV === "production"
	//       ? [
	//           {
	//             rel: "icon",
	//             type: "image/png",
	//             media: "(prefers-color-scheme: light)",
	//             url: "/icon.png",
	//           },
	//           {
	//             rel: "icon",
	//             type: "image/png",
	//             media: "(prefers-color-scheme: dark)",
	//             url: "/icon-dark.png",
	//           },
	//         ]
	//       : [
	//           {
	//             rel: "icon",
	//             type: "image/svg+xml",
	//             media: "(prefers-color-scheme: light)",
	//             url: "/icon-dev.svg",
	//           },
	//           {
	//             rel: "icon",
	//             type: "image/svg+xml",
	//             media: "(prefers-color-scheme: dark)",
	//             url: "/icon-dev.svg",
	//           },
	//         ],
	//   apple: [
	//     {
	//       rel: "icon",
	//       type: "image/png",
	//       media: "(prefers-color-scheme: light)",
	//       url: "/apple-touch-icon.png",
	//     },
	//     {
	//       rel: "icon",
	//       type: "image/png",
	//       media: "(prefers-color-scheme: dark)",
	//       url: "/apple-touch-icon-dark.png",
	//     },
	//   ],
	// },
};
export default metadataConf;