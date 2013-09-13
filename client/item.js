Template.item.events({
	'click .checkbox': function(e,t) {
		if (Meteor.user()) {
					console.log("clicked");

			if (t.find(".checkbox").checked) {
				Meteor.users.update({_id:Meteor.user()._id}, {$addToSet:{tasks : this._id }});
			} else {
				Meteor.users.update({_id:Meteor.user()._id}, {$pull:{tasks : this._id }});
			}
		} else {
			if (t.find(".checkbox").checked) {
				Session.set(this._id, true);
			} else {
				Session.set(this._id, false);
			}
		}

	}
})

Template.item.helpers({
	getDate : function() { 
		//return moment(this.submitted, 'MM-DD-YYYY');
		return (moment(this.submitted)).format("YYYY-MM-DD HH:mm");
		//var d = new Date(this.submitted);
		//return (d.toLocaleDateString() + ', ' + d.toLocaleTimeString());
	}
})

Template.item.index = function() {
	return Items.find().count() - Items.find({_id: {$lte: this._id}}).count() + 1
}

Template.item.viewed = function() {
	if (Meteor.user()) {
		return Meteor.user().tasks.indexOf(this._id) != -1;		
	} else {
		return !!Session.get(this._id);
	}

}