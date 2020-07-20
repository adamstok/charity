document.addEventListener("DOMContentLoaded", function() {
  /**
   * HomePage - Help section
   */
  class Help {
    constructor($el) {
      this.$el = $el;
      this.$buttonsContainer = $el.querySelector(".help--buttons");
      this.$slidesContainers = $el.querySelectorAll(".help--slides");
      this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
      this.init();
    }

    init() {
      this.events();
    }

    events() {
      /**
       * Slide buttons
       */
      this.$buttonsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("btn")) {
          this.changeSlide(e);
        }
      });

      /**
       * Pagination buttons
       */
      this.$el.addEventListener("click", e => {
        if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
          this.changePage(e);
        }
      });
    }

    changeSlide(e) {
      e.preventDefault();
      const $btn = e.target;

      // Buttons Active class change
      [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
      $btn.classList.add("active");

      // Current slide
      this.currentSlide = $btn.parentElement.dataset.id;

      // Slides active class change
      this.$slidesContainers.forEach(el => {
        el.classList.remove("active");

        if (el.dataset.id === this.currentSlide) {
          el.classList.add("active");
        }
      });
    }

    /**
     * TODO: callback to page change event
     */
    changePage(e) {
      e.preventDefault();
      const page = e.target.dataset.page;

      console.log(page);
    }
  }
  const helpSection = document.querySelector(".help");
  if (helpSection !== null) {
    new Help(helpSection);
  }

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
      //console.log( this.$selectedValues );
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));

    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation
  //   console.log(this.$form.querySelector('input[name="categories"]:checked'));
//     console.log(this.$form.querySelector('input[name="categories"]:checked').val());
//	console.log( this.$selectedValues );

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
      this.$step.parentElement.hidden = this.currentStep >= 6;
    
      // TODO: get data from inputs and show them in summary
//	console.log(this.$form.querySelector("form"));
//	console.log(this.$form.querySelectorAll('input[name="categories"]:checked'));
	var selectedVal = this.$form.querySelectorAll('input[name="categories"]:checked');
	var selectedValues = []
	selectedVal.forEach(e => {
	//	console.log(e.value);
		selectedValues.push(e.value);
	});
	//console.log(selectedValues);

	var showInstitutions = this.$form.querySelectorAll('input[type="radio"]:checked');
	var institutions = []
	var hiddenInput = this.$form.querySelectorAll('input[name="hidden"]');
	var bags = this.$form.querySelector('input[name="bags"]').value;
	var address =  this.$form.querySelector('input[name="address"]').value;
	var city =  this.$form.querySelector('input[name="city"]').value;
	var postcode = this.$form.querySelector('input[name="postcode"]').value;
	var phone= this.$form.querySelector('input[name="phone"]').value;
	var data= this.$form.querySelector('input[name="data"]').value;
	var time= this.$form.querySelector('input[name="time"]').value;
	var moreinfo= this.$form.querySelector('textarea[name="more_info"]').value;

	showInstitutions.forEach(e => {
		//console.log(e);
	});
	showInstitutions.forEach(e => {
		institutions.push(e.value);

	});
	console.log(selectedValues);
	console.log(bags);
	console.log(institutions);
        console.log(address + city + postcode + phone);
	console.log(data + time + moreinfo);
	var formedObject = new Object();
	    selectedValues.forEach(e => {
	    	e = parseInt(e);
	    });
	    formedObject.categories = selectedValues;
	    formedObject.bags = bags;
	    formedObject.institution = institutions;
	    formedObject.address = address;
	    formedObject.city = city;
	    formedObject.postcode = postcode;
	    formedObject.phone = phone;
	    formedObject.date = data;
	    formedObject.time = time;
	    formedObject.info = moreinfo;
	var stringFormedObject = JSON.stringify(formedObject);
	this.stringFormedObj = stringFormedObject;
	console.log(formedObject);
	console.log(stringFormedObject);
	this.$form.querySelector('span[name="worki"]').innerText = bags + ' worków';
	var organizationName = this.$form.querySelector('div[name="organizationname"]').innerText;
	this.$form.querySelector('span[name="dlakogo"]').innerText = 'Dla '+ organizationName;
	this.$form.querySelector('li[name="ulica"]').innerText = address;
	this.$form.querySelector('li[name="miasto"]').innerText = city;
	this.$form.querySelector('li[name="kodpocztowy"]').innerText = postcode;
	this.$form.querySelector('li[name="telefon"]').innerText = phone;
	this.$form.querySelector('li[name="data"]').innerText = data;
	this.$form.querySelector('li[name="godzina"]').innerText = time;
	this.$form.querySelector('li[name="uwagi"]').innerText = moreinfo;
	var el = document.getElementsByName("csrfmiddlewaretoken");
        var csrf_value = el[0].getAttribute("value");


    
    
    }


    /**
     * Submit form
     *
     * TODO: validation, send data to server
     */
    submit(e) {
      e.preventDefault();
      var el = document.getElementsByName("csrfmiddlewaretoken");
      var csrf_value = el[0].getAttribute("value");
      console.log('csrf: '+csrf_value);
      this.currentStep++;
      this.updateForm();


	  $.ajax({
		    type: "POST",
		    url: "/donate/",
		    data: {'donation': this.stringFormedObj, csrfmiddlewaretoken: csrf_value},
		    success: function(result){
		    	console.log('ok');
			window.location.href = "/donated/";
		    }
		
	    
	    });
    }


  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});


