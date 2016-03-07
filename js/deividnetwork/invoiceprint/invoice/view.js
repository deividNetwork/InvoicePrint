function InvoiceprintInvoiceView(element) {
    this.constructor(element);
    this.init();
}

InvoiceprintInvoiceView.prototype.constructor = function (element) {
    this.element = jQuery(element);
};

InvoiceprintInvoiceView.prototype.init = function () {
    this.removeOtherButton();
    this.createButton();
    this.toPrint();
};

InvoiceprintInvoiceView.prototype.removeOtherButton = function() {
    jQuery('button[title="Imprimir"]').remove();
};

InvoiceprintInvoiceView.prototype.createButton = function () {
    this.element.find('p.form-buttons').append('<button id="printorder-view" type="submit" class="scalable task"><span>Imprimir NF</span></button>');
};

InvoiceprintInvoiceView.prototype.toPrint = function () {
    var self = this;

    this.element.find('#printorder-view').bind('click', function () {
        window.open('/invoiceprint/index/invoice/id/' + self.getId(), '_blank');
    });
};

InvoiceprintInvoiceView.prototype.getId = function () {
    var id = this.element.next().find('.entry-edit-head a').text().split(' ')[2];

    return parseInt(id);
};

setTimeout(function () {
    new InvoiceprintInvoiceView('.content-header');
}, 200);