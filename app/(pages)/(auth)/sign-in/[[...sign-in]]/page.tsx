import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn 
          path="/sign-in" 
          // routing="/sign-in"
          fallbackRedirectUrl="/"
        // or
        // forceRedirectUrl="/dashboard"
        />;
  // return <h1>Sign In</h1>
}