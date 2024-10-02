import backgroundIma from "@/public/non1.jpg";
import backgroundImage from "../../../../public/non1.jpg"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage.src})`, // Correction ici
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      ></div>
      <div className="flex justify-center items-center flex-col h-full relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;