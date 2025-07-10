
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OnboardingNav = () => {
  return (
    <nav className="fixed top-3 left-3 right-0 bg-transparent p-4">
      <div className="flex items-center">
        <Avatar className="h-5 w-5">
          <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="Health Pay"
        />
          <AvatarFallback>HP</AvatarFallback>
        </Avatar>
        <span className="ml-2 text-lg font-semibold text-foreground">Health Pay</span>
      </div>
    </nav>
  );
};
