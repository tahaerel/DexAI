import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { gptfunction } from "./gptyeni";
import { useEffect } from "react";

//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


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  const { ethereum } = window


  console.log("ether:"+ether);
  console.log("addr:"+addr);
  try {
    if (!window.ethereum) 
      throw new Error("No crypto wallet found. Please install it.");


  await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x15eb' }],
        });
      } 
  catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x15eb',
                  chainName: 'opBNB Testnet',
                  rpcUrls: ['https://opbnb-testnet-rpc.bnbchain.org'] /* ... */,
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }

  
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    })
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  
  //catch (err) {
    //setError(err.message);
  //}
};


export default function App() {
  
  const [promt, setPromt] = useState(null)
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [adress, setAdres]=useState()
  const [miktar, setMiktar]=useState()

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
  };
  
  useEffect(() => {
    if (adress && miktar) {
      handleSubmit();
    }
  }, [adress, miktar]);

  const handleGpt = async () => {
    console.log("handleGpt function called");

    const response = await gptfunction(promt);
    console.log("RESPONSEEE= ", response[0], response[3]);

    setAdres(response[0]);
    setMiktar(response[3]);
  };
  
  const sumbitform =  async () => {

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
                onChange={(e)=> setPromt(e.target.value)}
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
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
      </div>



/*
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
            <div className="my-3">
              <input
                name="request"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Text here..."
                onChange={(e)=> setPromt(e.target.value)}
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
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form> 
    */
  );
}

