/**
 * Created by dahn on 17.05.2017.
 */
Meteor.startup(function () {
    smtp = {
        username: 'dahn@dahn-research.eu',   // eg: server@gentlenode.com
        password: 'ju!Piter',   // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.1und1.de',  // eg: mail.gandi.net
        // port: 25
        port: 465
    };

    process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    /*
    Email.send({
        to: "ingodahn@gmail.com",
        from: "ostmaster@dahn-research.eu",
        subject: "Example Email",
        text: "The contents of our email in plain text.",
    });
    */
});