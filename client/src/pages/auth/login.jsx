import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle button disable
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle form submission
  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await dispatch(loginUser(formData));

      if (response?.payload?.success) {
        toast({
          title: "Login Successful!",
          description: response?.payload?.message || "Welcome back!",
        });

        // Redirect to the desired page after successful login
        navigate("/shop/checkout");
      } else {
        toast({
          title: "Login Failed",
          description: response?.payload?.message || "Invalid credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Re-enable button after request
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* <h1 className="text-2xl font-semibold text-center text-gray-800">Sign In</h1>
      <p className="text-sm text-center text-gray-600">
        Enter your email and password to access your account.
      </p> */}
      <CommonForm
        formControls={loginFormControls}
        buttonText={isSubmitting ? "Signing In..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isDisabled={isSubmitting} // Disable button during submission
      />
    </div>
  );
}

export default AuthLogin;
