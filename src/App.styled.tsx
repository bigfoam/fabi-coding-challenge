import styled from "styled-components";

const textBase = "#3B3B3B";

export const AppWrapper = styled.div`
  background-color: #fafafa;
  border: none;
  width: 100%;
  height: 100vh;
`;

export const Banner = styled.div`
  background-image: linear-gradient(166deg, #fd6b61 62%, #556df5);
  padding: none;
  margin: none;
  width: 100%;
  height: 120px;
  position: relative;
`;

export const BannerText = styled.div<{ color: "gray" | "white" }>`
  position: absolue;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${({ color }) => (color === "white" ? "white" : "#1A1B1F")};
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 5px 10px;
  text-align: center;
  color: ${textBase};
  background-color: white;
  border: 1px solid ${textBase};
  border-radius: 3px;

  &:hover {
    opacity: 80%;
  }

  &:active {
    color: black;
    border-color: black;
  }
`;

export const Message = styled.div<{ alignment: "left" | "right" }>`
  align-self: ${({ alignment }) => (alignment === "left" ? "start" : "end")};
  width: 400px;
  border: 2px solid WhiteSmoke;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 30px;
`;

export const ChatBox = styled.div`
  padding: 10px;
  background-color: white;
  border: 1px solid WhiteSmoke;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  height: 800px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
`;

export const MessageSection = styled.div`
  width: auto;
  padding-top: 6px;
`;

export const CompanyName = styled.h2`
  font-size: 48px;
`;

export const CompanyTagLine = styled.h4`
  font-size: 20px;
`;

export const Page = styled.div`
  display: flex;
  padding: 16px 32px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  height: 100vh;
`;
