# Tracker.js
Google Analytics event tracking


### How to use

#### First include Tracker.js
If you don't have Google Analytics already installed, Tracker.js provides a convenience method to add it to the page.

```html
<script type="text/javascript" src="/js/Tracker.min.js"></script>
<script>
    GAEventTracking.addGAScript('UA-XXXXX-X');
</script>
```

#### Start adding tracking attributes
```html
<!-- simple usage -->
<a href="#" data-ga-track>Anchor tag</a>       

<!-- preferred usage -->
<a href="#" data-ga-click="compose main textarea">Anchor tag</a>

<!-- complex usage -->
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
```

### Supported browsers

* Google Chrome (including mobile)
* Firefox
* Safari (including mobile)
* IE 9+

Support for older browsers coming soon

### Tracking reference

* category (required) - The name you supply for the group of objects you want to track.

* action (required) - A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.

* label (optional) - An optional string to provide additional dimensions to the event data.

* value (optional) - An integer that you can use to provide numerical data about the user event.

* non-interaction (optional) - A boolean that when set to true, indicates that the event hit will not be used in bounce-rate calculation.
