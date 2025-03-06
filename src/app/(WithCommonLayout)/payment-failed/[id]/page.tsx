import { XCircle } from "lucide-react";
import Link from "next/link";

const PaymentCancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <XCircle className="text-red-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Failed</h2>
        <p className="text-gray-600 mt-2">Your payment was not completed. Please try again or contact support.</p>
        
        <div className="mt-6">
          <Link href="/checkout">
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
