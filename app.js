(function() {

  return {
    events: {
      'app.activated':'init'
    },

    shortcutSelectors: {
      ".tab.add": "ctrl-alt-n"
    },

    init: function() {
      this.showNotice = true;
      var that = this;

      var setupEvents = function(shortcut, selector) {
        var $ = this.$;

        $(selector).click(function(){

          if (that.showNotice) {
            var notificationHTML = that.renderTemplate("notification", {
              shortcut: shortcut
            });

            services.notify(notificationHTML);

            var setupClickHandler = function(){
              var onDontShowClick = function(){
                that.showNotice = false;

                var growlNotification = $(this).parents(".jGrowl");
                growlNotification.hide();
              };

              $(".shortcut-reminder").click(onDontShowClick);
            };


            setTimeout(setupClickHandler, 1000); // TODO: make it poll until the button appears
          }
        });
      };

      _(this.shortcutSelectors).each(function(shortcut, selector) {
        setupEvents(shortcut, selector);
      });
    }
  };

}());


// things we're notificing
// services is the worst name ever
// services.notify docs doesn't have correct function signature
// services.notify should have callback?


