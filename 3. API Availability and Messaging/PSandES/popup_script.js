//region {variables and functions}
var sendMessageButtonID = "send_message";
var greeting = "Hello World!";
var message = "Test message X";
function responseCallback(responseObject) {
	console.log("Message '" + responseObject.message + "' from Sender '" + responseObject.sender + "'");
}
//end-region



//region {calls}
console.log(greeting);
document.addEventListener("DOMContentLoaded",function(dcle){
	var buttonID = document.getElementById(sendMessageButtonID);
	buttonID.addEventListener("click",function(ce) {
		//This message will be intercepted by event_script.js
		chrome.runtime.sendMessage(message,responseCallback);
	});
});
//end-region