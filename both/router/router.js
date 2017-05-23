/**
 * Created by dahn on 12.05.2017.
 */

Router.route('/', function() {
    Meteor.subscribe("AllItems");
    Session.set('itemType','all');
    this.render('main_page')
});

Router.route('/:itemType', function() {
    var type=this.params.itemType.toLowerCase();
    if (['scripts','mathcoach','sagecell'].includes(type)) {
        Meteor.subscribe("Items",type);
        Session.set('itemType',type);
        this.render("main_page");
    } else {
        Meteor.subscribe("AllItems");
        Session.set('itemType','all');
        this.render('main_page');
    }

});
