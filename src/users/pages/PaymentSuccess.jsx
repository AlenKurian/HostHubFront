import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/user-home"); // redirect home
        }, 2000);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-xl font-bold text-green-600">
                Payment Successful ✅ Redirecting...
            </h2>
        </div>
    );
}

export default PaymentSuccess;
