function InvoiceprintOrderView(element) {
    this.constructor(element);
    this.init();
}

InvoiceprintOrderView.prototype.constructor = function (element) {
    this.element = jQuery(element);
};

InvoiceprintOrderView.prototype.init = function () {
    this.removeOtherButton();
    this.createButton();
    this.toPrint();
};

InvoiceprintOrderView.prototype.removeOtherButton = function () {
    jQuery('button[title="Imprimir"]').remove();
};

InvoiceprintOrderView.prototype.createButton = function () {
    this.element.find('p.form-buttons').append('<button id="printorder-view" type="submit" class="scalable task"><span>Imprimir NF</span></button>');
};

InvoiceprintOrderView.prototype.toPrint = function () {
    var self = this;

    this.element.find('#printorder-view').bind('click', function () {
        window.open('/invoiceprint/index/invoice/id/' + self.getId(), '_blank');
    });
};

InvoiceprintOrderView.prototype.getId = function () {
    var id = jQuery('.head-sales-order').text().split(' ')[2];

    return parseInt(id);
};

setTimeout(function () {
    new InvoiceprintOrderView('.content-header');
}, 200);