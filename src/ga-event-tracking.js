/**
 * Google Analytic Event Tracking
 * just add 'data-ga-click="compose button"'
 * to any element to start tracking events
 * to do: 
 * - create live events
 * - create a white list function for
 *   free-for-all event tracking
 */

(function(){
    var gaEvents = (function(){

        /*
        <a href="#" 
            data-ga-track 
            data-ga-category="publish" 
            data-ga-action="click" 
            data-ga-label="compose" 
            data-ga-value="22" 
            data-ga-non-interaction="true">Anchor tag</a>
        
        <a href="#" 
            data-ga-click="compose button" 
            data-ga-category="publish" 
            data-ga-action="click" 
            data-ga-label="compose button overwrite label" 
            data-ga-value="22" 
            data-ga-non-interaction="true">Anchor tag</a>

        <a href="#" data-ga-click="compose button">Anchor tag</a>
        <a href="#" data-ga-focus="compose main textarea">Anchor tag</a>
        */

        function addLiveListener(eventType, selector, callback){
            if(!eventType || !selector) return;
            document.addEventListener(eventType, function (e) {
                var el = e.target,
                    found;
                
                while (el) {
                    if(found = Sizzle.matchesSelector(el, selector)) {
                        console.log(el);
                        console.log(selector);
                        break;
                    }
                    el = el.parentElement;
                }

                if (found && callback) {
                    console.log(el);
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
            console.log(e.target);
            var elm = this,
                gaCategory = elm.getAttribute('data-ga-category') || 'app',
                gaAction = elm.getAttribute('data-ga-action') || e.type || null,
                gaLabel = elm.getAttribute('data-ga-label') || elm.getAttribute('data-ga-click') || elm.innerHTML.replace(/<[^>]*>/g, ""),
                gaValue = parseInt(elm.getAttribute('data-ga-value'), 10) || null,
                gaNonInteraction = elm.getAttribute('data-ga-non-interaction') == 'true';
            
            if(_gaq && gaAction && gaLabel){
                _gaq.push(['_trackEvent', gaCategory, gaAction, gaLabel, gaValue, gaNonInteraction]);
            }
        }

        addListeners('[data-ga-track]', 'click,focus,blur');
        addListeners('[data-ga-click]', 'click');
        addListeners('[data-ga-focus]', 'focus');
        addListeners('[data-ga-blur]', 'blur');

    })();
})();
