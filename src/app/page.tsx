import { redirect } from "next/navigation";

export default function Home() {
  redirect("/cost-indicator");
  return null;
}
