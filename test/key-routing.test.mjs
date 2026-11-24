// The free hosts never read an API key, so a client with a key must send every request to pro-api.
// Runs against the built package: npm test (builds first).
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { DefiLlama } from "../dist/index.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const urlsFor = async (config, call) => {
  const urls = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  await call(new DefiLlama(config)).catch(() => {});
  return urls;
};

const calls = {
  "tvl.getProtocols": (c) => c.tvl.getProtocols(),
  "prices.getCurrentPrices": (c) => c.prices.getCurrentPrices(["coingecko:ethereum"]),
  "stablecoins.getStablecoins": (c) => c.stablecoins.getStablecoins(),
  "fees.getOverview": (c) => c.fees.getOverview(),
  "volumes.getDexOverview": (c) => c.volumes.getDexOverview(),
};

describe("key routing", () => {
  for (const [name, call] of Object.entries(calls)) {
    it(`${name} uses pro-api with the key in the path when a key is set`, async () => {
      const [url] = await urlsFor({ apiKey: "test-key" }, call);
      assert.match(url, /^https:\/\/pro-api\.llama\.fi\/test-key\//);
    });

    it(`${name} stays on a free host without a key`, async () => {
      const [url] = await urlsFor({}, call);
      assert.match(url, /^https:\/\/(api|coins|stablecoins)\.llama\.fi\//);
    });
  }

  it("maps free paths to their pro prefixes", async () => {
    assert.equal(
      (await urlsFor({ apiKey: "k" }, calls["tvl.getProtocols"]))[0],
      "https://pro-api.llama.fi/k/api/protocols",
    );
    assert.match(
      (await urlsFor({ apiKey: "k" }, calls["prices.getCurrentPrices"]))[0],
      /^https:\/\/pro-api\.llama\.fi\/k\/coins\/prices\/current\//,
    );
    assert.equal(
      (await urlsFor({ apiKey: "k" }, calls["stablecoins.getStablecoins"]))[0],
      "https://pro-api.llama.fi/k/stablecoins/stablecoins",
    );
  });
});
