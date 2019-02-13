<?php

declare(strict_types = 1);

namespace <%= config.testNamespace %>;

// use Ant\Tests\SettingFacadeMock;
use <%= config.namespace %><%= component %>\I<%= component %>Factory;
use Ant\Setting\SettingFacade;
use Testbench\TCompiledContainer;
use Testbench\TComponent;
use Testbench\TransactionalTestCase;

require dirname(__DIR__) . '/../../bootstrap.php';

/**
 * @testCase
 */
final class <%= component %>Test extends TransactionalTestCase
{

	use TCompiledContainer;
	use TComponent;

	/** @var I<%= component %>Factory */
	private $factory;

//	/** @var SettingFacadeMock */
//	private $settingsMock;

	public function setUp(): void
	{
		parent::setUp();
		$this->factory = $this->getService(I<%= component %>Factory::class);
//		$this->settingsMock = $this->getService(SettingFacadeMock::class);
	}

	public function testRender(): void
	{
		// $this->settingsMock->set([['ENABLE_LOGO_SVG', TRUE]]);
		$component = $this->factory->create();
		$this->checkRenderOutput($component, '<div class="<%= name %>">%A%');
		// $this->settingsMock->reset();
	}
}

(new <%= component %>Test)->run();
