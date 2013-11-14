template.js
===========

Description
-----------
A javascript template engine

Usage
----

``` javascript
$('#test').template({ 
    'firstname' : 'A firstname',
    'lastname'  : 'A lastname',
    'positions' : [
        {'title':'A position title', 'year': 'A year'},
        {'title':'A position title', 'year': 'A year'},
        {'title':'A position title', 'year': 'A year'},
        {'title':'A position title', 'year': 'A year'}
        ],
    'age' : false
})
```

``` html
<div id="test">
    <p data-replace="firstname"></p> 
    <ul data-repeat="positions"> 
        <li><span data-replace="title"></span></li>
    </ul>
    <p data-logic="!age">Guess what no age!</p>
</div>
```

Documentation
-------------
See demo/index.html

More Details
------------
See template.html

