/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useReducer } from 'react';
import { panelState } from "@EveryWorkflow/PanelBundle/State/PanelState";
import PanelReducer from "@EveryWorkflow/PanelBundle/Reducer/PanelReducer";
import PanelContext from '@EveryWorkflow/PanelBundle/Context/PanelContext';

interface RootPanelComponentProps {
    children?: JSX.Element | JSX.Element[];
}

const RootPanelComponent = ({ children }: RootPanelComponentProps) => {
    const [state, dispatch] = useReducer(PanelReducer, panelState);

    return (
        <PanelContext.Provider value={{ state, dispatch }}>
            {children}
        </PanelContext.Provider>
    );
};

export default RootPanelComponent;
