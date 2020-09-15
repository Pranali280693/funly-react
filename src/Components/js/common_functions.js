var generalDBOpt, commonDBOpt, commonScrollDBOpt, commonButtonDBOpt;
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(document).ready(function(){

    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 5000);

    /*Common datatable options*/
    commonDBOpt = {
        sDom: 'rt<"bottom"p>',
        'autoWidth': false,
        "processing": false,
        "serverSide": true,
        "iDisplayLength": 10,
        "order": [
        [0, 'ASC']
        ], //Initial order.
        
        columnDefs: [{
            orderable: false,
            targets: ['no-sort']
        }]
    };

    generalDBOpt = {
        sDom: 'rt<"bottom"p>',
        'autoWidth': false,
        "processing": false,
        "order": [
        [0, 'ASC']
        ], //Initial order.

        columnDefs: [{
            orderable: false,
            targets: ['no-sort']
        }]
    };


    commonScrollDBOpt = {
        sDom: 'rt',
        'autoWidth': false,
        "processing": false,
        "serverSide": true,
        "iDisplayLength": -1,
        "scrollY": '400px',
        "scrollCollapse": true,
        "order": [
        [0, 'ASC']
        ], //Initial order.

        columnDefs: [{
            orderable: false,
            targets: ['no-sort']
        }],
        'drawCallback' : function(settings, json) {
            $('#'+settings.sTableId+'_wrapper').find('.dataTables_scroll').find('.dataTables_scrollBody').mCustomScrollbar({ theme: 'dark' });
            $('.ajx_loader').css('display', 'none');
        }
    };

    commonButtonDBOpt = {
        sDom: 'Brt<"bottom"p>',
        'autoWidth': false,
        "processing": false,
        "serverSide": true,
        "order": [
        [0, 'ASC']
        ], //Initial order.

        columnDefs: [{
            orderable: false,
            targets: ['no-sort']
        }]
    };

    $('.modal').on('hidden.bs.modal',function(){
        if($('body').find('.modal').hasClass('show')){
            $('body').addClass('modal-open');
        }
    });

    $('body').on('click', ".asn_msg_check", function(e) {
        if($(this).is(':checked')){
            $(this).closest('.conf_msg').find('.assignment_cnt').show();
        }else{
            $(this).closest('.conf_msg').find('.assignment_cnt').hide();
        }
    });
});

function adjustDatatable(){
    setTimeout( function(){
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    }, 100);
    
}
function dateCompare(D1, D2) {

    dateFirst = D1.split('/');
    dateSecond = D2.split('/');

    var D1 = new Date(dateFirst[2], dateFirst[0] - 1, dateFirst[1]); //Year, Month, Date
    var D2 = new Date(dateSecond[2], dateSecond[0] - 1, dateSecond[1]);
    if (D2 <= D1) {
        return true;
    } else {
        return false;
    }
}

function _showFormError(form, _res) {
    //  Show validate messages
    $(form).find('.js-error').html('');
    //  Show validate messages
    $.each(_res, function(index, val) {
    	$(form).find(':input[name="' + index + '"]').closest('.form-group').find('.js-error').html(val);
    });
}

function toastSuccess(msg) {
    iziToast.success({
        backgroundColor: '#5D7DE7',
        messageColor: '#fff',
        titleColor: '#fff',
        icon: 'fa fa-check',
        iconColor: '#fff',
        transitionIn: 'bounceInRight',
        // title: 'Success!',
        message: "" + msg
    });
}
function toastError(msg) {
    iziToast.error({
        backgroundColor: '#BC5459',
        messageColor: '#fff',
        titleColor: '#fff',
        icon: 'fa fa-ban',
        iconColor: '#fff',
        transitionIn: 'bounceInRight',
        // title: 'Error!',
        message: "" + msg
    });
}

function removeAlertMessage(){
    if ($('.alert').length > 0) {
        $('.alert').remove();
    }
}

