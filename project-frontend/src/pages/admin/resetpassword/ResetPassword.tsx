

import React from "react";
import "./ResetPassword.scss";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('كلمة المرور غير متطابقة');
            return;
        }


        if (!token) {
            toast.error('رابط غير صالح أو منتهي الصلاحية');
            return;
        }


        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/reset-password/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const data = await res.json();



        if (res.ok) {
            toast.success(`${data.message}`);
            navigate('/login');
        }
    };



    return (
        <div className="reset-password">

            <div className="reset-password-conteaner">

                <div className="reset-password-header">
                    <h1>إعادة كلمة المرور</h1>

                </div>
                <div className="reset-password-body">

                    <div className="reset-password-content">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">كلمة المرور الجديدة</label><br />
                                <input type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</label><br />
                                <input type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">تغيير كلمة المرور</button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default ResetPassword;
