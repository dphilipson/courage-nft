import { providers, Signer } from "ethers";
import React, {
  createContext,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { chainFrom } from "transducist";
import { NETWORK } from "../constants";
import { EthNetwork } from "../types";

/** EIP-1193 userRejectedRequest error. */
export const USER_REJECTED = 4001;

const ethereum =
  typeof window === "undefined" ? undefined : (window as any).ethereum;

const networksByChainId: Record<number, EthNetwork> = {
  1: EthNetwork.MAINNET,
  3: EthNetwork.ROPSTEN,
  4: EthNetwork.RINKEBY,
  5: EthNetwork.GOERLI,
  42: EthNetwork.KOVAN,
  31337: EthNetwork.HARDHAT,
};

const chainIdsByNetwork: Record<EthNetwork, number> = chainFrom(
  Object.entries(networksByChainId),
).toObject(
  ([, network]) => network,
  ([id]) => +id,
);

export interface MetamaskState {
  isInstalled: boolean;
  isInitialized: boolean;
  isConnecting: boolean;
  userRejected: boolean;
  chainId: number | undefined;
  network: EthNetwork | undefined;
  currentAccount: string | undefined;
  signer: Signer | undefined;
  connect(network?: EthNetwork): Promise<void>;
}

const MetamaskContext = createContext<MetamaskState>(undefined as any);

export interface MetamaskProviderProps {
  reloadOnAccountChanged?: boolean;
  children: ReactNode;
}

export const MetamaskProvider = memo(function MetamaskProvider({
  reloadOnAccountChanged,
  children,
}: MetamaskProviderProps): ReactElement {
  const isInstalled = !!ethereum;
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userRejected, setUserRejected] = useState(false);
  const [chainId, setChainId] = useState<number>();
  const [currentAccount, setCurrentAccount] = useState<string>();

  const chainIdRef = useRef(chainId);
  const currentAccountRef = useRef(currentAccount);

  useEffect(() => {
    if (!ethereum) {
      return;
    }
    Promise.all([
      ethereum.request({ method: "eth_chainId" }).then(handleChainChanged),
      ethereum.request({ method: "eth_accounts" }).then(handleAccountsChanged),
    ]).then(() => setIsInitialized(true));

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  const connect = useCallback(async (network?: EthNetwork) => {
    if (!isInstalled) {
      throw new Error("Cannot connect when no provider is installed.");
    }
    setIsConnecting(true);
    setUserRejected(false);
    let accounts: string[];
    try {
      accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (network) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainIdsByNetwork[network].toString(16)}` }],
        });
      }
    } catch (error: any) {
      if (error.code === USER_REJECTED) {
        setUserRejected(true);
        return;
      } else {
        throw error;
      }
    } finally {
      setIsConnecting(false);
    }
    handleAccountsChanged(accounts);
  }, []);

  const handleChainChanged = useCallback((chainIdHex: string) => {
    const newChainId = Number.parseInt(chainIdHex, 16);
    if (chainIdRef.current != null && chainIdRef.current !== newChainId) {
      // Chain ID has changed. Time to bail.
      window.location.reload();
      return;
    }
    setChainId(newChainId);
    chainIdRef.current = newChainId;
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    const account = accounts[0];
    if (
      reloadOnAccountChanged &&
      currentAccountRef.current &&
      currentAccountRef.current !== account
    ) {
      // Current account has changed and flag is set to reload.
      window.location.reload();
      return;
    }
    setCurrentAccount(account);
    currentAccountRef.current = account;
  }, []);

  const signer = useMemo(() => {
    if (!currentAccount) {
      return undefined;
    }
    return new providers.Web3Provider(ethereum).getSigner();
  }, [currentAccount]);

  const value = useMemo((): MetamaskState => {
    const network = chainId != null ? networksByChainId[chainId] : undefined;
    const isCorrectNetwork = !network || network === NETWORK;
    return {
      isInstalled,
      isInitialized,
      isConnecting,
      userRejected,
      chainId,
      network: chainId != null ? networksByChainId[chainId] : undefined,
      currentAccount: isCorrectNetwork ? currentAccount : undefined,
      signer: isCorrectNetwork ? signer : undefined,
      connect,
    };
  }, [
    isInstalled,
    isInitialized,
    isConnecting,
    userRejected,
    chainId,
    currentAccount,
  ]);

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
});

export function useMetamask(): MetamaskState {
  const state = useContext(MetamaskContext);
  if (state == null) {
    throw new Error(
      "Component calling useMetamask() must have a MetamaskProvider ancestor.",
    );
  }
  return state;
}
