/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const UrlHelper = {
    buildUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://') &&
            process.env.API_BASE_URL && !url.startsWith(process.env.API_BASE_URL)) {
            url = process.env.API_BASE_URL + url;
        }
        return url;
    },

    buildApiUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            if (process.env.API_END_POINT_SWAP) {
                try {
                    const swapData: any = JSON.parse(process.env.API_END_POINT_SWAP);
                    const urlWithQuestionArr = url.split('?');
                    const urlArr = urlWithQuestionArr[0].split('/');
                    if (urlArr.length > 1 && swapData.hasOwnProperty('/' + urlArr[1]) && !url.startsWith(swapData['/' + urlArr[1]])) {
                        url = url.replace('/' + urlArr[1], swapData['/' + urlArr[1]]);
                    }
                } catch (error: any) {
                    // do nothing
                }
            }
            if (process.env.API_END_POINT && !url.startsWith(process.env.API_END_POINT)) {
                url = process.env.API_END_POINT + url;
            }
        }
        return UrlHelper.buildUrl(url);
    },

    buildImgUrlFromPath: (path: string | null | undefined): string => {
        if (path === null || path === undefined) {
            return '';
        }
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return process.env.MEDIA_BASE_URL + path;
    },
};

export default UrlHelper;
