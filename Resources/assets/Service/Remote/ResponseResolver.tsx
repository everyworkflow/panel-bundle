/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const ResponseResolver = async (res: any, url: string): Promise<any> => {
    const statusCode = res.status;
    if (statusCode === 200) {
        try {
            res = await res.json();

            if (Number(process.env.REACT_DEBUG) && Number(process.env.REACT_REMOTE_DEBUG) > 2) {
                console.log('remote response data -> ' + url, res);
            }

            return res;
        } catch (error: any) {
            throw new Error('Remote could not resolve!');
        }
    } else if (statusCode === 404 || statusCode === 405) {
        throw new Error('Remote could not resolve!');
    } else if (statusCode === 400 || statusCode === 403 || statusCode === 500) {
        res = await res.json();
        throw new Error(res.detail);
    } else if (statusCode === 401) {
        res = await res.json();
        throw new Error(res.detail);
    } else {
        throw new Error('Something went wrong!');
    }

    return null;
};

export default ResponseResolver;
