<?php

namespace MISPay\MISPayMethodDynamicCallback\Block\Catalog;

use MISPay\MISPayMethodDynamicCallback\Helper\MISPayHelper;
use Magento\Framework\View\Element\Template;

/**
 * Class Payment
 *
 * @package MISPay\MISPayMethodDynamicCallback\Block\Catalog\MISPayWidgetBlock
 */
class MISPayWidgetBlock extends Template
{
    protected $mispayHelper;

    protected $catalogHelper;

    public function __construct(
        Template\Context $context,
        \Magento\Catalog\Helper\Data $catalogHelper,
        MISPayHelper $mispayHelper,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->mispayHelper = $mispayHelper;
        $this->catalogHelper = $catalogHelper;
    }

    protected function _toHtml()
    {
        return parent::_toHtml();
    }

    public function isWidgetEnabled()
    {
        return $this->mispayHelper->isWidgetEnabled();
    }

    public function getLang()
    {
        return $this->mispayHelper->getLang();
    }

    /**
     * Returns prices
     *
     * @return float
     */
    public function getPrice()
    {
        $product = $this->catalogHelper->getProduct();
        return $product->getPriceInfo()->getPrice('final_price')->getAmount()->getValue();
    }

    public function isVisible()
    {
        return $this->mispayHelper->isWidgetEnabled()
            && $this->getPrice() >= $this->mispayHelper->getMinWidgetAmountLimit()
            && $this->getPrice() <= $this->mispayHelper->getMaxWidgetAmountLimit();
    }
}
