<?php

    class  Deividnetwork_Invoiceprint_IndexController extends Mage_Core_Controller_Front_Action {
        public function indexAction() {
            echo 'not used...';
        }

        public function invoiceAction() {
            echo $this->getLayout()
                      ->createBlock('invoiceprint/invoice', 'deividnetwork.invoiceprint', array('template' => 'deividnetwork/invoiceprint/invoice.phtml'))
                      ->toHtml();
        }
    }