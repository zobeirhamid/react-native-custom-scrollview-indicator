// @flow
import * as React from 'react';
import { Animated, View } from 'react-native';
import Context from './Context';

type ContainerProps = {
  spacing?: number,
  children: ?React.Node,
  animatedValue: Animated.Value,
  itemSize?: number,
  itemCount?: number,
  horizontal?: boolean,
  size?: number,
  containerSize?: number
};

class Container extends React.Component<ContainerProps> {
  render() {
    const {
      spacing,
      children,
      animatedValue,
      itemSize,
      itemCount,
      horizontal = true,
      size,
      containerSize
    } = this.props;
    return (
      <Context.Provider
        value={{
          size,
          spacing,
          animatedValue,
          itemSize,
          itemCount,
          containerSize,
          horizontal
        }}
      >
        <View style={{ flexDirection: horizontal ? 'column' : 'row' }}>
          {children}
        </View>
      </Context.Provider>
    );
  }
}

export default Container;
