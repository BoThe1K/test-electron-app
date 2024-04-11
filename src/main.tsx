import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const chains = [
	{
		chainId: 2047,
		name: 'Mesos',
		currency: 'STOS',
		explorerUrl: 'https://web3-explorer-mesos.thestratos.org',
		rpcUrl: 'https://web3-rpc-mesos.thestratos.org'
	},
]

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = import.meta.env.VITE_PROJECT_ID || "";

const metadata = {
	name: "Electron",
	description: "A React starter template with Web3Modal v3 + Wagmi",
	url: "https://thestratos.org",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const ethersConfig = defaultConfig({ metadata });

createWeb3Modal({
	ethersConfig,
	projectId,
	chains,
	customWallets: [
		{
			id: 'stratos-1',
			name: 'Stratos wallet',
			homepage: 'www.thestratos.com', // Optional
			// image_url: 'my_custom_wallet_image', // Optional
			// mobile_link: 'mobile_link', // Optional - Deeplink or universal
			desktop_link: 'electron-fiddle://', // Optional - Deeplink
			// webapp_link: 'webapp_link', // Optional
			// app_store: 'app_store', // Optional
			// play_store: 'play_store' // Optional
		}
	],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
