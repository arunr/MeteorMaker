Meteor.subscribe('items');

Deps.autorun(function() {
    Meteor.subscribe('userData');
});
