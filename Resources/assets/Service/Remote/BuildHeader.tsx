/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import LocalStorage from "@EveryWorkflow/PanelBundle/Service/LocalStorage";

const BuildHeader = async (headers: any = {}, config: any = {}): Promise<any> => {
    const returnHeaders: any = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (!config?.no_auth) {
        try {
            const authData: any = LocalStorage.get('ew_auth');
            if (authData.token) {
                returnHeaders['Authorization'] = 'Bearer ' + authData.token;
            }
        } catch (error: any) { }
    }

    return {
        headers: {
            ...returnHeaders,
            ...headers
        },
    };
};

export default BuildHeader;
