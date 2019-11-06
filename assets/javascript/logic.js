$(document).ready(function() {
  $(".collapsible").collapsible();

  $(".modal").modal();

  //Use jQuery to get receive contact form in email, using enformed.
  $("form").submit(event => {
    //prevent default form submission, since we're using AJAX.
    event.preventDefault();
    //Need to validate the form entry
    const formData = {
      name: $("#name")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      subject: $("#subject")
        .val()
        .trim(),
      message: $("#message")
        .val()
        .trim()
    };
    console.log(formData);
    let enteredFields = true;
    for (let [key, value] of Object.entries(formData)) {
      if (value === "") {
        enteredFields = false;
        break;
      }
    }

    if (enteredFields) {
      $.ajax({
        method: "POST",
        url:
          "https://cors-anywhere.herokuapp.com/https://www.enformed.io/atxvthw2/",
        /*dataType: "json",*/
        /*accepts: "application/json",*/
        data: formData,
        success: (data, textStatus, jqXHR) => {
          console.log(jqXHR);
          console.log("I am in success function");
          //empty form fields after successfully sending message.
          $("#name").val("");
          $("#email").val("");
          $("#subject").val("");
          $("#message").val("");
          alert("Thank you! Your message was successfully sent.");
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.log(jqXHR);
          console.log(jqXHR.status);
          if (jqXHR.status === 200) {
            //empty form fields after successfully sending message.***** parsererror has to do with server issue, but the message was successfully sent!.
            $("#name").val("");
            $("#email").val("");
            $("#subject").val("");
            $("#message").val("");
            alert("Thank you! Your message was successfully sent.");
          } else {
            console.log(textStatus);
            console.log(errorThrown);
            console.log("I am in the error function!");
            alert("Your message may not have been sent. Please try again.");
          }
        }
      });
    }
  });
});
