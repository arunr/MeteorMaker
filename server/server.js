Meteor.users.allow({update: function (id) { return Meteor.user()._id === id; }});

Meteor.methods({
    insertItem: function(item) {
        var user = Meteor.user(),
            itemWithSameTitle = Items.findOne({title: item.title});
        if (!user)
            throw new Meteor.Error(401, "You need to login to post new stories.");
        // ensure the post has a title
        if (!item.title)
            throw new Meteor.Error(422, 'Please fill in a title.');
        // check that there are no previous posts with the same link
        if (itemWithSameTitle) {
            throw new Meteor.Error(302,
                'This title has already been posted.',
                itemWithSameTitle._id);
        }
        // pick out the whitelisted keys
        var item = _.extend(_.pick(item, 'title', 'code', 'notes'), {
            userId: user._id,
            author: user.profile.name,
            submitted: new Date().getTime()
        });
        var itemId = Items.insert(item);
        return "Your submission is waiting for approval.";
    }
})
