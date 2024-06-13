import { useState } from "react";
import uuid from "react-uuid";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { postExpense } from "../lib/api/expense";
import { useNavigate } from "react-router-dom";

export default function CreateExpense({ user, month }) {
  const [newDate, setNewDate] = useState(
    `2024-${String(month).padStart(2, "0")}-01`
  );
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate(0);
    },
  });

  const handleAddExpense = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(newDate)) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }

    const parsedAmount = parseInt(newAmount, 10);
    if (!newItem || parsedAmount <= 0) {
      alert("유효한 항목과 금액을 입력해주세요.");
      return;
    }

    const newExpense = {
      id: uuid(),
      month: parseInt(newDate.split("-")[1], 10),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
      createBy: user.userId,
    };

    mutation.mutate(newExpense);

    setNewDate(`2024-${String(month).padStart(2, "0")}-01`);
    setNewItem("");
    setNewAmount("");
    setNewDescription("");
  };

  return (
    <section className="bg-white rounded-xl p-5">
      <div className="flex flex-wrap gap-2.5 items-end">
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="date"
            className="mb-1 text-sm text-gray-800 text-left"
          >
            날짜
          </label>
          <input
            className="p-2 border border-gray-300 rounded text-sm"
            type="text"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="item"
            className="mb-1 text-sm text-gray-800 text-left"
          >
            항목
          </label>
          <input
            className="p-2 border border-gray-300 rounded text-sm"
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="지출 항목"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="amount"
            className="mb-1 text-sm text-gray-800 text-left"
          >
            금액
          </label>
          <input
            className="p-2 border border-gray-300 rounded text-sm"
            type="number"
            id="amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="지출 금액"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="description"
            className="mb-1 text-sm text-gray-800 text-left"
          >
            내용
          </label>
          <input
            className="p-2 border border-gray-300 rounded text-sm"
            type="text"
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="지출 내용"
          />
        </div>
        <button
          className="px-5 py-2 h-8 mt-2.5 bg-blue-500 text-white border-none rounded text-sm cursor-pointer transition duration-200 ease-in-out hover:bg-blue-700"
          conClick={handleAddExpense}
        >
          저장
        </button>
      </div>
    </section>
  );
}
