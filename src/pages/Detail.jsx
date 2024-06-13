import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExpense, putExpense, deleteExpense } from "../lib/api/expense";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: selectedExpense,
    isLoding,
    error,
  } = useQuery({ queryKey: ["expense", id], queryFn: getExpense });

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedExpense) {
      setDate(selectedExpense.date);
      setItem(selectedExpense.item);
      setAmount(selectedExpense.amount);
      setDescription(selectedExpense.description);
    }
  }, [selectedExpense]);

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]); // 캐쉬 처리를 할거면 필요
    },
  });

  const handleEdit = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    if (!item || amount <= 0) {
      alert("유효한 항목과 금액을 입력해주세요.");
      return;
    }

    const newExpense = {
      id,
      date,
      item,
      amount: parseInt(amount, 10),
      description,
    };
    mutationEdit.mutate(newExpense);
  };

  const handelDeleteExpense = () => {
    mutationDelete.mutate(id);
  };

  return (
    <div className="max-w-800 mx-auto p-20 bg-white rounded-lg">
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      <div className="flex gap-10">
        <Button onClick={handleEdit}>수정</Button>
        <Button danger="true" onClick={handelDeleteExpense}>
          삭제
        </Button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-gray-500"
          onClick={() => navigate(-1)}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
