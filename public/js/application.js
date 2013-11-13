

function check_status(data){ 
  $.get('/status/'+ data, data, function(status){
    status_state = status;
    if (status_state) {
    clearInterval(myInterval);
    $('#success').hide();
    var job_done = $('<h4 id = "job_done"> Your job is done! </h4>');
    $('#welcome').append(job_done);
    };    
  },"json");
};



$(document).ready(function() {

  $('#submit_button').click(function(event){
    event.preventDefault();
    var status = $('<h4 id = "processing"> The form is currently processing </h4>');
    $('#welcome').append(status);
    var tweet_text = { "tweet_text": $('#tweet_text').val()};

    $.post('/tweet', tweet_text, function(data){
      $('#processing').hide();
      var success = $('<h4 id = "success"> This is your job id: ' + data + '</h4>');
      $('#welcome').append(success)
        myInterval = setInterval(function() {
        check_status(data);
       },500);
    },"json");
  });
});



