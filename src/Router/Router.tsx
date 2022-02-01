import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Chart } from '../components/moduler/chart/Chart';
import { Coin } from '../components/page/coin/Coin';
import { Coins } from '../components/page/coins/Coins';
import { Price } from '../components/moduler/price/Price';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path="/:coinId" element={<Coin />}>
        <Route path={'price'} element={<Price />} />
        <Route path={'chart'} element={<Chart />} />
      </Route>
    </Routes>
  );
};
