import React, { useState } from "react";

import '../css/Login.css';
import '../css/contactFormAdmin.css'; ///For Viewing Only (To be deleted)
import '../css/contactForm.css'; ///For Viewing Only (To be deleted)
import { AdminUsers, StudentUsers } from './adminData';
import ContactForm from "./ContactForm";
import StudentPage from "./StudentPage";

export const Login = () => {
    

    //student
    const [studentlogin, setStudent] = useState({ username: '', password: '' });
    const [submitstd, setSubmitStd] = useState(false);

    //admin
    const [adminlogin, setAdmin] = useState({ username: '', password: '' });
    const [submitadm, setSubmitAdm] = useState(false);
    const handleChangeForAdmin = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdmin({ ...adminlogin, [name]: value });
    };

    const handleSubmitForAdmin = async(e) => {
        e.preventDefault();
        try{
            let admindata = {
                "username": adminlogin.username,
                "password": adminlogin.password
            }

            // const isAdmin = await Axios.post(loginURL, admindata);
            // if(isAdmin.status === 200){
            //     window.location.replace('admin')
            //     console.log( isAdmin.data.details.details)
            //     console.log( isAdmin.data.details.token)

            //     const login = {
            //                     "detail": isAdmin.data.details.details,
            //                     "token": isAdmin.data.details.token,
            //                     "role": 'admin'
            //                 };
            //     localStorage.setItem('loggedIn', JSON.stringify(login));
            // } 
        }catch(error){
            alert('Paasword and/or username does not match.')
        }
    }

    const handleChangeForStudent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({ ...studentlogin, [name]: value });
    };

    function generate_token(length) {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];
        for (var i = 0; i < length; i++) {
            var j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    const handleSubmitForStudent = (e) => {
        e.preventDefault();
        setSubmitStd({ username: '', password: '' });

        const studentData = localStorage.getItem('studentdata') || JSON.stringify(StudentUsers);
        const jsonData = JSON.parse(studentData);
        let isStudent = false;
        console.log(jsonData);
        const token = generate_token(32);
        console.log(token);
        if (jsonData) {
            jsonData.forEach(element => {
                console.log(element.username);
                const login = {
                    ...element,
                    "token": token,
                    "role": 'student'
                };
                if (element.username === studentlogin.username && element.password === studentlogin.password) {
                    isStudent = true;
                    window.location.href = 'studentinfo';
                    localStorage.setItem('loggedIn', JSON.stringify(login));
                }
            });
        }
        if (isStudent) {
            window.location.href = 'studentinfo';
        } else {
            alert('Username and/or Password is invalid');
        }
    };

    if (window.location.pathname === '/login') {
        return (
            <>
            {/* For Viewing Only To be Deleted */}
            {/* <ContactForm></ContactForm>  */}
            {/* <ContactFormAdmin></ContactFormAdmin> */}
             {/* For Viewing Only To be Deleted*/}
    
             {/* <StudentPage
                       handleChange={handleChange}
                       handleSubmit={handleSubmit}
                       newquestion={newquestion}
                       questions={questions}
                       handleResponse={handleResponse}
                       handleSubmitRes={handleSubmitRes}
             ></StudentPage> */}
                <div className="Login">
                    <form>
                        <h1>Student Login</h1>
                        <input type='text' onChange={handleChangeForStudent} name='username' placeholder='Username' />
                        <input type='password' onChange={handleChangeForStudent} name='password' placeholder='Password' />
                        <button type="submit" onClick={handleSubmitForStudent}>Log In</button>

                        <a href="/registration" className="noAccount">Don't have an account?</a>
                        <a href="/" className="clickedWrongRole">Not a Student?</a>
                    </form>
                </div>
            </>
        );

    } else {
        return (
            <>
                <div className="Login">
                    <form>
                        <h1>Admin Login</h1>
                        <input type='text' className="vsbl" onChange={handleChangeForAdmin} name='username' placeholder='Username' />
                        <input type='password' onChange={handleChangeForAdmin} name='password' placeholder='Password' />
                        <button type="submit" onClick={handleSubmitForAdmin}>Log In</button>
                        <a href="/" className="clickedWrongRole">Not an Admin?</a>
                    </form>
                </div>
            </>
        );

    }
};