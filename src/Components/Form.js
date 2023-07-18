import React from 'react';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from 'ethers';
import { useState } from 'react'
import axios from 'axios';

const Form = () => {

    const [Prompt, setPrompt] = useState(null);
    const [NFtName, setNFtName] = useState(null);
    const [Image, setImage] = useState(null);
    const [Account, setAccount] = useState(null);
    const [GetOwnedNfts, setGetOwnedNfts] = useState([]);

    const setName = (e) => {
        setNFtName(e.target.value);
    }

    const Des = (e) => {
        setPrompt(e.target.value)
    }


    const GenerateImagePlease = async () => {
        const GeneratedImage = createImage();
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


    const MintNft = async () => {
        try {
            ListNFT();
        } catch (err) {
            alert("Error is Occured : " + err);
        }
    }



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

            const Signer = providers.getSigner();

            const sdkt = ThirdwebSDK.fromSigner(Signer);

            sdkt.wallet.connect(Signer);

            const contractnew = await sdkt.getContract("0x5000492764633821eA9549f5F0b9816EE04789F3");


            try {
                const data = await contractnew.roles.grant("minter", Account);
                console.log(data);
            } catch (err) {
                alert("Error is Occured: " + err);
            }

            try {
                const payload = {
                    to: Account,
                    metadata: metadata,
                    price: '0.01'
                }
                const signpayload = await contractnew.erc721.signature.generate(payload);
                const tx = await contractnew.erc721.signature.mint(signpayload);
                const receipt = tx.receipt;
                const tokenId = tx.id;

            } catch (err) {
                console.log("Error is Occured" + err);
            }

        } catch (err) {
            console.log("Error is occured" + err);
        }

    }

    const getNft = async () => {

        const providers = new ethers.providers.Web3Provider(window.ethereum);

        const Signer = providers.getSigner();

        const sdkt = ThirdwebSDK.fromSigner(Signer);

        sdkt.wallet.connect(Signer);

        const contractnewNew = await sdkt.getContract("0x5000492764633821eA9549f5F0b9816EE04789F3");

        const nfts = await contractnewNew.erc721.getOwned(Account);

        console.log(nfts)

        setGetOwnedNfts(nfts);

    }

    return (

        <div className="App">
            <p>This is Ai Nft App Using Thirdweb And react</p>

            <p>Name</p>
            <input type='text' placeholder='Enter Nft Image ' onChange={setName} />

            <p>Description</p>
            <input type='text' placeholder='Enter Nft Image Describtion' onChange={Des} />

            <br />
            <br />

            <button onClick={connectMetamask}>Connect</button>

            <p id='yourAccount'>Your Connected Account :{Account}</p>

            <button onClick={GenerateImagePlease} style={{ marginLeft: '30px' }}>Generate</button>

            <button onClick={MintNft} style={{ marginLeft: '30px' }}>Mint NFT</button>

            <button onClick={getNft} style={{ marginLeft: '30px' }}>Get All NFT</button>

            <div style={{ width: 'fit-content', display: "block", margin: "auto" }} className='App' >
                {
                    
                    GetOwnedNfts.map((val) => {
                        console.log(val);
                        return (
                            <>
                                <div>
                                    <img src={val.metadata.image} alt="NO image" />
                                    <p>{val.metadata.name}</p>
                                    <p></p>
                                </div>

                            </>
                        )

                    })
                }


            </div>


            <div style={{ width: 'fit-content', display: "block", margin: "auto" }} className='App'>

                <img src={Image} alt='Image is Not Found' width="fit-content" id='imgsrc' style={{ marginTop: "30px" }} />

            </div>

        </div>
    );
}

export default Form