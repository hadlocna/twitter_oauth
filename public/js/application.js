$(document).ready(function() {

  $('#submit_button').click(function(event){
    event.preventDefault();
    var status = $('<h4 id = "processing"> The form is currently processing </h4>');
    $('#welcome').append(status);
    var tweet_text = { "tweet_text": $('#tweet_text').val()};

    $.post('/tweet', tweet_text, function(data){
      $('#processing').hide();
      var success = $('<h4 id = "success"> You successfully posted: ' + data + '</h4>');
      $('#welcome').append(success)

    },"json");

  });

});
