import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  LogoImage
} from './styles';

import loadingBell from '../../components/assets/loadingDelfos.json.json';
import LottieView from 'lottie-react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

export function Splash() {

  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();
  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(splashAnimation.value, [0, 50], [0, -260], Extrapolate.CLAMP),
        }
      ],
    }
  });

  const bellStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(splashAnimation.value, [0, 50], [0, 200], Extrapolate.CLAMP)
        }
      ],
    }
  })

  function startApp() {
    navigation.navigate("TabRoutes");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1500 }, () => {
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[logoStyle, {position: 'absolute', top: 350}]}>
        <LogoImage />
      </Animated.View>

      <Animated.View style={[bellStyle, {position: 'absolute', top: 400}]}>
        <LottieView
          source={loadingBell}
          style={{ height: 100 }}
          resizeMode='contain'
          autoPlay
          loop
        />
      </Animated.View>
    </Container>
  );
}


