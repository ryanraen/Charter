import item from "../assets/item.svg";
import text from "../assets/text.svg";
import card from "../assets/card.svg";
import list from "../assets/list.svg";
import exit from "../assets/exit.svg";
import "./css/chart.css";
import { createItem, createChart, deleteItem, deleteChart, setItemDescription } from "../util/API";
import { useState, useEffect, useRef } from "react";

export default function ChartArea({ workspaceID, charts, setCharts }) {
  const [itemInfoOpen, setItemInfoOpen] = useState(false);
  const [currentItemInfo, setCurrentItemInfo] = useState({ name: "", description: "", id: "", createdDate: "", chartName: "", chartID: "" });

  const descriptionAreaRef = useRef(null);

  useEffect(() => {
    const keyPressEvent = e => {
      if (e.key === "Escape") {
        setItemInfoOpen(false);
      }
    };

    if (itemInfoOpen) {
      document.addEventListener("keydown", keyPressEvent);
    }

    return () => {
      document.removeEventListener("keydown", keyPressEvent);
    };
  }, [() => setItemInfoOpen(false)]);

  return (
    <>
      {/* <div className="charts-taskbar" /> */}
      <div className="chart-container-container">
        <div className="chart-container gap-3">
          {charts.map(chart => (
            <Chart title={chart.name} id={chart.id} key={chart.id} handleSubmit={handleItemSubmit}>
              {chart.items.map(item => (
                <Item key={item.id} name={item.name} id={item.id} chartID={chart.id} description={item.description} />
              ))}
            </Chart>
          ))}
          <Chart title={"Create new chart"} creationChart={"true"} handleSubmit={handleChartSubmit}>
            <input name="chartName" type="text" className="new-item-input form-control" placeholder="Chart name" />
          </Chart>
          <div className="horizontal-padding-bruh"></div>
        </div>
      </div>

      <ItemDetails />
    </>
  );

  function ItemDetails() {
    return (
      <div className={`item-details-backdrop w-100 h-100 position-absolute top-0 d-flex justify-content-center ${itemInfoOpen ? "item-details-bg" : "pe-none"}`}>
        {itemInfoOpen && (
          <div className="item-details-container">
            <div className="d-flex ">
              <div className="item-details-row">
                <img src={card} className="item-details-title-card" />
                <h4>{currentItemInfo.name}</h4>
                <h6 className="font-color-1">
                  &nbsp;in chart <u>{currentItemInfo.chartName}</u>
                </h6>
              </div>
              <img src={exit} role="button" className="desc-exit" onClick={() => setItemInfoOpen(false)} />
            </div>

            <div className="item-details-row">
              <img src={text} className="item-details-title-card" />
              <h4>Description</h4>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              {currentItemInfo.description == "" ? (
                <div
                  className="description-area"
                  role="button"
                  onClick={() => {
                    setCurrentItemInfo({ ...currentItemInfo, description: " " });
                  }}
                >
                  <h6>Add details...</h6>
                </div>
              ) : (
                <textarea ref={descriptionAreaRef} defaultValue={currentItemInfo.description} autoFocus={currentItemInfo.description == " "} name="description" className="description-text" />
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn description-btn" onClick={saveDescription}>
                  <h4>Save</h4>
                </button>
                <button className="btn description-btn" onClick={cancelDescription}>
                  <h4>Cancel</h4>
                </button>
              </div>
              <button className="btn description-btn" onClick={() => handleDeleteItem(currentItemInfo.chartID, currentItemInfo.id)}>
                <h4>Delete item</h4>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  function handleDeleteItem(chartID, itemID) {
    deleteClientItem(chartID, itemID);
    deleteItem(itemID);
  }

  function openItemInfo(chartID, itemID) {
    const chartObj = [...charts].find(chart => chart.id == chartID);
    const itemObj = chartObj.items.find(item => item.id == itemID);
    setCurrentItemInfo({ name: itemObj.name, description: itemObj.description, id: itemObj.id, createdDate: itemObj.createdDate, chartName: chartObj.name, chartID: chartObj.id });
    setItemInfoOpen(true);
  }

  async function saveDescription() {
    const newDescription = descriptionAreaRef.current.value;
    setCurrentItemInfo({ ...currentItemInfo, description: newDescription });
    setClientItemDescription(currentItemInfo.chartID, currentItemInfo.id, newDescription);
    console.log(await setItemDescription(currentItemInfo.id, newDescription));
  }

  function cancelDescription() {
    setCurrentItemInfo({ ...currentItemInfo });
  }

  function TaskbarButton(props) {
    return (
      <button onClick={props.func} className="taskbar-button">
        {props.label}
      </button>
    );
  }

  async function handleChartSubmit(e) {
    e.preventDefault();
    const formElements = Object.fromEntries(new FormData(e.target));
    let tempID = -new Date().getUTCMilliseconds();

    createClientChart(formElements.chartName, tempID);
    const newChartID = (await createChart(workspaceID, formElements.chartName)).id;
    updateClientChartID(tempID, newChartID);
  }

  async function handleItemSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    let tempID = -new Date().getUTCMilliseconds();

    createClientItem(formData.chartID, { id: tempID, name: formData.itemName, description: "", createdDate: null });
    const createdItemID = (await createItem(formData.chartID, formData.itemName, "")).id;
    updateClientItemID(formData.chartID, tempID, createdItemID);
  }

  function Chart(props) {

    function checkOverflow(e) {

    }

    return (
      <div className="chart" onDrop={e => handleOnDrop(e, props.id)} onDragOver={props.creationChart ? null : handleDragOver}>
        <div className="chart-bg">
          <div className="chart-header-container">
            <h4 className="chart-header">{props.title}</h4>
            {!props.creationChart && <img src={exit} className="chart-exit-icon" role="button" onClick={() => handleDeleteChart(props.id)} />}
          </div>
          <div ref={overflowCheckRef} onScroll={checkOverflow} className="chart-item-container">{!props.creationChart && props.children}</div>
          <form onSubmit={props.handleSubmit} className="d-flex justify-content-center">
            <input type="text" name="chartID" value={props.id} hidden readOnly />
            {props.creationChart ? props.children : <input type="text" name="itemName" placeholder="New item" required className="new-item-input form-control" />}
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    );
  }

  function Item(props) {
    return (
      <div
        role="button"
        className="chart-item"
        draggable={!props.creationChart && props.id >= 0}
        onDragStart={e => handleOnDrag(e, { id: -props.id, name: props.name, description: props.description }, props.chartID)}
      >
        <div className="d-flex flex-row chart-item-header-container">
          <img src={item} className="item-img" />
          <h4 className={"item-header"}>{props.name}</h4>
          <img src={list} className="item-img" onClick={() => openItemInfo(props.chartID, props.id)} />
        </div>
      </div>
    );
  }

  function handleDeleteChart(chartID) {
    deleteClientChart(chartID);
    deleteChart(chartID);
  }

  function handleOnDrag(e, itemObject, chartID) {
    e.dataTransfer.setData("itemObject", JSON.stringify(itemObject));
    e.dataTransfer.setData("originChartID", chartID);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleOnDrop(e, onDropChartID) {
    const itemObject = JSON.parse(e.dataTransfer.getData("itemObject"));
    const fromChartID = e.dataTransfer.getData("originChartID");

    if (onDropChartID == fromChartID) {
      return;
    }

    createClientItem(onDropChartID, itemObject); // Create duplicate item (client), atp the new item will have old id
    deleteClientItem(fromChartID, -itemObject.id); // Delete from old chart (client)

    const newItemID = (await createItem(onDropChartID, itemObject.name, itemObject.description)).id; // Create new item on db
    deleteItem(-itemObject.id); // Delete old item on db

    updateClientItemID(onDropChartID, itemObject.id, newItemID); // Give the client item with old id the new id
  }
  /************************************************************************************************************** 
    CLIENT DISPLAY UTIL */

  function setClientItemDescription(chartID, itemID, newDescription) {
    let modifiedCharts = [...charts];
    console.log(modifiedCharts.find(chart => chart.id === chartID).items.find(item => item.id === itemID));
    modifiedCharts.find(chart => chart.id === chartID).items.find(item => item.id === itemID).description = newDescription;
    setCharts([...modifiedCharts]);
  }

  function deleteClientChart(chardID) {
    let modifiedCharts = [...charts];
    modifiedCharts.splice(
      modifiedCharts.findIndex(chart => chart.id == chardID),
      1
    );
    setCharts([...modifiedCharts]);
  }

  function createClientChart(chartName, chartID) {
    let modifiedCharts = charts; // Updating id only works when this is without spread operator?????????????
    modifiedCharts.push({ name: chartName, id: chartID, createdDate: null, items: [] });
    setCharts([...modifiedCharts]);
  }

  function createClientItem(chartID, itemObject) {
    let modifiedCharts = [...charts];
    modifiedCharts.find(chart => chart.id === chartID).items.push(itemObject);
    setCharts([...modifiedCharts]);
  }

  function updateClientItemID(chartID, itemID, newID) {
    let modifiedCharts = [...charts];
    modifiedCharts.find(chart => chart.id === chartID).items.find(item => item.id === itemID).id = newID;
    setCharts([...modifiedCharts]);
  }

  function updateClientChartID(chartID, newID) {
    let modifiedCharts = [...charts];
    modifiedCharts.find(chart => chart.id === chartID).id = newID;
    setCharts([...modifiedCharts]);
  }

  function deleteClientItem(chartID, itemID) {
    let modifiedCharts = [...charts];
    let targetItems = modifiedCharts.find(chart => chart.id === chartID).items;
    targetItems.splice(
      targetItems.findIndex(item => item.id == itemID),
      1
    );
    setCharts([...modifiedCharts]);
  }
}
