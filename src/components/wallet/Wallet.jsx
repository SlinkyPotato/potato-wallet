/*global chrome*/

import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';
import localforage from 'localforage';
import { NETWORKS } from './../../common/networks';
import { Modal } from 'bootstrap';

export default function Wallet(props) {
    const RECOVERY_METHOD_PRIV_KEY = 'PRIVATE_KEY';
    const RECOVERY_METHOD_SEED = 'SEED';
    const RECOVERY_METHOD_NEW_WALLET = 'NEW_WALLET';

    const [userWallet, setUserWallet] = useState({});
    const [recoveryMethod, setRecoveryMethod ] = useState(RECOVERY_METHOD_NEW_WALLET);
    const [seed, setSeed ] = useState('');
    const [privKey, setPrivKey ] = useState('');
    const [ePass, setEPass ] = useState('');
    const [cPass, setCPass ] = useState('');

    return (
        <div className="container">
            <h2 className="mb-3">Wallet</h2>
            <form onSubmit={useRecoverWallet}>
                <div className="mb-3">
                    <div className="btn-group" role="group" aria-label="Recovery radio toggle wallet group">
                        <input type="radio" className="btn-check" name="btnwalletradio" id="radCreateWallet" autoComplete="off"
                            checked={recoveryMethod === RECOVERY_METHOD_NEW_WALLET} 
                            onChange={(e) => setRecoveryMethod(RECOVERY_METHOD_NEW_WALLET)}
                            />
                        <label htmlFor="radCreateWallet" className="btn btn-outline-secondary">New Wallet</label>

                        <input type="radio" className="btn-check" name="btnwalletradio" id="radprivkey" autoComplete="off"
                            checked={recoveryMethod === RECOVERY_METHOD_PRIV_KEY} 
                            onChange={(e) => setRecoveryMethod(RECOVERY_METHOD_PRIV_KEY)}
                            />
                        <label htmlFor="radprivkey" className="btn btn-outline-secondary">Private Key</label>

                        <input type="radio" className="btn-check" name="btnwalletradio" id="radseed" autoComplete="off"
                            checked={recoveryMethod === RECOVERY_METHOD_SEED}
                            onChange={(e) => setRecoveryMethod(RECOVERY_METHOD_SEED)}
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
                    <div id="privKeyHelpBlock" className="form-text">Your private key is never seen by us.</div>
                </div>
                <div className="mb-3" hidden={recoveryMethod !== RECOVERY_METHOD_SEED}>
                    <label htmlFor="seedTextArea" className="form-label" 
                        data-tip="Secret phrase">
                        Seed
                    </label>
                    <textarea name="seed" id="seedTextArea" rows="3" className="form-control" 
                    placeholder="dove lumber quote board young robust kit ..." value={seed} onChange={(e) => setSeed(e.target.value)}></textarea>
                    <div id="seedHelpBlock" className="form-text">
                        Your seed is never seen by us.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="newPass" className="form-label" 
                        data-tip="Alphanumeric characters A-Z and special characters !@#$%^">
                        New Password
                    </label>
                    <input type="password" id="newPass" rows="3" className="form-control" 
                        value={ePass} onChange={(e) => setEPass(e.target.value)}></input>
                    <div id="seedHelpBlock" className="form-text">
                        Your password is never stored.
                    </div>
                </div>
                <div className="mb-3" hidden={ePass.length <= 0}>
                    <label htmlFor="confirmPass" className="form-label" 
                        data-tip="Your information is encrypted with this">
                        Confirm Password
                    </label>
                    <input type="password" id="confirmPass" rows="3" className="form-control" 
                        value={cPass} onChange={(e) => setCPass(e.target.value)}></input>
                </div>
                <button type="submit" 
                    className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#walletModal">
                    {recoveryMethod === RECOVERY_METHOD_NEW_WALLET ? 'Create' : 'Recover'}
                </button>
            </form>
            <div className="modal" id="walletModal" tabIndex="-1" aria-labelledby="walletModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="walletModalLabel">Wallet Created</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>private Key: {userWallet.privateKey}</p>
                            <p>mnemonic: {userWallet.mnemonic!= null ? userWallet.mnemonic.phrase : ''}</p>
                            <p>address: {userWallet.address}</p>
                            <p>which: {userWallet.which}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </div>
    );
    
    function useRecoverWallet(event) {
        event.preventDefault();
        const walletModal = Modal.getInstance(document.getElementById('walletModal'));
        walletModal.show();
        let userWallet = null;
        const provider = new ethers.getDefaultProvider(NETWORKS.goerli.rpcUrl);

        if (recoveryMethod === RECOVERY_METHOD_SEED && seed !== '') {
            userWallet = ethers.Wallet.fromMnemonic(seed);
        } else if (recoveryMethod === RECOVERY_METHOD_PRIV_KEY & privKey !== '') {
            userWallet = new ethers.Wallet(privKey, provider);
        } else if (recoveryMethod === RECOVERY_METHOD_NEW_WALLET) {
            userWallet = ethers.Wallet.createRandom();
        }
        setUserWallet(userWallet);
        useDBStoreWallet(userWallet);
        console.log(userWallet);
    }

    async function useDBStoreWallet(userWallet) {
        const eWalletPromise = await userWallet.encrypt(ePass);

        console.log('encryptedWallet: ' + eWalletPromise);
        console.log('address:' +  userWallet.address);
        var walletStore = localforage.createInstance({
            name: 'wallet'
        });
        const dbWallet = {
            'publicAddress': '0x' + userWallet.address,
            'tokenSymbol': 'ETH',
            'seed': '-',
            'privateKey': '-',
            'hashPass': '-',
            'nickname': '-',
            'path': '-',
            'encryptedWallet': eWalletPromise
        };
        walletStore.setItem('0x' + userWallet.address, dbWallet).then((value) => {
            console.log('db updated');
        }).catch((err) => {
            console.log(err);
        });
    }

}