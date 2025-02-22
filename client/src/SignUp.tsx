import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi } from "./utils/api";
import Cookies from "js-cookie";

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  Cookies.remove("token");
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords does match");
      return;
    }
    try {
      const res = await axios.post(`${authApi}/signup`, {
        firstName,
        lastName,
        userName,
        password,
        confirmPassword,
      });
      console.log("Response:", res.data);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
        console.log(error.response);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="mb-4 text-3xl">TodoList</h1>
      <Card className="w-96 m-2">
        <CardHeader className="p-2">
          <CardTitle className="text-center my-2">Sign Up</CardTitle>
          <CardDescription className="text-center"> Enter your details below to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-center mb-4 text-sm text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSignUp}>
            <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" required />
            <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" required />
            <Input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full" required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" required />
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full" required />
            <Button className="w-full">Sign Up</Button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
