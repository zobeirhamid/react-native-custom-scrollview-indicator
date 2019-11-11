// @flow
import * as React from "react";
import { Animated } from "react-native";
import { ContextConsumer } from "./Context";

type IndicatorDefaultProps = {|
  backgroundColor: string,
  indicatorSize: number
|};

type IndicatorProps = {
  ...IndicatorDefaultProps,
  size: number,
  itemCount: number,
  itemSize: number,
  spacing: number,
  animatedValue: Animated.Value,
  containerSize: number,
  children: ?React.Node,
  style?: mixed,
  horizontal: boolean
};

class Indicator extends React.Component<IndicatorProps> {
  static defaultProps: IndicatorDefaultProps = {
    backgroundColor: "grey",
    indicatorSize: 1
  };

  render() {
    const {
      size,
      itemCount,
      itemSize,
      spacing,
      animatedValue,
      containerSize,
      children,
      backgroundColor,
      style,
      horizontal,
      indicatorSize
    } = this.props;
    const indicatorLength = containerSize / itemCount;
    const end = itemCount * (itemSize + spacing) - (size - spacing);

    const translate: Animated.Value = animatedValue.interpolate({
      inputRange: [0, end],
      outputRange: [0, containerSize - indicatorLength],
      extrapolate: "clamp"
    });
    return (
      <Animated.View
        style={[
          {
            backgroundColor,
            transform: [
              horizontal ? { translateX: translate } : { translateY: translate }
            ],
            alignItems: "center",
            justifyContent: "center"
          },
          horizontal
            ? { width: indicatorLength, height: indicatorSize }
            : { height: indicatorLength, width: indicatorSize },
          style
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

export default ContextConsumer(Indicator);
