import { redirect } from "next/navigation";

// Root redirects to login; middleware will push authenticated users to /dashboard
export default function Home() {
  redirect("/login");
}
