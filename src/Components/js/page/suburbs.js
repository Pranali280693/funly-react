var dt;
$(document).ready(function() {

	if ($('#suburbs_datatable').length > 0) {
        suburbDTUrl = base_url + "suburbs/list";
        suburbDT = $('#suburbs_datatable').DataTable( $.extend( true, {}, {}, 
            commonDBOpt, {
            "ajax": {
                "url": suburbDTUrl,
                "type": "POST",
                "data" : function ( d ) {
                    $('.suburbs_search').serializeArray().map(function(x){d[x.name] = x.value;});
                }
            }
        } ));
    }

    suburbValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'suburb[postcode]': {
                required: true
            },
            'suburb[locality]': {
                required: true
            },
        },
        messages: {
            'suburb[postcode]': {
                required: "Please enter Postcode",
            },
            'suburb[locality]': {
                required: "Please enter Locality",
            },
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            if (element.is("select")) {
                error.insertAfter(element.next('span'));
            } else if (element.attr("type") == 'file') {
                element.parent().next('.fileerror').html(error.text());
            }else {
              error.insertAfter(element);
            }
        }
    };

importValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'suburb_csv': {
                required: true,
                accept: 'text/csv'
            },
        },
        messages: {
            'suburb_csv': {
                required: "Please select File",
                accept: "Please select valid extension: csv"
            },
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            if (element.is("select")) {
                error.insertAfter(element.next('span'));
            } else if (element.attr("type") == 'file') {
                error.insertAfter(element.parent("div"));
            }else {
              error.insertAfter(element);
            }
        }
    };

    $("#suburbFrm").validate(suburbValidateOpt);
    $("#csvForm").validate(importValidateOpt);

    /*Delete user*/
    $("body").on("click", ".delete_suburb", function() {
        var url_ = $(this).attr('data-url');
        var confirm_url = $(this).attr('data-confirm-url');
        handleConfirmBoxDeleteWithDBCheck(url_, suburbDT, 'Are you sure you want to delete this suburb?',confirm_url);
    });

    $("body").on("keyup", ".textFilter", function() {
        /*console.log(this.value);*/
        suburbDT.search(this.value).draw();
    });

});