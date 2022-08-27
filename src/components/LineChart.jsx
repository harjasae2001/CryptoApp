import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Col, Row, Typography } from "antd";
// import "chartjs-adapter-date-fns";
// import { enGB } from "date-fns/locale";
ChartJS.register(...registerables);

const { Title } = Typography;
function LineChart({ coinHistory, currentPrice, coinName, timePeriod }) {
  const coinPrice = [];
  const coinTimeStamp = [];
  console.log(
    new Date(coinHistory?.data?.history[0].timestamp).toLocaleDateString()
  );
  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  console.log(timePeriod[1] === "h");

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinTimeStamp.push(
      timePeriod[1] === "h" || timePeriod[2] === "h"
        ? new Date(
            coinHistory?.data?.history[i].timestamp * 1000
          ).toLocaleTimeString()
        : new Date(
            coinHistory?.data?.history[i].timestamp * 1000
          ).toLocaleDateString("en-GB")
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",

        borderWidth: 3,
      },
    ],
  };

  // const options = {
  //   scales: {
  //     y: {
  //       display: true,
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },

  //     x: {
  //       display: true,
  //       id: "x",
  //       type: "time",
  //       adapters: {
  //         date: { locale: enGB },
  //         distribution: "linear",
  //       },
  //     },
  //   },
  // };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} /*options={options}*/ datasetIdKey="id" />
    </>
  );
}

export default LineChart;
