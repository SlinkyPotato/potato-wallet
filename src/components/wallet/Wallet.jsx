/*global chrome*/

import React, {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';
import { NETWORKS } from './../../common/networks';

export default function Wallet(props) {
    const provider = new ethers.getDefaultProvider(NETWORKS.goerli.rpcUrl);
    // const [blockNumber, setBlockNumber] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    // const provider = 'test';
    // useEffect(async () => {
    //     const mnemonic =  await ethers.Wallet.createRandom();
    //     setMnemonic(mnemonic);
    // }, []);
    // useEffect(() => {
        // setBlockNumber(provider.getBlockNumber());
    // });

    const [recoveryMethod, setRecoveryMethod ] = useState("PRIVATE_KEY");

    return (
        <div>
            <div className="container mt-3">
                <h2 className="mb-3">Restore Wallet</h2>
                <div className="mb-3">
                <div className="btn-group" role="group" aria-label="Recovery radio toggle wallet group">
                    <input type="radio" className="btn-check" name="btnwalletradio" id="radprivkey" autoComplete="off"
                        checked={recoveryMethod === 'PRIVATE_KEY'} 
                        onClick={() => setRecoveryMethod('PRIVATE_KEY')}
                        />
                    <label htmlFor="radprivkey" className="btn btn-outline-secondary">Private Key</label>

                    <input type="radio" className="btn-check" name="btnwalletradio" id="radseed" autoComplete="off"
                        checked={recoveryMethod === 'SEED'}
                        onClick={() => setRecoveryMethod('SEED')}
                        />
                    <label htmlFor="radseed" className="btn btn-outline-secondary">Seed</label>
                    </div>
                </div>
                <div className="mb-3" hidden={recoveryMethod !== 'PRIVATE_KEY'}>
                    <label htmlFor="privKeyText" className="form-label" 
                        data-tip="64 hexadecimal characters of 0-9 A-F">
                        Private Key
                    </label>
                    <input type="password" name="privatekey" id="privKeyText" className="form-control" 
                    placeholder="8da4ef21b864d2cc526dbdb2a120...." />
                </div>
                <div className="mb-3" hidden={recoveryMethod !== 'SEED'}>
                    <label htmlFor="seedTextArea" className="form-label" 
                        data-tip="Secret phrase">
                        Seed
                    </label>
                    <textarea name="seed" id="seedTextArea" rows="3" className="form-control" 
                    placeholder="dove lumber quote board young robust kit ..."></textarea>
                </div>
                {/* <div>
                    <p>private Key: {mnemonic.privateKey}</p>
                    <p>mnemonic: {mnemonic.mnemonic!= null ? mnemonic.mnemonic.phrase : '...'}</p>
                    <p>address: {mnemonic.address}</p>
                </div> */}
                <button type="button" className="btn btn-primary">Restore</button>
            </div>
            <ReactTooltip />
        </div>
    );
}

async function createWallet() {
    const newUserWallet = await ethers.Wallet.createRandom();
    return newUserWallet;
}