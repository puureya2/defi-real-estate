# 🏠 DeFi Real Estate

A full-stack **DeFi real estate marketplace** that allows users to **mint, manage, and trade tokenized properties** on the Ethereum blockchain. A monorepo built with **Next.js**, **Solidity**, and **TailwindCSS**, this project explores real-world asset tokenization and decentralized ownership.

## 🚀 Features

- 🏗️ **Tokenized Properties** using custom ERC20 smart contracts
- 🧰 **Smart Contract Factory** for creating new property tokens
- 🧾 **MetaMask Integration** via Wagmi and RainbowKit
- 💼 **DeFi-ready UI** with property listings and token minting
- 🧪 **20+ Unit Tests** using Mocha, Chai, and Hardhat
- 📜 **ERC20-compliant Contracts** with OpenZeppelin

## 🔧 Tech Stack (Turborepo)

| Frontend         | Smart Contracts     | Testing           | Wallet & UI Integration |
|------------------|---------------------|-------------------|--------------------------|
| Next.js (App Router) | Solidity + Hardhat   | Mocha + Chai       | Wagmi + RainbowKit       |
| TypeScript        | Viem + Ethers.js     | Hardhat Local Node | MetaMask                 |
| TailwindCSS       | OpenZeppelin Library |                   |                          |


## 🧰 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/defi-real-estate.git
cd defi-real-estate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile contracts

```bash
npx hardhat compile
```

### 4. Run local node & deploy contracts

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Start the frontend

```bash
npm run dev
```

### 6. Run tests

```bash
npx hardhat test
```

