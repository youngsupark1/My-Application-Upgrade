import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

// 지출 데이터 가져오기
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    alert("뭔가 잘못된거 같아요! 데이터를 로드 할 수가 없어요");
  }
};

// 지출을 등록
export const postExpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (error) {
    console.log(error);
    alert("뭔가 잘못된거 같아요! 데이터가 작성되지 않아요");
  }
};
