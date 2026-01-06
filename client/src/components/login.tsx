import AuthCard from "./auth-card.tsx";

function Login() {
  // verify credentials: handle login
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("login handled");
  };

  return (
    <div className="flex justify-center">
      <AuthCard
        title="Login to your account"
        description="Login in with you Email and Password"
        type="Login"
        fields={["email", "password"]}
        onSubmit={handleLogin}
      />
    </div>
  );
}

export default Login;
