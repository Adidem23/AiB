import { Text, Spacer } from "@nextui-org/react"
import { Container, Card, Row, Col, User } from "@nextui-org/react";
import { useState } from "react";
import introJs from 'intro.js';
import Spline from '@splinetool/react-spline';
import '../Frontpage.css';
import { Link } from "react-router-dom";

const Content = () => {

  return (
    <>
      <div className="Robotdiv" style={{}}>
        <Container gap={0}>

          <Text
            h1
            size={70}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold" style={{ display: "block", margin: "auto", width: "fit-content" }}
          >AI NFT GENRATOR </Text>
          <Row gap={5}>

            <Col style={{ marginTop: "80px", width: "fit-content", height: "fit-content" }}>

              <Text
                h1
                size={50}
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
                weight="bold"
              >
                Mint NFTs

                <Text h4
                  size={20}
                  css={{
                    textGradient: "45deg, $purple600 -20%, $pink600 100%",
                    marginTop: "20px"
                  }}>
                  Drive engagement, scale your content and own more of your revenue with Pinata’s suite of media distribution solutions.
                </Text>


              </Text>

            </Col>



            <Col style={{ marginTop: "40px", height: "fit-content", width: "fit-content", marginRight: "200px" }}>

              <img src={"https://images.pexels.com/photos/12857750/pexels-photo-12857750.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt="NO Image " height={"200px"} width={"296px"} style={{ marginTop: "40px" }} />

              {/* <Spline scene="https://prod.spline.design/1s6tfC0NiU5fwMiq/scene.splinecode" style={{ height: "250px", width: "fit-content" }} /> */}
            </Col>

          </Row>

          <Spacer y={3} />

          <Row gap={1}>

            <Col css={{ marginTop: "1px", marginLeft: "350px" }}>
              <Link to="/mint">

                <button className="button">Mint Now !!!</button>

              </Link>
            </Col>
          </Row>

        </Container>

      </div>
    </>
  )

};

export default Content;