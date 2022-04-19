import React, { useState } from 'react';
import './ChangePasswordPageUI.css';
import axios from 'axios';
var md5 = require('md5');

function DeleteAccountPageUI()
{

    // Retrieve User Data
    var storage = require('../tokenStorage.js');
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var username = ud.Username;
    var email = ud.email;
    var res;
    var token;

    let bp = require('./Path.js');

    var accountPassword;
    var userName;
    const [message,setMessage] = useState('');

    const gotoRegister = async event =>
    {
        event.preventDefault();
        try
        {
            window.location.href = '/register';

        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

    const gotoPasswordReset = async event =>
    {
        event.preventDefault();
        try
        {
            window.location.href = '/passwordreset';

        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

    const deleteAccount = async event =>
    {
        var Username = ud.Username;
        var email = ud.email;
        var userID = ud.userID;


        var obj2 = {userID:userID};

        var js2 = JSON.stringify(obj2);

        try
        {
            const response2 = await fetch(bp.buildPath('api/deleteaccount'), {method:'POST', body:js2, headers:{'Content-Type': 'application/json'}}); // await fetch

            var res2 = JSON.parse(await response2.text()); // await response2


            if (res2.error !== "")
            {
                setMessage('Error Deleting Account: ' + res2.error);
            }
            else
            {
                var user = {Username:Username, email:email, userID:userID};
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('Account Deleted!');
                window.location.href = '/';
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

    const doLogin = async event =>
    {
        event.preventDefault();

        if(userName.value == "" || accountPassword.value == "")
        {
            document.getElementById("loginResult").innerHTML = "Please fill out every field";
            return;
        }

        var obj = {login:userName.value,password:md5(accountPassword.value)};
        var js = JSON.stringify(obj);

        axios({
        method: 'post',
        url: bp.buildPath('api/login'),
        headers:
        {
            'Content-Type': 'application/json'
        },
        data: js
        })
        .then(function (response)
        {
            res = response.data;
            if (res.error)
            {
                setMessage('Error: ' + res.error);
            }
            else if (res) // Successful Login
            {
                storage.storeToken(res);
                token = storage.retrieveToken();

                var ud = JSON.parse(window.atob(token.split('.')[1]));

                if(!window.confirm("Are you sure that you want to delete your account?")) return;

                deleteAccount();
            }
        })
        .catch(function (error)
        {
            console.log(res);
            console.log(error);
            setMessage('Critical Error: ' + error);
        });

    };
    return(
      <div id="changePasswordDiv">

        <form onSubmit={doLogin}>

        <div id = "accInfo">
                Deleting Account: {username}
        </div>
        <br/>

        <div class="grid-container">
            <div class="passG">
                <input type="text" id="loginPassword" placeholder="Username" ref={(c) => userName = c} />
            </div>
            <div class="passG">
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => accountPassword = c} />
            </div>
            <div class="emailG">
                <input type="submit" id="loginButton" class="buttons" value = "▷"
                onClick={doLogin} />
            </div>
        </div>

        </form>

        <br/>
        <span id="loginResult">{message}</span>
        <br/>
        <br/>
        <createLnk id="inner-title" onClick={gotoPasswordReset}>Forgot Password?</createLnk>
     </div>
    );
};
export default DeleteAccountPageUI;