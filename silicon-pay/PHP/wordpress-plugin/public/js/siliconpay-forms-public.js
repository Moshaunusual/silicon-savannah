function StartSiliconPay() {
  this.DEFAULT_PERCENTAGE = 0.04;
  this.DEFAULT_ADDITIONAL_CHARGE = 0;
  this.DEFAULT_THRESHOLD = 0;
  this.DEFAULT_CAP = 0;

  this.__initialize = function () {
    this.percentage = this.DEFAULT_PERCENTAGE;
    this.additional_charge = this.DEFAULT_ADDITIONAL_CHARGE;
    this.threshold = this.DEFAULT_THRESHOLD;
    this.cap = this.DEFAULT_CAP;

    if (window && window.SPG_SILICONPAY_CHARGE_SETTINGS) {
      this.percentage = window.SPG_SILICONPAY_CHARGE_SETTINGS.percentage;
      this.additional_charge =
        window.SPG_SILICONPAY_CHARGE_SETTINGS.additional_charge;
      this.threshold = window.SPG_SILICONPAY_CHARGE_SETTINGS.threshold;
      this.cap = window.SPG_SILICONPAY_CHARGE_SETTINGS.cap;
    }
  };

  this.chargeDivider = 0;
  this.crossover = 0;
  this.flatlinePlusCharge = 0;
  this.flatline = 0;

  this.withPercentage = function (percentage) {
    this.percentage = percentage;
    this.__setup();
  };

  this.withAdditionalCharge = function (additional_charge) {
    this.additional_charge = additional_charge;
    this.__setup();
  };

  this.withThreshold = function (threshold) {
    this.threshold = threshold;
    this.__setup();
  };

  this.withCap = function (cap) {
    this.cap = cap;
    this.__setup();
  };

  this.__setup = function () {
    this.__initialize();
    this.chargeDivider = this.__chargeDivider();
    this.crossover = this.__crossover();
    this.flatlinePlusCharge = this.__flatlinePlusCharge();
    this.flatline = this.__flatline();
  };

  this.__chargeDivider = function () {
    return 1 - this.percentage;
  };

  this.__crossover = function () {
    return this.threshold * this.chargeDivider - this.additional_charge;
  };

  this.__flatlinePlusCharge = function () {
    return (this.cap - this.additional_charge) / this.percentage;
  };

  this.__flatline = function () {
    return this.flatlinePlusCharge - this.cap;
  };

  this.addFor = function (amountpayable) {
    if (amountpayable > this.flatline) {
      return parseInt(Math.round(amountpayable + this.cap));
    } else if (amountpayable > this.crossover) {
      return parseInt(
        Math.round(
          (amountpayable + this.additional_charge) / this.chargeDivider
        )
      );
    } else {
      return parseInt(Math.round(amountpayable / this.chargeDivider));
    }
  };

  this.randomId = function () {
    for (
      var t = "",
        e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        n = 0;
      n < 25;
      n++
    )
      t += e.charAt(Math.floor(Math.random() * e.length));
    return t;
  };

  this.__setup = function () {
    this.chargeDivider = this.__chargeDivider();
    this.crossover = this.__crossover();
    this.flatlinePlusCharge = this.__flatlinePlusCharge();
    this.flatline = this.__flatline();
  };

  this.__setup();
}

