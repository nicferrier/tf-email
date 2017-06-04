

var ImapClient = require("emailjs-imap-client");
var client = new ImapClient("localhost", 143, {
    auth: {
	user: "nferrier",
	pass: "easy"
    }
});

setTimeout(() => {
    client.close();
}, 2 * 60 * 1000);


client.onerror = function (err) {
    console.log("some imap error", err);
}


client.connect().then(() => {
    client.listMailboxes()
	.then((mailboxes) => {
	    console.log("mailboxes", mailboxes);
	});
    client.selectMailbox("INBOX")
	.then((mailbox) => {
	    console.log("mailbox", mailbox);

	    client.listMessages("INBOX", "1:5000", ["uid", "flags", "body", "envelope"])
		.then((messages) => {
		    var to = {};
		    messages.forEach((v, i, arr) => {
			try {
			    var uid = v.uid;
			    var env = v.envelope;
			    var toEmail = env.to[0].address;
			    if (to[toEmail] == null) {
				to[toEmail] = [v];
			    }
			    else {
				to[toEmail].push(v);
			    }
			}
			catch (e) {
			    console.log("error", e);
			}
		    });
		    presentEmails(to);
		});
	});
    
});


function presentEmails (list) {
    var struct = {};
    Object.keys(list).forEach((email) => {
	var messages = list[email];
	messages.forEach((v, i, arr) => {
	    if (struct[email] == null) {
		struct[email] = {};
	    }
	    
	    var uid = v.uid;
	    var env = v.envelope;
	    var fromEmail = env.from[0].address;
	    var replyEmail = env["reply-to"][0].address;
	    var senderEmail = env.sender[0].address;
	    if (struct[email][fromEmail] != null) {
		struct[email][fromEmail].push(v);
	    }
	    else {
		struct[email][fromEmail] = [v];
	    }
	});
    });
    console.log(JSON.stringify(struct, null, 2));
    
}

// app.js ends here
