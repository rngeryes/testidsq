// Проверяем наличие провайдера (например, MetaMask)
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

document.getElementById("connectWallet").onclick = async () => {
  try {
    // Запрос доступа к кошельку
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Wallet: ${walletAddress}`;
  } catch (err) {
    console.error(err);
    alert("Failed to connect wallet.");
  }
};

document.getElementById("checkBalance").onclick = async () => {
  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }
  const walletAddress = await signer.getAddress();
  const balance = await provider.getBalance(walletAddress);
  document.getElementById("balance").innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;
};

document.getElementById("sendTransaction").onclick = async () => {
  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const tx = await signer.sendTransaction({
      to: "0xRecipientAddressHere", // Укажите адрес получателя
      value: ethers.utils.parseEther("0.01"), // Сумма в ETH
    });
    document.getElementById("status").innerText = `Transaction sent: ${tx.hash}`;
  } catch (err) {
    console.error(err);
    alert("Failed to send transaction.");
  }
};
