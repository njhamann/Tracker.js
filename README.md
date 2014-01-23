# Tracker.js
Google Analytics event tracking

### How to use
```html
<!-- simple usage -->
<a href="#" data-ga-track>Anchor tag</a>       

<!-- preferred usage -->
<a href="#" data-ga-focus="compose main textarea">Anchor tag</a>

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

Supported browsers
------------------

* Google Chrome (including mobile)
* Firefox
* Safari (including mobile)
* IE 9+

Support for older browsers coming soon
