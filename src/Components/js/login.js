var dt;
$(document).ready(function() {

    setTimeout(function() {
        $(".loader").fadeOut();
    }, 1000);

    if($('#phone').length > 0){
        $('#phone').inputmask('9999999999');
    }
    
    /* Master List Form Validation Rules */
    signupValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            // 'company_logo': {
            //     required: true,
            //     extension: "jpg|jpeg|png",
            // },
            'signup[name]': {
                required: true
            },
            'signup[business_name]': {
                required: true
            },
            'signup[address]': {
                required: true
            },
            'signup[phone]': {
                required: true,
                pattern:/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
            },
            'signup[title]': {
                required: true
            },
            'signup[email]': {
                required: true,
                email: true
            },
            'signup[location]': {
                required: true,
                maxlength : 11
            },
            'signup[password]': {
                required: true,
                minlength: 6
            },
        },
        messages: {
            'company_logo': {
                required: "Please set Business Logo",
                extension: 'Please select valid extension: jpg, jpeg, png',
            },
            'signup[name]': {
                required: "Please enter Contact Name",
            },
            'signup[business_name]': {
                required: "Please enter Business Name",
            },
            'signup[address]': {
                required: "Please enter Business Address",
            },
            'signup[phone]': {
                required: "Please enter Contact Number",
                pattern:'Please enter valid Contact Number'
            },
            'signup[title]': {
                required: "Please enter Job Title",
            },
            'signup[email]': {
                required: "Please enter Email",
                email: "Please enter valid Email",
            },
            'signup[location]': {
                required: "Please enter ABN",
                maxlength:"Please enter max 11 character"
            },
            'signup[password]': {
                required: "Please enter Password",
                minlength: "Password must be at least 6 digit",
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
    $("#signup-validation").validate(signupValidateOpt);

    $('#verification_frm').validate({
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error, .js-error').hide('');
            }
        },
        rules: {
            code : {
                required: true,
                minlength : 7,
                maxlength : 7
            },
        },
        messages: {
            code: {
                required: "Please enter Code",
                minlength: "Please enter valid Code",
                maxlength: "Please enter valid Code",
            },
        }
    });

    $("#forgot_frm").validate({
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error, .js-error').hide('');
            }
        },
        rules: {
            email : {
                required: true,
                email : true,
            },
        },
        messages: {
            email: {
                required: "Please enter Email",
                email: "Please enter valid Email",
            },
        },
        submitHandler: function(form) {
            $(".loader").show();
            $.ajax({
                url: $(form).attr('action'),
                type: 'POST',
                dataType: 'JSON',
                data: $(form).serialize(),
                beforeSend: function() {
                    $(form).find('[type="submit"]').prop('disabled', true);
                }
            }).done(function(data) {
                $(".loader").hide();
                $(form).find('[type="submit"]').prop('disabled', false);
                $('span.error, .js-error, .sessError').html('');
                if (data.status == 'error') {
                    $(form).find(".sessError").html(data.response);
                } else if (data.status == 'success') {
                    $(form).find(".sessError").html(data.response);
                    setTimeout(function(){
                        $('.alert').remove();
                    }, 5000);
                    $(form)[0].reset();
                }
            });
            return false;
        }
    });

    $( ".business_suburbs" ).autocomplete({
        source: base_url + "suburbs/autocomplete/locality",
        minLength: 1,
        select: function( event, ui ) {
            $(this).val(ui.item.id);
        }
    });

    $('body').on('click','.resendCode',function () {
        console.log("clicked");
        var url = base_url + 'resendCode';
        $.ajax({
            url : url,
            type : 'POST',
            dataType : 'json',
            success : function(result){
                if(result.status == "success"){
                    toast.success('success',result.response);
                }else{
                    toast.error('error',result.response);
                }
            }
        });
    });

    $( ".business_categories" ).autocomplete({
        source: base_url + "categories/autocomplete/name",
        minLength: 1,
        select: function( event, ui ) {
            $(this).val(ui.item.id);
        }
    });

    $('body').on('change','#company_logo',function(){
        console.log('change');
        imagePreviewInTagByClass(this, '.upload_img');
    });

    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 4000);

    if($('#searchTextField').length){
      var input = document.getElementById('searchTextField');
      var options = {
      };
      autocomplete = new google.maps.places.Autocomplete(input, options);
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        sublocality_level_2 : 'long_name',
        sublocality_level_1 : 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        administrative_area_level_2:'long_name',
        country: 'long_name',
        postal_code: 'short_name',
        postal_town:'long_name'
    };
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        //$('#latitude').value = place.name;
        var placeComponentLength = place.address_components.length;
        $('#latitude').val('');
        $('#longitude').val('');
        $('#postcode').val('');
        $('#address1').val('');
        $('#address2').val('');
        $('#address3').val('');
        $('#post_town').val('');
        // alert(place.geometry.location.lat()+' '+place.geometry.location.lng());
          if(place.geometry.location.lat()){
            $('#latitude').val(place.geometry.location.lat());
        }
        if(place.geometry.location.lng()){
            $('#longitude').val(place.geometry.location.lng());
        }
        // for (var i = 0; i < place.address_components.length; i++) {

        // }

              //alert("This function is working!");
              //alert(place.name);
             // alert(place.address_components[0].long_name);

         });
       // labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
       //    series: [[20, 50, 70, 110, 100, 200, 230], [50, 80, 140, 130, 150, 110, 160]]

   }

});

function imagePreviewInTagByClass(input, previewImageClass){
    if (input.files) {
        var filesAmount = input.files.length;

        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function(event) {
                $(previewImageClass).prop('src', event.target.result);
            }

            reader.readAsDataURL(input.files[i]);
        }
    }
}