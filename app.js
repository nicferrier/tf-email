var ImapClient = require("emailjs-imap-client");
var client = new ImapClient("localhost", 143, {
    auth: {
	user: "nferrier",
	pass: "easy"
    }
});

client.onerror = function (err) {
    console.log("some imap error", err);
}


client.connect().then(() => {
    client.selectMailbox("INBOX")
	.then((mailbox) => {
	    console.log("mailbox", mailbox);

	    client.listMessages("INBOX", "1:5", ["uid", "flags", "body", "envelope"])
		.then((messages) => {
		    console.log(JSON.stringify(messages,null,2));
		});
	});
    
});



setTimeout(() => {
    client.close();
}, 2 * 60 * 1000);

// app.js ends here
