/*global chrome*/

import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import { NETWORKS } from './../../common/networks';

export default function Wallet(props) {
    const provider = new ethers.getDefaultProvider(NETWORKS.goerli.rpcUrl);
    // const [blockNumber, setBlockNumber] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    // const provider = 'test';
    useEffect(async () => {
        const mnemonic =  await ethers.Wallet.createRandom();
        setMnemonic(mnemonic);
    }, []);
    // useEffect(() => {
        // setBlockNumber(provider.getBlockNumber());
    // });

    return (
        <span>
            <p>private Key: {mnemonic.privateKey}</p>
            <p>mnemonic: {mnemonic.mnemonic!= null ? mnemonic.mnemonic.phrase : '...'}</p>
            <p>address: {mnemonic.address}</p>
        </span>
    );
}

async function createWallet() {
    const newUserWallet = await ethers.Wallet.createRandom();
    return newUserWallet;
}