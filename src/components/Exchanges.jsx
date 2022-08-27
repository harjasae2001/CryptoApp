import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";

import {
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { VerifiedOutlined } from "@ant-design/icons";
import Title from "antd/lib/skeleton/Title";
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { coinId } = useParams();

  const { data, isFetching } = useGetExchangesQuery(coinId);
  const { data: coinName } = useGetCryptoDetailsQuery(coinId);
  const coin = coinName?.data?.coin;
  const exchangesList = data?.data?.exchanges;
  console.log(exchangesList);
  console.log(coin.name);

  if (isFetching) return <Loader />;

  return (
    <>
      <Title>{coin?.name}</Title>
      <Row>
        <Col span={6}>
          <strong>Exchanges</strong>
        </Col>
        <Col span={6}>
          {" "}
          <strong>24h Trade Volume</strong>
        </Col>
        <Col span={6}>
          <strong>Markets</strong>
        </Col>
        <Col span={6}>
          <strong>Price</strong>
        </Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.uuid}>
            <Panel
              key={exchange.uuid}
              showArrow={false}
              header={
                <Row key={exchange.uuid}>
                  <Col span={6}>
                    <Text>
                      <strong>{exchange.rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                    <Text>
                      <strong>{exchange.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                  <Col span={6}>{exchange.price}</Col>
                  <Col span={6}>
                    {!exchange.verified && <VerifiedOutlined />}
                  </Col>
                </Row>
              }
            ></Panel>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
