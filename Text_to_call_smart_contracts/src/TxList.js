export default function TxList({ txs }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div key={item} className="alert alert-info mt-5">
          <div className="flex-1">
            <label>
            <a href={`https://opbnb-testnet.bscscan.com/tx/${item.hash}`} target="_blank" rel="noopener noreferrer">
                {item.hash}
              </a>
            </label>
          </div>
        </div>
      ))}
    </>
  );
}
