/**
 * Created by dahn on 12.05.2017.
 */

Router.route('/', function() {
    Meteor.subscribe("AllItems");
    Session.set('itemType','all');
    this.render('main_page')
});

/* This delivers a text file but I don't know how to get data out of the template
Router.map(function() {
    this.route('txtFile', {
      where: 'server',
      path: '/text',
      template: "Backup",
      action: function() {
        var text = backupAll();
        //var text="Hier soll der Text hin";
        var filename = 'textfile' + '.txt';

        var headers = {
          'Content-Type': 'text/plain',
          'Content-Disposition': "attachment; filename=" + filename
        };

        this.response.writeHead(200, headers);
        return this.response.end(text);
      }
    })
  });
*/
Router.route('/:itemType', function() {
    let type=this.params.itemType.toLowerCase();
    if (['scripts','mathcoach','sagecell'].includes(type)) {
        Meteor.subscribe("Items",type);
        Session.set('itemType',type);
        this.render("main_page");
    } else {
        switch(type) {
            case 'backup':
                //Meteor.subscribe("AllItems").ready();
                Session.set('itemType','all');
                this.render('Backup');
                break;
            default:
                Meteor.subscribe("AllItems");
                Session.set('itemType','all');
                this.render('main_page');
        }
    }

});
