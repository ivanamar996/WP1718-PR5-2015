$(document).ready(function () {

    $("div#divService").hide();
    $("div#divLink").hide();
    $("div#divSearch").hide();
    $("div#divLink2").hide();
    $("div#divSort").hide();
    $("div#divLink3").hide();

    $("a#link1").click(function () {
        $("div#div1").html("<form id=\"formRegistration\" accept-charset=\"utf-8\" method=\"post\" action=\"/api/Registration/RegisterAccount\">" +
            "<table class=\"tabela\">" +
            "<tr><td>Username:</td><td><input type=\"text\" id=\"usernameId\" name=\"username\" /></td></tr>" +
            "<tr><td>Password:</td><td><input type=\"text\" id=\"passwordId\" name=\"password\" /></td></tr>" +
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
                        // sessionStorage.setItem("currentUser", JSON.stringify(data));
                        // let user = JSON.parse(sessionStorage.getItem("currentUser"));
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
            "<tr><td>Password:</td><td><input id=\"passwordId\" type=\"text\" name=\"password\" /></td></tr>" +
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

                        $.get("api/Login/Get", function (data, status) {

                            let linkovi = "<a id=\"link4\">Edit profile</a><br/>";
                            linkovi += "<a id=\"link19\">Filter drives</a>";

                            if (data.Role == 2) {

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
                            }
                            else if (data.Role == 1) {
                                linkovi += "<br><a id=\"link7\">Create drive</a></br><a id=\"link8\">Change drive</a>";
                                linkovi += "<br><a id=\"link9\">Cancel drive</a>";
                                linkovi += "<br><a id=\"link14\">Drives</a>";
                            }

                            $("div#divLink").html(linkovi);
                            $("div#divLink2").html("<a id=\"linkByDate\">by date</a></br><a id=\"linkByGrade\">by grade</a>");
                            $("div#divLink3").html("<a id=\"linkByOrderDate\">by order date</a></br><a id=\"linkByGradeSearch\">by grade</a></br><a id=\"linkByPrice\">by price</a>");
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
                    `<tr><td>Password:</td><td><input type=\"text\" id=\"passwordId\" name=\"password\" value=\"${data.Password}\" /></td></tr>` +
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
                "<tr><td>Password:</td><td><input type=\"text\" id=\"passwordId\" name=\"password\" /></td></tr>" +
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
                            // sessionStorage.setItem("currentUser", JSON.stringify(data));
                            // let user = JSON.parse(sessionStorage.getItem("currentUser"));
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
                    `<tr><td>Address: </td><td><input type=\"text\" name=\"address\"value="${data.Location.Address}" /></td></tr>` +
                    `<tr><td colspan=\"2\"><input type=\"submit\" value=\"Edit\" /></td></tr>` +
                    `</table></form>`);
             
                $("form#formEditLocation").submit(function (e) {

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
                                // sessionStorage.setItem("currentUser", JSON.stringify(data));
                                // let user = JSON.parse(sessionStorage.getItem("currentUser"));
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

        /*$("a#link7").click(function () {

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
                            // sessionStorage.setItem("currentUser", JSON.stringify(data));
                            // let user = JSON.parse(sessionStorage.getItem("currentUser"));
                            alert("Uspjesno ste kreirali voznju.");

                        },
                        error: function () {
                            alert("Greska pri kreiranju voznje.");
                        }
                    });
                }
                e.preventDefault();
            });



        });*/
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

        if ($("#xID").val() && $("#yID").val()) {
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

        if ($("#nameId").val() && $("#surnameId").val() && $("#usernameId").val() && $("#passwordId").val() && $("#jmbgId").val() && $("#phoneId").val() && $("#emailId").val()
            && $("#xID").val() && $("#yID").val() && $("#yearID").val() && $("#regNumberID").val()) {
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
    });

    $("a#linkSearch").click(function () {
        $("div#divLink3").slideToggle();
    });

});
