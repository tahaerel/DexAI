import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import AppContracts from './App_Contract'; // App_Contracts.js dosyasını içe aktarın
import TxList from "./TxList";
import { gptfunction } from "./gpt_transaction";
import { useEffect } from "react";
import React from 'react'
import {
  BeatLoading, BounceLoading, CircularLoading,
  ClockLoading, RotateLoading, SpinLoading,
  WaveLoading, DashLoading, CopperLoading
} from 'respinner'


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  const { ethereum } = window;

  console.log("ether:" + ether);
  console.log("addr:" + addr);

  try {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install it.");
    }

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x15eb' }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x15eb',
              chainName: 'opBNB Testnet',
              rpcUrls: ['https://opbnb-testnet-rpc.bnbchain.org'],
            },
          ],
        });
      } catch (addError) {
        setError("Failed to add Ethereum chain: " + addError.message);
        return; // Exit the function
      }
    } else {
      setError("Failed to switch Ethereum chain: " + switchError.message);
      return; // Exit the function
    }
  }

  try {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError("Failed to send transaction: " + err.message);
  }
};


export default function App() {
  const [showAppContracts, setShowAppContracts] = useState(false);

  const handleToggleAppContracts = () => {
    setShowAppContracts(!showAppContracts);
  };
  const [promt, setPromt] = useState(null)
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [adress, setAdres] = useState()
  const [miktar, setMiktar] = useState()
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {

    if (e) {
      e.preventDefault();
    }
    console.log("startpayment adress:" + adress);
    console.log("startpayment miktar:" + miktar);
    setError();

    await startPayment({
      setError,
      setTxs,
      ether: miktar,
      addr: adress,
    });

    setLoading(false); // Set loading back to false when done
  };

  useEffect(() => {
    if (adress && miktar) {
      handleSubmit();
    }
  }, [adress, miktar]);

  const handleGpt = async () => {
    console.log("handleGpt function called");
    setLoading(true); // Set loading to true

    const response = await gptfunction(promt);
    console.log("RESPONSEEE= ", response[0], response[3]);

    setAdres(response[0]);
    setMiktar(response[3]);
  };

  const sumbitform = async () => {

    console.log("Form Sumbit")
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">        <main className="mt-4 p-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Enter your request
        </h1>
        <div className="">
          <div className="my-3">
            <input
              name="request"
              type="text"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Text here..."
              onChange={(e) => setPromt(e.target.value)}
            />
          </div>

        </div>
      </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            onClick={handleGpt}
          >
            Send
          </button>
          {loading ? (
            <div className="text-center py-4">

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularLoading size={40} duration={1} stroke="#4197ff" />
              </div>
            </div>
          ) : (
            <div>
              <TxList txs={txs} />
              <ErrorMessage message={error} />
            </div>
          )}
        </footer>
      </div>
      <div>
        {showAppContracts ? (
          <AppContracts handleToggleAppContracts={handleToggleAppContracts} />
        ) : (
          <button
            onClick={handleToggleAppContracts}
            style={{
              padding: '10px 15px',
              backgroundColor: 'blue', // Butonun arka plan rengini ayarlayabilirsiniz.
              color: 'white', // Buton metin rengini ayarlayabilirsiniz.
              border: 'none', // Butonun kenarlığını kaldırabilirsiniz.
              cursor: 'pointer', // Farenin üstüne geldiğinde imlecin bir el işareti olmasını sağlar.
              borderRadius: '5px', // Butonun köşelerini yuvarlayabilirsiniz.
            }}
          >
            Example 2
          </button>
        )}
      </div>
    </div>

  );
}

