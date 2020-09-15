var dt;
$(document).ready(function() {

	if ($('#discount_datatable').length > 0) {
        discountDTUrl = base_url + "discount/list";
        discountDT = $('#discount_datatable').DataTable( $.extend( true, {}, {}, 
            commonDBOpt, {
            "ajax": {
                "url": discountDTUrl,
                "type": "POST",
                "data" : function ( d ) {
                    $('.discount_search').serializeArray().map(function(x){d[x.name] = x.value;});
                }
            }
        } ));
    }

    discountValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'discount[code]': {
                required: true
            },
        },
        messages: {
            'discount[code]': {
                required: "Please enter Discount Code",
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
    $("#discountFrm").validate(discountValidateOpt);

    $('body').on('click', '.submitDiscountCode', function() {
        chkDefaultRule();
        $("#discountFrm").submit();     
    });

    /*Delete user*/
    $("body").on("click", ".delete_discount", function() {
        var url_ = $(this).attr('data-url');
        handleConfirmBoxDelete(url_, discountDT, 'Are you sure you want to delete this discount code?');
    });

    $('body').on('click', '.discounttype', function() {
        if(("#discount-error").length){
            $("#discount-error").remove();
        }
        changediscounttype($(this).val());
        chkDefaultRule();
    });

    changediscounttype($('.discounttype:checked').val());

    $("body").on("keyup", ".textFilter", function() {
        /*console.log(this.value);*/
        discountDT.search(this.value).draw();
    });

});

function changediscounttype(val)
{
    if(val == '1'){
        $('.codeamt').removeClass("ele_hide");
        $('.codeperc').addClass("ele_hide");

    }else{
        $('.codeamt').addClass("ele_hide");
        $('.codeperc').removeClass("ele_hide");
    }
}

function chkDefaultRule(){
    if($('.codeamt').hasClass('ele_hide')){
        $('.codeamt').rules( "remove" );
        $('#discount_amt-error').remove();
        $('.codeperc').rules('add', {
            required: true,
            messages: {
                required: "Please enter Discount"
            }
        });
        
    }else{
        $('.codeperc').rules( "remove" );
        $('#discount_perc-error').remove();
        $('.codeamt').rules('add', {
            required: true,
            messages: {
                required: "Please enter Discount"
            }
        });
    }
}