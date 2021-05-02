/*global chrome*/

import React, {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';
import { NETWORKS } from './../../common/networks';

export default function Wallet(props) {
    const RECOVERY_METHOD_PRIV_KEY = 'PRIVATE_KEY';
    const RECOVERY_METHOD_SEED = 'SEED';

    const [userWallet, setUserWallet] = useState({});
    const [recoveryMethod, setRecoveryMethod ] = useState(RECOVERY_METHOD_PRIV_KEY);
    const [seed, setSeed ] = useState('');
    const [privKey, setPrivKey ] = useState('');

    const OPTIONS = {infura: process.env.REACT_APP_INFURA_PROJECT_ID};

    return (
        <div className="container">
            <h2 className="mb-3">Restore Wallet</h2>
            <form onSubmit={useRecoverWallet}>
                <div className="mb-3">
                    <div className="btn-group" role="group" aria-label="Recovery radio toggle wallet group">
                        <input type="radio" className="btn-check" name="btnwalletradio" id="radprivkey" autoComplete="off"
                            checked={recoveryMethod === RECOVERY_METHOD_PRIV_KEY} 
                            onClick={() => setRecoveryMethod(RECOVERY_METHOD_PRIV_KEY)}
                            />
                        <label htmlFor="radprivkey" className="btn btn-outline-secondary">Private Key</label>

                        <input type="radio" className="btn-check" name="btnwalletradio" id="radseed" autoComplete="off"
                            checked={recoveryMethod === RECOVERY_METHOD_SEED}
                            onClick={() => setRecoveryMethod(RECOVERY_METHOD_SEED)}
                            />
                        <label htmlFor="radseed" className="btn btn-outline-secondary">Seed</label>
                    </div>
                </div>
                <div className="mb-3" hidden={recoveryMethod !== RECOVERY_METHOD_PRIV_KEY}>
                    <label htmlFor="privKeyText" className="form-label" 
                        data-tip="64 hexadecimal characters of 0-9 A-F">
                        Private Key
                    </label>
                    <input type="password" name="privatekey" id="privKeyText" className="form-control" 
                    placeholder="8da4ef21b864d2cc526dbdb2a120...." value={privKey} onChange={(e) => setPrivKey(e.target.value)}/>
                    <div id="privKeyHelpBlock" className="form-text">Your private key is never stored.</div>
                </div>
                <div className="mb-3" hidden={recoveryMethod !== RECOVERY_METHOD_SEED}>
                    <label htmlFor="seedTextArea" className="form-label" 
                        data-tip="Secret phrase">
                        Seed
                    </label>
                    <textarea name="seed" id="seedTextArea" rows="3" className="form-control" 
                    placeholder="dove lumber quote board young robust kit ..." value={seed} onChange={(e) => setSeed(e.target.value)}></textarea>
                    <div id="seedHelpBlock" className="form-text">
                        Your seed is never stored.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Restore</button>
            </form>
            <div className="row">
                <div>
                    <p>private Key: {userWallet.privateKey}</p>
                    <p>mnemonic: {userWallet.mnemonic!= null ? userWallet.mnemonic.phrase : '...'}</p>
                    <p>address: {userWallet.address}</p>
                    <p>which: {userWallet.which}</p>
                </div>
            </div>
            <ReactTooltip />
        </div>
    );
    
    function useRecoverWallet(event) {
        event.preventDefault();
        const provider = new ethers.getDefaultProvider(NETWORKS.goerli.rpcUrl);

        if (recoveryMethod === RECOVERY_METHOD_SEED && seed != '') {
            let userWallet = ethers.Wallet.fromMnemonic(seed);
            userWallet.which = '-seed';
            setUserWallet(userWallet);
        } else if (recoveryMethod === RECOVERY_METHOD_PRIV_KEY & privKey != '') {
            let userWallet = new ethers.Wallet(privKey, provider);
            userWallet.which = '-privKey';
            setUserWallet(userWallet);
        }
    }
}