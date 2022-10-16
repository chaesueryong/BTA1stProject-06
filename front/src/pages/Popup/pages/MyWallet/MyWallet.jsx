import React, {useEffect} from 'react';
import './MyWallet.css';
import {chainState, loadingState, pageState, selectedNickNameState, selectedPairState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import { getFreeBalance, RpcEndpoint } from '../../modules/usePolkadotAPI';
import { useState } from 'react';

const MyWallet = () => {
    const setPage = useSetRecoilState(pageState);
    const chain = useRecoilValue(chainState);
    const selectedNickName = useRecoilValue(selectedNickNameState);
    const selectedPair = useRecoilValue(selectedPairState);

    const [balance, setBalance] = useState('');

    useEffect(() => {
        getBalance();
    }, [selectedNickName, selectedPair, chain])

    const getBalance = async () => {
        setBalance('............');
        const endpoint = RpcEndpoint[chain];
        const balance = await getFreeBalance(endpoint, selectedPair.address);
        setBalance(balance.toString());
    }

    return (
        <div className="MyWallet">
            <Header align="left"></Header>


            <div className="wallet-info-box1">
                <div className='wall-info-nickname'>{selectedNickName}</div>
                <div className='wall-info-address'>{selectedPair.address}</div>
            </div>

            <div className="wallet-info-box2">
                {balance === '' ? '............' : balance}
            </div>

            <div className="btn-box">
                {/* <button className="purchase-btn">구매</button> */}
                <button className="mywallet-send-btn" onClick={() => {
                    setPage("Send");
                }}>보내기</button>
            </div>
            
            {/* <div className="history-box">
                <div className="history-title">활동</div>
                <div className="history-list">

                </div>
            </div> */}
        </div>
    );
};

export default MyWallet;
