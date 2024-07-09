define([
  "Magento_Checkout/js/view/payment/default",
  "Magento_Checkout/js/model/quote",
  "mage/url",
  "knockout",
], function (Component, quote, url, ko) {
  "use strict";
  return Component.extend({
    defaults: {
      template:
        "MISPay_MISPayMethodDynamicCallback/payment/mispaymethod_dynamic_callback",
    },
    initialize: function () {
      this._super();
      this.grandTotal = this.getGrandTotal();

      quote.totals.subscribe(
        function (totals) {
          this.grandTotal = this.getGrandTotal();
          this.checkVisibility();
        }.bind(this)
      );

      this.checkVisibility();
    },
    isVisible: ko.observable(true),
    getTitle: function () {
      return window.checkoutConfig.payment.mispaymethod_dynamic_callback.title;
    },
    getDescription: function () {
      return window.checkoutConfig.payment.mispaymethod_dynamic_callback
        .description;
    },
    getPaymentAcceptanceMarkSrc: function () {
      return window.checkoutConfig.payment.mispaymethod_dynamic_callback
        .logo_url;
    },
    isLogoVisible: function () {
      return window.checkoutConfig.payment.mispaymethod_dynamic_callback
        .logo_visible;
    },
    afterPlaceOrder: function () {
      window.location.replace(url.build("mispay/redirect/"));
    },
    getMailingAddress: function () {
      return window.checkoutConfig.payment.checkmo.mailingAddress;
    },
    getGrandTotal: function () {
      var totals = quote.totals();
      return totals ? totals["base_grand_total"] || totals["grand_total"] : 0;
    },
    checkVisibility: function () {
      var minTotal =
        parseFloat(
          window.checkoutConfig.payment.mispaymethod_dynamic_callback
            .min_order_total
        ) || 0;
      var maxTotal =
        parseFloat(
          window.checkoutConfig.payment.mispaymethod_dynamic_callback
            .max_order_total
        ) || Infinity;

      this.isVisible(
        this.grandTotal >= minTotal && this.grandTotal <= maxTotal
      );
    },
  });
});
