<?php

declare(strict_types = 1);

namespace <%= config.namespace %><%= component %>;

use Ant\Setting\SettingFacade;
use Nette\Application\UI;

final class <%= component %> extends UI\Control
{

	/** @var SettingFacade */
	private $settingFacade;

	public function __construct(SettingFacade $settingFacade)
	{
		parent::__construct();
		$this->settingFacade = $settingFacade;
	}

	public function render(): void
	{
		$this->template->setFile(__DIR__ . '/<%= componentLower %>.latte');
		$this->template->render();
	}

}
