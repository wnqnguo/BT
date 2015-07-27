$(document).ready(function(){
    getMsg();
	function getMsg(){
		$.ajax({
 		type: "GET",
  		url:"/ehlo",
  			success: function(data) {
  				console.log(data.text);
   		 		newMessage(data);
	  		}
		});
	};
	function Clear(){
		$('#message-box').html("");
	};
	
	function newMessage(message){
		$('#message-box').html(message.text);
	};
	$('#start').click(function(){
		move('#message-box',5000);	

	});
	function move (target, speed){
		
		$(target).css("left", "73%");

		$(target).animate(
			{
				'left': 10
			},
			{
				duration: speed,
				complete: function(){
					Clear();
					getMsg();
					move(this, speed);
				}
			}
		);
	}

	
});