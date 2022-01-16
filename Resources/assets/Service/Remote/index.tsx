/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import GetRequest from "@EveryWorkflow/PanelBundle/Service/Remote/GetRequest";
import PostRequest from "@EveryWorkflow/PanelBundle/Service/Remote/PostRequest";
import DeleteRequest from "@EveryWorkflow/PanelBundle/Service/Remote/DeleteRequest";

const Remote = {
    get: GetRequest,
    post: PostRequest,
    delete: DeleteRequest,
};

export default Remote;
