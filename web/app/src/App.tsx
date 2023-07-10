import { useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import MainBox from "./components/MainBox/MainBox";
import "./App.css";

function App() {
  return (
    <>
      <div className="Flexbox">
        <MainBox>Yesterday</MainBox>
        <MainBox>Trailing Week</MainBox>
        <MainBox>Trailing Month</MainBox>
        <MainBox>Trailing Year</MainBox>
      </div>
    </>
  );
}

export default App;

// const items = ["New York", "Los Angeles", "San Francisco"];

// const discription = "This is a great button";

// const [countForDisplay, setCountForDisplay] = useState(0);

// const handleCounter = (counter: number) => {
//   console.log(counter);
//   setCountForDisplay(countForDisplay + 1);
// };

{
  /* <ListGroup items={items} heading="Cities"></ListGroup>
<BsFillCalendarFill color="red"></BsFillCalendarFill>
<Button color="primary" discription={discription} onClick={handleCounter}>
  Test
</Button>
<h2>Clicked: {countForDisplay} times</h2> */
}
