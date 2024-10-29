import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sun } from "lucide-react";

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

const Header = () => {
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
        <p className="text-sm">
          Daily Goal{" "}
          <span className="font-semibold text-gray-800">2000 ml</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
