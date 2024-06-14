import axios from "axios";

const JSON_SERVER_HOST = "https://exultant-bronze-marsupial.glitch.me";

// 지출 데이터 가져오기
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    alert("뭔가 잘못된거 같아요! 데이터를 로드 할 수가 없어요");
  }
};

// 특정 지출 데이터 불러오기
export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
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

// 지출 수정
export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const response = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return response.data;
  } catch (error) {
    console.log(error);
    alert("뭔가 잘못된거 같아요! 데이터가 수정되지 않아요");
  }
};

// 지출 삭제
export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("뭔가 잘못된거 같아요! 데이터가 삭제되지 않아요");
  }
};
