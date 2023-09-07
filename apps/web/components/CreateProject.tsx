/* eslint-disable indent */
import React from 'react'
import  * as ProjectRegistry from "../abi/ProjectRegistry.json"
import { useContractWrite, usePrepareContractWrite} from 'wagmi'
import { useAccount, useBalance, useBlockNumber } from 'wagmi'

export default function RegisterProject() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      })
      const { data: blockNumber } = useBlockNumber()

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
          console.log('Connected', { address, connector, isReconnected })
        },
      })

    //arguments to the project registry function
    // _beneficiary: address,
    const BENEFICIARY: string = "0x601a107cB001F517b7dC80b1209bEa43699Fe0C2"

    //_contenthash: Keccak-256 (bytes32) Hash of "hello world":
    const CONTENTHASH: string = "0x94ee059335e587e501cc4b"

    const {config} = usePrepareContractWrite({
        address: ProjectRegistry.address,
        abi: ProjectRegistry.abi,
        functionName: "registerProject",
        args:[BENEFICIARY, CONTENTHASH]
    })

    const {write} = useContractWrite(config)
    
  return (
    <div className="w-full flex flex-col space-y-4" >
        <div>{address}</div>
        <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
    {/* <div>Block number: {data?.}</div> */}
    <a  href={`https://goerli.etherscan.io/address/${ProjectRegistry.address}`} target="_blank" rel="noreferrer">See contract in Etherscan: {ProjectRegistry.address}</a>

    <button className='border-2 rounded-xl cursor-pointer' disabled={!write} onClick={() => write?.()}>
        Create Proyect
      </button>
  </div>
  )
}
