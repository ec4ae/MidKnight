import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import Head from 'next/head';

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      <Head>
        <title>MidKnight - Cardano Memecoin</title>
        <meta name="description" content="MidKnight: A Cardano-based meme token" />
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-6">Welcome to MidKnight</h1>
        <div className="flex justify-center mb-4">
          <CardanoWallet />
        </div>
        {connected && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-purple-300 mb-2">Your Wallet Assets</h2>
              {assets ? (
                <pre className="bg-gray-800 text-left p-4 rounded overflow-x-auto">
                  <code>{JSON.stringify(assets, null, 2)}</code>
                </pre>
              ) : (
                <button
                  onClick={getAssets}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow-md"
                >
                  {loading ? 'Loading...' : 'Get Assets'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
