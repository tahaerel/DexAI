import React, { useState } from "react";
import Web3 from "web3";
import { gptfunction } from "./gpt_contracts";
function App() {
  const [account, setAccount] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [data, setData] = useState("");
  const [newCity, setNewCity] = useState("");
  const [setStatus, setSetStatus] = useState("");

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };
  function AppContracts({ handleToggleAppContracts }) {
    // App_Contracts.js içeriği
    // Eğer App_Contracts.js'nin çalıştığı bir durumdaysak, "App_Contracts.js Dosyasını Kapat" butonunu göster
    return (
      <div>
        <h1>App_Contracts.js İçeriği</h1>
        <p>Bu dosyanın içeriği burada görüntülenir.</p>
        <button onClick={handleToggleAppContracts}>App_Contracts.js Dosyasını Kapat</button>
      </div>
    );
  };

  const connectContract = async () => {
    try {
      // Akıllı kontrat nesnesini burada tanımlayın
      const ABI = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newCity",
              "type": "string"
            }
          ],
          "name": "setMyCity",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "initialCity",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "myCity",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];// Verilen ABI tanımını ekleyin
      const address = "0xA8B48c44176c5cBf274d078C98565d7dB7d7ce00"; // Akıllı kontrat adresini ekleyin
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, address);
      window.contract = contract; // window.contract'a akıllı kontrat nesnesini atayın
      setContractStatus("Connected to smart contract");
    } catch (error) {
      console.error(error);
    }
  };



  const setCity = async () => {
    try {
      if (!window.contract) {
        console.error("Contract is not connected. Please connect to the contract first.");
        return;
      }
      const newCity = await gptfunction(document.getElementById("newCityInput").value);
      console.log("NEW CITY" + newCity);
      await window.contract.methods.setMyCity(newCity).send({ from: account });
      setSetStatus("City set to: " + newCity);
    } catch (error) {
      console.error(error);
    }
  };



  const readContract = async () => {
    try {
      if (!window.contract) {
        console.error("Contract is not connected. Please connect to the contract first.");
        return;
      }

      const data = await window.contract.methods.myCity().call();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <button onClick={connectMetamask} style={{ marginBottom: '10px' }} className="btn">
        CONNECT TO METAMASK
      </button>
      <p id="accountArea">{account}</p>
      <button onClick={connectContract} style={{ marginBottom: '10px' }} className="btn">
        CONNECT TO CONTRACT
      </button>
      <p id="contractArea">{contractStatus}</p>
      <button onClick={readContract} style={{ marginBottom: '10px' }} className="btn">
        GET DATA FROM CONTRACT
      </button>
      <p id="dataArea">{data}</p>
      <input
        type="text"
        id="newCityInput"
        placeholder="Enter a request"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        className="input"
      />
      <button onClick={setCity} className="btn">
        Set City
      </button>
      <div id="setStatus" style={{ marginTop: '20px' }}>
        {setStatus}
      </div>
    </div>


  );
}

export default App;
