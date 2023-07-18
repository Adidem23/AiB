import React, { useEffect } from 'react';
import { Navbar, Button, Link, Text, useTheme, User } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useState } from 'react';
import axios from 'axios';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import detectEthereumProvider from '@metamask/detect-provider';

const FrontPage = () => {

    const [Account, setAccount] = useState(null);
    const [Avatar, setAvatar] = useState("Aditya");


    const checkMeatmask = async () => {

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }else{
            alert("Install Metamask");
        }

    }

    checkMeatmask();

    const setMeatmaskAccount = async () => {

        const { ethereum } = window;
        const ConnectBut = document.getElementById('But');
        const ConnectBut2 = document.getElementById('But2');
        ConnectBut2.setAttribute('disabled', 'disabled');
        ConnectBut2.style.pointerEvents = "none";
        console.log(ConnectBut2);

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });

        ConnectBut.innerHTML = account[0];
        setAccount(account[0]);

        ethereum.on('accountsChanged', async (accountnew) => {
            ConnectBut.innerHTML = accountnew[0];
            setAccount(accountnew[0]);
        })

        const options = {
            method: 'GET',
            url: 'https://random-username-generate.p.rapidapi.com/',
            params: {
                locale: 'en_US',
                minAge: '18',
                maxAge: '50',
                domain: 'ugener.com'
            },
            headers: {
                'X-RapidAPI-Key': '4638530cfemshb5f9bea28be8a72p1d9bb8jsnef9a6f833608',
                'X-RapidAPI-Host': 'random-username-generate.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setAvatar(response.data.items.name);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <Layout>
                <Navbar style={{ backgroundColor: "black" }} variant="sticky">
                    <Navbar.Brand>
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            ACME
                        </Text>
                    </Navbar.Brand>
                    <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                        <Navbar.Link>MarketPlace</Navbar.Link>
                        <Navbar.Link>All NFTs</Navbar.Link>
                        <Navbar.Link>Gallery</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Item>
                            <Jazzicon diameter={30} seed={jsNumberForAddress(`${Account}`)} />
                        </Navbar.Item>
                        <Navbar.Item>
                            <Text style={{ marginTop: "12px" }}>{Avatar}</Text>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button auto flat id='But2' onPress={setMeatmaskAccount}><span id='But'>Connect Wallet</span></Button>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>
            </Layout>
        </>

    )
}

export default FrontPage