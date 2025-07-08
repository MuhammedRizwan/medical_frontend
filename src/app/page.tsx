import CurvedImage from "@/components/auth/image_card";
import LoginForm from "@/components/auth/login_form";

export default function Login() {
  return (
    <div className="flex h-full w-full bg-white">
      <div className="w-full md:w-1/2 h-full">
        <LoginForm />
      </div>
      <div className="hidden md:block w-1/2 h-full">
        <CurvedImage src="/images/doctor1.jpg" alt="Doctor" />
      </div>
    </div>
  );
}