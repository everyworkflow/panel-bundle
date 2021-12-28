/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from './ResponseResolver';
import UrlHelper from "@EveryWorkflow/PanelBundle/Helper/UrlHelper";
import BuildHeader from "@EveryWorkflow/PanelBundle/Service/Remote/BuildHeader";
import RefreshAuthToken from '@EveryWorkflow/PanelBundle/Service/Remote/RefreshAuthToken';

const PostRequest = async (endPoint: string, data: any | Array<any>, options: any = {}): Promise<any> => {
    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        ...headers,
        ...options,
    };

    if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 0) {
        console.log('remote post -> ' + url, fetchOptions);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 1) {
        console.log('remote post response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return PostRequest(endPoint, data, options);
    }

    return ResponseResolver(res, url);
};

export default PostRequest;
