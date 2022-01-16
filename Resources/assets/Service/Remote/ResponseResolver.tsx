/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import HttpError from "@EveryWorkflow/PanelBundle/Error/HttpError";
import ValidationError from '@EveryWorkflow/PanelBundle/Error/ValidationError';

const ResponseResolver = async (res: any, url: string): Promise<any> => {
    const statusCode = res.status;
    let response: any = {};

    try {
        response = await res.json();
        if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 2) {
            console.log('remote response data -> ' + url + ' - ' + statusCode, response);
        }
    } catch (error: any) {
        throw new HttpError('Remote could not resolve!');
    }

    switch (statusCode) {
        case 200: {
            return response;
        }
        case 400: {
            throw new ValidationError(response?.detail, statusCode, response?.errors);
        }
        default: {
            throw new HttpError(response?.detail, statusCode);
        }
    }
};

export default ResponseResolver;
