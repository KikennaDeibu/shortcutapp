(function() {

  return {
    events: {
      'app.activated':'init'
    },

    init: function() {
      this.showNotice = true;
      var that = this;

      var setupEvents = function() {
        var $ = this.$;

        $(".tab.add").click(function(){

          if (that.showNotice) {
            services.notify("<p>Use a keyboard shortcut</p> <button class='shortcut-reminder'>Don't show this again</button>", 'notice', 6000);

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

      setupEvents();
    }
  };

}());


// things we're notificing
// services is the worst name ever
// services.notify docs doesn't have correct function signature
// services.notify should have callback?


