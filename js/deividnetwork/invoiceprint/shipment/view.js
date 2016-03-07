function InvoiceprintShipmentView(element) {
    this.constructor(element);
    this.init();
}

InvoiceprintShipmentView.prototype.constructor = function (element) {
    this.element = jQuery(element);
};

InvoiceprintShipmentView.prototype.init = function () {
    this.removeOtherButton();
    this.createButton();
    this.toPrint();
};

InvoiceprintShipmentView.prototype.removeOtherButton = function () {
    jQuery('button[title="Imprimir"]').remove();
};

InvoiceprintShipmentView.prototype.createButton = function () {
    this.element.find('p.form-buttons').append('<button id="printorder-view" type="submit" class="scalable task"><span>Imprimir NF</span></button>');
};

InvoiceprintShipmentView.prototype.toPrint = function () {
    var self = this;

    this.element.find('#printorder-view').bind('click', function () {
        window.open('/invoiceprint/index/invoice/id/' + self.getId(), '_blank');
    });
};

InvoiceprintShipmentView.prototype.getId = function () {
    var id = this.element.next().find('.entry-edit-head a').text().split(' ')[2];

    return parseInt(id);
};

setTimeout(function () {
    new InvoiceprintShipmentView('.content-header');
}, 200);