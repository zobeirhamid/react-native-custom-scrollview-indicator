// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import ScrollComponent from "./ScrollComponent";
import ContainerIndicator from "./ContainerIndicator";
import Indicator from "./Indicator";
import Container from "./Container";

type CustomScrollViewIndicatorProps = {
  animatedValue?: Animated.Value,
  itemCount?: number,
  itemSize?: number,
  spacing?: number,
  horizontal?: boolean,
  containerIndicatorBackgroundColor?: string,
  containerIndicatorStyle?: mixed,
  indicatorBackgroundColor?: string,
  indicatorStyle?: mixed,
  onSnap?: number => void,
  indicatorSize?: number,
  snapping?: boolean
};

class CustomScrollViewIndicator extends Component<CustomScrollViewIndicatorProps> {
  animatedValue = new Animated.Value(0);

  constructor(props: CustomScrollViewIndicatorProps) {
    super(props);
    const { animatedValue } = props;
    if (animatedValue !== undefined) {
      this.animatedValue = animatedValue;
    }
  }

  render() {
    const {
      itemCount,
      itemSize,
      spacing,
      horizontal,
      containerIndicatorBackgroundColor,
      containerIndicatorStyle,
      indicatorBackgroundColor,
      indicatorStyle,
      onSnap,
      snapping,
      indicatorSize,
      passRef
    } = this.props;
    return (
      <Container
        itemCount={itemCount}
        itemSize={itemSize}
        animatedValue={this.animatedValue}
        spacing={spacing}
        horizontal={horizontal}
      >
        <ContainerIndicator
          backgroundColor={containerIndicatorBackgroundColor}
          style={[containerIndicatorStyle]}
        >
          <Indicator
            backgroundColor={indicatorBackgroundColor}
            indicatorSize={indicatorSize}
            style={[indicatorStyle]}
          />
        </ContainerIndicator>
        <ScrollComponent
          onSnap={onSnap}
          snapping={snapping}
          ref={passRef}
          {...this.props}
        />
      </Container>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <CustomScrollViewIndicator {...props} passRef={ref} />
));
