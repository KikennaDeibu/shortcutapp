(function() {

  return {
    events: {
      'app.activated':'init'
    },

    shortcuts: [{
            selector: ".tab.add",
            name: "add-ticket",
            keyCommand: "ctrl-alt-n"
        },

        {
            selector: ".dashboard.toolbar_link",
            name: "go-home",
            keyCommand: "ctrl-alt-h"
        },

        {
            selector: ".header-search",
            name: "search",
            keyCommand: "ctrl-alt-f"
        }
    ],

    getIgnoredShortcuts: function(){
      return this.store('ignoredShortcuts') || [];
    },

    init: function() {
      this.showNotice = true;


      var app = this;

      var setupEvents = function(shortcut) {
        var $ = this.$;

        $(shortcut.selector).click(function(){
          var ignoredShortcut = _(app.getIgnoredShortcuts()).contains(shortcut.name);

          if (ignoredShortcut) {
            return;
          }

          if (app.showNotice) {
            var notificationHTML = app.renderTemplate("notification", {
              shortcut: shortcut
            });

            services.notify(notificationHTML);

            var setupClickHandler = function(){
              var onDontShowClick = function(){
                app.showNotice = false;

                var growlNotification = $(this).parents(".jGrowl-notification");
                growlNotification.hide();
              };

              $(".ignore-all-shortcuts").click(onDontShowClick);

              $(".ignore-shortcut." + shortcut.name).click(function(){
                var ignoredShortcuts = app.getIgnoredShortcuts();
                ignoredShortcuts.push(shortcut.name);
                app.store("ignoredShortcuts", ignoredShortcuts);

                var growlNotification = $(this).parents(".jGrowl-notification");
                growlNotification.hide();
              });
            };


            setTimeout(setupClickHandler, 1000); // TODO: make it poll until the button appears
          }
        });
      };

      _(this.shortcuts).each(function(shortcut) {
        setupEvents(shortcut);
      });
    }
  };

}());


// things we're notificing
// services is the worst name ever
// services.notify docs doesn't have correct function signature
// services.notify should have callback?
// ctrl-alt-v doesn't work?!
// search + growl == bleh


