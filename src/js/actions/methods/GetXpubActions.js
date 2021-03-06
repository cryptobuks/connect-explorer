/* @flow */
'use strict';

import TrezorConnect from 'trezor-connect';
import { onResponse } from './CommonActions';

const PREFIX: string = 'getxpub';
export const COIN_CHANGE: string = `${PREFIX}_coin_@change`;
export const PATH_CHANGE: string = `${PREFIX}_path_@change`;

export function onCoinChange(coin: string): any {
    return {
        type: COIN_CHANGE,
        coin
    }
}

export function onPathChange(path: string): any {
    return {
        type: PATH_CHANGE,
        path
    }
}

export function onGetXpub(): any {
    return async function (dispatch, getState) {

        const params = getState().common.params;
        const bundled = params.path.split(';');
        let response;
        if (bundled.length > 1) {
            const bundle = bundled.map(b => {
                return { path: b }
            });
            response = await TrezorConnect.getPublicKey( { bundle } );
        } else {
            response = await TrezorConnect.getPublicKey( params );
        }

        // const response = await TrezorConnect.getPublicKey( {
        //     device: {
        //         path: "web01",
        //         state: "e086140427d0cf971b5315f9b32c0de8352e5324fb2c1868f9ee0b543edf1d56f54498106eafce0fe3d434fa53052a0f1576ffc5518fa3c7f174d04a86971b74"
        //     },
        //     ...getState().common.params
        // });
        // const response1 = await TrezorConnect.getPublicKey( {
        //     path: [-1],
        // });

        // const response = await TrezorConnect.getPublicKey( {
        //     //path: [-1],
        //     bundle: [ 
        //         { path: "m/49'/0'/0'" },
        //         { path:  "m/44'/0'/1'", coin: 'btc' },
        //         { path: "m/49'/2'/1'", coin: 'litecoin' },
        //         { path: "m/44'/2'/1'" },
        //         { path: "m/49'/2'/1'", coin: 'btc', crossChain: true },
        //         { path: "m/49'/156'/1'", coin: 'btg' },
        //     ]
        // });

/*
function(sendMessage) {
    return new Promise(function(resolve, reject) {
        sendMessage('StellarSignTx', { 
            address_n: [2147483694, 2147483708, 2147483648],
            network_passphrase: 'Test SDF Network ; September 2015',
        })
        .then(function(response) {
            resolve(response);
        }).catch( function(error) {
            reject(error);
        });
    });
}

async (sendMessage) =>  {
  const resp = await sendMessage('StellarSignTx', { 
    address_n: [2147483694, 2147483708, 2147483648],
     network_passphrase: 'Test SDF Network ; September 2015',
  });

  return resp;
}

}
*/

        // const response = await TrezorConnect.stellarGetPublicKey({
        //     //...params,
        //     path: "m/46'/60'/0'",
        // });

        // const response = await TrezorConnect.stellarGetAddress({
        //     //...params,
        //     path: "m/46'/60'/4'",
        // });

        // const response = await TrezorConnect.nemGetAddress({
        //     //...params,
        //     path: "m/44'/43'/0'",
        //     network:  0x68 // 98, 60
        // });


        /*
        const response = await TrezorConnect.customMessage({
            customFunction: function(sendMessage) {
                return new Promise(function(resolve, reject) {
                    //sendMessage('StellarGetPublicKey', { address_n: [2147483694, 2147483708, 2147483648] })
                    // sendMessage('StellarGetPublicKey', { address_n: [44 | 0x80000000, 148 | 0x80000000, 0 | 0x80000000] })
                    // sendMessage('StellarGetPublicKey', { address_n: [44 , 148 , 0 ] })
                    //sendMessage('NEMGetAddress', { address_n: [2147483694, 2147483708, 2147483648], network: 0x68, show_display: true })
                    // sendMessage('NEMGetAddress', { address_n: [1, 0, 0], network: 0x68, show_display: true })

                    // protocol_version
                    // network_passphrase
                    // source_account
                    // sendMessage('StellarSignTx', { address_n: [2147483694, 2147483708, 2147483648] })
                    // .then(function(response) {

                    //     if (response && response.type === 'StellarTxOpRequest') {
                    //         sendMessage('StellarPaymentOp', {})
                    //         .then(function(rr) {
                    //             console.warn("RR", rr)

                    //             resolve(response);
                    //         })
                    //     }

                       
                    // }).catch( function(error) {
                    //     reject(error);
                    // });



                    sendMessage('StellarGetPublicKey', { address_n: [2147483694, 2147483708, 2147483648] })
                    .then(function(response) {
                        resolve(response);
                    }).catch( function(error) {
                        reject(error);
                    });
                });
            }
        });
        */

        dispatch( onResponse(response) );
    }
}