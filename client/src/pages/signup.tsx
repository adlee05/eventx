import AuthCard from "@/components/auth-card.tsx";

function SignUp() {
  // verify credentials: handle login
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("login handled");
  };

  return (
    <div className="flex justify-center">
      <AuthCard
        title="Sign Up to EventX"
        description="SignUp with you Email and Password. Set a Unique username"
        type="Login"
        fields={["email", "password"]}
        onSubmit={handleSignUp}
      />
    </div>
  );
}

export default SignUp;
