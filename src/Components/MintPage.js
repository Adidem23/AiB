import { Container } from '@nextui-org/react'
import React, { useState } from 'react';
import { Card, Grid, Text, Button, Row, Input } from "@nextui-org/react";
import axios from 'axios';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers';

const MintPage = () => {

    const [Prompt, setPrompt] = useState(null);
    const [NFtName, setNFtName] = useState(null);
    const [Image, setImage] = useState(null);
    const [Account, setAccount] = useState(null);

    const setName = (e) => {
        setNFtName(e.target.value);
    }


    const Des = (e) => {
        setPrompt(e.target.value)
    }


    const connectMetamask = async () => {

        const { ethereum } = window;

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(account[0]);

        ethereum.on('accountsChanged', async (accountnew) => {
            setAccount(accountnew[0])
        })
    }


    connectMetamask();

    const GenerateImagePlease = async () => {
        try {
            const GeneratedImage = createImage();

        } catch (err) {
            alert("HolyMoly Error is Occured:" + err);
        }

        let button5 = document.getElementById('But5')


        button5.innerText = "Generating..."

    }

    if (Image) {
        let button5 = document.getElementById('But5')
        button5.innerText = "Generated"
        setTimeout(() => {

        }, 1000);
    }

    // const MintNft = async () => {
    //     try {
    //         ListNFT();
    //     } catch (err) {
    //         alert("Error is Occured : " + err);
    //     }
    // }

    const createImage = async () => {

        const Apikey = "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"

        const response = await axios({
            url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1-base",

            method: 'POST',

            headers: {
                Authorization: `Bearer ${Apikey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            data: JSON.stringify({
                inputs: Prompt,
                options: { wait_for_model: true }
            }),

            responseType: 'arraybuffer',

        })

        const type = response.headers['content-type'];

        const data = response.data;

        const Base64data = Buffer.from(data).toString('base64');

        const img = `data:${type};base64,` + Base64data;

        setImage(img);

        return data
    }



    const ListNFT = async () => {

        try {

            const metadata = {
                name: NFtName,
                description: Prompt,
                image: Image,
            }

            const providers = new ethers.providers.Web3Provider(window.ethereum);

            // const Signer = providers.getSigner();

            const Signer = new ethers.Wallet("5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef", providers);

            const sdkt = ThirdwebSDK.fromSigner(Signer);

            sdkt.wallet.connect(Signer);

            // 0x5000492764633821eA9549f5F0b9816EE04789F3
            // 0xf6d289B4fD2980A5c518F161FeF877A6a500527A

            const contractnew = await sdkt.getContract("0xf6d289B4fD2980A5c518F161FeF877A6a500527A");


            await contractnew.roles.grant("minter", Account);
            

            const newSigner=providers.getSigner();
            const sdkt2 = ThirdwebSDK.fromSigner(newSigner);
            sdkt2.wallet.connect(newSigner);
            const contractnew2 = await sdkt2.getContract("0xf6d289B4fD2980A5c518F161FeF877A6a500527A");
    

            try {
                const payload = {
                    to: Account,
                    metadata: metadata,
                    price: '0.01'
                }
                const signpayload = await contractnew2.erc721.signature.generate(payload);
                const tx = await contractnew2.erc721.signature.mint(signpayload);
                const receipt = tx.receipt;
                const tokenId = tx.id;

            } catch (err) {
                console.log("Error is Occured" + err);
            }

        } catch (err) {
            console.log("Error is occured" + err);
        }

    }


    return (
        <Container style={{ display: "block", margin: "auto", width: "fit-content" }}>

            <Text
                h1
                size={70}
                css={{
                    textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
                weight="bold" style={{ display: "block", margin: "auto", width: "fit-content" }}
            >AI NFT GENRATOR </Text>

            <Text style={{ marginTop: "20px" }}>Connected Account :{Account}</Text>

            <Grid.Container gap={2}>
                <Grid sm={12} md={5}>
                    <Card css={{ mw: "330px" }} >
                        <Card.Header>
                            <Text b>Enter Prompt To Generate Image</Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body style={{ marginTop: "10px" }}>

                            <Row style={{ display: "block", marginTop: "3px" }}>
                                <Input
                                    underlined
                                    initialValue="Name of NFT"
                                    onChange={setName} />
                            </Row>

                            <Row style={{ display: "block", marginTop: "22px" }}>
                                <Input
                                    underlined
                                    initialValue="Description of NFT"
                                    onChange={Des} />
                            </Row>

                        </Card.Body>
                        <Card.Divider />
                        <Card.Footer>
                            <Row style={{ display: "block", margin: "auto", width: "fit-content" }} >
                                <Button id='But5' onClick={GenerateImagePlease} >Generate</Button>
                                <Button onClick={ListNFT} style={{ marginTop: "20px" }} >Mint</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                    <img src={Image} alt="No Image Generated" height="300px" width="300px" style={{ color: "black", marginLeft: "100px", marginTop: "20px" }} />

                </Grid>
            </Grid.Container>

        </Container>
    )
}

export default MintPage