# tf-email

Trying to do something about email for the time poor.


## testing with dovecot

I installed dovecot-imapd on ubuntu and then made these changes:


```
diff --git a/conf.d/10-auth.conf b/conf.d/10-auth.conf
index 1c59eb4..664cd8e 100644
--- a/conf.d/10-auth.conf
+++ b/conf.d/10-auth.conf
@@ -7,7 +7,7 @@
 # matches the local IP (ie. you're connecting from the same computer), the
 # connection is considered secure and plaintext authentication is allowed.
 # See also ssl=required setting.
-#disable_plaintext_auth = yes
+disable_plaintext_auth = no
 
 # Authentication cache size (e.g. 10M). 0 means it's disabled. Note that
 # bsdauth, PAM and vpopmail require cache_key to be set for caching to be used.
@@ -119,10 +119,10 @@ auth_mechanisms = plain
 #!include auth-deny.conf.ext
 #!include auth-master.conf.ext
 
-!include auth-system.conf.ext
+#!include auth-system.conf.ext
 #!include auth-sql.conf.ext
 #!include auth-ldap.conf.ext
-#!include auth-passwdfile.conf.ext
+!include auth-passwdfile.conf.ext
 #!include auth-checkpassword.conf.ext
 #!include auth-vpopmail.conf.ext
 #!include auth-static.conf.ext
diff --git a/conf.d/10-mail.conf b/conf.d/10-mail.conf
index cc0d35e..578c390 100644
--- a/conf.d/10-mail.conf
+++ b/conf.d/10-mail.conf
@@ -27,7 +27,8 @@
 #
 # <doc/wiki/MailLocation.txt>
 #
-mail_location = mbox:~/mail:INBOX=/var/mail/%u
+#mail_location = mbox:~/mail:INBOX=/var/mail/%u
+mail_location = maildir:/home/nicferrier/maildir/%u
 
 # If you need to set multiple mailbox locations or want to change default
 # namespace settings, you can do it by defining namespace sections.
diff --git a/dovecot.conf b/dovecot.conf
index c802011..54b7f87 100644
--- a/dovecot.conf
+++ b/dovecot.conf
@@ -27,10 +27,10 @@
 # "*" listens in all IPv4 interfaces, "::" listens in all IPv6 interfaces.
 # If you want to specify non-default ports or anything more complex,
 # edit conf.d/master.conf.
-#listen = *, ::
+listen = 127.0.0.1
 
 # Base directory where to store runtime data.
-#base_dir = /var/run/dovecot/
+base_dir = /var/run/dovecot/
 
 # Name of this instance. In multi-instance setup doveadm and other commands
 # can use -i <instance_name> to select which instance is used (an alternative
@@ -39,7 +39,7 @@
 #instance_name = dovecot
 
 # Greeting message for clients.
-#login_greeting = Dovecot ready.
+login_greeting = TF Dovecot ready.
 
 # Space separated list of trusted network ranges. Connections from these
 # IPs are allowed to override their IP addresses and ports (for logging and

```

