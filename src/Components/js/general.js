$.validator.methods.email = function( value, element ) {
  return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
}
$(document).ready(function() {
    //$(".loader").height($(document).height());
    setTimeout(function() {
        $(".loader").fadeOut();
    }, 1000);
    

    $("body").on("change", 'select', function(e) {
        if ($(this).val() !== '') {
            $(this).closest('div').find('span.error').html('');
        }
    });

    /*
        Make the trim each text field before do jQuery validation check
        */
        $.each($.validator.methods, function (key, value) {
            $.validator.methods[key] = function () {
                if(arguments.length > 0) {
                    arguments[0] = $.trim(arguments[0]);
                }

                return value.apply(this, arguments);
            };
        });

    // Older "accept" file extension method. Old docs: http://docs.jquery.com/Plugins/Validation/Methods/accept
    $.validator.addMethod( "extension", function( value, element, param ) {
        param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
        return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
    }, $.validator.format( "Please enter a value with a valid extension." ) );

    $.validator.addMethod("dateCompare", function(value, element, opt) {
        var start_date = $.trim($('#start_date').val());
        var end_date = $.trim($('#end_date').val());

        if (start_date != '' && end_date != '') {
            if (dateCompare(end_date, start_date) === false) {
                $.validator.messages.dateCompare = "End Date cannot be earlier than Start Date";
                return false;
            } else {
                return true;
            }
        }
        return true;
    });
    
    $('[data-toggle="tooltip"]').tooltip()/*.tooltip('show');*/;

    $('body').on('change', 'input[type=file]', function() {

        var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        if(label != ''){
            $(input).closest('.file-upload').addClass('active').find('#noFile').html(label);
            $(input).closest('.file-upload').find('.js-error').html('');
        }else{
            $(input).closest('.file-upload').removeClass('active').find('#noFile').html('No file chosen...');
        }
    }); 

    $('select').on('select2:open', function (e) {
        $('.select2-search input').prop('focus',false);
    });

    $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $('body').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $('body').on('shown.bs.modal', function (e) {
        $('select').on('select2:open', function (e) {
            $('.select2-search input').prop('focus',false);
        });
    });


    $(".toogle_icon").click(function(){
        $(".menu").slideToggle();
    });

    $("body").on('click', '.tbl_toogle', function(event){
        event.stopPropagation();
        $('[data-toggle="popover"]').popover('hide');
        $(this).removeClass('active');
        $('.drop_down').not($(this).closest('.dropdown_cover').find(".drop_down")).slideUp();
        $(this).closest('.dropdown_cover').find(".drop_down").toggleClass('active');
        $(this).closest('.dropdown_cover').find(".drop_down").slideToggle();
    });

    $('body').on("click", function(event){
        $(".drop_down").hide("fast");
    });

    $( document ).ajaxSuccess(function( event, request, settings ) {
        if(!$.trim(request.responseText)){
            window.location.href = base_url;
        }      
    });

    // toggle js start
    $("body").on("click", '.toggle_icon', function(e) {
        // $(".navigation_vn_menu").slideToggle();
        // $(".navigation_vn_menu").animate({width:'toggle'},500);
        $("body").toggleClass('ovr-hidn');
        $(".menu").toggleClass('menu_panel');
        $(".toggle_icon").toggleClass('ictog');
    });
     // toggle js end
 });

function initInputMask(elem) {
    if ($(elem).length > 0) {
        $(elem).inputmask("+1(999)999-9999", {
            "clearIncomplete": true,
            "removeMaskOnSubmit": true
        });
    }
}

function initInputMaskWithoutCode(elem) {
    if ($(elem).length > 0) {
        $(elem).inputmask("(999)999-9999", {
            "clearIncomplete": true,
            "removeMaskOnSubmit": true
        });
    }
}

function mobileInputMaskWithoutCode(elem) {

    if ($(elem).length > 0) {
        $(elem).inputmask("999-999-9999", {
            //"clearIncomplete": true,
            //"removeMaskOnSubmit": true
        });
    }
}

function zipInputMask(elem) {

    if ($(elem).length > 0) {
        $(elem).inputmask("99999", {});
    }
}

