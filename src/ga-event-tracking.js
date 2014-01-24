/**
 * Tracker.js
 * description:  Google Analytics event tracking
 * version:      0.1.0
 * authors:      Noah Hamann
 * repo:         https://github.com/njhamann/Tracker.js
 *
 * to do: 
 * - create a white list function for
 *   free-for-all event tracking
 * - set default category to current path
 */

(function(){
    var GAEventTracking = (function(){
        //private
        function addLiveListener(eventType, selector, callback){
            if(!eventType || !selector) return;
            document.addEventListener(eventType, function (e) {
                var el = e.target,
                    found;
                
                while (el) {
                    found = Sizzle.matchesSelector(el, selector);
                    if(found) break;
                    el = el.parentElement;
                }

                if (found && callback) {
                    callback.call(el, e);
                }
            });
        } 

        function addListeners(selector, eventType){
            var events = eventType.replace(/\s+/g, '').split(',');
            for(var b = 0; b < events.length; b++){
                addLiveListener(events[b], selector, pushEvent);
            }
        }

        function pushEvent(e){
            e.preventDefault();
            var elm = this,
                gaCategory = elm.getAttribute('data-ga-category') || window.location.pathname || null,
                gaAction = elm.getAttribute('data-ga-action') || e.type || null,
                gaLabel = elm.getAttribute('data-ga-label') || elm.getAttribute('data-ga-click') || elm.innerHTML.replace(/<[^>]*>/g, ""),
                gaValue = parseInt(elm.getAttribute('data-ga-value'), 10) || null,
                gaNonInteraction = elm.getAttribute('data-ga-non-interaction') == 'true';
            
            if(_gaq && gaCategory && gaAction && gaLabel){
                _gaq.push(['_trackEvent', gaCategory, gaAction, gaLabel, gaValue, gaNonInteraction]);
            }
        }

        addListeners('[data-ga-track]', 'click,focus,blur');
        addListeners('[data-ga-click]', 'click');
        addListeners('[data-ga-focus]', 'focus');
        addListeners('[data-ga-blur]', 'blur');
        
        //public
        var addGlobalElements = function(tracking){
            /**
             * whitelisting
             * GAEventTracking.addTracking(selector, options);
             * GAEventTracking.addTracking({
             *     selector:        'a, button',
             *     events:          'click, focus, blur',
             *     category:        'cat',
             *     action:          'click',
             *     label:           'label that will be applied to all',
             *     value:           20,
             *     non_interaction: true
             * });
             */
            
        };

        var addGAScript = function(uaid){
            /**
             * Tracking Basics (Asynchronous Syntax)
             * https://developers.google.com/analytics/devguides/collection/gajs/
             * Must be called manually, will not run by default
             */

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', uaid]);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
            
            this.addGAScript = function(){
                return _gaq;
            };
        };

        return {
            addGAScript: addGAScript,
            addTracking: addTracking
        };

    })();
    window.GAEventTracking = GAEventTracking;
})();
