import React, { useState } from 'react';
import styled from 'styled-components';
import TimeSelector from '../Selector/TimeSelector';

const MusicTimer = () => {
    const [date, setDate] = useState(new Date(1598051730000));
  return (
    <MainView>
        <TimeSelector/>
    </MainView>
  );
};

const MainView = styled.View`
    margin-top:10%
    margin-left:3%
`;


export default MusicTimer;
