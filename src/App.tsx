import styles from "./styles/Home.module.css";
import { useState } from "react";

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, JsonRpcProvider } from 'ethers'

export default function App() {
	const { address, chainId, isConnected } = useWeb3ModalAccount()
	const { walletProvider } = useWeb3ModalProvider()

	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
		useState(false);
	const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

	console.log('ethereum', window.ethereum)

	const onInitTx = async () => {
		const transactionParameters = {
			from: address,
			to: "0x633689E0850a78CBaE515cce2B387F3Bd9983779", // Required except during contract publications.
			data: "0x",
			chainId,
		};
		const ethersProvider = new BrowserProvider(walletProvider);
		const accounts = await ethersProvider.send('eth_accounts', []);
		console.log('accounts', accounts);
		// const txHash = await ethersProvider.send('eth_sendTransaction', [transactionParameters]);
		// console.log('txHash', txHash);
		const msgSigned = await ethersProvider.send('eth_sign', ["testsetsets"]);
		console.log('msgSigned', msgSigned);
	}

	const closeAll = () => {
		setIsNetworkSwitchHighlighted(false);
		setIsConnectHighlighted(false);
	};
	return (
		<>
			<header>
				<div
					className={styles.backdrop}
					style={{
						opacity:
							isConnectHighlighted || isNetworkSwitchHighlighted
								? 1
								: 0,
					}}
				/>
				<div className={styles.header}>
					<div className={styles.logo}>
						<img
							src="/logo.svg"
							alt="WalletConnect Logo"
							height="32"
							width="203"
						/>
					</div>
					<div className={styles.buttons}>
						<div
							onClick={closeAll}
							className={`${styles.highlight} ${isNetworkSwitchHighlighted
								? styles.highlightSelected
								: ``
								}`}
						>
							<w3m-network-button />
						</div>
						<div
							onClick={closeAll}
							className={`${styles.highlight} ${isConnectHighlighted
								? styles.highlightSelected
								: ``
								}`}
						>
							<w3m-button />
						</div>
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<h1>React Starter Template</h1>
						<div className={styles.content}>
							<ul>
								<li>
									Edit <code>src/App.tsx</code> and save to
									reload.
								</li>
								<li>
									Click{" "}
									<span
										onClick={() => {
											setIsConnectHighlighted(
												!isConnectHighlighted
											);
											setIsNetworkSwitchHighlighted(
												false
											);
										}}
										className={styles.button}
									>
										Connect Wallet
									</span>{" "}
									to connect to a WalletConnect v2.0
									compatible wallet.
								</li>
								<li>
									Click{" "}
									<span
										onClick={() => {
											setIsNetworkSwitchHighlighted(
												!isNetworkSwitchHighlighted
											);
											setIsConnectHighlighted(false);
										}}
										className={styles.button}
									>
										Select Network
									</span>{" "}
									to change networks.
								</li>
								<li>
									Click{" "}
									<span
										onClick={onInitTx}
										className={styles.button}
									>
										initTx
									</span>{" "}
									to initial test tx.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.footer}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							height={16}
							width={16}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
							/>
						</svg>
						<a
							href="https://docs.walletconnect.com/web3modal/react/about?utm_source=react-starter-template&utm_medium=github&utm_campaign=react-starter-template"
							target="_blank"
						>
							Check out the full documentation here
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
