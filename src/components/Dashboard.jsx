import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/card.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showDispatchChart, setShowDispatchChart] = useState(false);
  const [showSalesReport, setShowSalesReport] = useState(false);
  const [showSalesPerType, setShowSalesPerType] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalSalesByType = (type) => {
    let total = 0;
    for (const item of items) {
      if (item.type === type) {
        total += item.saleGenerated;
      }
    }
    return total;
  };

  const calculateTotalSalesPerType = () => {
    const types = [...new Set(items.map((item) => item.type))];
    const salesPerType = types.map((type) => {
      const totalSales = calculateTotalSalesByType(type);
      return {
        type,
        totalSales,
      };
    });
    return salesPerType;
  };

  const getChartData = () => {
    const labels = ["Bag", "Shoes", "Clothes"];
    const data = labels.map((type) => calculateTotalSalesByType(type));
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  };

  useEffect(() => {
    Chart.register(CategoryScale, Title, Tooltip, ArcElement, BarElement);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleButtonClick = () => {
    setShowChart((prevShowChart) => !prevShowChart);
    setShowDispatchChart(false);
    setShowSalesReport(false);
    setShowSalesPerType(false);
  };

  const handleDispatchChartClick = () => {
    setShowDispatchChart((prevShowDispatchChart) => !prevShowDispatchChart);
    setShowChart(false);
    setShowSalesReport(false);
    setShowSalesPerType(false);
  };

  const handleSalesReportClick = () => {
    setShowSalesReport((prevShowSalesReport) => !prevShowSalesReport);
    setShowChart(false);
    setShowDispatchChart(false);
    setShowSalesPerType(false);
  };

  const handleSalesPerTypeClick = () => {
    setShowSalesPerType((prevShowSalesPerType) => !prevShowSalesPerType);
    setShowChart(false);
    setShowDispatchChart(false);
    setShowSalesReport(false);
  };

  const getDispatchChartData = () => {
    const labels = items.map((item) => item.name);
    const data = items.map((item) => item.dispatchQuantity);
    return {
      labels,
      datasets: [
        {
          label: "Quantity to be Dispatched",
          data,
          backgroundColor: "#FF6384",
          hoverBackgroundColor: "#FF6384",
        },
      ],
    };
  };

  return (
    <>
      <h3>Sales per Type</h3>
      <table className="table">
        <thead></thead>
        <tfoot>
          <tr>
            <th>Total:</th>
            <td>Bag: {"$" + calculateTotalSalesByType("Bag")}</td>
            <td>Shoes: {"$" + calculateTotalSalesByType("Shoes")}</td>
            <td>Clothes: {"$" + calculateTotalSalesByType("Clothes")}</td>
          </tr>
        </tfoot>
      </table>

      <button onClick={handleButtonClick}>
        {showChart ? "Disable sales chart" : "Generate sales chart per type"}
      </button>

      <button onClick={handleDispatchChartClick}>
        {showDispatchChart ? "Disable dispatch chart" : "Dispatch chart"}
      </button>

      <button onClick={handleSalesReportClick}>
        {showSalesReport ? "Disable sales report" : "Generate sales report"}
      </button>

      <button onClick={handleSalesPerTypeClick}>
        {showSalesPerType
          ? "Disable sales per Type"
          : "Generate sales per Type"}
      </button>

      {showChart && (
        <div style={{ width: "600px", height: "600px" }}>
          <Pie data={getChartData()} options={chartOptions} />
        </div>
      )}

      {showDispatchChart && (
        <div style={{ width: "600px", height: "600px" }}>
          <Bar data={getDispatchChartData()} options={chartOptions} />
        </div>
      )}

      {showSalesReport && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Sale Generated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.saleGenerated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showSalesPerType && (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {calculateTotalSalesPerType().map((salesType) => (
              <tr key={salesType.type}>
                <td>{salesType.type}</td>
                <td>{salesType.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Dashboard;
