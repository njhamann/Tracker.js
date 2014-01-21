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

        function live(eventType, elementId, cb){
            document.addEventListener(eventType, function (event) {
                var el = event.target, 
                    found;

                while (el && !(found = el.id === elementId)) {
                    el = el.parentElement;
                }

                if (found) {
                    cb.call(el, event);
                }
            });
        } 

        function addListeners(elements, eventType){
            var events = eventType.replace(/\s+/g, '').split(',');
            for(var a = 0; a < elements.length; a++){
                for(var b = 0; b < events.length; b++){
                    elements[a].addEventListener(events[b], pushEvent);
                }
            }
        }

        function pushEvent(e){
            e.preventDefault();
            var elm = e.currentTarget,
                gaCategory = elm.getAttribute('data-ga-category') || 'app',
                gaAction = elm.getAttribute('data-ga-action') || e.type || null,
                gaLabel = elm.getAttribute('data-ga-label') || elm.getAttribute('data-ga-click') || $this.text(),
                gaValue = parseInt(elm.getAttribute('data-ga-value'), 10) || null,
                gaNonInteraction = elm.getAttribute('data-ga-non-interaction') == 'true';
            
            if(_gaq && gaAction && gaLabel){
                _gaq.push(['_trackEvent', gaCategory, gaAction, gaLabel, gaValue, gaNonInteraction]);
            }
        }


        var trackElms = document.querySelectorAll('[data-ga-track]'),
            clickElms = document.querySelectorAll('[data-ga-click]'),
            focusElms = document.querySelectorAll('[data-ga-focus]'),
            blurElms = document.querySelectorAll('[data-ga-blur]');

        addListeners(trackElms, 'click,focus,blur');
        addListeners(clickElms, 'click');
        addListeners(focusElms, 'focus');
        addListeners(blurElms, 'blur');

        //removing jquery dep
        //$doc.on('click', '[data-ga-track], [data-ga-click]', pushEvent);
        //$doc.on('focus', '[data-ga-track], [data-ga-focus]', pushEvent);
        //$doc.on('blur', '[data-ga-track], [data-ga-blur]', pushEvent);
        
    })();
})();
