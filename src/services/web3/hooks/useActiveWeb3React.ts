import { ChainId } from '../../../constants'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useWeb3React } from '@web3-react/core'


export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId
} {
  // replace with address to impersonate
  const impersonate = false
  const context = useWeb3React<Web3Provider>()
  return { ...context, account: impersonate || context.account }
}

export default useActiveWeb3React
