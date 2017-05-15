/**
 * Created by dahn on 12.05.2017.
 */

Router.route('/', function() {
    this.render('RegSelect')
});

Router.route('/:itemType', function() {
    var type=this.params.itemType.toLowerCase();
    if (['mathcoach','sagecell'].includes(type)) {
        Meteor.subscribe("Items",type);
        Session.set('itemType',type);
        this.render("main_page");
    } else {
        Session.set('itemType',null);
        this.render('RegSelect');
    }

});
