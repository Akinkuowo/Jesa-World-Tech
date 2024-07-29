import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn path="/sign-in" />;
  // return <h1>Sign In</h1>
}