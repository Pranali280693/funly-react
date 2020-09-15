var dt,categoryDT, categoryDTUrl,categoryValidateOpt;
$(document).ready(function() {

    if ($('#category_datatable').length > 0) {
        categoryDTUrl = base_url + "categories/list";
        categoryDT = $('#category_datatable').DataTable( $.extend( true, {}, {}, 
            commonDBOpt,{columnDefs: [
             { orderable: false, targets: [1,2] }
             ]}, {
                "ajax": {
                    "url": categoryDTUrl,
                    "type": "POST",
                    "data" : function ( d ) {
                        $('.categories_search').serializeArray().map(function(x){d[x.name] = x.value;});
                    }
                }
            } ));
    }

    if($('.category_color').length >0){
        $('.category_color').colorpicker({
            format : 'hax'
        });
    }

    $('.category_color').on('colorpickerChange', function(event) {
        console.log(event);
        $('.category_color').val(event.color.toString());
    });

    /* category Form Validation Rules */
    categoryValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'category[name]': {
                required: true
            },
            'image_url': {
                extension: "jpg|jpeg|png",
            },
            'category[color]': {
                required: true,
            },
        },
        messages: {
            'category[name]': {
                required: "Please enter Name",
            },
            'image_url': {
                extension: 'Please select valid extension: jpg|jpeg|png',
            },
            'category[color]' : {
                required : "Please enter Color"
            },
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            if (element.is("select")) {
                error.insertAfter(element.next('span'));
            } else if (element.attr("type") == 'file') {
                error.insertAfter(element.parent("div"));
            } else {
              error.insertAfter(element);
          }
      }
  };

  $('#categoryFrm').validate(categoryValidateOpt);

  $('body').on('click', '.categoryAddEdit', function() {

    if($('#image_url').attr('data-vl') == ''){
        $('.image_url').rules('add', {
            required: true,
            extension: "jpg|jpeg|png",
            messages: {
                required: "Please enter Image",
                extension: 'Please enter image with a valid extension: jpg|jpeg|png',
            }
        });  
    }
    $("#categoryFrm").submit();     
});

  /*Delete Category*/
  $("body").on("click", ".delete_category", function() {
    var url_ = $(this).attr('data-url');
    var confirm_url = $(this).attr('data-confirm-url');
    handleConfirmBoxDeleteWithDBCheck(url_, categoryDT, 'Are you sure you want to delete this category?',confirm_url);
});

  $("body").on("keyup", ".textFilter", function() {
    /*console.log(this.value);*/
    categoryDT.search(this.value).draw();
});
    $('body').on('change','.image_url',function(){
        $('.showSelectedImage').html('');
        imagesPreview(this, '.showSelectedImage');
        $('.hideSelectedImage').hide();
    });

});