function readURL(input, imgTag) {
    var fileTypes = ['jpg', 'jpeg', 'png','gif'];
    // imgTag.attr('src', "");
    if (input.files && input.files[0]) {
        var extension = input.files[0].name.split('.').pop().toLowerCase();  //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1;
        if (isSuccess) {
            if(input.files[0].size > 4194304) { /* 4MB Limit */
                toastError('Large image size. Please select valid file upto 4MB !');
                return false;
            } else {
                var reader = new FileReader();
                reader.onload = function(e) {
                    imgTag.attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        } else {
            toastError('Invalid image type. Please select valid image file !');
            return false;
        }
    }
}

function loadSelect2() {
    if ($('.cm_select').length > 0) {
        $('.cm_select').select2({});
    }
}
function loadDatepicker(){
    $( ".datepicker_cl" ).datepicker({
        todayHighlight: true,
        autoclose: true,
    });
}

function loadColorPicker(){
    if ($('.colorpicker-component').length > 0) {
        $('.colorpicker-component').colorpicker({
            template : '<div class="colorpicker"><div class="colorpicker-saturation"><i class="colorpicker-guide"></i></div><div class="colorpicker-hue"><i class="colorpicker-guide"></i></div></div>',
            format : 'hex'
        });
    }
}

// Handle Add Edit popup
function handleAddEditPopup(_URL, formContainer, formObj, formValidationRules, formModalEle) {
    $.ajax({
        url: _URL,
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {}
    }).done(function(data) {
        if (data.status == 'success') {
            $(formContainer).html(data.response);
            $(formObj).validate(formValidationRules);
            $(formModalEle).modal('show');
            $('.drop_down').slideUp();
        }
    });
}

// Add Edit popup with ID of form
function handleFormPopup(_URL, formContainer, formObj, formValidationRules, formModalEle, id) {
    $.ajax({
        url: _URL,
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {id:id}
    }).done(function(data) {
        if (data.status == 'success') {
            $(formContainer).html(data.response);
            $(formObj).validate(formValidationRules);
            $(formModalEle).modal('show');
            
            $('.drop_down').slideUp();
        }
    });
}

// Handle delete confirm popup
function handleConfirmBoxDelete(url_, datatableObj, confirmMessage) {
    bootbox.confirm({
        closeButton: false,
        title: 'Confirm',
        message: '<p>'+confirmMessage+'</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'custom_btn_delete'
            },
            cancel: {
                label: 'No',
                className: 'custom_btn_delete'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {},
                }).done(function(data) {
                    if (data.status == 'success') {
                        toastSuccess(data.response);
                    }
                    else {
                        toastError(data.response);
                    }
                    datatableObj.ajax.reload(function ( json ) {
                    }, false);
                });
            }
        }
    });
}

// Handle delete upload confirm popup
function handleConfirmDeleteUploadedElement(url_, elementID, confirmMessage) {
    bootbox.confirm({
        title: 'Confirm',
        message: '<p>'+confirmMessage+'</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'custom_btn_delete'
            },
            cancel: {
                label: 'No',
                className: 'custom_btn_delete'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {},
                }).done(function(data) {
                    if (data.status == 'success') {
                        $("#"+elementID).remove();
                        toastSuccess(data.response);
                    }
                    else {
                        toastError(data.response);
                    }
                });
            }
        }
    });
}

// Handle delete with check exist confirm popup
function handleConfirmBoxDeleteWithDBCheck(url_, datatableObj, confirmMessage, confirm_url) {
    bootbox.confirm({
        title: 'Confirm',
        message: '<p>'+confirmMessage+'</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'custom_btn_delete'
            },
            cancel: {
                label: 'No',
                className: 'custom_btn_delete'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {},
                }).done(function(data) {
                    if (data.status == 'success') {
                        existsDataDeleteConfirm(confirm_url);
                        // toastSuccess(data.response);
                    } 
                    else if (data.status == 'error') {
                        var msg_title = 'Alert';

                        if(data.title){msg_title=data.title;}

                        bootbox.confirm({
                            title: 'Confirm',
                            message: '<p>'+data.response+' '+confirmMessage+'</p>',
                            className: "siConfirmCls custom_fmodel",
                            buttons: {
                                confirm: {
                                    label: 'Yes',
                                    className: 'custom_btn_delete'
                                },
                                cancel: {
                                    label: 'No',
                                    className: 'custom_btn_delete'
                                }
                            },
                            callback: function(result1) {
                                $('.drop_down').slideUp();
                                /* NO */
                                if (!result1) {
                                }
                                /* YES */
                                if (result1) {
                                    existsDataDeleteConfirm(confirm_url, datatableObj);
                                }
                            }
                        });
                    }
                    else {
                        toastError(data.response);
                    }
                    datatableObj.ajax.reload(function ( json ) {
                        loadSelect2(); 
                    }, false);
                });
            }
        }
    });
}

// Handle confirm box for Status change
function handleConfirmBoxStatus(url_, datatableObj, confirmMessage, thisCheck) {
    bootbox.confirm({
        closeButton: false,
        title: 'Confirm',
        message: '<p>'+confirmMessage+'</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'custom_btn_delete'
            },
            cancel: {
                label: 'No',
                className: 'custom_btn_delete'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
                if (thisCheck.prop("checked") == false) {
                    thisCheck.prop('checked', true);
                } else {
                    thisCheck.prop('checked', false);
                }
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {},
                }).done(function(data) {
                    if (data.status == 'success') {
                        toastSuccess(data.response);
                    } else {
                        toastError(data.response);
                    }
                    datatableObj.ajax.reload(null, false);
                });
            }
        }
    });
}
// Handle override message
function handleConfirmBoxOverride(url_, datatableObj, confirmMessage, formdata) {
    bootbox.confirm({
        title: 'Confirm Override',
        message: '<p>'+confirmMessage+'</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Override',
                className: 'custom_btn_delete'
            },
            cancel: {
                label: 'Cancel',
                className: 'custom_btn_delete'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
                datatableObj.ajax.reload(null, false);
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: formdata,
                }).done(function(data) {
                    datatableObj.ajax.reload(null, false);
                    if (data.status == 'success') {
                        toastSuccess(data.response);
                    } else {
                        toastError(data.response);
                    }
                });
            }
        }
    });
}


