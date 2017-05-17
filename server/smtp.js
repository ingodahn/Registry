/**
 * Created by dahn on 17.05.2017.
 */
Meteor.startup(function () {
    smtp = {
        username: 'dahn',   // eg: server@gentlenode.com
        password: 'XXXX',   // eg: 3eeP1gtizk5eziohfervU
        server:   'smtp.uni-koblenz.de',  // eg: mail.gandi.net
        // port: 25
        port: 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});