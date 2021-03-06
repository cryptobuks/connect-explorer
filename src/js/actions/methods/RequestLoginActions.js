/* @flow */
'use strict';

import TrezorConnect from 'trezor-connect';
import { onResponse } from './CommonActions';

const PREFIX: string = 'login';
export const HIDDEN_CHANGE: string = `${PREFIX}_hidden_@change`;
export const VISUAL_CHANGE: string = `${PREFIX}_visual_@change`;
export const CALLBACK_CHANGE: string = `${PREFIX}_callback_@change`;

export function onHiddenChange(hidden: string): any {
    return {
        type: HIDDEN_CHANGE,
        hidden
    }
}

export function onVisualChange(visual: string): any {
    return {
        type: VISUAL_CHANGE,
        visual
    }
}

export function onCallbackChange(callback: string): any {
    return {
        type: CALLBACK_CHANGE,
        callback
    }
}

export function onLogin(): any {
    return async function (dispatch, getState) {
        const params = { ...getState().common.params };

        if (params.callback) {
            const handler = eval('(' + params.callback + ');');
            if (typeof handler !== 'function') {
                dispatch( onResponse({
                    error: 'Invalid handler function'
                }) );
                return;
            }
            params.callback = handler;
        }

        const response = await TrezorConnect.requestLogin(params);
        // const response1 = await TrezorConnect.requestLogin({
        //     challengeHidden: "a",
        //     challengeVisible: "b",
        // });

        // const response = await TrezorConnect.requestLogin({
        //     callback: (): Promise<any> => { throw new Error() },
        // });

        dispatch( onResponse(response) );
    }
}