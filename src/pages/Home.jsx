import { useState } from "react";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import CreateExpense from "../components/CreateExpense";

export default function Home(user) {
  const [month, setMonth] = useState(1);

  return (
    <main className="w-full max-w-[800px] flex flex-col gap-5 mx-auto">
      <CreateExpense user={user} month={month} />
      <MonthNavigation month={month} setMonth={setMonth} />
      <ExpenseList />
    </main>
  );
}
