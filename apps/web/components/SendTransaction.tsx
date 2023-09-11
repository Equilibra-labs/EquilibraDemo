import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { parseEther } from "ethers/lib/utils";

function Send() {
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: "0xa25211B64D041F690C0c818183E32f28ba9647Dd",
    value: parseEther("0.01"),
  });

  return (
    <div>
      <button onClick={() => sendTransaction()}>Send Transaction</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}

export default Send;
