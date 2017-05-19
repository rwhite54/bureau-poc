(function () {

  function init(){
    $('#submitButton').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');

      console.log(testForm);

      //make the AJAX call
      $.ajax({
        url: '/gettransaction',
        type: 'POST',
        data: {
          accountnumber: testForm.accountnumber.value,
          coid: testForm.coid.value,
          accounttype: testForm.accounttype.value,
          fromdate: testForm.fromdate.value,
          todate: testForm.todate.value,
          offset: testForm.offset.value,
          limit: testForm.limit.value,
          fromamount: testForm.fromamount.value,
          toamount: testForm.toamount.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    var $data = $('#post-results-container .data');
    var $transdata = $('#post-results-list-container .listgroup');

    $("#jsonreturned").val(jsonData.returnedmsg);

    //reset the UI
    $data.html('');
    $('.ajaxLoader').hide();

    var dataasjson = JSON.parse(jsonData.returnedmsg);

    $.each(dataasjson.transaction, function (i) {
        $.each(dataasjson.transaction[i], function (key, val) {
            //$transdata.append("<li class='list-group-item'>MY NEW ITEM</li>");
            if (key === "trandesc"){
            $('.newitems').append("<li class='list-group-item'>" + val + "</li>");
            }
        });
    });

    $('#post-results-container').fadeIn();
  };

//init on document ready
$(document).ready(init);
})();