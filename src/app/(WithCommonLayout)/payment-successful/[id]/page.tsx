import { CheckCircle } from "lucide-react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your transaction has been completed successfully.</p>
        
        <div className="mt-6">
          <Link href="/student/dashboard">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;