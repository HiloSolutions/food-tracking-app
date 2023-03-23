import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid } from "@mui/x-data-grid";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

const FoodTracker = (props) => {
  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {};

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const showFoodList = (mealID) => {
    setShowList(true);
    setMeal(mealID);
    setOpen(true);
  };

  return (
    <div>
      <h1>Food Tracker</h1>

      <Dialog onClose={handleClose} open={open}>
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>
      <h1>Breakfast</h1>
      <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(1)}>
        Add Breakfast
      </Button>
      <h1>Lunch</h1>
      <FoodLog meal={"lunch"} mealID={2} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(2)}>
        Add Lunch
      </Button>
      <h1>Dinner</h1>
      <FoodLog meal={"dinner"} mealID={4} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(4)}>
        Add Dinner
      </Button>
      <h1>Snack</h1>
      <FoodLog meal={"snack"} mealID={3} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(3)}>
        Add Snack
      </Button>
    </div>
  );
};

export default FoodTracker;
