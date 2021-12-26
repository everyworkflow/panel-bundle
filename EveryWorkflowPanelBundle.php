<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\PanelBundle;

use EveryWorkflow\PanelBundle\DependencyInjection\PanelExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class EveryWorkflowPanelBundle extends Bundle
{
    public function getContainerExtension(): ?ExtensionInterface
    {
        return new PanelExtension();
    }
}
