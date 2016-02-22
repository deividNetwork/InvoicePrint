function InvoiceprintOrder(select) {
    'use-strict';

    this.element = select;

    this.init();
}

InvoiceprintOrder.prototype.init = function () {
    this.createButton();
    this.toPrint();
};

InvoiceprintOrder.prototype.toPrint = function () {
    var self = this;

    jQuery('#printorder').click(function (e) {
        if (self.checked()) {
            window.open('http://' + location.hostname + '/invoiceprint/index/invoice/id/' + self.getId(), '_blank');
        }
        else {
            e.preventDefault();

            window.alert('Selecione um pedido!');
        }
    });
};

InvoiceprintOrder.prototype.getId = function () {
    var self = this;
    var id = '';

    jQuery(self.element).each(function () {
        var last = jQuery(self.element).last();

        if (jQuery(this).val() == last.val()) {
            id += jQuery(this).parents('tr').find('td:eq(1)').text().replace(/\s/g, '');
        }
        else {
            id += jQuery(this).parents('tr').find('td:eq(1)').text().replace(/\s/g, '') + '-';
        }
    });

    return id;
};

InvoiceprintOrder.prototype.checked = function () {
    if (this.getId() != undefined && this.getId() != '') {
        return true;
    }
    else {
        return false;
    }
};

InvoiceprintOrder.prototype.createButton = function () {
    jQuery('.filter-actions.a-right').append('<button id="printorder" type="submit" class="scalable task"><span>Imprimir</span></button>');
};

setTimeout(function () {
    new InvoiceprintOrder('#sales_order_grid_table tbody td input[name="order_ids"]:checked');
}, 100);