var dt;
var categorieItems = [];
var suburbItems = [];
$(document).ready(function() {

    $('.select2').select2({
        placeholder : "Select Business Categories (max 2)",
        maximumSelectionLength : 2
    });

    $("body").on("click", ".likeChange", function() {

        $(".loader").show();
        
        var business_id = $(this).data('id');
        var user_id = $(this).data('user_id');

        $.ajax({
            url: base_url + 'business/likeChange',
            type: 'POST',
            dataType: 'JSON',
            async: false,
            data: {business_id:business_id, user_id : user_id}
        }).done(function(data) {
            $(".loader").hide();
            if (data.status == 'success') {
                window.location.reload();
            }
        });

    });

    if($("#businessphone").length > 0){
        $("#businessphone").inputmask('9999999999');
    }

    $('body').on('click','#website',function () {
        if($(this).val() == ""){
            $(this).val('https://');
        } 
    });

    $('#ui-id-1').hide();

    $("body").on("click", '.viewLikes', function() {
        $(".loader").show();
        var _URL = $(this).data('url');
        $.ajax({
            url: _URL,
            type: 'POST',
            success: function(data) {
                $(".loader").hide();
                $('#businessLikesViewModal').html(data);
                $("#businessLikesViewModal").modal("show");
                $(".attach_comon_mdl").mCustomScrollbar({ theme: 'dark' });
            },
        });
    });

    $("body").on("click", '.viewRatings', function() {
        $(".loader").show();
        var _URL = $(this).data('url');
        $.ajax({
            url: _URL,
            type: 'POST',
            success: function(data) {
                $(".loader").hide();
                $('#businessRatingViewModal').html(data);
                $("#businessRatingViewModal").modal("show");
                $('#viewRatingsDt').DataTable( $.extend( true, {}, {}, 
                    commonScrollDBOpt,
                    {
                        "serverSide": false,
                        "scrollY": '200px',
                    },
                    ));
            },
        });
    });

    //$("#viewRatingsDt tbody").mCustomScrollbar();

    if($('.business_categories_id_array').length > 0){
        if($('.business_categories_id_array').val() != ''){
            categoriesIdArr = $('.business_categories_id_array').val().split(',');
            categoriesNameArr = JSON.parse($('.categories_prefilled').val());
            $.each(categoriesIdArr, function(i, data){
                categorieItems.push({id : data, name:categoriesNameArr[i]});    
            });

            suburbsIdArr = $('.business_suburbs_id_array').val().split(',');
            suburbsNameArr = JSON.parse($('.suburbs_prefilled').val());
            $.each(suburbsIdArr, function(i, data){
                suburbItems.push({id : data, name:suburbsNameArr[i]});    
            });
            
        }

        // categorieItems = $('.business_categories_id_array').val();
    }

    // if($('.business_suburbs_id_array').length > 0){
    //     suburbItems = $('.business_suburbs_id_array').val();
    // }

    $( ".business_suburbs" ).autocomplete({
        source: base_url + "suburbs/autocomplete/locality",
        minLength: 1,
        select: function( event, ui ) {
            $('#ui-id-1').hide();
            $(this).val(ui.item.id);
        }
    });

    var busin = $( ".business_categories" ).autocomplete({
        source: base_url + "categories/autocomplete/name",
        minLength: 1,
        select: function( event, ui ) {
            $(this).val(ui.item.id);
            $('.business_categories_id').val(ui.item.id);
        }
    });
    $('body').on('change','#business_categories',function(){
        var categories = [];
        $.each($("#business_categories option:selected"), function(){
            categories.push(parseInt($(this).val()));
        });
        $('.business_categories_id_array').val(categories);
    });

    businessValidateOpt = {
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore:"",
        rules: {
            'business[email]': {
                required: true,
                email: true
            },
            'business[name]': {
                required: true
            },
            'business[contact_number]': {
                required: true,
                pattern:/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
            },
            'business_suburbs': {
                required: true
            },
            'business_logo[]': {
                required: function(){
                    if($('#removeBusinessImage').length > 0){
                        return false;
                    }else{
                        return true;
                    }
                },
                extension: "jpg|jpeg|png",
            },
            'business[description]': {
                required: true
            },
            'business_categories': {
                required: true,
                //max: 2,
            },
            'business[facebook_url]': {
                url: true
            },
            'business[instagram_url]': {
                url: true
            },
            'business[website]': {
                // required: true,
                url: true
            },
        },
        messages: {
            'business[email]': {
                required: "Please enter Email",
                email: "Please enter valid Email",
            },
            'business[name]': {
                required: "Please enter Business Name",
            },
            'business[contact_number]': {
                required: "Please enter Contact Number",
                pattern:'Please enter valid Contact Number'
            },
            'business_suburbs': {
                required: "Please select Suburbs",
            },
            'business_logo[]': {
                required: "Please select Business Image",
                extension: 'Please select valid extension: jpg, jpeg, png',
            },
            'business[description]': {
                required: "Please enter Description",
            },
            'business_categories': {
                required: "Please select Categories",
                max: "Please enter maximum 2 categories" 
            },
            'business[facebook_url]': {
                url: "Please enter valid URL",
            },
            'business[instagram_url]': {
                url: "Please enter valid URL",
            },
            'business[website]': {
                // required: "Please enter Website URL",
                url: "Please enter valid URL",
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
    $("#businessFrm").validate(businessValidateOpt);

    /*Delete Business Image*/
    $("body").on("click", "#removeBusinessImage", function() {
        var url_ = $(this).attr('data-url');
        handleConfirmDeleteUploadedElement(url_, 'removeBusinessImage_'+$(this).attr('data-id'), 'Are you sure you want to delete this Image?');
    });

    $('body').on('change','.businesslogo',function(){
        imagesPreview(this, '.showSelectedImage');
    });

    var businessImagesCarousel = $('#businessImagesCarousel');
    businessImagesCarousel.owlCarousel({
        items:1,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        itemsDesktop : [1000,1],
        itemsDesktopSmall : [900,1],
        itemsTablet: [600,1],
        autoHeight: false,
        autoHeightClass: 'owl-height',
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:1,
            },
            1000:{
                items:1,
            }
        },
        dots: false,
        animateOut: 'fadeOut'
    });


    // loadTypeahead("categories/autocomplete/name",$('.typeahead'),$('.tm-input'),categorieItems,$('.business_categories_id_array'),$('.categories_prefilled').val(),limit = 2);
    loadTypeahead("suburbs/autocomplete/locality",$('.typeahead_suburbs'),$('.tm-input_suburbs'),suburbItems,$('.business_suburbs_id_array'),$('.suburbs_prefilled').val());

});

function loadTypeahead(apiUrl,typeahedObj, tagManagerObj, storeValObj, inputValObj, prefilled = '', limit = ''){
    if(prefilled){
        prefilled = JSON.parse(prefilled);
    }
    var tagApi = tagManagerObj.tagsManager({
        tagsContainer : tagManagerObj,
        prefilled : prefilled
    });

    tagManagerObj.on('tm:spliced', function(e, tag) {
        console.log(e);
        storeValObj = $.grep(storeValObj, function(item){ 
            return item.name != tag;
        });
        var finalItems = [];
        $.each(storeValObj, function( i, l ){
            finalItems.push(parseInt(l.id));
        });
        finalItems = unique(finalItems);
        inputValObj.val(finalItems);
    });
    typeahedObj.typeahead({
        afterSelect :function (item){
            tagApi.tagsManager("pushTag", item);
            typeahedObj.val('');
        },
        // limit : 20,
        source: function (query, process) {
            return $.get(base_url + apiUrl, { term: query }, function (data) {
                result = $.parseJSON(data);
                data = result.map(function (item) {
                    var aItem = { id: item.id, name: item.value };
                    return JSON.stringify(aItem);
                });
                return process(data);
            }); 
        },

        matcher: function (obj) {
            var item = JSON.parse(obj);
            return ~item.name;
            // return ~item.name.toLowerCase().indexOf(this.query.toLowerCase())
        },

        sorter: function (items) {          
            var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (aItem = items.shift()) {
                var item = JSON.parse(aItem);
                if (!item.name.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(JSON.stringify(item));
                else if (~item.name.indexOf(this.query)) caseSensitive.push(JSON.stringify(item));
                else caseInsensitive.push(JSON.stringify(item));
            }

            return beginswith.concat(caseSensitive, caseInsensitive)

        },


        highlighter: function (obj) {
            var item = JSON.parse(obj);
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
            return item.name.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>'
            })
        },

        updater: function (obj) {
            var item = JSON.parse(obj);

            // $('#IdControl').attr('value', item.id);
            console.log(storeValObj.length);
            if(limit == '' || storeValObj.length < limit){
                storeValObj.push(item);
                var finalItems = [];
                $.each(storeValObj, function( i, l ){
                    finalItems.push(parseInt(l.id));
                });
                finalItems = unique(finalItems);
                inputValObj.val(finalItems);

                return item.name;
            }
        }
    });
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
