import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi } from "./utils/api";

const LoginPage: React.FC = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${authApi}/login`, {
        userName,
        password,
      });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
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
          <CardTitle className="text-center my-2">Login</CardTitle>
          <CardDescription className="text-center"> Enter your details below to login</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-center mb-4 text-sm text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} className="w-full" required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" required />
            <Button className="w-full">Login</Button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                  signup
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
