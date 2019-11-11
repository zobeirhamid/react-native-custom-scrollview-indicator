// @flow
import * as React from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
/*
(horizontal = true),
  (size = horizontal ? width : height),
  (containerSize = size - 2 * spacing);
  */

type ContextType = {
  size?: number,
  spacing?: number,
  itemCount?: number,
  itemSize?: number,
  containerSize?: number,
  animatedValue: Animated.Value,
  horizontal?: boolean
};

export const Context = React.createContext<ContextType>({
  spacing: 0,
  itemCount: 0,
  containerSize: 0,
  animatedValue: new Animated.Value(0),
  horizontal: true
});

export function ContextConsumer<Config: {}>(
  Component: React.AbstractComponent<Config>
) {
  class ContextConsumerComponent extends React.Component<any> {
    static contextType = Context;

    render() {
      const {
        spacing = 0,
        itemCount,
        animatedValue,
        horizontal,
        size = horizontal ? width : height,
        itemSize = horizontal ? width : height,
        containerSize = size - 2 * spacing
      }: ContextType = this.context;
      const { containerRef } = this.props;
      return (
        <Component
          spacing={spacing}
          itemCount={itemCount}
          animatedValue={animatedValue}
          horizontal={horizontal}
          size={size}
          itemSize={itemSize - spacing}
          containerSize={containerSize}
          {...this.props}
          ref={containerRef}
        />
      );
    }
  }
  return React.forwardRef((props, ref) => (
    <ContextConsumerComponent containerRef={ref} {...props} />
  ));
}

export default Context;
