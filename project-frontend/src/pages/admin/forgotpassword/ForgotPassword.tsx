
import React, { useState } from "react";
import "./ForgotPassword.scss";
import { Link } from "react-router";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("يرجى إدخال البريد الإلكتروني");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();



            if (response.ok) {
                toast.success(`${data.message}`);
            }

        } catch (error) {
            console.error("Forgot password error:", error);
            toast.error("حدث خطأ في الاتصال بالخادم");
        }
    };
    return (
        <div className="forgot-password">

            <div className="forgot-password-conteaner">

                <div className="forgot-password-header">
                    <h4>نسيت كلمة المرور</h4>
                    <p>أدخل بريدك الإلكتروني المسجل أدناه</p>

                </div>
                <div className="forgot-password-body">
                    <div className="forgot-password-content">
                        <form onSubmit={handleForgotPassword}>
                            <div className="form-group">
                                <label htmlFor="email">البريد الإلكتروني</label><br />
                                <input type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p>هل تتذكر كلمة المرور؟ <Link to="/login">تسجيل الدخول</Link></p>
                            </div>
                            <button type="submit">إرسال</button>


                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;