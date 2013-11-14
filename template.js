(function($){

    $.template = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("template", base);

		base.init = function(){
			// Start the engines
        	base.logicEngine();
        	base.repeatEngine();
        	base.templateEngine(base.$el,options);

        	// register callbacks
        	base.registerToggles();
        	base.registerCallbacks();
		};
        base.registerToggles = function (){
        	$(base.$el).find('[data-toggle]').each(function(dummy,el){
        		$(this).bind('click',base.toggleEngine);
        	});
        }
        base.registerCallbacks = function(){
        	$(base.$el).find('[data-callback]').each(function(dummy,el){
        		$(this).bind('click',base.callBackEngine);
        	});
        }
        base.toggleEngine = function(){
        	$(this.getAttribute('data-toggle')).toggle();
        }
        base.callBackEngine = function(){
        	//console.log(base._nusty(options,this.getAttribute('data-toggle-callback')))
        	base._nusty(options,this.getAttribute('data-callback')).call(this);
        }
        base.logicEngine = function(){
        	$(base.$el).find('[data-logic]').each(function(index,el){
        		var check = el.getAttribute('data-logic').match(/!([a-z]*)/);
        		if(check == null){
        			if(base._nusty(options,el.getAttribute('data-logic')) !== undefined)
        				($.inArray(base._nusty(options,el.getAttribute('data-logic')),[false,null,'',[]]) == -1) ? $(el).show() : $(el).hide();
				}else{
        			if(options[check[1]] !== undefined)
        				($.inArray(options[check[1]],[false,null,'']) > -1) ? $(el).show() : $(el).hide();
				}
			})
        }
        base.repeatEngine = function(){
        	$(base.$el).find('[data-repeat]').each(function(index,el){
        		// the father
        		var $father = $(this);
        		//children is my template for the repeated elements
        		var children = $(el).children();
				// Dataset for children template
				var dataset = base._nusty(options,el.getAttribute('data-repeat'));
				$father.empty();
				$.each(dataset,function(dummy,value){
					$father.append(base.replaceEngine(children.clone(),value))
				});
			})
        }
		base.replaceEngine = function(element,dataset){
			$(element).each(function(dummy,el){
				if(el.children.length > 0){
					base.replaceEngine(el.children,dataset)
				}else{
					if(dataset[el.dataset.replace] !== undefined){
						el.innerHTML = base._nusty(dataset,el.getAttribute('data-replace'));
					}
				}
			});
			return element;
		}
        base.templateEngine = function(element,dataset){
        	// Just go to every element and replace with the dataset
            $(element).find('[data-replace]').each(function(index,el){
                if(base._nusty(dataset,el.getAttribute('data-replace')) !== undefined){
                    el.innerHTML = base._nusty(dataset,el.getAttribute('data-replace'));
				}
            })
        }
        base._nusty = function(data,str){
        	 return str.split(".").reduce(function(o, x) { return o[x] }, data);
        }
        base.init();
    };
	$.fn.template = function(options){
        return this.each(function(){
            (new $.template(this, options));
        });
    };
})(jQuery);