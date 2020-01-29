/*
Goal: Use JavaScript to enhance an interactive registration form for a fictional conference called "FullStack Conference".
A linked was used to access jQuery CDN.*/

/* "Name" Section
Focus was set on the first text input field (Name) and color was added to the field as well.*/

$('#name').focus();

$('#name').focus(function () {
    $(this).css("background-color", "#ccccc");
});

/* "Job Role" Section

All options in the drop down select menu are initally hidden until the user clicks on the drop down menu functions from the jQuery library.
Initially hiding the "other" option allows the <input> element and placeholder string features to work when JavaScript is disabled, plus giving the user
and option to type in text.

In the index.html, an <input> element was added allowing users to fill in the "Job Role - Other" section of the form.
    e.g. <input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">
*/
$('#other-title').hide();

$('#title').click(function () {
    if ($('#title').val() === "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

/* "T-shirt Info" Section

The click event function listens for the user's click on 'theme-design' options.
The if-then statement filters the available "color" options while 
the empty() method removes all child nodes and content from the selected elements. 
Both statements ensure that the user cannot select an invalid combination of 
designs and colors and begins with a clear selection option menu.

The event handler listens for the user's click on web page. 
Since the color element container is empty, the correct colors are 
appended or inserted to the right html id or design. 
*/

$('#colors-js-puns').hide();

$('#design').on('change', function () {
    if ($('#design').val() === "js-puns") {
        $('#color').empty().append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');
        $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');
        $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
        $('#color').show();
    } else {
        $('#color').hide();
        if ($('#design').val() === "heart js") {
            $('#color').empty().append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>')
            $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> ')
            $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>')
            $('#color').show();
        }
    }
});

/* "Register for Activities" section

Goal: To ensure user gets the correct total cost for selected conferences per the checkboxes, and eliminates the user from
choosing conflicting days and times.

The totalCost variable captures the user's totalCost for each clicked event. 
Using the event handler and if-else statement initiates listening and the status of changes in the checked and unchecked properties. 
Each click (change) triggers recalculations of the total cost (+=) and appends the results to the activities in the html class.
*/

let totalCost = 0;

$(".activities").append('<label id ="total">Total Cost: $ </label>');

$('[type = "checkbox"]').change(() => {
    let totalCost = 0;

    if ($('input[name="all"]').prop("checked")) {
        totalCost += 200;
    }

    if ($('input[name="build-tools"]').prop("checked")) {
        totalCost += 100;
    }
    if ($('input[name="npm"]').prop("checked")) {
        totalCost += 100;
    }
    if ($('input[name="js-libs"]').prop("checked")) {
        $('input[name="node"]').attr("disabled", true)
        totalCost += 100;
    } else {
        $('input[name="node"]').removeAttr("disabled", true)

    }
    if ($('input[name="node"]').prop("checked")) {
        $('input[name="js-libs"]').attr("disabled", true)
        totalCost += 100;
    } else {
        $('input[name="js-libs"]').removeAttr("disabled", true)
    }
    if ($('input[name="js-frameworks"]').prop("checked")) {
        $('input[name="express"]').attr("disabled", true)
        totalCost += 100;
    } else {
        $('input[name="express"]').removeAttr("disabled", true)
    }
    if ($('input[name="express"]').prop("checked")) {
        $('input[name="js-frameworks"]').attr("disabled", true)
        totalCost += 100;
    } else {
        $('input[name="js-frameworks"]').removeAttr("disabled", true)
    }
    $('#total').html("<p><strong>Total: $" + totalCost + "</strong><p>")
});

/*Payment Section
Goal: 


*/
$('#credit-card').siblings().eq(3).addClass("paypal");
$('#credit-card').siblings().eq(4).addClass("bitcoin");
$('select option[value="credit card"]').attr("selected", true);
$('select option[value="credit card"]').attr("selected", true);
$('select option[value="select_method"]').hide();
$(".paypal").hide();
$(".bitcoin").hide();

$("payment").on('change', function () {
    if ($(this).val() === "credit card") {
        $("#credit-card").show();
        $(".paypal").hide();
        $(".bitcoin").hide();
    } else if ($(this).val() === "pay pal") {
        $("#credit-card").hide();
        $(".paypal").show();
        $(".bitcoin").hide();
    } else if ($(this).val() === "bitcoin") {
        $("#credit-card").hide();
        $(".paypal").hide();
        $(".bitcoin").show();
    }
});

//Validation Section
$('label[for="name"]').before('<label class="error" id="name-error"></label>');
$('label[for="email"]').before('<label class="error" id="email-error></label>');
$('.activities legend').before('<label class="error" id="activity-error><font>');
$('credit-card').before('<label class="error" id ="empty-error"><font-style: italic>Please enter a valid credit card number.</font></label>');
$('credit-card').before('<label class="error" id ="number-error"><font-style: italic>You enter an invalid credit card number. Please re-enter your credit card number.</font></label>');
$('credit-card').before('<label class="error" id ="zip-error"><font-style: italic>You enter an invalid zip code number. Please re-enter your zip code.</font></label>');
$('credit-card').before('<label class="error" id = "cvv-error><font-style: italic>You enter an invalid zip code number. Please re-enter your zip code.</font></label>');

isValidUserName = (username) => {
    const valid = /^\S/.test(username);
    if (valid) {
        $('#name-error').hide();
        return true;
    } else {
        $('#name-error').show();
        return false;
    }
}

const isValidEmail = (email) => {
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    if (valid) {
        $('#email-error').hide();
        return true;
    } else {
        $('#email-error').show();
        return false;
    }
}

const isValidActivity = (activity) => {
    if ('.activities input :checked') {
        $('#activity-error').hide();
        return true;
    } else {
        $('#activity-error').show();
        return false;
    }
}

const isValidCreditCard = (cc) => {
    let valid = /^\d{13,16}$/.test(cc);
    if ($("#number-error").val() === "cc-num") {
        if ($("#empty-error").val() === " ")
            return true;
    } else {
        $("#number-error").show();
        return false;
    }
}

const isValidZipCode = (zip) => {
    if ($('payment'.val() === "credit-card"));
    let valid = /^\d{5}$/.test("zip");

    if ($("#zip-error").val() === "zip") {
        return true;
    } else {
        $("#zip-error").show();
        return false;
    }
}

const isValidCVV = (cvv) => {
    if ($('payment'.val() === "credit-card"));
    let valid = /^\d{3}$/.test("cvv");

    if ($("#cvv-error").val() === "cvv") {
        return true;
    } else {
        $("#cvv-error").show();
        return false;
    }
}

//Form Validation

const formValidation = () => {
    if ($("payment").val() === "credit card")   {
        if (isValidUserName($("name").val() && isValidEmail($("mail").val()  
            && isValidActivity() && isValidCCNum($("#cc-num").val()  && isValidActivity("#zip")  && isValidCVV("#cvv").val())))); {
            return true;
        }        
    } else {
            isValidUserName($("#name"));
            isValidEmail($("#email"));
            isValidActivity($());
            isValidCCNum($("#cc-num").val());
            isValidZipCode($("#zip").val());
            isValidCVV($("#cvv").val());
            return false;
    } 
    if (isValidUserName($("name").val() && isValidEmail($('#mail'.val())  && isValidActivity()))) {
        return true;

    } else {
        isValidUserName($('#name').val());
        isValidEmail($('#mail').val());
        isValidActivity();
        return false;
    }     

    $("form").on("submit", (e) => {
    if (formValidation() === true) {
        
    }else{
        e.preventDefault();
    }    
    

});

}
