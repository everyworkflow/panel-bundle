/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import ButtonInterface from "@EveryWorkflow/PanelBundle/Model/ButtonInterface";
import Button from 'antd/lib/button';
import StyleHelper from '@EveryWorkflow/PanelBundle/Helper/StyleHelper';
import { NavLink } from 'react-router-dom';

interface ButtonComponentProps {
    buttonData: ButtonInterface;
}

const ButtonComponent = ({ buttonData }: ButtonComponentProps) => {
    return (
        <Button
            className={buttonData.class_name}
            type={buttonData.button_type}
            size={buttonData.button_size}
            shape={buttonData.button_shape}
            ghost={buttonData.is_ghost}
            danger={buttonData.is_danger}
            block={buttonData.is_block}
            style={StyleHelper.remoteStyleParse(buttonData.style)}
            onClick={buttonData.onClick}>
            {buttonData.button_path ? (
                <NavLink to={buttonData.button_path} target={buttonData.button_target}>{buttonData.button_label}</NavLink>
            ) : buttonData.button_label}
        </Button>
    );
}

export default ButtonComponent;
