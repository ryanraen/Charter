import FormInput from "./inputs/FormInput";
import item from "../assets/item.svg";
import "./css/chart.css";
import { createItem } from "../util/API";

export default function ChartArea({ charts, openChartModal, onItemAdd }) {
  console.log(charts);

  return (
    <>
      <div className="charts-taskbar ">
        <TaskbarButton label={"New Chart"} func={openChartModal} />
      </div>
      <div className="chart-container gap-3">
        {charts.map(chart => (
          <Chart title={chart.name} id={chart.id} key={chart.id}>
            {chart.items.map(item => (
              <Item key={chart.name + item.name} name={item.name} />
            ))}
          </Chart>
        ))}
      </div>
    </>
  );

  function TaskbarButton(props) {
    return (
      <button onClick={props.func} className="taskbar-button">
        {props.label}
      </button>
    );
  }

  async function handleItemSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    const itemSubmit = await createItem(formData.chartID, formData.itemName, "");
    onItemAdd();
    e.target.reset();
  }

  function Chart(props) {
    return (
      <div className="chart">
        <div className="chart-header">
          <h4>{props.title}</h4>
        </div>
        <div className="chart-item-container">{props.children}</div>
        <form onSubmit={handleItemSubmit}>
          <input type="text" name="chartID" value={props.id} hidden readOnly />
          <FormInput name="itemName" required={"true"} type={"text"} additionalClass={"new-item-form"} label={"New item"} placeholder={"New item"} />
          <input type="submit" hidden />
        </form>
      </div>
    );
  }

  function Item(props) {
    return (
      <div role="button" className="chart-item">
        <div className="d-flex align-items-center chart-item-header-container">
          <img src={item} className="item-img" />
          <h4 className={"item-header"}>{props.name}</h4>
        </div>

        <div></div>
      </div>
    );
  }
}
