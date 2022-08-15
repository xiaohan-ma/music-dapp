export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: true,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: false,
      };
    }
  } else {
    return {
      address: "",
      status: false,
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: true,
        };
      } else {
        return {
          address: "",
          status: false,
        };
      }
    } catch (err) {
      return {
        address: "",
        status: false,
      };
    }
  } else {
    return {
      address: "",
      status: false,
    };
  }
};
