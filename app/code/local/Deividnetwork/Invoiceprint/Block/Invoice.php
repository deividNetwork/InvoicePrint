<?php

    class Deividnetwork_Invoiceprint_Block_Invoice extends Mage_Core_Block_Template {
        public function __construct(array $args) {
            parent::__construct();
            $this->setTemplate('deividnetwork/invoiceprint/invoice.phtml');
        }

        public function getOrders() {
            $data = array();

            $id_orders = Mage::app()->getRequest()->getParam('id');

            foreach(explode('-', $id_orders) as $id_order) {
                $order = Mage::getModel('sales/order')->loadByIncrementId($id_order);

                if($order->getRealOrderId()) {
                    $data[$id_order]['id'] = $order->getRealOrderId();

                    $data[$id_order]['emission_date'] = date('d/m/Y');
                    $data[$id_order]['emission_hour'] = date('H:i:s');

                    $data[$id_order]['customer_name'] = $order->getCustomerName();
                    $data[$id_order]['customer_email'] = $order->getCustomerEmail();
                    $data[$id_order]['customer_taxvat'] = $order->getCustomerTaxvat() ? $order->getCustomerTaxvat() : '000-000-000-00';
                    $data[$id_order]['customer_fax'] = $order->getBillingAddress()->getFax();
                    $data[$id_order]['customer_telephone'] = $order->getBillingAddress()->getTelephone();
                    $data[$id_order]['customer_postcode'] = $order->getBillingAddress()->getPostcode();
                    $data[$id_order]['customer_country'] = $order->getBillingAddress()->getCountry();
                    $data[$id_order]['customer_city'] = $order->getBillingAddress()->getCity();

                    $data[$id_order]['shipping_method'] = $order->getShippingDescription();
                    $data[$id_order]['shipping_method_price'] = $order->formatPriceTxt($order->getShippingInclTax());
                    $data[$id_order]['payment_method'] = $order->getPayment()->getMethodInstance()->getTitle();
                    $data[$id_order]['discount_amount'] = $order->formatPriceTxt($order->getDiscountAmount());
                    $data[$id_order]['subtotal'] = $order->formatPriceTxt($order->getSubtotal());
                    $data[$id_order]['total'] = $order->formatPriceTxt($order->getGrandTotal());

                    $data[$id_order]['customer_street'] = null;
                    $street = $order->getBillingAddress()->getStreet();

                    for($count = count($street), $i = 0; $i < $count; $i++) {
                        $isLast = ($count - 1) == $i ? true : false;

                        if (!$isLast) {
                            $data[$id_order]['customer_street'] .= $street[$i] . ' ';
                        }
                        else {
                            $data[$id_order]['customer_street'] .= $street[$i];
                        }
                    }

                    $data[$id_order]['products'] = array();

                    foreach($order->getAllVisibleItems() as $item) {
                        $data[$id_order]['products'][$item->getSku()]['qtd'] = number_format($item->getQtyOrdered(), 0);
                        $data[$id_order]['products'][$item->getSku()]['name'] = $item->getName();
                        $data[$id_order]['products'][$item->getSku()]['sku'] = $item->getSku();
                        $data[$id_order]['products'][$item->getSku()]['desc'] =  $item->getDescription();
                        $data[$id_order]['products'][$item->getSku()]['price'] = $order->formatPriceTxt($item->getPrice());
                        $data[$id_order]['products'][$item->getSku()]['price_total'] = $order->formatPriceTxt($item->getRowTotal());
                    }
                }
            }

            return $data;
        }

        public function getAssetsUrl($path) {
            return $this->getSkinUrl('deividnetwork/invoiceprint/' . $path);
        }

        public function getExample() {
            return 'I am block method :)';
        }
    }
