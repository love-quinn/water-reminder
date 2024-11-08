import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Sun } from "lucide-react";

const currentDate = format(new Date(), "dd 'de' MMMM' de 'yyyy", {
  locale: ptBR,
});

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Bom dia";
  } else if (currentHour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};
const greeting = getGreeting();

interface HeaderProps {
  dailyGoal: number
}

const Header = ({dailyGoal}: HeaderProps) => {
  return (
    <div className="absolute top-12 flex gap-2 justify-center px-12 w-full flex-col">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">{greeting}</h1>
          <Sun />
        </div>
      </div>
      <div>
        <h1 className="text">{currentDate}</h1>
        <div className="flex gap-1">
        <p className="text-sm">
          Daily Goal
        </p>

          <button className="flex gap-1 items-center hover:text-indigo-500 transition-transform">
          <p className="font-semibold text-sm ">{dailyGoal} ml</p>
          <Pencil size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
