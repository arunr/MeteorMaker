Meteor.publish('items', function() {
    return Items.find({approved: true},{sort: {submitted: -1}});
});

Accounts.onCreateUser(function(options, user) {
    user.tasks = [];
    if (options.profile)
        user.profile = options.profile;
    return user;
});

Meteor.publish("userData", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'tasks': 1, 'services.facebook.link':1}});
});
