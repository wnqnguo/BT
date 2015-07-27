/* the message box is a div in the DOM tree, 
I didn't append a new div in the DOM for everytime a new message is beign fetched
the box that's moving with the new message is the same div in the DOM
The box appears to be a new box with a new message everytime it reaches to the edge 
of the window*/
$(document).ready(function(){
	//fetch a new message on page load 
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
	//clears the message inside the box
	function Clear(){
		$('#message-box').html("");
	};
	
	function newMessage(message){
		$('#message-box').html(message.text);
	};
	//when the start button is clicked, calls move function
	$('#start').click(function(){
		move('#message-box',5000);	

	});
	// animation for the message-box div
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