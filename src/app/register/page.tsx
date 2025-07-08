import ImageCard from "@/components/auth/image_card";
import RegisterForm from "@/components/auth/register_form";

export default function Register() {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="w-full md:w-1/2 h-full">
        <RegisterForm/>
      </div>
      <div className="hidden md:block w-1/2 h-full">
        <ImageCard src="/images/doctor1.jpg" alt="Doctor" />
      </div>
    </div>
  );
}