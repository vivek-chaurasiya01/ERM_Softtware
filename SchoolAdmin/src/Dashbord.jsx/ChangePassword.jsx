import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function ChangePassword() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPass !== confirm) {
      alert("New password aur confirm password match nahi kar rahe ❌");
      return;
    }

    alert("Password successfully change ho gaya ✅");
  };

  return (
    <div className=" h-187.5 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-1">
            Change Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Secure your account password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Current Password",
                value: current,
                setValue: setCurrent,
                placeholder: "Enter current password",
              },
              {
                label: "New Password",
                value: newPass,
                setValue: setNewPass,
                placeholder: "Enter new password",
              },
              {
                label: "Confirm New Password",
                value: confirm,
                setValue: setConfirm,
                placeholder: "Confirm new password",
              },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={show ? "text" : "password"}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
              {show ? "Hide" : "Show"} Password
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
            >
              Update Password
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