(function ($) {
  "use strict";
  $(document).ready(function ($) {
    $(function () {
      $(".date-picker").datepicker({
        dateFormat: "mm/dd/yy",
        prevText: '<i class="fa fa-caret-left"></i>',
        nextText: '<i class="fa fa-caret-right"></i>',
      });
    });
    if ($("#pf-vamount").length) {
      var amountField = $("#pf-vamount");
      calculateTotal();
    } else {
      var amountField = $("#pf-amount");
    }
    var max = 10;
    amountField.keydown(function (e) {
      format_validate(max, e);
    });

    amountField.keyup(function (e) {
      checkMinimumVal();
    });

    function checkMinimumVal() {
      if ($("#pf-minimum-hidden").length) {
        var min_amount = Number($("#pf-minimum-hidden").val());
        var amt = Number($("#pf-amount").val());
        if (min_amount > 0 && amt < min_amount) {
          $("#pf-min-val-warn").text(
            "Amount cannot be less than the minimum amount"
          );
          return false;
        } else {
          $("#pf-min-val-warn").text("");
          $("#pf-amount").removeClass("rerror");
        }
      }
    }

    function format_validate(max, e) {
      var value = amountField.text();
      if (e.which != 8 && value.length > max) {
        e.preventDefault();
      }
      // Allow: backspace, delete, tab, escape, enter and .
      if (
        $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        calculateFees();
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      } else {
        calculateFees();
      }
    }

    $.fn.digits = function () {
      return this.each(function () {
        $(this).text(
          $(this)
            .text()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
      });
    };

    function calculateTotal() {
      var unit;
      if ($("#pf-vamount").length) {
        unit = $("#siliconpay-form").find("#pf-vamount").val();
      } else {
        unit = $("#pf-amount").val();
      }
      var quant = $("#pf-quantity").val();
      var newvalue = unit * quant;

      if (quant == "" || quant == null) {
        quant = 1;
      } else {
        $("#pf-total").val(newvalue);
      }
    }
    function calculateFees(transaction_amount) {
      setTimeout(function () {
        transaction_amount = transaction_amount || parseInt(amountField.val());
        var currency = $("#pf-currency").val();
        var quant = $("#pf-quantity").val();
        if ($("#pf-vamount").length) {
          var name = $("#pf-vamount option:selected").attr("data-name");
          $("#pf-vname").val(name);
        }
        if (
          transaction_amount == "" ||
          transaction_amount == 0 ||
          transaction_amount.length == 0 ||
          transaction_amount == null ||
          isNaN(transaction_amount)
        ) {
          var total = 0;
          var fees = 0;
        } else {
          var obj = new StartSiliconPay();

          obj.withAdditionalCharge(spg_settings.fee.adc);
          obj.withThreshold(spg_settings.fee.ths);
          obj.withCap(spg_settings.fee.cap);
          obj.withPercentage(spg_settings.fee.prc);
          if (quant) {
            transaction_amount = transaction_amount * quant;
          }
          var total = obj.addFor(transaction_amount);
          var fees = total - transaction_amount;
        }
        $(".pf-txncharge")
          .hide()
          .html(currency + " " + fees.toFixed(2))
          .show()
          .digits();
        $(".pf-txntotal")
          .hide()
          .html(currency + " " + total.toFixed(2))
          .show()
          .digits();
      }, 100);
    }

    calculateFees();

    $(".pf-number").keydown(function (event) {
      if (
        event.keyCode == 46 ||
        event.keyCode == 8 ||
        event.keyCode == 9 ||
        event.keyCode == 27 ||
        event.keyCode == 13 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode >= 35 && event.keyCode <= 39)
      ) {
        return;
      } else {
        if (
          event.shiftKey ||
          ((event.keyCode < 48 || event.keyCode > 57) &&
            (event.keyCode < 96 || event.keyCode > 105))
        ) {
          event.preventDefault();
        }
      }
    });
    if ($("#pf-quantity").length) {
      calculateTotal();
    }

    $("#pf-quantity, #pf-vamount, #pf-amount").on("change", function () {
      calculateTotal();
      calculateFees();
    });

    function showSiliconPayModal(params) {
      console.log("params", params);
      // Get the modal
      var modal = document.getElementById("SPModal");

      // Get the button that opens the modal
      const btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      const span = document.getElementsByClassName("close")[0];

      $("#silicon-pay-main-text").text(params.title);
      
      $("#silicon-pay-main-text-2").text(params.message);

      // When the user clicks the button, open the modal

      modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }

    /**
     * @function validateEmail
     * @param {*} email
     * @returns
     */
    function validateEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    /**
     * @function validatePhone
     * @param {*} number
     * @returns
     */

    function validatePhone(number) {
      let new_number = "";
      if (number === "") {
        return false;
      } else if (number.startsWith("+")) {
        new_number = number.replace(number[0], "");
      } else if (number.startsWith("0")) {
        new_number = number.replace(number[0], "256");
      } else {
        new_number = number;
      }
      return new_number;
    }

    function randomId(number) {
      for (
        var t = "",
          e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          n = 0;
        n < number;
        n++
      )
        t += e.charAt(Math.floor(Math.random() * e.length));
      return t;
    }

    $(".siliconpay-form").on("submit", function (e) {
      var requiredFieldIsInvalid = false;
      e.preventDefault();

      $("#pf-agreementicon").removeClass("rerror");

      $(this)
        .find("input, select, textarea")
        .each(function () {
          $(this).removeClass("rerror"); //.css({ "border-color":"#d1d1d1" });
        });
      var email = $(this).find("#pf-email").val();
      var phone = $(this).find("#pf-phone").val();
      var payment = $(this).find("#pf-method option:selected").val();
      var amount;
      if ($("#pf-vamount").length) {
        amount = $("#siliconpay-form").find("#pf-vamount").val();
        calculateTotal();
      } else {
        amount = $(this).find("#pf-amount").val();
      }
      if (Number(amount) > 0) {
      } else {
        $(this).find("#pf-amount,#pf-vamount").addClass("rerror"); //  css({ "border-color":"red" });
        $("html,body").animate(
          { scrollTop: $(".rerror").offset().top - 110 },
          500
        );
        return false;
      }

      if (!validateEmail(email)) {
        $(this).find("#pf-email").addClass("rerror");
        $("html,body").animate(
          { scrollTop: $(".rerror").offset().top - 110 },
          500
        );
        return false;
      }

      // if (!validatePhone(phone)) {
      //   $(this).find("#pf-phone").addClass("rerror");
      //   $("html,body").animate(
      //     { scrollTop: $(".rerror").offset().top - 110 },
      //     500
      //   );
      //   return false;
      // }

      if (checkMinimumVal() == false) {
        $(this).find("#pf-amount").addClass("rerror");
        $("html,body").animate(
          { scrollTop: $(".rerror").offset().top - 110 },
          500
        );
        return false;
      }

      $(this)
        .find("input, select, text, textarea")
        .filter("[required]")
        .filter(function () {
          return this.value === "";
        })
        .each(function () {
          $(this).addClass("rerror");
          requiredFieldIsInvalid = true;
        });

      if ($("#pf-agreement").length && !$("#pf-agreement").is(":checked")) {
        $("#pf-agreementicon").addClass("rerror");
        requiredFieldIsInvalid = true;
      }

      if (requiredFieldIsInvalid) {
        $("html,body").animate(
          { scrollTop: $(".rerror").offset().top - 110 },
          500
        );
        return false;
      }

      var self = $(this);
      var $form = $(this);

      $.blockUI({ message: "Please wait..." });
      var formdata = new FormData(this);
      $.ajax({
        url: $form.attr("action"),
        type: "POST",
        data: formdata,
        mimeTypes: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
          $.unblockUI();
          data.custom_fields.push({
            display_name: "Plugin",
            variable_name: "plugin",
            value: "spg-siliconpay",
          });

           // console.log("firstName+ - ", data);

          if (data.result == "success") {
            var names = data.name.split(" ");
            var firstName = names[0] || "";
            var lastName = names[1] || "";
            var quantity = data.quantity;
            var method = data.method;
            var currency = data.currency;
            var phone = data.phone;
            var email = data.email;
            var txt_code = data.code;
            var customer_code = randomId(10);
            var reference = randomId(25);
            var amount = data.total;

            if (currency == "UGX") {
              phone = validatePhone(phone);
            }

            if (currency == "USD" || payment == "Credit/Debit Card") {
              method = "card_payment";
            } else {
              method = "mobile_money";
            }

            const settings = {
              url: "https://silicon-pay.com/process_payments",
              method: "POST",
              timeout: 0,
              crossDomain: true,
              data: JSON.stringify({
                req: method,
                currency: currency,
                encryption_key: spg_settings.key,
                amount: amount,
                emailAddress: email,
                phone: phone,
              }),
            };

            $.ajax(settings).done(function (response) {
              // console.log("response", response, response.code);

              $.blockUI({ message: "Please wait..." });
              $.post(
                $form.attr("action"),
                {
                  action: "spg_wp_siliconpay_confirm_payment",
                  code: txt_code,
                  status_code: response.code ? response.code : 201,
                  status: response.status,
                  customer_code: customer_code,
                  reference: response.txRef,
                  amount: amount,
                  quantity: quantity,
                  payment_link: response.link ? response.link : "null",
                  title: response.message ? response.message : "Unknown Error!",
                },
                function (newdata) {
                  data = JSON.parse(newdata);

                  // console.log("newdata", data);

                  if (data.result == "success2") {
                    window.location.href = data.link;
                  }
                  if (data.result == "success") {
                    $(".siliconpay-form")[0].reset();
                    $("html,body").animate(
                      {
                        scrollTop: $(".siliconpay-form").offset().top - 110,
                      },
                      500
                    );

                    self.before(
                      '<div class="alert-success">' + data.message + "</div>"
                    );

                    $(this)
                      .find("input, select, textarea")
                      .each(function () {
                        $(this).css({
                          "border-color": "#d1d1d1",
                          "background-color": "#fff",
                        });
                      });
                    $(".pf-txncharge").hide().html("UGX0").show().digits();
                    $(".pf-txntotal").hide().html("UGX0").show().digits();
                    showSiliconPayModal({
                      title: data.title,
                      message: data.message,
                    });
                    $.unblockUI();
                    setTimeout(() => {
                      if (data.payment_link !== null) {
                        window.location.href = data.payment_link;
                      }
                    }, 10000);
                  } else {
                    self.before(
                      '<div class="alert-danger">' + data.message + "</div>"
                    );
                    showSiliconPayModal({
                      title: data.title,
                      message: data.message,
                    });
                    $.unblockUI();
                  }
                }
              );
            });
          } else {
            alert(data.message);
          }
        },
      });
    });
  });
})(jQuery);
