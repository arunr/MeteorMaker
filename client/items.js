Template.items.items = function() {
	return Items.find();
}

Template.items.events({
	'click #new_post': function(e,t) {
		var $this = $(e.target);
    	$this.next().show();
    	$(e.target).hide();
	},

	'click #hide_post': function(e,t) {
		e.preventDefault();
		$(e.target).parent().find('[name=title]').val("");
		$(e.target).parent().find('[name=code]').val("");
		$(e.target).parent().find('[name=notes]').val("");
		var $this = $(e.target).parents().eq(3);
		$this.hide();
		$this.prev().show();
	},

	'submit form': function(e,t) {

		e.preventDefault();
		var parent = $(e.target).parent();
		var message = parent.next();
		var converter = new Showdown.converter();

		var item = {
			title: $(e.target).find('[name=title]').val(),
			code: "<pre>" +converter.makeHtml($(e.target).find('[name=code]').val()) + "</pre>",
			notes: converter.makeHtml($(e.target).find('[name=notes]').val()),
		}

		result = Meteor.call('insertItem', item, function(e,r) {
			if (e) {
				message.text(e);
				message.addClass("error");
				message.removeClass("success");
				message.show().fadeOut(5000);			
			} else {
				parent.hide();			
				message.text(r);
				message.addClass("success");
				message.removeClass("error");
				message.show().fadeOut(2000);
				parent.prev().show();
			}
		})

	}
})