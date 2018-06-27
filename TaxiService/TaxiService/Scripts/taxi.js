$(document).ready(function () {

    $("div#divService").hide();
    $("div#divLink").hide();
    $("div#divSearch").hide();
    $("div#divLink2").hide();
    $("div#divSort").hide();
    $("div#divLink3").hide();
    $("div#divLogout").hide();

    $("#divNaslov").animate({ "left": "0px" }, "slow");


    $("a#link1").click(function () {
        $("div#div1").html("<form id=\"formRegistration\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Registration/RegisterAccount\">" +
            "<table class=\"tabela\">" +
            "<tr><td>Username:</td><td><input type=\"text\" id=\"usernameId\" name=\"username\" /></td></tr>" +
            "<tr><td>Password:</td><td><input type=\"password\" id=\"passwordId\" name=\"password\" /></td></tr>" +
            "<tr><td>Name:</td><td><input type=\"text\" id=\"nameId\" name=\"name\" /></td></tr>" +
            "<tr><td>Surname:</td><td><input type=\"text\" id=\"surnameId\" name=\"Surname\" /></td>" +
            "<tr><td>Jmbg:</td><td><input type=\"text\" id=\"jmbgId\" name=\"jmbg\" /></td></tr>" +
            "<tr><td>Phone:</td><td><input type=\"text\" id=\"phoneId\" name=\"phone\" /></td></tr>" +
            "<tr><td>Email:</td><td><input type=\"text\" id=\"emailId\" name=\"email\" /></td></tr>" +
            "<tr><td>Gender:</td><td><input type=\"radio\" id=\"genderId\" name=\"gender\" id=\"genderId\" checked value=\"Male\">Male" +
            "<input type=\"radio\" name=\"gender\" value=\"Female\">Female </td></tr>" +
            "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Register\" /></td></tr></table></form>");

    });

    //Validacija registracije
    var isValidate = false;

    function Validate() {

        if ($("#nameId").val()) {
            isValidate = true;
        }
        else {
            $("#nameId").attr("placeholder", "Enter your name").placeholder;
            isValidate = false;
        }
        if ($("#surnameId").val()) {
            isValidate = true;
        }
        else {
            $("#surnameId").attr("placeholder", "Enter your surname").placeholder;
            isValidate = false;
        }
        if ($("#usernameId").val()) {
            isValidate = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidate = false;
        }

        if ($("#passwordId").val()) {
            isValidate = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidate = false;
        }

        if ($("#jmbgId").val()) {
            isValidate = true;
            let jmbg = $("#jmbgId").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidate = false;
            }
            else if (jmbg.length != 13) {
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must have 13 characters").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#jmbgId").attr("placeholder", "Enter your jmbg").placeholder;
            isValidate = false;
        }
        if ($("#phoneId").val()) {
            isValidate = true;
            let phone = $("#phoneId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneId").val("");
                $("#phoneId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#phoneId").attr("placeholder", "Enter your phone number").placeholder;
            isValidate = false;
        }
        if ($("#emailId").val()) {
            isValidate = true;
            let email = $("#emailId").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.match(re)) {
                $("#emailId").val("");
                $("#emailId").attr("placeholder", "Invalid e-mail").placeholder;
                isValidate = false;
            }
        }
        else {
            $("#emailId").attr("placeholder", "Enter your e-mail").placeholder;
            isValidate = false;
        }
        if ($("#nameId").val() && $("#surnameId").val() && $("#usernameId").val() && $("#passwordId").val() && $("#jmbgId").val() && $("#phoneId").val() && $("#emailId").val()) {
            isValidate = true;
        }
        else {
            isValidate = false;
        }

    }

    $("a#link1").click(function () {
        $("form#formRegistration").submit(function (e) {
            Validate();
            if (isValidate) {
                $.ajax({
                    url: "/api/Registration/RegisterAccount",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Name: $("#nameId").val(),
                        Surname: $("#surnameId").val(),
                        Username: $("#usernameId").val(),
                        Password: $("#passwordId").val(),
                        Jmbg: $("#jmbgId").val(),
                        Gender: $("input[name=gender]").filter(":checked").val(),
                        Phone: $("#phoneId").val(),
                        Email: $("#emailId").val(),
                    },
                    success: function (html) {
                        alert("Uspjesno ste se registrovali");

                    },
                    error: function () {
                        alert("Greska pri registraciji.");
                    }
                });
            }
            e.preventDefault();
        });
    });

    $("a#link2").click(function () {

        $("div#div1").html("<form id=\"form1\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Login/Login\">" +
            "<table class=\"tabela\">" +
            "<tr><td>Username:</td><td><input id=\"usernameId\" type=\"text\" name=\"username\" /></td></tr>" +
            "<tr><td>Password:</td><td><input id=\"passwordId\" type=\"password\" name=\"password\" /></td></tr>" +
            "<tr><td colspan=\"2\"><input type=\"submit\" id=\"log\" value=\"Login\"/></td></tr>" +
            "</table></form>");

        $("form#form1").submit(function (e) {
            ValidateLogin();
            if (isValidateLogin) {
                $.ajax({
                    url: "/api/Login/Login",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Username: $("#usernameId").val(),
                        Password: $("#passwordId").val(),
                    },
                    success: function (html) {

                        alert("Uspjesno ste se logovali");

                        $("div#divService").show();
                        $("div#divSearch").show();
                        $("div#divSort").show();
                        $("div#divLogout").show();

                        $.get("api/Login/Get", function (data, status) {

                            let linkovi = "<a id=\"link4\">Edit profile</a><br/>";
                            linkovi += "<a id=\"link19\">Filter drives</a>";
                            let linkoviSearch = "<a id=\"linkByOrderDate\">by order date</a></br><a id=\"linkByGradeSearch\">by grade</a></br><a id=\"linkByPrice\">by price</a>";

                            if (data.Role == 2) {
                                linkoviSearch += "</br><a id=\"linkSearchByCustomer\">by customer</a></br><a id=\"linkSearchByDriver\">by driver</a>";
                                linkovi += "<br><a id=\"link5\">Add driver</a>";
                                linkovi += "<br><a id=\"link10\">Create drive</a>";
                                linkovi += "<br><a id=\"link11\">Process drive</a>";
                                linkovi += "<br><a id=\"link15\">All drives</a>";
                                linkovi += "<br><a id=\"link16\">Your drives</a>";
                            }
                            else if (data.Role == 0) {
                                linkovi += "<br><a id=\"link6\">Change location</a>";
                                linkovi += "<br><a id=\"link12\">Successful drive</a>";
                                linkovi += "<br><a id=\"link13\">Unsuccessful drive</a>";
                                linkovi += "<br><a id=\"link17\">Your drives</a>";
                                linkovi += "<br><a id=\"link18\">Created drives</a>";
                                linkovi += "<br><a id=\"link20\">Accept drive</a>";
                            }
                            else if (data.Role == 1) {
                                linkovi += "<br><a id=\"link7\">Create drive</a></br><a id=\"link8\">Change drive</a>";
                                linkovi += "<br><a id=\"link9\">Cancel drive</a>";
                                linkovi += "<br><a id=\"link14\">Drives</a>";
                                linkovi += "<br><a id=\"linkComment\">Comment drive</a>";
                            }

                            $("div#divLink").html(linkovi);
                            $("div#divLink2").html("<a id=\"linkByDate\">by date</a></br><a id=\"linkByGrade\">by grade</a>");
                            $("div#divLink3").html(linkoviSearch);
                            $("div#divLink").hide();
                            $("div#divLink2").hide();
                            $("div#divLink3").hide();

                        });
                    },
                    error: function () {
                        alert("Greska pri logovanju.");
                    }
                });
            }
            e.preventDefault();
        });

    });

    //Validacija registracije
    var isValidateLogin = false;

    function ValidateLogin() {

        if ($("#usernameId").val()) {
            isValidate = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateLogin = false;
            }
        }
        else {
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidateLogin = false;
        }

        if ($("#passwordId").val()) {
            isValidateLogin = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateLogin = false;
            }
        }
        else {
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidateLogin = false;
        }

        if ($("#usernameId").val() && $("#passwordId").val()) {
            isValidateLogin = true;
        }
        else {
            isValidateLogin = false;
        }
    }

    $("a#link3").click(function () {

        $("div#divLink").slideToggle();

        $("a#link4").click(function () {

            $.get("api/Login/Get", function (data, status) {

                $("div#div1").html(`<form id=\"formEditProfile\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/User/Edit\">` +
                    `<table class=\"tabela\">` +
                    `<tr><td>Username:</td><td><input type=\"text\" id=\"usernameId\" name=\"username\" value=\"${data.Username}\"/></td></tr>` +
                    `<tr><td>Password:</td><td><input type=\"password\" id=\"passwordId\" name=\"password\" value=\"${data.Password}\" /></td></tr>` +
                    `<tr><td>Name:</td><td><input type=\"text\" name=\"name\" id=\"nameId\" value=\"${data.Name}\"/></td></tr>` +
                    `<tr><td>Surname:</td><td><input type=\"text\" name=\"surname\" id=\"surnameId\" value=\"${data.Surname}\"/></td>` +
                    `<tr><td>Jmbg:</td><td><input type=\"text\" name=\"jmbg\" id=\"jmbgId\" value=\"${data.Jmbg}\" /></td></tr>` +
                    `<tr><td>Phone:</td><td><input type=\"text\" name=\"phone\" id=\"phoneId\" value=\"${data.Phone}\" /></td>` +
                    `<tr><td>Email:</td><td><input type=\"text\" name=\"email\" id=\"emailId\" value=\"${data.Email}\" /></td>` +
                    `<tr><td colspan=\"2\"><input type=\"submit\" value=\"Edit\" /></td></tr></table></form>`);

                $("form#formEditProfile").submit(function (e) {
                    ValidateEdit();
                    if (isValidateEdit) {
                        $.ajax({
                            url: "/api/User/Edit",
                            method: "POST",
                            dataType: "json",
                            data: {
                                Name: $("#nameId").val(),
                                Surname: $("#surnameId").val(),
                                Username: $("#usernameId").val(),
                                Password: $("#passwordId").val(),
                                Jmbg: $("#jmbgId").val(),
                                Phone: $("#phoneId").val(),
                                Email: $("#emailId").val(),
                            },
                            success: function (html) {
                                alert("Uspjesno ste izmjenili podatke");
                            },
                            error: function () {
                                alert("Greska pri izmjeni profila.");
                            }
                        });
                    }
                    e.preventDefault();
                });

            });
        });

        $("a#link5").click(function () {

            $("div#div1").html("<form id=\"formAddDriver\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Dispatcher/AddDriver\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Username:</td><td><input type=\"text\" id=\"usernameId\" name=\"username\" /></td></tr>" +
                "<tr><td>Password:</td><td><input type=\"password\" id=\"passwordId\" name=\"password\" /></td></tr>" +
                "<tr><td>Name:</td><td><input type=\"text\" id=\"nameId\" name=\"name\" /></td></tr>" +
                "<tr><td>Surname:</td><td><input type=\"text\" id=\"surnameId\" name=\"surname\" /></td>" +
                "<tr><td>Jmbg:</td><td><input type=\"text\" id=\"jmbgId\" name=\"jmbg\" /></td></tr>" +
                "<tr><td>Phone:</td><td><input type=\"text\" id=\"phoneId\" name=\"phone\" /></td></tr>" +
                "<tr><td>Email:</td><td><input type=\"text\" id=\"emailId\" name=\"email\" /></td></tr>" +
                "<tr><td>Gender:</td><td><input type=\"radio\" id=\"genderId\" name=\"gender\" id=\"genderId\" checked value=\"Male\">Male" +
                "<input type=\"radio\" name=\"gender\" value=\"Female\">Female </td></tr>" +
                "<tr><td>Location:</td><td></td></tr>" +
                "<tr><td>X: </td><td><input type=\"text\" id=\"xID\" name=\"x\"/></td></tr>" +
                "<tr><td>Y: </td><td><input type=\"text\" name=\"y\" id=\"yID\"/></td></tr>" +
                "<tr><td>Address: </td><td><input type=\"text\" id=\"addressID\" name=\"address\" /></td></tr>" +
                "<tr><td>Car:</td><td></td></tr>" +
                "<tr><td>Car type: </td><td><select id=\"typeID\" name=\"type\">" +
                "<option value=\"None\">None</option>" +
                "<option value=\"Car\">Car</option>" +
                "<option value=\"Van\">Van</option>" +
                "</select></td></tr>" +
                "<tr><td>Year: </td><td><input type=\"text\" id=\"yearID\" name=\"year\"/></td></tr>" +
                "<tr><td>RegNumber: </td><td><input type=\"text\" id=\"regNumberID\" name=\"regNumber\"/></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Add\"/></td></tr>" +
                "</table></form>");

            $("div#div1").css("overflow", "scroll");

            $("form#formAddDriver").submit(function (e) {
                ValidateAddDriver();
                if (isValidateDriver) {
                    $.ajax({
                        url: "/api/Dispatcher/AddDriver",
                        method: "POST",
                        dataType: "json",
                        data: {
                            Name: $("#nameId").val(),
                            Surname: $("#surnameId").val(),
                            Username: $("#usernameId").val(),
                            Password: $("#passwordId").val(),
                            Jmbg: $("#jmbgId").val(),
                            Gender: $("input[name=gender]").filter(":checked").val(),
                            Phone: $("#phoneId").val(),
                            Email: $("#emailId").val(),
                            X: $("#xID").val(),
                            Y: $("#yID").val(),
                            Address: $("#addressID").val(),
                            Type: $("#typeID").val(),
                            Year: $("#yearID").val(),
                            RegNumber: $("#regNumberID").val(),
                        },
                        success: function (html) {
                            alert("Uspjesno ste dodali novog vozaca");

                        },
                        error: function () {
                            alert("Greska pri dodavanju novog vozaca.");
                        }
                    });
                }
                e.preventDefault();
            });

        });

        $("a#link6").click(function () {

            $.get("api/Login/Get", function (data, status) {

                $("div#div1").html(`<form id=\"formEditLocation\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Driver/EditLocation\">` +
                    `<table class=\"tabela\">` +
                    `<tr><td>Location:</td><td></td></tr>` +
                    `<tr><td>X: </td><td><input type=\"text\" id=\"xID\" name=\"x\" value="${data.Location.X}"/></td></tr>` +
                    `<tr><td>Y: </td><td><input type=\"text\" id=\"yID\" name=\"y\" value="${data.Location.Y}" /></td></tr>` +
                    `<tr><td>Address: </td><td><input type=\"text\" id=\"addressID\" name=\"address\"value="${data.Location.Address}" /></td></tr>` +
                    `<tr><td colspan=\"2\"><input type=\"submit\" value=\"Edit\" /></td></tr>` +
                    `</table></form>`);

                $("form#formEditLocation").submit(function (e) {
                    isValidateEditLocation = false;
                    ValidateEditLocation();

                    if (isValidateEditLocation) {
                        $.ajax({
                            url: "/api/Driver/EditLocation",
                            method: "POST",
                            dataType: "json",
                            data: {
                                X: $("#xID").val(),
                                Y: $("#yID").val(),
                                Address: $("#addressID").val(),
                            },
                            success: function (html) {
                                alert("Uspjesno ste promijenili svoju lokaciju.");
                            },
                            error: function () {
                                alert("Greska pri izmjeni lokacije.");
                            }
                        });
                    }
                    e.preventDefault();
                });
            });
        });

        $("a#link7").click(function () {

            $("div#div1").html("<form id=\"formCreateDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Customer/CreateDrive\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Location:</td><td></td></tr>" +
                "<tr><td>X: </td><td><input type=\"text\" id=\"xID\" name=\"x\" /></td></tr>" +
                "<tr><td>Y: </td><td><input type=\"text\" id=\"yID\" name=\"y\" /></td></tr>" +
                "<tr><td>Address: </td><td><input type=\"text\" id=\"addressID\" name=\"address\" /></td></tr>" +
                "<tr><td>Car type: </td><td><select id=\"typeID\" name=\"type\">" +
                "<option value=\"None\">None</option>" +
                "<option value=\"Car\">Car</option>" +
                "<option value=\"Van\">Van</option>" +
                "</select></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Create\" /></td></tr>" +
                "</table></form>");

            $("form#formCreateDrive").submit(function (e) {
                isValidateEditLocation = false;
                ValidateEditLocation();
                if (isValidateEditLocation) {
                    $.ajax({
                        url: "/api/Customer/CreateDrive",
                        method: "POST",
                        dataType: "json",
                        data: {
                            X: $("#xID").val(),
                            Y: $("#yID").val(),
                            Address: $("#addressID").val(),
                            Type: $("#typeID").val()
                        },
                        success: function (html) {
                            alert("Uspjesno ste kreirali voznju.");

                        },
                        error: function () {
                            alert("Greska pri kreiranju voznje.");
                        }
                    });
                }
                e.preventDefault();
            });
        });

        $("a#link8").click(function () {
            $("div#div1").html("<form id=\"formChangeDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"api/Customer/ChangeDrive\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Location:</td><td></td></tr>" +
                "<tr><td>X: </td><td><input type=\"text\" name=\"x\" id=\"xID\"/></td></tr>" +
                "<tr><td>Y: </td><td><input type=\"text\" name=\"y\" id=\"yID\"/></td></tr>" +
                "<tr><td>Address: </td><td><input type=\"text\" name=\"address\" id=\"addressID\" /></td></tr>" +
                "<tr><td>Car type: </td><td><select id=\"typeID\" name=\"type\">" +
                "<option value=\"None\">None</option>" +
                "<option value=\"Car\">Car</option>" +
                "<option value=\"Van\">Van</option>" +
                "</select></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Edit\"/></td></tr>" +
                "</table></form>");

            $("form#formChangeDrive").submit(function (e) {
                isValidateEditLocation = false;
                ValidateEditLocation();
                if (isValidateEditLocation) {
                    $.ajax({
                        url: "/api/Customer/ChangeDrive",
                        method: "POST",
                        dataType: "json",
                        data: {
                            X: $("#xID").val(),
                            Y: $("#yID").val(),
                            Address: $("#addressID").val(),
                            Type: $("#typeID").val()
                        },
                        success: function (html) {
                            alert("Uspjesno ste izmjenili voznju.");

                        },
                        error: function () {
                            alert("Greska pri izmjeni voznje.");
                        }
                    });
                }
                e.preventDefault();
            });

        });

        $("a#link9").click(function () {

            $("div#div1").html("<p> Create comment</p><br>" +
                "<form id=\"formCancelDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"api/Customer/CancelDrive\">" +
                "<textarea name=\"description\" id=\"descriptionID\" rows=\"10\" cols=\"90\"/><br>" +
                "<input type=\"submit\" value=\"Create\"/>" +
                "</form>");

            $("form#formCancelDrive").submit(function (e) {
                $.ajax({
                    url: "/api/Customer/CancelDrive",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Description: $("#descriptionID").val()
                    },
                    statusCode: {
                        200: function () {
                            alert('Uspjesno');
                        },
                        500: function () {
                            alert('Greska');
                        }
                    }
                });
                e.preventDefault();
            });

        });

        $("a#link10").click(function () {

            $("div#div1").html("<form id=\"formDispCreateDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Dispatcher/CreateDrive\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Location:</td><td></td></tr>" +
                "<tr><td>X: </td><td><input type=\"text\" id=\"xID\" name=\"x\" /></td></tr>" +
                "<tr><td>Y: </td><td><input type=\"text\" id=\"yID\" name=\"y\" /></td></tr>" +
                "<tr><td>Address: </td><td><input type=\"text\" id=\"addressID\" name=\"address\" /></td></tr>" +
                "<tr><td>Car type: </td><td><select id=\"typeID\" name=\"type\">" +
                "<option value=\"None\">None</option>" +
                "<option value=\"Car\">Car</option>" +
                "<option value=\"Van\">Van</option>" +
                "</select></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Create\" /></td></tr>" +
                "</table></form>");

            $("form#formDispCreateDrive").submit(function (e) {
                ValidateEditLocation();
                if (isValidateEditLocation) {
                    $.ajax({
                        url: "/api/Dispatcher/CreateDrive",
                        method: "POST",
                        dataType: "json",
                        data: {
                            X: $("#xID").val(),
                            Y: $("#yID").val(),
                            Address: $("#addressID").val(),
                            Type: $("#typeID").val()
                        },
                        success: function (html) {
                            alert("Uspjesno ste kreirali voznju.");

                        },
                        error: function () {
                            alert("Greska pri kreiranju voznje.");
                        }
                    });
                }
                e.preventDefault();
            });

        });

        $("a#link11").click(function (e) {

            $("a#link11").attr("href", "api/Dispatcher/ProcessDrive");

            $.ajax({
                url: "/api/Dispatcher/ProcessDrive",
                statusCode: {
                    200: function () {
                        alert('Uspjesno');
                    },
                    500: function () {
                        alert('Greska');
                    }
                }
            });
            e.preventDefault();

        });


        $("a#link20").click(function (e) {

            $("#link20").attr("href", "api/Driver/AcceptDrive");
            
            $.ajax({
                url: "api/Driver/AcceptDrive",
                statusCode: {
                    200: function () {
                        alert('Uspjesno');
                    },
                    500: function () {
                        alert('Greska');
                    }
                }
            });
            e.preventDefault();
        });

        $("a#link12").click(function () {

            $("div#div1").html("<form id=\"formSuccDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Driver/SuccessfulDrive\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Destination:</td><td></td></tr>" +
                "<tr><td>X: </td><td><input type=\"text\" id=\"xID\" name=\"x\"/></td></tr>" +
                "<tr><td>Y: </td><td><input type=\"text\" id=\"yID\" name=\"y\"/></td></tr>" +
                "<tr><td>Address: </td><td><input type=\"text\" id=\"addressID\" name=\"address\"/></td></tr>" +
                "<tr><td>Price: </td><td><input type=\"number\" id=\"priceID\" name=\"price\"/></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Submit\"/></td></tr>" +
                "</table>" +
                "</form>");

            //Validacija forme prilikom uspjesne voznje
            var isValidateSuccDrive = false;

            function ValidateSuccDrive() {

                if ($("#xID").val()) {
                    isValidateSuccDrive = true;
                    let phone = $("#xID").val();
                    if (isNaN(phone)) {  // vraca true ako nije broj
                        $("#xID").val("");
                        $("#xID").attr("placeholder", "Must be numeric characters").placeholder;
                        isValidateSuccDrive = false;
                    }
                }
                else {
                    $("#xID").attr("placeholder", "Enter your x number").placeholder;
                    isValidateSuccDrive = false;
                }

                if ($("#yID").val()) {
                    isValidateSuccDrive = true;
                    let phone = $("#yID").val();
                    if (isNaN(phone)) {  // vraca true ako nije broj
                        $("#yID").val("");
                        $("#yID").attr("placeholder", "Must be numeric characters").placeholder;
                        isValidateSuccDrive = false;
                    }
                }
                else {
                    $("#yID").attr("placeholder", "Enter your y number").placeholder;
                    isValidateSuccDrive = false;
                }

                if ($("#priceID").val()) {
                    isValidateSuccDrive = true;
                    let phone = $("#priceID").val();
                    if (isNaN(phone)) {  // vraca true ako nije broj
                        $("#priceID").val("");
                        $("#priceID").attr("placeholder", "Must be numeric characters").placeholder;
                        isValidateSuccDrive = false;
                    }
                }
                else {
                    $("#priceID").attr("placeholder", "Enter your y number").placeholder;
                    isValidateSuccDrive = false;
                }

                if ($("#addressID").val().trim() != "") {
                    isValidateDriver = true;
                }
                else {
                    $("#addressID").val("");
                    $("#addressID").attr("placeholder", "Enter your address").placeholder;
                    isValidateDriver = false;
                }

                if ($("#xID").val() && $("#yID").val() && $("#priceID").val() && $("#addressID").val()) {
                    isValidateSuccDrive = true;
                }
                else {
                    isValidateSuccDrive = false;
                }
            }

            $("form#formSuccDrive").submit(function (e) {
                ValidateSuccDrive();
                if (isValidateSuccDrive) {
                    $.ajax({
                        url: "/api/Driver/SuccessfulDrive",
                        method: "POST",
                        dataType: "json",
                        data: {
                            X: $("#xID").val(),
                            Y: $("#yID").val(),
                            Address: $("#addressID").val(),
                            Price: $("#priceID").val()
                        },
                        success: function (html) {
                            alert("Uspjesno.");

                        },
                        error: function () {
                            alert("Greska.");
                        }
                    });
                }
                e.preventDefault();
            });
        });

        $("a#link13").click(function () {

            $("div#div1").html("<p> Create comment</p><br>" +
                "<form id=\"formUnsDrive\" accept-charset=\"utf-8\" method=\"post\" action=\"api/Driver/UnsuccessfulDrive\">" +
                "<textarea name=\"description\" id=\"descriptionID\" rows=\"10\" cols=\"90\"/><br>" +
                "<input type=\"submit\" value=\"Create\"/>" +
                "</form>");

            $("form#formUnsDrive").submit(function (e) {

                $.ajax({
                    url: "/api/Driver/UnsuccessfulDrive",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Description: $("#descriptionID").val(),
                    },
                    statusCode: {
                        200: function () {
                            alert('Uspjesno');
                        },
                        500: function () {
                            alert('Greska');
                        }
                    }

                });
                e.preventDefault();

            });
        });

        $("a#linkComment").click(function () {

            $("div#div1").html("<p> Create comment</p><br>" +
                "<form id=\"formComment\" accept-charset=\"utf-8\" method=\"post\" action=\"api/Customer/CreateComment\">" +
                "Description: <br>"+
                "<textarea name=\"description\" id=\"descriptionID\" rows=\"10\" cols=\"90\"/><br>" +
                "Grade: <br>"+
                "<input type=\"number\" name=\"grade\" id=\"gradeID\"/><br>" +
                "<input type=\"submit\" value=\"Create\"/>" +
                "</form>");

            $("form#formComment").submit(function (e) {

                $.ajax({
                    url: "api/Customer/CreateComment",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Description: $("#descriptionID").val(),
                        Grade: $("#gradeID").val()
                    },
                    statusCode: {
                        200: function () {
                            alert('Uspjesno');
                        },
                        500: function () {
                            alert('Greska');
                        }
                    }

                });
                e.preventDefault();

            });
           
        });

        $("a#link14").click(function () {
            $.get("/api/Customer", function (data, status) {
                let drives = `<h5>Your drives</h5>`;
               
                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                    $("div#div1").css("overflow", "scroll");
                    $("div#div1").html(drives);

            });
        });

        $("a#link15").click(function () {
            $.get("/api/Dispatcher/GetAllDrives", function (data, status) {
                let drives = `<h5>All drives</h5>`;

                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });

        $("a#link16").click(function () {
            $.get("/api/Dispatcher/GetDrives", function (data, status) {
                let drives = `<h5>Your drives</h5>`;
                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }
                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });

        $("a#link17").click(function () {
            $.get("/api/Driver/GetDrives", function (data, status) {
                let drives = `<h5>Your drives</h5>`;

                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });

        $("a#link18").click(function () {
            $.get("/api/Driver/GetDrivesCreated", function (data, status) {
                let drives = `<h5>Created drives</h5>`;

                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });

        $("a#link19").click(function () {
            $("div#div1").html("<form id=\"filterForm\"accept-charset=\"utf-8\" method=\"post\" action=\"/api/User/FilterDrives\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Drive status: </td><td><select id=\"statusID\" name=\"status\">" +
                "<option value=\"Created\">Created</option>" +
                "<option value=\"Canceled\">Canceled</option>" +
                "<option value=\"Formated\">Formated</option>" +
                "<option value=\"Processed\">Processed</option>" +
                "<option value=\"Accepted\">Accepted</option>" +
                "<option value=\"Successful\">Successful</option>" +
                "<option value=\"Unsuccessful\">Unsuccessful</option>" +
                "</select></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Filter\"/></td></tr>" +
                "</table></form>");

            $("form#filterForm").submit(function (e) {
                    $.ajax({
                        url: "/api/User/FilterDrives",
                        method: "POST",
                        dataType: "json",
                        data: {
                            Data: $("#statusID").val(),          
                        },
                        success: function (data) {
                            let drives = `<h5>Created drives</h5>`;

                            for (drive in data) {
                                let car;
                                if (data[drive].CarType == 0) {
                                    car = "None";
                                }
                                else if (data[drive].CarType == 1) {
                                    car = "Car";
                                }
                                else if (data[drive].CarType == 2) {
                                    car = "Van";
                                }
                                else {
                                    car = "";
                                }
                                let state;
                                if (data[drive].State == 0) {
                                    state = "Created";
                                }
                                else if (data[drive].State == 1) {
                                    state = "Canceled";
                                }
                                else if (data[drive].State == 2) {
                                    state = "Formated";
                                }
                                else if (data[drive].State == 3) {
                                    state = "Processed";
                                }
                                else if (data[drive].State == 4) {
                                    state = "Accepted";
                                }
                                else if (data[drive].State == 5) {
                                    state = "Successful";
                                }
                                else if (data[drive].State == 6) {
                                    state = "Unsuccessful";
                                }

                                drives += `<ol>` +
                                    `<li>Drive` +
                                    `<ul>` +
                                    `<li>ID : ${data[drive].Id}</li>` +
                                    `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                    `<li>Address : ${data[drive].Address.Address}</li>` +
                                    `<li>Car type : ${car}</li>` +
                                    `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                    `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                    `<li>Location : ${data[drive].Destination.Address}</li>` +
                                    `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                    `<li>Price : ${data[drive].Price}</li>` +
                                    `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                    `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                    `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                    `<li>Status : ${state}</li>` +
                                    `</ul>` +
                                    `</li>` +
                                    `</ol>`;
                            }
                            $("div#div1").css("overflow", "scroll");
                            $("div#div1").html(drives);
                        },
                        error: function () {
                            alert("Greska.");
                        }
                    });
                e.preventDefault();
            });  
        });
    });

    //Validacija forme za promjenu lokacije vozaca
    var isValidateEditLocation = false;

    function ValidateEditLocation() {

        if ($("#xID").val()) {
            isValidateEditLocation = true;
            let phone = $("#xID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#xID").val("");
                $("#xID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateEditLocation = false;
            }
        }
        else {
            $("#xID").attr("placeholder", "Enter your x number").placeholder;
            isValidateEditLocation = false;
        }

        if ($("#yID").val()) {
            isValidateEditLocation = true;
            let phone = $("#yID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#yID").val("");
                $("#yID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateEditLocation = false;
            }
        }
        else {
            $("#yID").attr("placeholder", "Enter your y number").placeholder;
            isValidateEditLocation = false;
        }

        if ($("#addressID").val().trim() != "") {
            isValidateDriver = true;
        }
        else {
            $("#addressID").val("");
            $("#addressID").attr("placeholder", "Enter your address").placeholder;
            isValidateDriver = false;
        }

        if ($("#xID").val() && $("#yID").val() && $("#addressID").val()) {
            isValidateEditLocation = true;
        }
        else {
            isValidateEditLocation = false;
        }

    }

    //Validacija forme za dodavanje vozaca
    var isValidateDriver = false;

    function ValidateAddDriver() {

        if ($("#nameId").val()) {
            isValidateDriver = true;
        }
        else {
            $("#nameId").attr("placeholder", "Enter your name").placeholder;
            isValidateDriver = false;
        }
        if ($("#surnameId").val()) {
            isValidateDriver = true;
        }
        else {
            $("#surnameId").attr("placeholder", "Enter your surname").placeholder;
            isValidateDriver = false;
        }
        if ($("#usernameId").val()) {
            isValidateDriver = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidateDriver = false;
        }

        if ($("#passwordId").val()) {
            isValidateDriver = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidateDriver = false;
        }

        if ($("#jmbgId").val()) {
            isValidateDriver = true;
            let jmbg = $("#jmbgId").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
            else if (jmbg.length != 13) {
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must have 13 characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#jmbgId").attr("placeholder", "Enter your jmbg").placeholder;
            isValidateDriver = false;
        }

        if ($("#phoneId").val()) {
            isValidateDriver = true;
            let phone = $("#phoneId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneId").val("");
                $("#phoneId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#phoneId").attr("placeholder", "Enter your phone number").placeholder;
            isValidateDriver = false;
        }

        if ($("#emailId").val()) {
            isValidateDriver = true;
            let email = $("#emailId").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.match(re)) {
                $("#emailId").val("");
                $("#emailId").attr("placeholder", "Invalid e-mail").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#emailId").attr("placeholder", "Enter your e-mail").placeholder;
            isValidateDriver = false;
        }

        if ($("#xID").val()) {
            isValidateDriver = true;
            let phone = $("#xID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#xID").val("");
                $("#xID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#xID").attr("placeholder", "Enter your x number").placeholder;
            isValidateDriver = false;
        }

        if ($("#yID").val()) {
            isValidateDriver = true;
            let phone = $("#yID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#yID").val("");
                $("#yID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#yID").attr("placeholder", "Enter your x number").placeholder;
            isValidateDriver = false;
        }

        if ($("#yearID").val()) {
            isValidateDriver = true;
            let phone = $("#yearID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#yearID").val("");
                $("#yearID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#yearID").attr("placeholder", "Enter your x number").placeholder;
            isValidateDriver = false;
        }

        if ($("#regNumberID").val()) {
            isValidateDriver = true;
            let phone = $("#regNumberID").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#regNumberID").val("");
                $("#regNumberID").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateDriver = false;
            }
        }
        else {
            $("#regNumberID").attr("placeholder", "Enter your x number").placeholder;
            isValidateDriver = false;
        }

        if ($("#addressID").val().trim() != "") {
            isValidateDriver = true;
        }
        else {
            $("#addressID").val("");
            $("#addressID").attr("placeholder", "Enter your address").placeholder;
            isValidateDriver = false;
        }

        if ($("#nameId").val() && $("#surnameId").val() && $("#usernameId").val() && $("#passwordId").val() && $("#jmbgId").val() && $("#phoneId").val() && $("#emailId").val()
            && $("#xID").val() && $("#yID").val() && $("#yearID").val() && $("#regNumberID").val() && $("#addressID").val()) {
            isValidateDriver = true;
        }
        else {
            isValidateDriver = false;
        }

    }

    //Validacija forme za editovanje profila korisnika
    var isValidateEdit = false;

    function ValidateEdit() {

        if ($("#nameId").val()) {
            isValidateEdit = true;
        }
        else {
            $("#nameId").attr("placeholder", "Enter your name").placeholder;
            isValidateEdit = false;
        }
        if ($("#surnameId").val()) {
            isValidateEdit = true;
        }
        else {
            $("#surnameId").attr("placeholder", "Enter your surname").placeholder;
            isValidateEdit = false;
        }
        if ($("#usernameId").val()) {
            isValidateEdit = true;
            let username = $("#usernameId").val();
            if (username.length < 4) {
                $("#usernameId").val("");
                $("#usernameId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateEdit = false;
            }
        }
        else {
            $("#usernameId").attr("placeholder", "Enter your username").placeholder;
            isValidateEdit = false;
        }

        if ($("#passwordId").val()) {
            isValidateEdit = true;
            let password = $("#passwordId").val();
            if (password.length < 4) {
                $("#passwordId").val("");
                $("#passwordId").attr("placeholder", "4 characters at a minimum").placeholder;
                isValidateEdit = false;
            }
        }
        else {
            $("#passwordId").attr("placeholder", "Enter your password").placeholder;
            isValidateEdit = false;
        }

        if ($("#jmbgId").val()) {
            isValidateEdit = true;
            let jmbg = $("#jmbgId").val();
            if (isNaN(jmbg)) {  // vraca true ako nije broj
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateEdit = false;
            }
            else if (jmbg.length != 13) {
                $("#jmbgId").val("");
                $("#jmbgId").attr("placeholder", "Must have 13 characters").placeholder;
                isValidateEdit = false;
            }
        }
        else {
            $("#jmbgId").attr("placeholder", "Enter your jmbg").placeholder;
            isValidateEdit = false;
        }

        if ($("#phoneId").val()) {
            isValidateEdit = true;
            let phone = $("#phoneId").val();
            if (isNaN(phone)) {  // vraca true ako nije broj
                $("#phoneId").val("");
                $("#phoneId").attr("placeholder", "Must be numeric characters").placeholder;
                isValidateEdit = false;
            }
        }
        else {
            $("#phoneId").attr("placeholder", "Enter your phone number").placeholder;
            isValidateEdit = false;
        }

        if ($("#emailId").val()) {
            isValidateEdit = true;
            let email = $("#emailId").val();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.match(re)) {
                $("#emailId").val("");
                $("#emailId").attr("placeholder", "Invalid e-mail").placeholder;
                isValidateEdit = false;
            }
        }
        else {
            $("#emailId").attr("placeholder", "Enter your e-mail").placeholder;
            isValidateEdit = false;
        }


        if ($("#nameId").val() && $("#surnameId").val() && $("#usernameId").val() && $("#passwordId").val() && $("#jmbgId").val() && $("#phoneId").val() && $("#emailId").val()) {
            isValidateEdit = true;
        }
        else {
            isValidateEdit = false;
        }
    }

    $("a#linkSort").click(function () {

        $("div#divLink2").slideToggle();

        $("a#linkByDate").click(function () {
            $.get("/api/User/SortDriveByDate", function (data, status) {
                let drives = `<h5>SortDriveByDate</h5>`;
                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });

        $("a#linkByGrade").click(function () {
            $.get("api/User/SortDriveByGrade", function (data, status) {
                let drives = `<h5>SortDriveByGrade</h5>`;
                for (drive in data) {
                    let car;
                    if (data[drive].CarType == 0) {
                        car = "None";
                    }
                    else if (data[drive].CarType == 1) {
                        car = "Car";
                    }
                    else if (data[drive].CarType == 2) {
                        car = "Van";
                    }
                    else {
                        car = "";
                    }
                    let state;
                    if (data[drive].State == 0) {
                        state = "Created";
                    }
                    else if (data[drive].State == 1) {
                        state = "Canceled";
                    }
                    else if (data[drive].State == 2) {
                        state = "Formated";
                    }
                    else if (data[drive].State == 3) {
                        state = "Processed";
                    }
                    else if (data[drive].State == 4) {
                        state = "Accepted";
                    }
                    else if (data[drive].State == 5) {
                        state = "Successful";
                    }
                    else if (data[drive].State == 6) {
                        state = "Unsuccessful";
                    }

                    drives += `<ol>` +
                        `<li>Drive` +
                        `<ul>` +
                        `<li>ID : ${data[drive].Id}</li>` +
                        `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                        `<li>Address : ${data[drive].Address.Address}</li>` +
                        `<li>Car type : ${car}</li>` +
                        `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                        `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                        `<li>Location : ${data[drive].Destination.Address}</li>` +
                        `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                        `<li>Price : ${data[drive].Price}</li>` +
                        `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                        `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                        `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                        `<li>Status : ${state}</li>` +
                        `</ul>` +
                        `</li>` +
                        `</ol>`;
                }
                $("div#div1").css("overflow", "scroll");
                $("div#div1").html(drives);
            });
        });
    });

    $("a#linkSearch").click(function () {

        $("div#divLink3").slideToggle();

        $("a#linkByOrderDate").click(function () {

            $("div#div1").html("<form id=\"serachByOrderDate\"accept-charset=\"utf-8\" method=\"post\" action=\"api/User/SearchDrivesByOrderDate\">" +
                "<table class=\"tabela\">" +
                "<tr><td>From: </td><td><input type=\"date\" value=\"2018-01-01\" id=\"fromID\" name=\"from\"></td></tr>" +
                "<tr><td>To: </td><td><input type=\"date\" value=\"2018-12-31\" id=\"toID\" name=\"to\"></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Search\"/></td></tr>" +
                "</table></form>");

            $("form#serachByOrderDate").submit(function (e) {
                $.ajax({
                    url: "api/User/SearchDrivesByOrderDate",
                    method: "POST",
                    dataType: "json",
                    data: {
                        From: $("#fromID").val(),
                        To: $("#toID").val(),
                    },
                    success: function (data) {
                        let drives = `<h5>Created drives</h5>`;
                        for (drive in data) {
                            let car;
                            if (data[drive].CarType == 0) {
                                car = "None";
                            }
                            else if (data[drive].CarType == 1) {
                                car = "Car";
                            }
                            else if (data[drive].CarType == 2) {
                                car = "Van";
                            }
                            else {
                                car = "";
                            }
                            let state;
                            if (data[drive].State == 0) {
                                state = "Created";
                            }
                            else if (data[drive].State == 1) {
                                state = "Canceled";
                            }
                            else if (data[drive].State == 2) {
                                state = "Formated";
                            }
                            else if (data[drive].State == 3) {
                                state = "Processed";
                            }
                            else if (data[drive].State == 4) {
                                state = "Accepted";
                            }
                            else if (data[drive].State == 5) {
                                state = "Successful";
                            }
                            else if (data[drive].State == 6) {
                                state = "Unsuccessful";
                            }

                            drives += `<ol>` +
                                `<li>Drive` +
                                `<ul>` +
                                `<li>ID : ${data[drive].Id}</li>` +
                                `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                `<li>Address : ${data[drive].Address.Address}</li>` +
                                `<li>Car type : ${car}</li>` +
                                `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                `<li>Location : ${data[drive].Destination.Address}</li>` +
                                `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                `<li>Price : ${data[drive].Price}</li>` +
                                `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                `<li>Status : ${state}</li>` +
                                `</ul>` +
                                `</li>` +
                                `</ol>`;
                        }
                        $("div#div1").css("overflow", "scroll");
                        $("div#div1").html(drives);
                    },
                    error: function () {
                        alert("Greska.");
                    }
                });
                e.preventDefault();
            });
        }); 

        $("a#linkByGradeSearch").click(function () {

            $("div#div1").html("<form id=\"SearchDrivesByGrade\"accept-charset=\"utf-8\" method=\"post\" action=\"api/User/SearchDrivesByGrade\">" +
                "<table class=\"tabela\">" +
                "<tr><td>From: </td><td><input type=\"number\" value=\"0\" id=\"fromID\" name=\"from\"></td></tr>" +
                "<tr><td>To: </td><td><input type=\"number\" value=\"5\" id=\"toID\" name=\"to\"></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Search\"/></td></tr>" +
                "</table></form>");

            $("form#SearchDrivesByGrade").submit(function (e) {
                $.ajax({
                    url: "api/User/SearchDrivesByGrade",
                    method: "POST",
                    dataType: "json",
                    data: {
                        From: $("#fromID").val(),
                        To: $("#toID").val(),
                    },
                    success: function (data) {
                        let drives = `<h5>Created drives</h5>`;
                        for (drive in data) {
                            let car;
                            if (data[drive].CarType == 0) {
                                car = "None";
                            }
                            else if (data[drive].CarType == 1) {
                                car = "Car";
                            }
                            else if (data[drive].CarType == 2) {
                                car = "Van";
                            }
                            else {
                                car = "";
                            }
                            let state;
                            if (data[drive].State == 0) {
                                state = "Created";
                            }
                            else if (data[drive].State == 1) {
                                state = "Canceled";
                            }
                            else if (data[drive].State == 2) {
                                state = "Formated";
                            }
                            else if (data[drive].State == 3) {
                                state = "Processed";
                            }
                            else if (data[drive].State == 4) {
                                state = "Accepted";
                            }
                            else if (data[drive].State == 5) {
                                state = "Successful";
                            }
                            else if (data[drive].State == 6) {
                                state = "Unsuccessful";
                            }

                            drives += `<ol>` +
                                `<li>Drive` +
                                `<ul>` +
                                `<li>ID : ${data[drive].Id}</li>` +
                                `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                `<li>Address : ${data[drive].Address.Address}</li>` +
                                `<li>Car type : ${car}</li>` +
                                `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                `<li>Location : ${data[drive].Destination.Address}</li>` +
                                `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                `<li>Price : ${data[drive].Price}</li>` +
                                `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                `<li>Status : ${state}</li>` +
                                `</ul>` +
                                `</li>` +
                                `</ol>`;
                        }
                        $("div#div1").css("overflow", "scroll");
                        $("div#div1").html(drives);
                    },
                    error: function () {
                        alert("Greska.");
                    }
                });
                e.preventDefault();
            });
        }); 

        $("a#linkByPrice").click(function () {

            $("div#div1").html("<form id=\"SearchDrivesByPrice\"accept-charset=\"utf-8\" method=\"post\" action=\"api/User/SearchDrivesByPrice\">" +
                "<table class=\"tabela\">" +
                "<tr><td>From: </td><td><input type=\"number\" value=\"0\" id=\"fromID\" name=\"from\"></td></tr>" +
                "<tr><td>To: </td><td><input type=\"number\" value=\"1000\" id=\"toID\" name=\"to\"></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Search\"/></td></tr>" +
                "</table></form>");

            $("form#SearchDrivesByPrice").submit(function (e) {
                $.ajax({
                    url: "api/User/SearchDrivesByPrice",
                    method: "POST",
                    dataType: "json",
                    data: {
                        From: $("#fromID").val(),
                        To: $("#toID").val(),
                    },
                    success: function (data) {
                        let drives = `<h5>Created drives</h5>`;
                        for (drive in data) {
                            let car;
                            if (data[drive].CarType == 0) {
                                car = "None";
                            }
                            else if (data[drive].CarType == 1) {
                                car = "Car";
                            }
                            else if (data[drive].CarType == 2) {
                                car = "Van";
                            }
                            else {
                                car = "";
                            }
                            let state;
                            if (data[drive].State == 0) {
                                state = "Created";
                            }
                            else if (data[drive].State == 1) {
                                state = "Canceled";
                            }
                            else if (data[drive].State == 2) {
                                state = "Formated";
                            }
                            else if (data[drive].State == 3) {
                                state = "Processed";
                            }
                            else if (data[drive].State == 4) {
                                state = "Accepted";
                            }
                            else if (data[drive].State == 5) {
                                state = "Successful";
                            }
                            else if (data[drive].State == 6) {
                                state = "Unsuccessful";
                            }

                            drives += `<ol>` +
                                `<li>Drive` +
                                `<ul>` +
                                `<li>ID : ${data[drive].Id}</li>` +
                                `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                `<li>Address : ${data[drive].Address.Address}</li>` +
                                `<li>Car type : ${car}</li>` +
                                `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                `<li>Location : ${data[drive].Destination.Address}</li>` +
                                `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                `<li>Price : ${data[drive].Price}</li>` +
                                `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                `<li>Status : ${state}</li>` +
                                `</ul>` +
                                `</li>` +
                                `</ol>`;
                        }
                        $("div#div1").css("overflow", "scroll");
                        $("div#div1").html(drives);
                    },
                    error: function () {
                        alert("Greska.");
                    }
                });
                e.preventDefault();
            });
        }); 

        $("a#linkSearchByCustomer").click(function () {

            $("div#div1").html("<form id=\"SearchDrivesByCustomer\"accept-charset=\"utf-8\" method=\"post\" action=\"api/User/SearchDrivesByCustomer\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Name: </td><td><input type=\"text\"  id=\"fromID\" name=\"from\"></td></tr>" +
                "<tr><td>Surname: </td><td><input type=\"text\"  id=\"toID\" name=\"to\"></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Search\"/></td></tr>" +
                "</table></form>");

            $("form#SearchDrivesByCustomer").submit(function (e) {
                $.ajax({
                    url: "api/User/SearchDrivesByCustomer",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Name: $("#fromID").val(),
                        Surname: $("#toID").val(),
                    },
                    success: function (data) {
                        let drives = `<h5>Created drives</h5>`;
                        for (drive in data) {
                            let car;
                            if (data[drive].CarType == 0) {
                                car = "None";
                            }
                            else if (data[drive].CarType == 1) {
                                car = "Car";
                            }
                            else if (data[drive].CarType == 2) {
                                car = "Van";
                            }
                            else {
                                car = "";
                            }
                            let state;
                            if (data[drive].State == 0) {
                                state = "Created";
                            }
                            else if (data[drive].State == 1) {
                                state = "Canceled";
                            }
                            else if (data[drive].State == 2) {
                                state = "Formated";
                            }
                            else if (data[drive].State == 3) {
                                state = "Processed";
                            }
                            else if (data[drive].State == 4) {
                                state = "Accepted";
                            }
                            else if (data[drive].State == 5) {
                                state = "Successful";
                            }
                            else if (data[drive].State == 6) {
                                state = "Unsuccessful";
                            }

                            drives += `<ol>` +
                                `<li>Drive` +
                                `<ul>` +
                                `<li>ID : ${data[drive].Id}</li>` +
                                `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                `<li>Address : ${data[drive].Address.Address}</li>` +
                                `<li>Car type : ${car}</li>` +
                                `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                `<li>Location : ${data[drive].Destination.Address}</li>` +
                                `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                `<li>Price : ${data[drive].Price}</li>` +
                                `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                `<li>Status : ${state}</li>` +
                                `</ul>` +
                                `</li>` +
                                `</ol>`;
                        }
                        $("div#div1").css("overflow", "scroll");
                        $("div#div1").html(drives);
                    },
                    error: function () {
                        alert("Greska.");
                    }
                });
                e.preventDefault();
            });
        }); 

        $("a#linkSearchByDriver").click(function () {

            $("div#div1").html("<form id=\"SearchDrivesByDriver\"accept-charset=\"utf-8\" method=\"post\" action=\"api/User/SearchDrivesByDriver\">" +
                "<table class=\"tabela\">" +
                "<tr><td>Name: </td><td><input type=\"text\"  id=\"fromID\" name=\"from\"></td></tr>" +
                "<tr><td>Surname: </td><td><input type=\"text\"  id=\"toID\" name=\"to\"></td></tr>" +
                "<tr><td colspan=\"2\"><input type=\"submit\" value=\"Search\"/></td></tr>" +
                "</table></form>");

            $("form#SearchDrivesByDriver").submit(function (e) {
                $.ajax({
                    url: "api/User/SearchDrivesByDriver",
                    method: "POST",
                    dataType: "json",
                    data: {
                        Name: $("#fromID").val(),
                        Surname: $("#toID").val(),
                    },
                    success: function (data) {
                        let drives = `<h5>Created drives</h5>`;
                        for (drive in data) {
                            let car;
                            if (data[drive].CarType == 0) {
                                car = "None";
                            }
                            else if (data[drive].CarType == 1) {
                                car = "Car";
                            }
                            else if (data[drive].CarType == 2) {
                                car = "Van";
                            }
                            else {
                                car = "";
                            }
                            let state;
                            if (data[drive].State == 0) {
                                state = "Created";
                            }
                            else if (data[drive].State == 1) {
                                state = "Canceled";
                            }
                            else if (data[drive].State == 2) {
                                state = "Formated";
                            }
                            else if (data[drive].State == 3) {
                                state = "Processed";
                            }
                            else if (data[drive].State == 4) {
                                state = "Accepted";
                            }
                            else if (data[drive].State == 5) {
                                state = "Successful";
                            }
                            else if (data[drive].State == 6) {
                                state = "Unsuccessful";
                            }

                            drives += `<ol>` +
                                `<li>Drive` +
                                `<ul>` +
                                `<li>ID : ${data[drive].Id}</li>` +
                                `<li>OrderDate : ${data[drive].OrderDate.replace("T", ' ')}</li>` +
                                `<li>Address : ${data[drive].Address.Address}</li>` +
                                `<li>Car type : ${car}</li>` +
                                `<li>Ordered by : ${data[drive].OrderedBy.Username}</li>` +
                                `<li>Drived by : ${data[drive].DrivedBy.Username}</li>` +
                                `<li>Location : ${data[drive].Destination.Address}</li>` +
                                `<li>Approved by : ${data[drive].ApprovedBy.Username}</li>` +
                                `<li>Price : ${data[drive].Price}</li>` +
                                `<li>Commented by : ${data[drive].Comments.CreatedBy.Username}</li>` +
                                `<li>Comment : ${data[drive].Comments.Description}</li> ` +
                                `<li> Grade : ${data[drive].Comments.Grade}</li>` +
                                `<li>Status : ${state}</li>` +
                                `</ul>` +
                                `</li>` +
                                `</ol>`;
                        }
                        $("div#div1").css("overflow", "scroll");
                        $("div#div1").html(drives);
                    },
                    error: function () {
                        alert("Greska.");
                    }
                });
                e.preventDefault();
            });
        });
    });
});

