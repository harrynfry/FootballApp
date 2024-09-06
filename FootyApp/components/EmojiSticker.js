import { Image, View } from 'react-native';
import { Gesture, GestureDetector, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export default function EmojiSticker ({imageSize, stickerSource}) {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const scaleImage = useSharedValue(imageSize);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if(scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else if(scaleImage.value == imageSize * 2){
                scaleImage.value = imageSize;
            }
        });

    const drag = Gesture.Pan()
        .onChange((e) => {
            translateX.value = e.changeX;
            translateY.value = e.changeY;
        });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    return(
        <Animated.View style={{top: -350}}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image
                source={stickerSource}
                resizeMode='contain'
                style={[imageStyle, { width: imageSize, height: imageSize }]} />
            </GestureDetector>            
        </Animated.View>
    )
}