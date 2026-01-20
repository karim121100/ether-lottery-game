// PASTE DEPLOYED ADDRESS HERE
const ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

const ABI = [
    "function enter() public payable",
    "function pickWinner() public",
    "function getPlayers() public view returns (address[])",
    "function manager() public view returns (address)",
    "function lastWinner() public view returns (address)",
    "function lastPayout() public view returns (uint256)"
];

let provider, signer, contract;

const connectBtn = document.getElementById("connectBtn");
const enterBtn = document.getElementById("enterBtn");
const pickBtn = document.getElementById("pickBtn");
const statusDiv = document.getElementById("status");

async function init() {
    if(!window.ethereum) return alert("Install MetaMask");
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(ADDRESS, ABI, signer);

    updateUI();
}

async function updateUI() {
    const balance = await provider.getBalance(ADDRESS);
    const players = await contract.getPlayers();
    const manager = await contract.manager();
    const winner = await contract.lastWinner();
    const address = await signer.getAddress();

    document.getElementById("balance").innerText = ethers.utils.formatEther(balance) + " ETH";
    document.getElementById("playerCount").innerText = players.length;
    document.getElementById("lastWinner").innerText = winner === "0x0000000000000000000000000000000000000000" ? "None" : winner.substring(0,6) + "...";
    
    connectBtn.innerText = "Connected";

    // Only show Pick Winner button to the manager
    if (address.toLowerCase() === manager.toLowerCase()) {
        document.getElementById("adminArea").classList.remove("hidden");
    }
}

enterBtn.onclick = async () => {
    statusDiv.innerText = "Entering lottery...";
    try {
        const tx = await contract.enter({ value: ethers.utils.parseEther("0.011") });
        await tx.wait();
        statusDiv.innerText = "Ticket bought!";
        updateUI();
    } catch(e) { console.error(e); }
};

pickBtn.onclick = async () => {
    statusDiv.innerText = "Picking winner...";
    try {
        const tx = await contract.pickWinner();
        await tx.wait();
        statusDiv.innerText = "Winner picked! Money sent.";
        updateUI();
    } catch(e) { console.error(e); }
};

connectBtn.onclick = init;
