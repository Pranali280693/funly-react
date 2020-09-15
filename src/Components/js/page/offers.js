var dt,offerDT, offerDTUrl,offerValidateOpt;
$(document).ready(function() {
    if ($('.date_picker').length > 0) {

        // $(".date_picker").datepicker({
        //     // format: 'dd/mm/yyyy',
        //     // format: 'dd/mm/yy',
        //     todayHighlight:'TRUE',
        //     autoclose: true,
        //     startDate:new Date(),
        //     locale: {
        //         format: 'DD/MM/YYYY',
        //         // cancelLabel: 'Clear'
        //     }
        // });

        $('.date_picker').daterangepicker({
            startDate : $('[name="offer[expiry_date]"]').val()!=''?$('[name="offer[expiry_date]"]').val():moment(),
            singleDatePicker: true,
            minDate : moment(),
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Clear'
            }
        }, function(start, end, label) {
            $(this).val(start.format('DD/MM/YYYY'));
        });
    }
    if ($('.startdate_picker').length > 0) {
        $('.startdate_picker').daterangepicker({
            startDate : $('[name="offer[start_date]"]').val()!=''?$('[name="offer[start_date]"]').val():moment(),
            singleDatePicker: true,
            minDate : moment(),
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Clear'
            }
        }, function(start, end, label) {
            $(this).val(start.format('DD/MM/YYYY'));
        }).on('apply.daterangepicker', function(ev, picker) {
            var date1 = moment($(this).val(), "DD/MM/YYYY");
            var date2 = moment($('.date_picker').val(), "DD/MM/YYYY");
            if(date1 > date2){
                $('.date_picker').data('daterangepicker').setStartDate(moment(picker.startDate));
            }
            $('.date_picker').data('daterangepicker').minDate = moment(picker.startDate);
        });;
    }


    if ($('#offers_datatable').length > 0) {
        offerDTUrl = base_url + "offers/list";
        offerDT = $('#offers_datatable').DataTable( $.extend( true, {}, {}, 

            commonDBOpt, {
                "autoWidth": false,
                "ajax": {
                    "url": offerDTUrl,
                    "type": "POST",
                    "data" : function ( d ) {
                        $('.offers_search').serializeArray().map(function(x){d[x.name] = x.value;});
                    }
                },
                columnDefs: [{
                    searchable: false,
                // orderable: false, targets: 4,
                targets: ['no-sort']
            },

            // {
            //     visible: false,
            //     targets: ['no-visible']
            // }
            ],
            // "columns": [
            // { "width": "40%" },
            // { "width": "10%" },
            // { "width": "10%" },
            // { "width": "20%" },
            // ]
        } ));
    }

    if ($('#redeemed_offers_datatable').length > 0) {
        offerDTUrl = base_url + "offers/getRedeemedOffers";
        offerDT = $('#redeemed_offers_datatable').DataTable( $.extend( true, {}, {}, 
            commonDBOpt, {
                "ajax": {
                    "url": offerDTUrl,
                    "type": "POST",
                    "data" : function ( d ) {
                        $('.redeemed_offers_search').serializeArray().map(function(x){d[x.name] = x.value;});
                    }
                },
                columnDefs: [{
                    searchable: false,
                // orderable: true,
                targets: ['no-sort']
            },
            // {
            //     visible: false,
            //     targets: ['no-visible']
            // }
            ],
        } ));
    }

    /* offer Form Validation Rules */
    offersValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'offer[title]': {
                required: true
            },
            'offer[expiry_date]': {
                required: true,
                // validDate: true
            },
            'offer[external_link]' : {
                url : true
            }
        },
        messages: {
            'offer[title]': {
                required: "Please enter Title",
            },
            'offer[expiry_date]': {
                required: "Please enter Expiry Date",
                // date: "Please enter Expiry Date"
            },
            'offer[external_link]' : {
                url : 'Please enter valid URL'
            }
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            if (element.is("select")) {
                error.insertAfter(element.next('span'));
            } else {
              error.insertAfter(element);
          }
      }
  };
  $('#offerFrm').validate(offersValidateOpt);

  /*Delete Offer*/
  $("body").on("click", ".delete_offer", function() {
    var url_ = $(this).attr('data-url');
    handleConfirmBoxDelete(url_, offerDT, 'Are you sure you want to delete this offer?');
});


  $("body").on('click','.show_approve_disapprove',function(e){
    e.preventDefault();
    
    var status = $(this).data('value');
    $(".loader").show();
    $.ajax({
        type    : 'POST',
        url     : base_url + "offers/approve",
        data    : {'offer_id':$(this).attr('data-id'),'status':status},
        dataType: 'json',
        beforeSend : function() {

        },
        success : function(data) {
            $(".loader").hide();
            if (data.status == 'success') {
                toastSuccess(data.response);
                offerDT.ajax.reload( null, false);
            } else {
                toastError(data.response);
            }
        },
        complete : function() {

        }
    });

});

  $("body").on("keyup", ".textFilter", function() {
    /*console.log(this.value);*/
    offerDT.search(this.value).draw();
});

  $('body').on('click', '.offertype', function() {
    changeoffertype($(this).val());
    chkDefaultRule();
});

  changeoffertype($('.offertype:checked').val());
});


function changeoffertype(val)
{
    if(val == '1'){
        $('.onlineDiv').addClass("ele_hide");
    }else{
        $('.onlineDiv').removeClass("ele_hide");
    }
}

function chkDefaultRule(){
    if($('.onlineDiv').hasClass('ele_hide')){
        $('.externalLink').rules( "remove" );
        $('.redeemCode').rules( "remove" );   
        $('.externalLink').removeClass('error');          
        $('.redeemCode').removeClass('error'); 
        $('#external_link-error').remove();
        $('#redeem_code-error').remove();         
    }else{
        $('.externalLink').rules('add', {
            required: true,
            messages: {
                required: "Please enter External Link"
            }
        });
        $('.redeemCode').rules('add', {
            required: true,
            messages: {
                required: "Please enter Redeem Code"
            }
        });
    }
}

jQuery.validator.addMethod("validDate",function(value, element) {
    return value.match(/((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/);
},"Please enter valid expiry date");