interface EthereumProvider {
  request: (args: { method: string, params?: any[] }) => Promise<any>;
}

const getSelectedAddress = async (): Promise<string | null> => {
  const _window: any = window;
  const provider = _window.ethereum as EthereumProvider | undefined;

  if (provider) {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });

    if (accounts.length > 0) {
      const selectedAddress = accounts[0];
      return selectedAddress;
    }

    return null;
  }
  else {
    return null;
  }
}

const getPublicKey = async (selectedAddress: string): Promise<string | null> => {

  const _window: any = window;
  const provider = _window.ethereum as EthereumProvider | undefined;

  if (provider) {
    const publicKey =
      provider.request({ method: 'eth_getEncryptionPublicKey', params: [selectedAddress] });

    return publicKey;
  }
  else {
    return null;
  }
}

export const windowEthereumService = {
  getSelectedAddress,
  getPublicKey,
};
