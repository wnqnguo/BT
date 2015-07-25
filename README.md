# BT
simple fullstack app backend has two endpoints: /helo and /ehlo, first endpoint extract your IP address, create a sha2 hash and set a cookie,
second endpoint verifies if the cookie is set. Frontend is a web page that on loading makes the /helo call via ajax. 
A button the the page that starts a sort of slideshow: it gets the message via a call to /ehlo and renders it in a
box on the right edge of the window. This box is expected to slide to the left on its own and once it reaches the 
left edge another box should show up on the right with a new message.
