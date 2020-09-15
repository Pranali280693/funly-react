var dt;

$(document).ready(function() {
    if($('.select2').length > 0){
        $('.select2').select2();
    }
    if($('.userFilterOnType').length > 0){
        $('.userFilterOnType').next(".select2-container").hide();
    }
    $('.hideSelectedImage').show();

    if ($('#user_datatable').length > 0) {
        userDTUrl = base_url + "users/list";
        userDT = $('#user_datatable').DataTable( $.extend( true, {}, {}, 
            commonDBOpt,{columnDefs: [
               // { orderable: false, targets: 3 }
               ]}, {
                "ajax": {
                    "url": userDTUrl,
                    "type": "POST",
                    "data" : function ( d ) {
                        $('.users_search').serializeArray().map(function(x){d[x.name] = x.value;});
                    }
                }
            } ));
    }

    if($("#phone").length > 0){
        $("#phone").inputmask('9999999999');
    }

    /* User Form Validation Rules */
    userValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            // 'profile_img': {
            //     required: function(){
            //         if($('.profile_exist_pic').length > 0){
            //             return false;
            //         }else{
            //             return true;
            //         }
            //     },
            //     extension: "jpg|jpeg|png",
            // },
            'user[name]': {
                required: true
            },
            'user[phone]': {
                required: true,
                pattern:/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
            },
            'user[job_title]': {
                required: true
            },
            'user[email]': {
                required: true,
                email: true
            },
            'user[location]': {
                required: true,
                maxlength : 11
            },
            'password': {
                minlength: 6
            },
        },
        messages: {
            // 'profile_img': {
            //     required: "Please select Profile Image",
            //     extension: 'Please select valid extension: jpg, jpeg, png',
            // },
            'user[name]': {
                required: "Please enter Contact Name",
            },
            'user[phone]': {
                required: "Please enter Contact Number",
                pattern:'Please enter valid Contact Number'
            },
            'user[job_title]': {
                required: "Please enter Job Title",
            },
            'user[email]': {
                required: "Please enter Email",
                email: "Please enter valid Email",
            },
            'user[location]': {
                required: "Please enter ABN",
                maxlength: "Please enter max 11 character"
            },
            'password': {
                minlength: "Password must be at least 6 digit",
            },
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            console.log(element.attr("type"));
            if (element.attr("type") == 'file') {
                error.insertAfter(element.parent("div"));
            }else {
              error.insertAfter(element);
          }
      }
  };
  $("#userFrm").validate(userValidateOpt);

  /*Delete user*/
  $("body").on("click", ".delete_user", function() {
    var url_ = $(this).attr('data-url');
    handleConfirmBoxDelete(url_, userDT, 'Are you sure you want to delete this user?');
});

  /* Change user status */
  $("body").on("click", ".jsChangeUserStatus", function() {
    var thisCheck = $(this);
    var url_ = $(this).attr('data-url');
    handleConfirmBoxStatus(url_, userDT, 'Are you sure you want to change status?', thisCheck);
});

  $("body").on("keyup", ".textFilter", function() {
    /*console.log(this.value);*/
    userDT.search(this.value).draw();
});

  $('body').on('change','.usertype',function(){
    if($(this).val() == 'all'){
        if(this.checked){
            $('.usertype').prop('checked',false);
            $(this).prop('checked',true);
            $('.userFilterOnType').next(".select2-container").show();
        }else{
            $('.userFilterOnType').next(".select2-container").hide();
        }
    }else{
        $('.sUser').prop('checked',false); 
        $('.userFilterOnType').next(".select2-container").hide();
        selectedTypes = [];
        // if($("input:checkbox[name='user[type]']:checked").length >1){
            $("input:checkbox[name='user[type]']:checked").each(function(){
                selectedTypes.push($(this).val());
            });
            $('.userTypeSelectedData').val(selectedTypes);
        // }
    }
    if($(this).val() != 'all'){
        // $('.userFilterOnType').next(".select2-container").show();
    }else{
        // $('.userFilterOnType').next(".select2-container").hide();
        $.ajax({
            'url' : base_url+'users/getUserDataByType',
            'type' : 'POST',
            'data' : {'user_type':$(this).val()},
            success:function(result){
                if(result){
                    $('.userFilterOnType').html(result);
                }
            }
        });
    }
    return false;
});

  /* User Form Validation Rules */
  userNotificationValidateOpt = {
    invalidHandler: function(event, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('span.error').hide();
        }
    },
    ignore:"",
    rules: {
        'user[title]': {
            required: true,
        },
        'user[description]': {
            required: true
        },
        'user[type]': {
            required: true
        },
    },
    messages: {
        'user[title]': {
            required: 'Please enter Title',
        },
        'user[description]': {
            required: "Please enter Description",
        },
        'user[type]': {
            required: "Please enter Type",
        },
    },
    errorElement : 'span',
    errorPlacement: function(error, element) {
        console.log(element.attr("type"));
        if (element.attr("type") == 'radio') {
            error.insertAfter($('.userFilterOnType'));
        }else{
          error.insertAfter(element);
      }
  }
};
$('body').on('click',"#userNotificationFrm",function(){
    filteredUser = [];
    $.each($(".userFilterOnType option:selected"), function(){
        filteredUser.push($(this).val());
    });
    $('.userFilterdData').val(filteredUser);
});
$("#userNotificationFrm").validate(userNotificationValidateOpt);
$('body').on('change','.profile_img',function(){
    imagesPreview(this, '.showSelectedImage');
    $('.hideSelectedImage').hide();
});

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
