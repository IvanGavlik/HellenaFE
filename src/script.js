$('.panel-collapse').on('show.bs.collapse', function() {
    $(this).parent('.panel').find('.fa-minus').show();
    $(this).parent('.panel').find('.fa-plus').hide();
})
$('.panel-collapse').on('hide.bs.collapse', function() {
    $(this).parent('.panel').find('.fa-minus').hide();
    $(this).parent('.panel').find('.fa-plus').show();
})