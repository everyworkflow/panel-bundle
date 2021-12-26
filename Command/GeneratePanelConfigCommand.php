<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\PanelBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Filesystem;

class GeneratePanelConfigCommand extends Command
{
    protected static $defaultName = 'generate-panel-config';

    protected string $projectDir;
    protected array $bundles;
    protected Filesystem $filesystem;

    public function __construct(
        string $projectDir,
        array $bundles,
        string $name = null
    ) {
        parent::__construct($name);
        $this->projectDir = $projectDir;
        $this->bundles = $bundles;
        $this->filesystem = new Filesystem();
    }

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setDescription('Generate react panel config');
    }

    /**
     * @return int
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $inputOutput = new SymfonyStyle($input, $output);

        $tsconfigData = [
            'compilerOptions' => [
                'baseUrl' => './',
            ]
        ];

        foreach ($this->bundles as $key => $val) {
            $reflectionClass = new \ReflectionClass($val);
            $filePath = $reflectionClass->getFileName();
            $filePathArr = explode('/', $filePath);
            array_pop($filePathArr);
            $filePathArr[] = 'Resources';
            $filePathArr[] = 'assets';
            $filePathArr[] = 'ewconfig.json';
            $tsconfigPath = implode('/', $filePathArr);

            if ($this->filesystem->exists($tsconfigPath)) {
                $fileContent = file_get_contents($tsconfigPath);
                $jsonContent = json_decode($fileContent, true);
                if (isset($jsonContent['name'])) {
                    array_pop($filePathArr);
                    $assetPathDir = implode('/', $filePathArr);
                    $assetPathDir = str_replace($this->projectDir . '/', '', $assetPathDir);
                    $tsconfigData['compilerOptions']['paths'][$jsonContent['name'] . '/*'] = [$assetPathDir . '/*'];
                    if (!isset($tsconfigData['include']) || !in_array($assetPathDir . '/*', $tsconfigData['include'])) {
                        $tsconfigData['include'][] = $assetPathDir . '/*';
                    }
                }
            }
        }

        $this->filesystem->dumpFile($this->projectDir . '/tsconfig.generated.json', json_encode($tsconfigData, JSON_PRETTY_PRINT));

        $inputOutput->text('Generated: tsconfig.generated.json');

        return Command::SUCCESS;
    }
}
