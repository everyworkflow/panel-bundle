/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from "@EveryWorkflow/PanelBundle/Service/Remote/ResponseResolver";
import UrlHelper from "@EveryWorkflow/PanelBundle/Helper/UrlHelper";
import BuildHeader from "@EveryWorkflow/PanelBundle/Service/Remote/BuildHeader";
import RefreshAuthToken from "@EveryWorkflow/PanelBundle/Service/Remote/RefreshAuthToken";

const GetRequest = async (endPoint: string, options: any = {}): Promise<any> => {
    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'get',
        ...headers,
        ...options
    };

    if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 0) {
        console.log('remote get -> ' + url);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 1) {
        console.log('remote get response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return GetRequest(endPoint, options);
    }

    return ResponseResolver(res, url);
};

export default GetRequest;