// Handle confirm box for unassign worker change
function handleConfirmBoxUnassign(url_, message, datatableObj) {
    bootbox.confirm({
        title: 'Remove from Job?',
        message: message,
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Remove',
                className: 'btn-success'
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            $('.drop_down').slideUp();
            /* NO */
            if (!result) {
            }
            /* YES */
            if (result) {
                $.ajax({
                    url: url_,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {},
                }).done(function(data) {
                    if (data.status == 'success') {
                        $('#view_conflict_list').modal('hide');
                        toastSuccess(data.response);
                    } else {
                        toastError(data.response);
                    }
                    if (typeof getJobData !== 'undefined' && $.isFunction(getJobData)) {
                        getJobData();
                    }
                    if (typeof datatableObj !== 'undefined'){
                        datatableObj.ajax.reload( null, false);    
                    }
                });
            }
        }
    });
}

// Handle Manage close modal event
function handleModalClose(modalId) {
    bootbox.confirm({
        title: 'Changes NOT Saved',
        message: '<p>Warning - You have not saved your changes.</p><p>If you want to save, select Go Back and use the SAVE button at the bottom of the form.</p>',
        className: "siConfirmCls custom_fmodel",
        buttons: {
            confirm: {
                label: 'Go Back',
                className: 'btn-success'
            },
            cancel: {
                label: 'Close Without Saving',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            /* NO */
            if (!result) {
                $(modalId).modal('hide');
            }
            /* YES */
            if (result) {

            }
        }
    });
}

// Handle the popup
function handlePopups(_URL, formContainer, formModalEle) {
    $.ajax({
        url: _URL,
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {}
    }).done(function(data) {
        if (data.status == 'success') {
            $(formContainer).html(data.response);
            $(formModalEle).modal('show');
        }
    });
}

// AssignWorker 
function assignWorkerPopup(job_id, pre_job_id, workers, message_id){
    $.ajax({
        url: base_url + 'dashboard/assignworker',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {job_id:job_id, pre_job_id : pre_job_id, workers : workers, message_id : message_id}
    }).done(function(data) {
        if (data.status == 'success') {
            $('.jsAssignWorker').html(data.response);
            $('#worker_assignment').modal('show');
            loadDatepicker();
            $('.drop_down').slideUp();
        }
    });
}

// Worker Conflict popup 
function checkConflict(){
    $.ajax({
        url: base_url + 'dashboard/conflict',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: $('.assign_wrkr_frm').serialize()
    }).done(function(data) {
        if (data.status == 'success') {
            $('.jsAssignConflict').html(data.response);
            $('#assign_conflict').modal('show');
            $('.drop_down').slideUp();
        }else if(data.status == 'assign'){
            saveWorkerAssignment(data.response)
        }
    });    
}

// Save worker assignment 
function saveWorkerAssignment(postdata){
    $.ajax({
        url: base_url + 'dashboard/assignsave',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: postdata
    }).done(function(data) {
        $('#assign_conflict').modal('hide');
        sendAssignMessageForm(data.assigned);
        if (typeof getJobData !== 'undefined' && $.isFunction(getJobData)) {
            getJobData();
        }
        if (typeof refreshCalendar !== 'undefined' && $.isFunction(refreshCalendar)) {
            refreshCalendar();
        }
    });
}

// Send assignment Message
function sendAssignMessageForm(postdata){
    $.ajax({
        url: base_url + 'dashboard/assignmessageform',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: postdata
    }).done(function(data) {
        if (data.status == 'success') {
            $('.jsAssignUpdate').html(data.response);
            $('#assign_updte').modal('show');
            $('.drop_down').slideUp();
        }
    });
}

function existsDataDeleteConfirm(url_, datatableObj) {
    $.ajax({
        url: url_,
        type: 'POST',
        dataType: 'JSON',
        data: {},
    }).done(function(data) {
        if (data.status == 'success') {
            toastSuccess(data.response);
        }
        else {
            toastError(data.response);
        }
        if (typeof datatableObj !== 'undefined'){
            datatableObj.ajax.reload( null, false);    
        }
    });
}

function validateAssignDate(start_date, end_date){
    if (dateCompare(start_date, end_date) === false) {
        return false;
    } else {
        return true;
    }
}

function imagesPreview(input, placeToInsertImagePreview) {

    if (input.files) {
        var filesAmount = input.files.length;

        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function(event) {
                $($.parseHTML('<img style="height:80px;width:80px;">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
            }

            reader.readAsDataURL(input.files[i]);
        }
    }

}

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