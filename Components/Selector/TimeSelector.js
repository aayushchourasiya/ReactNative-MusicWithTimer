import React, {useCallback, useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar/ProgressBar';
let changeProgress = null;

const TimeSelector = () => {
  const minutes = [{time: 2}, {time: 5}, {time: 6}, {time: 7}, {time: 8}];
  const buttons = [
    require('../Assets/play.png'),
    require('../Assets/pause.png'),
  ];
  const [time, setTime] = useState(2);
  const [progressTime, setProgressTime] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [progress, setProgress] = useState(0);
  const [change, setChange] = useState(false);
  const [runCondition, setRunCondition] = useState(false);
  const [displaySelector, setDisplaySelector] = useState(true);
  const [displayBar, setDisplayBar] = useState(false);
  const [playStatus, setPlayStatus] = useState(buttons[0]);
  const playPauseFunction = () => {
    if (playStatus === buttons[0]) {
      setProgress(0);
      setPlayStatus(buttons[1]);
      setDisplayBar(true);
      setDisplaySelector(false);
      setProgressTime(time);
      changeProgress = setInterval(() => {
        console.log('......');
        setRunCondition(true);
        setChange(prev => !prev);
      }, 1000);
    } else {
      setRunCondition(false);
      setProgress(0);
      setSeconds(59);
      setPlayStatus(buttons[0]);
      setDisplayBar(false);
      setDisplaySelector(true);
    }
  };

  useEffect(() => {
    if (playStatus === buttons[0]) {
      clearInterval(changeProgress);
    }
  }, [playStatus]);

  useEffect(() => {
    if (runCondition) {
      if (progress > 0.99) {
        clearInterval(changeProgress);
        setRunCondition(false);
        setProgress(0);
        setSeconds(59);
        setPlayStatus(buttons[0]);
        setDisplayBar(false);
        setDisplaySelector(true);
      } else {
        setProgress(progress + 1 / (time * 60));
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (progressTime > 0) {
            setProgressTime(progressTime - 1);
          }
          setSeconds(59);
        }
      }
    }
  }, [change]);
  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
    setTime(viewableItems[0].item.time);
  }, []);
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
  return (
    <MainView>
      {displaySelector ? (
        <NoStyleBody>
          <CustomText
            style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: '600'}}>
            Duration
          </CustomText>
          <TimerView>
            <FlatList
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              showsVerticalScrollIndicator={false}
              data={minutes}
              renderItem={({item, index}) => (
                <Touchable onPress={() => setTime(item.time)} key={index}>
                  <CustomText>{item.time} minutes</CustomText>
                </Touchable>
              )}
            />
            {/* <Scroll showsVerticalScrollIndicator={false}>
            {minutes.map((item, index) => {
              return (
                <Touchable onPress={() => setTime(item.time)} key={index}>
                  <CustomText>{item.time} minutes</CustomText>
                </Touchable>
              );
            })}
          </Scroll> */}
          </TimerView>
        </NoStyleBody>
      ) : (
        <NoStyleBody>
          <CustomText
            style={{
              alignSelf: 'flex-start',
              fontSize: 20,
              fontWeight: '600',
            }}></CustomText>
          <TimerNoneView />
        </NoStyleBody>
      )}
      <PlayView>
        <Touchable onPress={playPauseFunction}>
          <MyImage source={playStatus} />
        </Touchable>
      </PlayView>
      {displayBar ? (
        <ProgressView>
          <ProgressBar
            width={300}
            borderColor="#DEC6A9"
            color="#1C592B"
            progress={progress}
          />
          <TimingText>
            {progressTime - 1}:{seconds <= 9 ? '0' + seconds : seconds}
          </TimingText>
        </ProgressView>
      ) : null}
    </MainView>
  );
};
const MainView = styled.View``;

const TimerView = styled.View`
    width:80%
    height:40px
    margin-top:10%
    align-self:center
    border:1px
    border-radius:10px
`;
const TimerNoneView = styled.View`
    width:80%
    height:40px
    margin-top:10%
`;
const Scroll = styled.ScrollView``;
const CustomText = styled.Text`
    font-size:25px
    align-self:center
    color:black
`;
const Touchable = styled.TouchableOpacity``;
const PlayView = styled.View`
    width:80%
    height:200px
    align-self:center
    margin-top:20%
    justify-content:center
`;
const MyImage = styled.Image`
    width:150px
    height:150px
    align-self:center
`;
const ProgressView = styled.View`
    alignItems:center
    margin-top:10%
    margin-right:10%
    margin-left:10%
`;
const TimingText = styled.Text`
    align-self:flex-end
    margin-top:1%
    margin-right:5%
`;
const NoStyleBody = styled.View``;
export default TimeSelector;
