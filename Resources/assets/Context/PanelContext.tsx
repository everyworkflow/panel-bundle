/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import PanelStateInterface from '@EveryWorkflow/PanelBundle/Model/PanelStateInterface';
import { panelState } from "@EveryWorkflow/PanelBundle/State/PanelState";

export interface PanelContextInterface {
    state: PanelStateInterface;
    dispatch: any;
}

const PanelContext = createContext<PanelContextInterface>({
    state: panelState,
    dispatch: () => null,
});

export default PanelContext;
