const createUser = function() {
    const username = $("#InputUsername").val();
    const pass1 = $("#InputPassword1").val();
    const pass2 = $("#InputPassword2").val();
    const email = $("#inputEmail").val();
    if (username != "" && pass1 != "" && pass1 === pass2 && email != "") {
        $.post("/api/login", {
            username: username,
            password: pass1,
            email: email,
            first_name: $("#InputFirstName").val(),
            last_name: $("#InputLastName").val(),
            state: $("#InputState").val(),
            country: $("#InputCountry").val()
        }).done(console.log);
    } else {
        console.log("something went wrong");
    }
};
