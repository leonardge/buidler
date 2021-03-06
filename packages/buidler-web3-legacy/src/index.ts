import { extendEnvironment } from "@nomiclabs/buidler/config";
import { lazyFunction, lazyObject } from "@nomiclabs/buidler/plugins";

import { promisifyWeb3 } from "./pweb3";
import { Web3HTTPProviderAdapter } from "./web3-provider-adapter";

export default function () {
  extendEnvironment((env) => {
    env.Web3 = lazyFunction(() => require("web3"));
    env.web3 = lazyObject(() => {
      const Web3 = require("web3");
      return new Web3(new Web3HTTPProviderAdapter(env.network.provider));
    });
    env.pweb3 = lazyObject(() => promisifyWeb3(env.web3));
  });
}
